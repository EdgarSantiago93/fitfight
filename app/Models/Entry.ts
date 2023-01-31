import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  HasOne,
  hasOne,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Media from './Media'
import Vote from './Vote'
import User from './User'

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

  // @column({ serializeAs: null })

  @column()
  public calories: string

  @column()
  public type: string

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

  @column({
    serializeAs: null,
  })
  public tracker_file: string

  @column({
    serializeAs: null,
  })
  public pose_file: string

  @hasOne(() => Media, {
    foreignKey: 'id',
    localKey: 'tracker_file',
  })
  public tracker_file_model: HasOne<typeof Media>

  @hasOne(() => Media, {
    foreignKey: 'id',
    localKey: 'pose_file',
  })
  public pose_file_model: HasOne<typeof Media>

  @hasMany(() => Vote, {
    foreignKey: 'entry_id',
  })
  public votes: HasMany<typeof Vote>

  @column({ serializeAs: null })
  public user_id: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>
}
