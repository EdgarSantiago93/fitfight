//@ts-nocheck
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AWS from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'

export default class GetPresignedURL {
  // public async handle({ fileKey, live = false }) {

  public async apiHandle({ auth, request, response }: HttpContextContract) {
    await auth.use('web').authenticate()
    // const user = auth.use('web').user!
    const fileKey = request.input('file_key')
    const live = request.input('is_live')
    const fileType = request.input('file_type')
    const res = await this.controllerAction({ fileKey: fileKey, live: live, fileType: fileType })

    if (res == 'error') {
      return response.badRequest('Error generando el URL')
    }
    return response.json({
      success: true,
      data: res,
    })
  }

  public async controllerAction({ fileKey, fileType, live = false }) {
    AWS.config.update({
      accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
    })

    const S3_BUCKET = live ? 'fitfight' : 'fitfight-temp'
    const REGION = 'us-west-1'
    const URL_EXPIRATION_TIME = 3600 // in seconds

    const myBucket = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    })

    // myBucket.copyObject(
    //   {
    //     Bucket: "DESTINATION_BUCKET_NAME",
    //     CopySource: "/SOURCE_BUCKET_NAME/OBJECT_NAME",
    //     Key: "OBJECT_NAME"
    // }
    // )

    const res = new Promise((resolve, _reject) => {
      myBucket.getSignedUrl(
        'getObject',
        {
          Key: fileKey,
          // ContentType: fileType,
          Expires: URL_EXPIRATION_TIME,
        },
        async (_err, url) => {
          if (_err) {
            console.log('error', _err)
            resolve('error')
          }
          console.log('SIGNED URL  ', url)
          resolve(url)
        }
      )
    })

    return await res
  }
}
