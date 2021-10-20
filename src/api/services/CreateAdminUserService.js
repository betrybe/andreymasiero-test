const AppError = require('../errors/AppError');
const User = require('../models/User');
const UsersRepository = require('../repositories/UsersRepository');
const UserValidation = require('../validations/UserValidation');

class CreateAdminUserService {
  static execute({ name, email, password, user }) {
    async function run() {
      UserValidation.validate({ name, email, password });

      if (user.role !== 'admin') {
        throw new AppError('Only admins can register new admins.', 403);
      }

      const checkUserExists = await UsersRepository.findOne(email);

      if (checkUserExists) {
        throw new AppError('Email already registered.');
      }

      const admin = await UsersRepository.save(
        new User(name, email, password, 'admin'),
      );

      return admin;
    }
    return run();
  }
}

module.exports = CreateAdminUserService;
