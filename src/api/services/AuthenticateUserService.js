const { sign } = require('jsonwebtoken');
const UsersRepository = require('../repositories/UsersRepository');
const AuthValidation = require('../validations/AuthValidation');
const { secret, expiresIn } = require('../config/auth').jwt;

class AuthenticateUserService {
  static execute({ email, password }) {
    async function run() {
      const user = email && (await UsersRepository.findOne(email));
      AuthValidation.validate({ email, password, user });

      const token = sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        secret,
        {
          subject: user.id.toString(),
          expiresIn,
        },
      );

      return token;
    }
    return run();
  }
}

module.exports = AuthenticateUserService;
