import Entry from 'App/Models/Entry'
import User from 'App/Models/User'
import moment from 'moment'

interface userInterface {
  user: User
}
export default class RoutesControllerActions {
  public async getUserTodaysEntries({ user }: userInterface): Promise<Entry[]> {
    const entries = await Entry.query()
      .where('user_id', user.id)
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())
    return entries
  }

  public async getTotalTodaysEntriesWithVotes(): Promise<Entry[]> {
    const entries = await Entry.query()
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())
      .preload('user')
      .preload('votes', (query) => {
        query.preload('user')
      })
      .orderBy('created_at', 'asc')
    return entries
  }

  public async getTodaysEarliestEntry(): Promise<Entry | null> {
    return await new Promise(async (resolve, _reject) => {
      const entry = await Entry.query()
        .where('created_at', '>=', moment().startOf('day').format())
        .where('created_at', '<=', moment().endOf('day').format())
        .where('is_rest_day', 0)
        .preload('user')
        .orderBy('created_at', 'asc')
        .first()

      entry?.pose_file && (await entry.load('pose_file_model'))
      entry?.tracker_file && (await entry.load('tracker_file_model'))
      resolve(entry)
    })
  }

  public async getUsersEntriesToVoteOn({ user }: userInterface): Promise<any[]> {
    const entries = await Entry.query()
      .where('status', 'pending')
      .where('is_validated', 0)
      .where('is_rest_day', 0)
      .whereNot('user_id', user.id)
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())
      .whereNotExists((query) => {
        query.from('votes').whereRaw('votes.entry_id = entries.id').where('votes.user_id', user.id)
      })
      .preload('user')
      .orderBy('created_at', 'asc')

    const serializedEntries: any[] = []
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      entry?.pose_file && (await entry.load('pose_file_model'))
      entry?.tracker_file && (await entry.load('tracker_file_model'))
      const serialized = entry.serialize()
      entry.tracker_file &&
        (serialized.tracker_file_signed_url = await entry.tracker_file_model.presignedUrl())
      entry.pose_file &&
        (serialized.pose_file_signed_url = await entry.pose_file_model.presignedUrl())
      serializedEntries.push(serialized)
    }

    return serializedEntries
  }

  public async getValidatedEntries({ user }: userInterface): Promise<Entry[]> {
    const entries = await user
      .related('entries')
      .query()
      .where('status', 'validated')
      .where('is_validated', 1)
      .where('created_at', '>=', moment().startOf('month').format())
      .where('created_at', '<=', moment().endOf('month').format())
      .withCount('votes', (query) => {
        query.as('vote_count_for')
        query.where('type', 'for')
      })
      .withCount('votes', (query) => {
        query.as('vote_count_against')
        query.where('type', 'against')
      })
    return entries
  }

  public async getUserThisWeeksEntries({ user }: userInterface): Promise<Entry[]> {
    const sow = moment().startOf('isoWeek').format()
    const eow = moment().endOf('isoWeek').format()
    const entries = await user
      ?.related('entries')
      .query()
      .where('created_at', '>=', sow)
      .where('created_at', '<=', eow)
      .preload('votes', (query) => {
        query.preload('user')
      })
    return entries
  }
}
