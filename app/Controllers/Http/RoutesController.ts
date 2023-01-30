// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Entry from 'App/Models/Entry'
import User from 'App/Models/User'
import moment from 'moment'
import View from '@ioc:Adonis/Core/View'

export default class RoutesController {
  //

  public async getLoginView({ auth, inertia, response }) {
    await auth.use('web').authenticate()
    if (auth.use('web').isLoggedIn) {
      return response.redirect('/')
    }

    const users = await User.all()
    return inertia.render('Login', {
      users: users,
    })
  }

  public async getVotingView({ auth, inertia }) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!

    const userCanVote = await Entry.query()
      .where('user_id', user.id)
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())

    if (userCanVote.length == 0) {
      console.log('user CANNOT vote')
      return inertia.render('NoParticipation', { user: user })
    }

    const earliestEntry = await Entry.query()
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())
      .preload('pose_file_model')
      .preload('tracker_file_model')
      .preload('user')
      .orderBy('created_at', 'asc')
      .first()

    let earliestJson = {}

    if (earliestEntry) {
      earliestJson = await new Promise(async (resolve, _reject) => {
        let serializedEarliest = earliestEntry?.serialize()
        if (earliestEntry.pose_file) {
          await earliestEntry?.load('pose_file_model')
          serializedEarliest.pose_file_signed_url =
            await earliestEntry.pose_file_model?.presignedUrl()
        }
        if (earliestEntry.tracker_file) {
          await earliestEntry?.load('tracker_file_model')
          serializedEarliest.tracker_file_signed_url =
            await earliestEntry.tracker_file_model?.presignedUrl()
        }
        resolve(serializedEarliest)
      })
    }

    // const weeksEntriesJson = await Promise.all(
    //   // @ts-ignore
    //   weeksEntries &&
    //     weeksEntries.map(async (entry) => {
    //       let serialized = entry.serialize()
    //       if (entry.pose_file) {
    //         await entry.load('pose_file_model')
    //         serialized.pose_file_signed_url = await entry.pose_file_model?.presignedUrl()
    //       }
    //       if (entry.tracker_file) {
    //         await entry.load('tracker_file_model')
    //         serialized.tracker_file_signed_url = await entry.tracker_file_model?.presignedUrl()
    //       }
    //       return serialized
    //     })
    // )

    const entriesToVote = await Entry.query()
      .where('status', 'pending')
      .where('is_validated', 0)
      .whereNot('user_id', user.id)
      .where('created_at', '>=', moment().startOf('day').format())
      .where('created_at', '<=', moment().endOf('day').format())
      .whereNotExists((query) => {
        query.from('votes').whereRaw('votes.entry_id = entries.id').where('votes.user_id', user.id)
      })
      .preload('user')
      .preload('pose_file_model')
      .preload('tracker_file_model')

    console.log(earliestEntry)

    // const dbUser = await User.find(user.id)

    // const entriesToVote = await Entry.query()
    // .whereNot('status', 'validated')
    // .where('is_validated', 0)
    // // const activeDays = await dbUser
    //       ?.related('entries')
    //       .query()
    // .whereIn('status', ['validated', 'pending','forced'])
    // .whereIn('created_at', [moment().startOf('day').format(), moment().endOf('day').format()])
    //       .where('is_validated', 1)

    return inertia.render('Vote', {
      user: user,
      entriesToVoteOn: entriesToVote,
      earliestEntry: earliestJson,
    })
  }

  public async getLeaderBoardView({ auth, inertia }) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!
    const users = await User.all()
    const userswithEntries = await Promise.all(
      users.map(async (user) => {
        let serialized = user.serialize()
        const entries = await user
          .related('entries')
          .query()
          .where('status', 'validated')
          .where('is_validated', 1)
          .where('created_at', '>=', moment().startOf('month').format())
          .where('created_at', '<=', moment().endOf('month').format())
        serialized.entries = entries
        serialized.hasEntries = true
        if (entries.length == 0) {
          serialized.hasEntries = false
        }
        return serialized
      })
    )

    return inertia.render('Leaderboard', { user: user, userswithEntries: userswithEntries })
  }

  public async getDashboardView({ auth, inertia }) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!
    const dbUser = await User.find(user.id)
    const sow = moment().startOf('isoWeek').format()
    const eow = moment().endOf('isoWeek').format()

    const weeksEntries = await dbUser
      ?.related('entries')
      .query()
      .where('created_at', '>=', sow)
      .where('created_at', '<=', eow)
      .preload('votes', (query) => {
        query.preload('user')
      })

    const weeksEntriesJson = await Promise.all(
      // @ts-ignore
      weeksEntries &&
        weeksEntries.map(async (entry) => {
          let serialized = entry.serialize()
          if (entry.pose_file) {
            await entry.load('pose_file_model')
            serialized.pose_file_signed_url = await entry.pose_file_model?.presignedUrl()
          }
          if (entry.tracker_file) {
            await entry.load('tracker_file_model')
            serialized.tracker_file_signed_url = await entry.tracker_file_model?.presignedUrl()
          }
          return serialized
        })
    )

    return inertia.render('Home', { user: user, entries: weeksEntriesJson })
  }

  public async entryShareCard({ request, response }) {
    if (!request.params().id) {
      return response.redirect('/')
    }
    const entry = await Entry.find(request.params().id)
    const user = await entry?.related('user').query().first()
    moment.locale('es')
    const html = await View.render('share', {
      entryUser: user,
      date: `FitFight | ${
        moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1)
      } ${moment().format('DD')}`,
    })

    return html
  }
}
