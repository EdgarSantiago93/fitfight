import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'votes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').nullable()
      table.uuid('entry_id').nullable()
      table.string('type').nullable() //for and against

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('votes', (table) => {
      table.foreign('user_id', 'id').references('users.id')
      table.foreign('entry_id').references('entries.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
