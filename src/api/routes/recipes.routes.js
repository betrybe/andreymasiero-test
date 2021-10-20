const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../config/upload');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const CreateRecipeService = require('../services/CreateRecipeService');
const DeleteRecipeService = require('../services/DeleteRecipeService');
const ListRecipesService = require('../services/ListRecipesService');
const RetrieveRecipeService = require('../services/RetrieveRecipeService');
const UpdateRecipeImageService = require('../services/UpdateRecipeImageService');
const UpdateRecipeService = require('../services/UpdateRecipeService');

const recipesRouter = Router();
const upload = multer(uploadConfig);

recipesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { user } = request;

  const recipeCreated = await CreateRecipeService.execute({
    name,
    ingredients,
    preparation,
    user,
  });

  return response.status(201).json({ recipe: recipeCreated });
});

recipesRouter.get('/', async (request, response) => {
  const recipes = await ListRecipesService.execute();
  return response.json(recipes);
});

recipesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const recipe = await RetrieveRecipeService.execute(id);
  return response.json(recipe);
});

recipesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { id } = request.params;
  const { user } = request;

  const recipe = await UpdateRecipeService.execute({
    id,
    name,
    ingredients,
    preparation,
    user,
  });

  return response.json(recipe);
});

recipesRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { user } = request;

  await DeleteRecipeService.execute({ id, user });

  return response.status(204).json();
});

recipesRouter.patch(
  '/:id/image',
  ensureAuthenticated,
  upload.single('image'),
  async (request, response) => {
    try {
      const { user } = request;
      const { host } = request.headers;
      const recipe = await UpdateRecipeImageService.execute({
        recipeId: request.params.id,
        imageFilename: request.file.filename,
        user,
        host,
      });
      return response.json(recipe);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  },
);

module.exports = recipesRouter;
