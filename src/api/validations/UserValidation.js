const AppError = require('../errors/AppError');

class UserValidation {
  static validate({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError('Invalid entries. Try again.');
    }

    if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]*/) == null) {
      throw new AppError('Invalid entries. Try again.');
    }
  }
}

module.exports = UserValidation;
