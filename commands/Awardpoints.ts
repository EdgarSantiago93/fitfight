import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export default class Awardpoints extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'awardpoints' // updateLeaderboard
  public static description = 'Award points to users for the day'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @flags.boolean({ alias: 'f', description: 'force' })
  public forceUpdate: boolean

  @flags.string({ alias: 'd', description: 'day' })
  public day: string

  public async run() {
    this.logger.info('->FITFIGHT<-')
    const { default: Entry } = await import('App/Models/Entry')
    // this runs after 12:00am
    // const yesterday = moment().subtract(1, 'days')
    let yesterday = moment().utcOffset(-6).subtract(1, 'days')

    // only run between 12:00am and 1:30am

    if (
      moment().utcOffset(-6).hour() === 0 ||
      moment().utcOffset(-6).hour() === 1 ||
      this.forceUpdate
    ) {
      if (this.forceUpdate) {
        this.logger.info('Running awardpoints with forced flag')
      }
      if (this.day) {
        this.logger.info('Running awardpoints with day flag')
        yesterday = moment(this.day.toString())
      }
      this.logger.info('Yesterday was: ' + yesterday.format())

      const entriesForTheDay = await Entry.query()
        .whereNot('status', 'validated')
        .whereNot('status', 'forced_rest')
        .where('is_rest_day', false)
        .where('created_at', '>=', yesterday.startOf('day').format())
        .where('created_at', '<=', yesterday.endOf('day').format())

      this.logger.info('Awarding points to users for: ' + yesterday.format('YYYY-MM-DD'))
      this.logger.info(entriesForTheDay.length.toString())

      for (const entry of entriesForTheDay) {
        const votes = await entry.related('votes').query()
        const votesFor = votes.filter((vote) => vote.type === 'for')
        const votesAgainst = votes.filter((vote) => vote.type === 'against')
        this.logger.info('Entry: ' + entry.id + ' has ' + votesFor.length + ' votes for')
        this.logger.info('Entry: ' + entry.id + ' has ' + votesAgainst.length + ' votes against')

        if (
          votesFor.length > votesAgainst.length ||
          (votesFor.length === 0 && votesAgainst.length === 0)
        ) {
          this.logger.success('Entry: ' + entry.id + ' was validated')
          entry.status = 'validated'
          entry.is_validated = true
          await entry.save()
        }
        if (votesFor.length === votesAgainst.length) {
          this.logger.action('Entry: ' + entry.id + ' was a tie')
          //TODO: add logic for tie

          entry.status = 'validated'
          entry.is_validated = true
          await entry.save()
        }
        if (votesFor.length < votesAgainst.length) {
          this.logger.error('Entry: ' + entry.id + ' was rejected')
          entry.status = 'rejected'
          entry.is_validated = false
          await entry.save()
        }

        this.logger.info('')
      }
    } else {
      this.logger.info('Not running awardpoints')
      this.logger.info('Current hour: ' + moment().utcOffset(-6).hour())
      return
    }
  }
}
