import { DateTime } from 'luxon'
import { BaseModel, column ,beforeSave,beforeCreate} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid';


export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string
  
  @column()
  public email: string
  
  @column()
  public name: string

  @column()
  public avatar: string


  @column({serializeAs: null})
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
