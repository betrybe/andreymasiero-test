const { Router } = require('express');
const rescue = require('express-rescue');
const db = require('../mongo/db');
const UserRepository = require('../../../modules/user/infra/mongo/repositories/MongoRepository');
const JWTAuthService = require('../auth/JWTAuthService');
const UserController = require('../../../modules/user/controllers/UserController');

class UserRouter {
  constructor() {
    this.routes = Router();
  }

  connectDB() {
    db().then((client) => {
      this.userRepository = new UserRepository(client);
      this.authService = new JWTAuthService();
      this.users = new UserController(this.userRepository, this.authService);
    });
  }

  create() {
    this.routes.route('/').post(rescue(async (req, res) => this.users.create(req, res)));
    this.routes.route('/admin').post(rescue(async (req, res) => this.users.createAdmin(req, res)));
  }
}

const userRoutes = new UserRouter();
userRoutes.connectDB();
userRoutes.create();
module.exports = userRoutes.routes;