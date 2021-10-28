const UserRepository = require('../repositories/UserRepository');
const ValidationHelper = require('../../../shared/helpers/ValidationHelper');
const AuthError = require('../../../shared/errors/AuthError');

const ERROR_MESSAGES = {
  NOT_USER: 'Incorrect username or password',
  REQUIRED_FIELD: 'All fields must be filled',
};

class AuthenticateService {
  constructor(userRepository, authService) {
    this.repository = new UserRepository();
    this.repository.strategy = userRepository;
    this.authService = authService;
  }

  async execute({ email, password }) {
    try {
      ValidationHelper.assertNotNull(email, ERROR_MESSAGES.REQUIRED_FIELD);
      ValidationHelper.assertNotNull(password, ERROR_MESSAGES.REQUIRED_FIELD);
      const user = await this.repository.findByEmail(email);
      ValidationHelper.assertTrue(user, ERROR_MESSAGES.NOT_USER);
      ValidationHelper.assertEquals(user.password, password, ERROR_MESSAGES.NOT_USER);
      return this.authService.generate({ id: user.id, email, role: user.role });
    } catch (err) {
      throw new AuthError(err.message);
    }
  }
}

module.exports = AuthenticateService;
