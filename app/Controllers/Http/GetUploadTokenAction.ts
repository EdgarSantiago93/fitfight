import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AWS from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'
import Media from 'App/Models/Media'
import path from 'path'

export default class GetUploadTokenAction {
  public async handle({ auth, request, response }: HttpContextContract) {
    const mimeTypes = [
      'image/png',
      'image/gif',
      'image/jpeg',
      'image/svg+xml',
      'image/webp',
      'image/heif',
      'image/heic',
    ]
    await auth.use('web').authenticate()
    const user = auth.use('web').user!

    const fileName = request.input('file_name')
    const fileType = request.input('file_type')
    const fileSize = request.input('file_size') / 1000 / 1000 // in MB
    const fileExtension = path.extname(fileName)

    if (fileSize > 10) {
      return response.badRequest('Archivo mayor a 10MB')
    }
    if (!mimeTypes.includes(fileType)) {
      return response.badRequest('Solo se permiten imágenes')
    }
    const newName = `${user.id}-${Date.now()}${fileExtension}`

    AWS.config.update({
      accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
    })

    const S3_BUCKET = 'fitfight-temp'
    const REGION = 'us-west-1'
    const URL_EXPIRATION_TIME = 180 // in seconds

    const AWSBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    })

    const res = new Promise((resolve, _reject) => {
      AWSBucket.getSignedUrl(
        'putObject',
        {
          Key: newName,
          ContentType: fileType,
          Expires: URL_EXPIRATION_TIME,
        },
        async (_err, url) => {
          if (_err) {
            resolve(response.badRequest('Error getting signed URL'))
          }
          const dbMedia = await Media.create({
            name: newName,
            type: fileType,
            url: url,
            status: 'pending',
            description: '',
            userId: user.id,
          })

          resolve(
            response.json({ data: { url: url, key: newName, id: dbMedia.id }, success: true })
          )
        }
      )
    })

    return await res
  }
}
