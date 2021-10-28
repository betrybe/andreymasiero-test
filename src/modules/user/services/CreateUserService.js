const User = require('../model/User');
const UserRepository = require('../repositories/UserRepository');
const ValidationHelper = require('../../../shared/helpers/ValidationHelper');

class CreateUserService {
  constructor(repository) {
    this.repository = new UserRepository();
    this.repository.strategy = repository;
  }

  async create(newId, { name, email, password, role }) {
    await this.validateAlreadyExistsEmail(email);
    const user = new User({ id: newId, name, email, password, role });
    await this.repository.save(user.toJson());
    return user;
  }

  async validateAlreadyExistsEmail(email) {
    const user = await this.repository.findByEmail(email);
    ValidationHelper.assertAlreadyExists(user, 'Email already registered');
  }
}

module.exports = CreateUserService;