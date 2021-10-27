const { Router } = require('express');
const rescue = require('express-rescue');
const db = require('../mongo/db');
const UserRepository = require('../../../modules/user/infra/mongo/repositories/MongoRepository');
const JWTAuthService = require('../auth/JWTAuthService');
const LoginController = require('../../../modules/user/controllers/LoginController');

class AuthRouter {
  constructor() {
    this.routes = Router();
  }

  connectDB() {
    db().then((client) => {
      this.userRepository = new UserRepository(client);
      this.authService = new JWTAuthService();
      this.auth = new LoginController(this.userRepository, this.authService);
    });
  }

  create() {
    this.routes.route('/').post(rescue(async (req, res) => this.auth.authenticate(req, res)));
  }
}

const authRoutes = new AuthRouter();
authRoutes.connectDB();
authRoutes.create();
module.exports = authRoutes.routes;