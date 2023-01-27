'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

//TODO CHECK IF ICON IS NOT THE GENERATED ONE!
const randomIcon = Math.floor(Math.random() * 29)
class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('email', 90).notNullable()
      table.string('password', 128).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
