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

recipesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
	const { name, ingredients, preparation } = request.body;
	const { id } = request.params;
	const { user } = request;

	const updateRecipeService = new UpdateRecipeService();

	const recipe = await updateRecipeService.execute({
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

	const deleteRecipeService = new DeleteRecipeService();
	await deleteRecipeService.execute({ id, user });

	return response.status(204).json();
});

recipesRouter.patch(
	'/:id/image',
	ensureAuthenticated,
	upload.single('image'),
	async (request, response) => {
		try {
			const { user } = request;
			const updateRecipeImageService = new UpdateRecipeImageService();
			const recipe = await updateRecipeImageService.execute({
				recipeId: request.params.id,
				imageFilename: request.file.filename,
				user: user,
			});
			return response.json(recipe);
		} catch (err) {
			return response.status(400).json({ message: err.message });
		}
	},
);

module.exports = recipesRouter;
