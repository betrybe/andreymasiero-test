const { sign } = require('jsonwebtoken');
const AppError = require('../errors/AppError');
const UsersRepository = require('../repositories/UsersRepository');
const { secret, expiresIn } = require('../config/auth').jwt;

class AuthenticateUserService {
  async static execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('All fields must be filled.', 401);
    }

    const user = await UsersRepository.findOne(email);

    if (!user || user.password !== password) {
      throw new AppError('Incorrect username or password.', 401);
    }

    const token = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      secret,
      {
        subject: user._id.toString(),
        expiresIn: expiresIn,
      },
    );

    return token;
  }
}

module.exports = AuthenticateUserService;
