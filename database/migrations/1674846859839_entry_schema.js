'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntrySchema extends Schema {
  up () {
    this.create('entries', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 45).notNullable()
      table.string('server', 7).notNullable()
      table.string('lane', 10).notNullable()
      table.string('phone', 30).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
