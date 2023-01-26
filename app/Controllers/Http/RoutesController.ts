// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

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
    return inertia.render('Home', { user: user })
  }
}
