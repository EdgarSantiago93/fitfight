import { BaseCommand } from '@adonisjs/core/build/standalone'
import moment from 'moment'

export default class Awardpoints extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'awardpoints' // updateLeaderboard

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Hello world!')
    const { default: Entry } = await import('App/Models/Entry')
    // this runs after 12:00am
    const yesterday = moment().subtract(1, 'days')
    // const yesterday = moment()
    this.logger.info('Yesterday was: ' + yesterday.format())

    const entriesForTheDay = await Entry.query()
      .whereNot('status', 'validated')
      .where('is_rest_day', false)
      .where('created_at', '>=', yesterday.startOf('day').format())
      .where('created_at', '<=', yesterday.endOf('day').format())

    this.logger.info('Awarding points to users for: ' + yesterday.format('YYYY-MM-DD'))
    console.log(entriesForTheDay.length)

    for (const entry of entriesForTheDay) {
      const votes = await entry.related('votes').query()
      const votesFor = votes.filter((vote) => vote.type === 'for')
      const votesAgainst = votes.filter((vote) => vote.type === 'against')
      this.logger.info('Entry: ' + entry.id + ' has ' + votesFor.length + ' votes for')
      this.logger.info('Entry: ' + entry.id + ' has ' + votesAgainst.length + ' votes against')

      if (
        votesFor.length > votesAgainst.length ||
        (votesFor.length == 0 && votesAgainst.length == 0)
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
  }
}
