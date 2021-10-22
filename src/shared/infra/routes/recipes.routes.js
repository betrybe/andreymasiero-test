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
      this.recipes = new RecipeController(
        this.recipeRepository,
        this.authService,
      );
    });
  }

  createRecipesRoutes() {
    this.routes
      .route('/:id')
      .get(rescue(async (request, response) => this.recipes.getRecipe(request, response)))
      .put(rescue(async (request, response) => this.recipes.update(request, response)))
      .delete(rescue(async (request, response) => this.recipes.delete(request, response)));

    this.routes
      .route('/')
      .get(rescue(async (request, response) => this.recipes.list(request, response)))
      .post(rescue(async (request, response) => this.recipes.create(request, response)));
  }

  createRecipeImageRoutes() {
    this.routes.route('/:id/image').put(
      upload.single('image'),
      rescue(async (request, response) => this.recipes.uploadImage(request, response)),
    );
  }
}

const recipeRouter = new RecipeRouter();
recipeRouter.connectDB();
recipeRouter.createRecipesRoutes();
recipeRouter.createRecipeImageRoutes();

module.exports = recipeRouter.routes;
