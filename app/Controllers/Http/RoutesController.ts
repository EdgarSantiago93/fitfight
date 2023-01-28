// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import moment from 'moment'
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

  public async getDashboardView({ auth, inertia }) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!
    const dbUser = await User.find(user.id)
    const sow = moment().startOf('isoWeek').format()
    const eow = moment().endOf('isoWeek').format()

    const weeksEntries = await dbUser
      ?.related('entries')
      .query()
      // .where('is_rest_day', false)
      .where('created_at', '>=', sow)
      .where('created_at', '<=', eow)

    const weeksEntriesJson = weeksEntries && weeksEntries.map((entry) => entry.serialize())

    return inertia.render('Home', { user: user, entries: weeksEntriesJson })
  }
}
