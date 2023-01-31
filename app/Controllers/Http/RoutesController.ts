import Entry from 'App/Models/Entry'
import User from 'App/Models/User'
import View from '@ioc:Adonis/Core/View'
import moment from 'moment'
import RoutesControllerActions from 'App/Controllers/Http/RoutesControllerActions'

export default class RoutesController {
  private routesControllerActions: RoutesControllerActions

  constructor() {
    this.routesControllerActions = new RoutesControllerActions()
  }

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
    const userCanVote = await this.routesControllerActions.getUserTodaysEntries({ user })

    if (userCanVote.length == 0) {
      return inertia.render('NoParticipation', { user: user })
    }

    const earliestEntry = await this.routesControllerActions.getTodaysEarliestEntry()
    let earliestJson = {}

    if (earliestEntry) {
      earliestJson = await new Promise(async (resolve, _reject) => {
        let serializedEarliest = earliestEntry?.serialize()

        earliestEntry.pose_file &&
          (serializedEarliest.pose_file_signed_url =
            await earliestEntry.pose_file_model.presignedUrl())

        earliestEntry.tracker_file &&
          (serializedEarliest.tracker_file_signed_url =
            await earliestEntry.tracker_file_model.presignedUrl())
        resolve(serializedEarliest)
      })
    }

    const entriesToVoteOn = await this.routesControllerActions.getUsersEntriesToVoteOn({ user })

    return inertia.render('Vote', {
      user: user,
      entriesToVoteOn: entriesToVoteOn,
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
        const entries = await this.routesControllerActions.getValidatedEntries({ user })
        serialized.entries = entries
        serialized.hasEntries = true
        entries.length == 0 && (serialized.hasEntries = false)

        return serialized
      })
    )

    return inertia.render('Leaderboard', { user: user, userswithEntries: userswithEntries })
  }

  public async getDashboardView({ auth, inertia }) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!
    // const dbUser = await User.find(user.id)

    const weeksEntries = await this.routesControllerActions.getUserThisWeeksEntries({ user })
    const entriesToVoteOn = await this.routesControllerActions.getUsersEntriesToVoteOn({ user })
    const earliestEntry = await this.routesControllerActions.getTodaysEarliestEntry()
    let earliestJson = {}
    if (earliestEntry) {
      earliestJson = await new Promise(async (resolve, _reject) => {
        let serializedEarliest = earliestEntry?.serialize()

        earliestEntry.pose_file &&
          (serializedEarliest.pose_file_signed_url =
            await earliestEntry.pose_file_model?.presignedUrl())

        earliestEntry.tracker_file &&
          (serializedEarliest.tracker_file_signed_url =
            await earliestEntry.tracker_file_model?.presignedUrl())
        resolve(serializedEarliest)
      })
    }

    const weeksEntriesJson = await Promise.all(
      weeksEntries &&
        weeksEntries.map(async (entry) => {
          let serialized = entry.serialize()
          entry?.pose_file && (await entry.load('pose_file_model'))
          entry?.tracker_file && (await entry.load('tracker_file_model'))
          entry.pose_file &&
            (serialized.pose_file_signed_url = await entry.pose_file_model.presignedUrl())
          entry.tracker_file &&
            (serialized.tracker_file_signed_url = await entry.tracker_file_model.presignedUrl())
          return serialized
        })
    )

    return inertia.render('Home', {
      user: user,
      entries: weeksEntriesJson,
      entriesToVoteOn: entriesToVoteOn,
      earliestEntry: earliestJson,
    })
  }

  // View to share entry on telegram
  public async entryShareCard({ request, response }) {
    if (!request.params().id) {
      return response.redirect('/')
    }
    const entry = await Entry.query().where('id', request.params().id).preload('user').first()
    if (!entry) {
      return response.redirect('/')
    }
    moment.locale('es')
    const html = await View.render('share', {
      entryUser: entry?.$preloaded.user,
      date: `FitFight | ${
        moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1)
      } ${moment().format('DD')}`,
    })

    return html
  }
}
