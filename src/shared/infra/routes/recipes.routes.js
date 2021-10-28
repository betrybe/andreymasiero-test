const { Router } = require('express');
const multer = require('multer');
const rescue = require('express-rescue');
const db = require('../mongo/db');
const JWTAuthService = require('../auth/JWTAuthService');
const RecipeRepo = require('../../../modules/recipes/infra/mongo/repositories/MongoRepository');
const RecipeController = require('../../../modules/recipes/controllers/RecipeController');

const upload = multer({ dest: '../../../uploads' });

class RecipeRouter {
  constructor() {
    this.routes = Router();
  }

  connectDB() {
    db().then((client) => {
      this.recipeRepository = new RecipeRepo(client);
      this.authService = new JWTAuthService();
      this.recipes = new RecipeController(this.recipeRepository, this.authService);
    });
  }

  createRecipesRoutes() {
    this.routes
      .route('/:id')
      .get(rescue(async (req, res) => this.recipes.getRecipe(req, res)))
      .put(rescue(async (req, res) => this.recipes.update(req, res)))
      .delete(rescue(async (req, res) => this.recipes.delete(req, res)));

    this.routes
      .route('/')
      .get(rescue(async (req, res) => this.recipes.list(req, res)))
      .post(rescue(async (req, res) => this.recipes.create(req, res)));
  }

  createRecipeImageRoutes() {
    this.routes.route('/:id/image').put(upload.single('image'),
      rescue(async (req, res) => this.recipes.uploadImage(req, res)));
  }
}

const recipeRouter = new RecipeRouter();
recipeRouter.connectDB();
recipeRouter.createRecipesRoutes();
recipeRouter.createRecipeImageRoutes();
module.exports = recipeRouter.routes;
