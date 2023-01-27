'use strict'

const auth = require("@adonisjs/auth");

const User = use('App/Models/User');
const Entry = use('App/Models/Entry');

class UserController {
    async index() {
        return Entry.all();
    }
    async show ({ params, request, response, auth }) {
        return await Entry.findBy({
            id: params.id
        })
    }
    async store ({ request, response }) {
        const data = request.only(['user_id', 'name', 'server', 'lane', 'phone'])
        return await Entry.create(data)
    }
    async update ({ params, request, response }) {
        const data = request.only(['user_id', 'name', 'server', 'lane', 'phone'])
        const entry = await Entry.findBy({
            id: params.id
        })
        entry.user_id = data.user_id;
        entry.name = data.name;
        entry.server = data.server;
        entry.lane = data.lane;
        entry.phone = data.phone;
        entry.save();
        return entry;
    }
    async destroy ({ params, request, response }) {
        const entry = await Entry.findBy({
            id: params.id
        })
        return await entry.delete()
    }
}

module.exports = UserController
