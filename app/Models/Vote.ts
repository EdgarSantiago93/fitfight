import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Entry from './Entry'
import User from './User'

export default class Vote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public entry_id: string

  @column()
  public type: string

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(vote: Vote) {
    vote.id = uuidv4()
  }

  @belongsTo(() => Entry)
  public entry: BelongsTo<typeof Entry>

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'user_id',
  })
  public user: HasOne<typeof User>
}
