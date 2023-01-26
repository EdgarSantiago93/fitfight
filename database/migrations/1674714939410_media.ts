import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name', 255).nullable();
      table.string('type', 255).nullable();
      table.string('url', 255).nullable();
      table.string('status', 255).defaultTo('temp');
      table.string('description', 255).nullable();
      table.uuid('user_id').nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('media', (table) => {
      table.foreign('user_id').references('users.id')
    })
    // this.schema.alterTable('media', (table) => {
    //   table.setNullable('user_id')
    // })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
