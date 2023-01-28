import { BaseCommand } from '@adonisjs/core/build/standalone'

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
    // const { default: User } = await import('App/Models/User')

    // get dias (entries) que el usuario participo en este mes  -> lunes 2 check, miercoles 3 check , jueves 4 descanso -> check
    // buscar sesiones de otros usuarios que coincidan con los dias que el usuario participo
    // buscar si la sesion de los otros usuarios tiene un voto del usuario
  }
}
