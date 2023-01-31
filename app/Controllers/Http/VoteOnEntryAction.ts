import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Vote from 'App/Models/Vote'

export default class VoteOnEntryAction {
  public async handle({ auth, request, response }: HttpContextContract) {
    await auth.use('web').authenticate()
    const user = auth.use('web').user!

    await Vote.updateOrCreate(
      {
        user_id: user.id,
        entry_id: request.input('entry_id'),
      },
      {
        type: request.input('type'),
      }
    )

    return response.json({ success: true })
  }
}
