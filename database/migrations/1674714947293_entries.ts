import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'entries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('user_id').nullable()
      table.uuid('pose_file').nullable()
      table.uuid('tracker_file').nullable()

      table.string('calories', 255).nullable()
      table.string('minutes', 255).nullable()

      table.boolean('is_validated').defaultTo(false)
      table.string('status', 255).defaultTo('pending')
      table.boolean('is_rest_day').defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('entries', (table) => {
      table.foreign('user_id', 'id').references('users.id')
      table.foreign('pose_file').references('media.id')
      table.foreign('tracker_file').references('media.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
