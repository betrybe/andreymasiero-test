const CreateUserService = require('../services/CreateUserService');
const ForbiddenError = require('../../../shared/errors/ForbiddenError');

class UserController {
  constructor(repository, authService) {
    this.repository = repository;
    this.authService = authService;
    this.service = new CreateUserService(repository);
  }

  async create(request, response) {
    const { name, email, password } = request.body;
    const newId = this.repository.generateId();

    const createdUser = await this.service.create(newId, {
      name,
      email,
      password,
    });
    const user = createdUser.toJson();
    delete user.password;

    return response.status(201).json({ user });
  }

  async createAdmin(request, response) {
    const token = request.get('Authorization') || request.headers.authorization;
    this.onlyAdmin(token);

    const { name, email, password } = request.body;
    const newId = this.repository.generateId();

    const createdAdmin = await this.service.create(newId, {
      name,
      password,
      email,
      role: 'admin',
    });

    const user = createdAdmin.toJson();
    delete user.password;

    return response.status(201).json({ user });
  }

  onlyAdmin(token) {
    const { role } = this.authService.extract(token);
    if (role !== 'admin') {
      throw new ForbiddenError('Only admins can register new admins');
    }
  }
}

module.exports = UserController;
