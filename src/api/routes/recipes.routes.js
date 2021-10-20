const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const CreateRecipeService = require('../services/CreateRecipeService');
const ListRecipesService = require('../services/ListRecipesService');
const RetrieveRecipeService = require('../services/RetrieveRecipeService');

const recipesRouter = Router();

recipesRouter.post('/', ensureAuthenticated, async (request, response) => {
	const { name, ingredients, preparation } = request.body;
	const { user } = request;
	const createRecipeService = new CreateRecipeService();

	const recipe = await createRecipeService.execute({
		name,
		ingredients,
		preparation,
		user,
	});

	return response.status(201).json({ recipe: recipe });
});

recipesRouter.get('/', async (request, response) => {
	const listRecipesService = new ListRecipesService();
	const recipes = await listRecipesService.execute();
	return response.json(recipes);
});

recipesRouter.get('/:id', async (request, response) => {
	const { id } = request.params;
	const retrieveRecipeService = new RetrieveRecipeService();
	const recipe = await retrieveRecipeService.execute(id);
	return response.json(recipe);
});

module.exports = recipesRouter;
