const AppError = require('../errors/AppError');
const User = require('../models/User');
const UsersRepository = require('../repositories/UsersRepository');

class CreateAdminUserService {
  async static execute({ name, email, password, user }) {
    if (!name || !email || !password) {
      throw new AppError('Invalid entries. Try again.');
    }

    if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]*/) == null) {
      throw new AppError('Invalid entries. Try again.');
    }

    if (user.role !== 'admin') {
      throw new AppError('Only admins can register new admins.', 403);
    }

    const checkUserExists = await UsersRepository.findOne(email);

    if (checkUserExists) {
      throw new AppError('Email already registered.');
    }

    const admin = await UsersRepository.save(
      new User(name, email, password, null, 'admin'),
    );

    return admin;
  }
}

module.exports = CreateAdminUserService;
