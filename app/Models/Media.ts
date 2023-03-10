import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import GetPresignedURL from 'App/Controllers/Http/GetPresignedURL'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public url: string

  @column()
  public status: string

  @column()
  public description: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(media: Media) {
    media.id = uuidv4()
  }

  public async presignedUrl() {
    const getPresignedURLController = new GetPresignedURL()
    const url = await getPresignedURLController.controllerAction({
      fileKey: this.name,
      live: true,
      fileType: this.type,
    })
    return url
  }
}
