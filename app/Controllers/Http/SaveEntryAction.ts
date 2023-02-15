import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AWS from 'aws-sdk'
import Env from '@ioc:Adonis/Core/Env'
import Entry from 'App/Models/Entry'
import User from 'App/Models/User'
import moment from 'moment'
import Media from 'App/Models/Media'
import { DateTime } from 'luxon'
import axios from 'axios'

export default class SaveEntryAction {
  public async handle({ auth, request, response }: HttpContextContract) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!

    AWS.config.update({
      accessKeyId: Env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: Env.get('AWS_SECRET_ACCESS_KEY'),
    })

    const S3_BUCKET = 'fitfight-temp'
    const REGION = 'us-west-1'

    const S3instance = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    })

    const dbUser = await User.find(user.id)

    const sod = moment().startOf('day').format()
    const eod = moment().endOf('day').format()

    const todaysEntry = await dbUser
      ?.related('entries')
      .query()
      .where('created_at', '>=', sod)
      .where('created_at', '<=', eod)

    if (todaysEntry && todaysEntry.length > 0) {
      return response.badRequest('Ya subiste una entrada hoy')
    }

    const sow = moment().startOf('isoWeek').format()
    const eow = moment().endOf('isoWeek').format()

    const thisWeeksActiveEntries = await dbUser
      ?.related('entries')
      .query()
      .where('is_rest_day', false)
      .where('created_at', '>=', sow)
      .where('created_at', '<=', eow)

    if (
      thisWeeksActiveEntries &&
      thisWeeksActiveEntries.length === 5 &&
      request.input('is_rest_day') === false
    ) {
      return response.conflict('Ya tienes 5 días activos. Hoy puede ser tu día de descanso')
    }

    if (request.input('is_rest_day') === true) {
      const restDay = await dbUser
        ?.related('entries')
        .query()
        .where('is_rest_day', true)
        .where('created_at', '>=', sow)
        .where('created_at', '<=', eow)

      if (restDay && restDay.length > 0) {
        return response.badRequest('Ya tienes un día de descanso esta semana')
      }
      await Entry.create({
        is_rest_day: true,
        is_validated: true,
        user_id: user.id,
      })
    } else {
      const entryInstance = await Entry.create({
        pose_file: request.input('pose_img') ? request.input('pose_img') : null,
        tracker_file: request.input('tracker_img') ? request.input('tracker_img') : null,
        calories: request.input('calories'),
        minutes: request.input('minutes'),
        user_id: user.id,
      })

      const mediaFiles: string[] = []
      if (request.input('pose_img')) {
        mediaFiles.push(request.input('pose_img'))
      }
      if (request.input('tracker_img')) {
        mediaFiles.push(request.input('tracker_img'))
      }
      const handleMovingMedia = async (media) => {
        const dbMedia = await Media.find(media)
        if (dbMedia) {
          dbMedia.status = 'live'
          await dbMedia.save()
          S3instance.copyObject(
            {
              Bucket: 'fitfight',
              CopySource: 'fitfight-temp/' + dbMedia.name,
              Key: dbMedia.name,
            },
            (err, _data) => {
              console.log('err', err)
            }
          )
        }
      }

      mediaFiles.map(async (media) => {
        return await handleMovingMedia(media)
      })
      await Promise.all(mediaFiles)

      let botId = Env.get('TELEGRAM_BOT_ID')
      let groupId = Env.get('TELEGRAM_GROUP_ID')

      axios.get(
        `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${groupId}&text=${user.name} ha subido una entrada https://bartolos.site/entry/${entryInstance.id}`
      )
    }

    const thisWeekEntries = await dbUser
      ?.related('entries')
      .query()
      .where('created_at', '>=', sow)
      .where('created_at', '<=', eow)

    const daysUntilEndOfWeek = moment().endOf('isoWeek').diff(moment(), 'days')
    if (thisWeekEntries && thisWeekEntries.length === 6 && daysUntilEndOfWeek === 1) {
      await Entry.create({
        is_rest_day: false,
        is_validated: true,
        status: 'forced_rest',
        user_id: user.id,
        createdAt: DateTime.now().endOf('week'),
      })
    }

    return response.json({ success: true })
  }
}
