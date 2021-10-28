const AuthenticateService = require('../services/AuthenticateService');

class LoginController {
  constructor(repository, authService) {
    this.repository = repository;
    this.service = new AuthenticateService(repository, authService);
  }

  async authenticate(request, response) {
    const { email, password } = request.body;

    const token = await this.service.execute({ email, password });
    return response.status(200).json({ token });
  }
}

module.exports = LoginController;
