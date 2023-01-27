'use strict'
const RouteResource = require('@adonisjs/framework/src/Route/Resource');
const axios = require('axios')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.get('/api/v1/', () => {
    return {
        'POST api/v1/auth/authenticate': {
            'email': '',
            'password': ''
        },
        'POST api/v1/auth/register': {
            'email': '',
            'password': ''
        },
        'GET api/v1/users': {
            desc: 'RETORNA LISTA DE TODOS USERS'
        },
        'GET api/v1/users/:id': {
            desc: 'RETORNA INFO DE UM USER'
        },
        'DELETE api/v1/users/:id': {
            desc: 'REMOVE UM USER'
        },
        'POST api/v1/users': {
            desc: 'CRIA NOVO USER',
            payload: {
                "name": "Guiga Mono Nunu",
                "phone": "+65 913026189",
                "lane": "Jungle",
                "server": "BR",
                "user_id": 1
            }
        },
        'PATCH api/v1/users/:id': {
            desc: 'ATUALIZA DADOS DO USER',
            payload: {
                "name": "Guiga Mono Nunu",
                "phone": "+65 913026189",
                "lane": "Jungle",
                "server": "BR",
                "user_id": 1
            }
        },

    }
})

Route.group(() => {
    // Route for creating a new user
    Route.post('/authenticate', 'AuthenticateController.authenticate')
  
    // Route for reading all users
    Route.post('/register', 'AuthenticateController.register')
}).prefix('api/v1/auth')

Route.group(() => {
    // Route for creating a new user
    Route.post('/', 'UserController.store')
  
    // Route for reading all users
    Route.get('/', 'UserController.index')
  
    // Route for reading a specific user
    Route.get('/:id', 'UserController.show')
  
    // Route for updating a user
    Route.patch('/:id', 'UserController.update')
  
    // Route for deleting a user
    Route.delete('/:id', 'UserController.destroy')
  }).prefix('api/v1/users').middleware('auth')