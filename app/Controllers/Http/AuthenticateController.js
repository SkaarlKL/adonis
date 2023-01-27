'use strict'

const User = use('App/Models/User')

class AuthenticateController {
  async register({ request, response }) {
    try {
      const data = request.only(['email', 'password']);
      const user = await User.create({ ...data })
      .catch((error) => {
        if (error.message.includes('null value in column')) {
          return response.status(400).send({ data: false, message: [`${error.column} Can't be null`], status: 400 });
        } else if (error.message.includes('duplicate key')) {
          return response.status(409).send({ data: false, message: [`${error.detail}`], status: 409 });
        } else {
          return response.status(500).send({ data: false, message: ['Internal Server Error', error.message], status: 500 });
        }
      });
      console.log(user)
      return user;
    }
    catch (error) {
      console.error(error)
    }
  }
  async authenticate({ request, response, auth }) {
    try {
      const data = request.only(['email', 'password']);
      const token = await auth.attempt(data.email, data.password);
      return token;
    } catch (error) {
      if (error.message.includes('E_USER_NOT_FOUND')) {
        response.status(401).send({ data: false, message: `No account matching this information`, status: 401 });
      } else if (error.message.includes('E_PASSWORD_MISMATCH')) {
        response.status(401).send({ data: false, message: `No account matching this information`, status: 401 });
      } else {
        response.status(500).send({ data: false, message: 'Internal Server Error', status: 500 });
      }
      return console.error(error);
    }
  }
  async debugUser({ request, response, auth, params }) {
    const user = await User.findBy({ id: auth.user.id });
    const summoner = await riotAPI.getSUMMONER(auth.user.server, auth.user.summoner_name || auth.user.new_summoner)
    return { user, summoner }
  }
}

module.exports = AuthenticateController
