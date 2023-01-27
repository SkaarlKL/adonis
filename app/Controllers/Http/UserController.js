'use strict'

const auth = require("@adonisjs/auth");

const User = use('App/Models/User');
const Entry = use('App/Models/Entry');

class UserController {
    async index() {
        try {
            return await Entry.all();
        } catch(error) {
            response.status(error.status || 500).send({})
        }
    }
    async show ({ params, request, response, auth }) {
        try {
            const entry = await Entry.query().where('id', params.id).firstOrFail()
            return entry;
        } catch(error) {
            response.status(error.status || 500).send(error.message)
        }
    }
    async store ({ request, response }) {
        try {
            const data = request.only(['user_id', 'name', 'server', 'lane', 'phone'])
            return await Entry.create(data)
        } catch(error) {
            response.status(error.status || 500).send(error.message)
        }
    }
    async update ({ params, request, response }) {
        try {
            const data = request.only(['user_id', 'name', 'server', 'lane', 'phone'])
            const entry = await Entry.findOrFail({
                id: params.id
            })
            entry.user_id = data.user_id;
            entry.name = data.name;
            entry.server = data.server;
            entry.lane = data.lane;
            entry.phone = data.phone;
            entry.save();
            return entry;
        } catch(error) {
            response.status(error.status || 500).send(error.message)
        }
    }
    async destroy ({ params, request, response }) {
        try {
            const entry = await Entry.query().where('id', params.id).firstOrFail()
            return await entry.delete()
        } catch(error) {
            response.status(error.status || 500).send(error.message)
        }
    }
}

module.exports = UserController
