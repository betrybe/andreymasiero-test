const AppError = require('../errors/AppError');

class AuthValidation {
  static validate({ email, password, user }) {
    if (!email || !password) {
      throw new AppError('All fields must be filled.', 401);
    }

    if (!user || user.password !== password) {
      throw new AppError('Incorrect username or password.', 401);
    }
  }

  static authorize({ recipe, user }) {
    if (recipe.userId !== user.id && user.role !== 'admin') {
      throw new AppError('Can only modify your own recipe.', 401);
    }
  }
}

module.exports = AuthValidation;
