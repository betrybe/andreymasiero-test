const AppError = require('../errors/AppError');
const User = require('../models/User');
const UsersRepository = require('../repositories/UsersRepository');
const UserValidation = require('../validations/UserValidation');

class CreateUserService {
  static execute({ name, email, password }) {
    async function run() {
      UserValidation.validate({ name, email, password });

      const checkUserExists = await UsersRepository.findOne(email);

      if (checkUserExists) {
        throw new AppError('Email already registered.');
      }

      const user = await UsersRepository.save(new User(name, email, password));

      return user;
    }
    return run();
  }
}

module.exports = CreateUserService;
