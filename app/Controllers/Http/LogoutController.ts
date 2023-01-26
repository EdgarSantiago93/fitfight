import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async handle({ auth, 
    response
   }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/login')
  }
}


