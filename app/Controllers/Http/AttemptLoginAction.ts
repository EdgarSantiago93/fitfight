// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AttemptLoginAction {
  public async handle({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      // return response.badRequest('Invalid credentials')
      return response.unprocessableEntity('Password incorrecto')
    }

    console.log('Passed verification')
    await auth.use('web').attempt(email, password)
    return response.json({
      success: true,
    })
  }
}
