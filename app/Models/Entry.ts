import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Entry extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return { day: value?.day, month: value?.month, year: value?.year }
    },
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ serializeAs: null })
  public user_id: string

  @column()
  public pose_file: string

  @column()
  public tracker_file: string

  @column()
  public calories: string

  @column()
  public minutes: string

  @column()
  public is_validated: boolean

  @column()
  public is_rest_day: boolean

  @column()
  public status: string

  @beforeCreate()
  public static assignUuid(entry: Entry) {
    entry.id = uuidv4()
  }
}
