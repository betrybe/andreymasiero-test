const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class UpdateRecipeImageService {
	async execute({ recipeId, imageFilename, user }) {
		const recipesRepository = new RecipesRepository();
		const recipe = await recipesRepository.findById(recipeId);

		if (!recipe) {
			throw new AppError('recipe not found', 404);
		}

		if (recipe.userId !== user.id && user.role !== 'admin') {
			throw new AppError('Can only update your own recipe.', 401);
		}

		const filename = `localhost:3000/images/${imageFilename}`;

		recipe.image = filename;
		await recipesRepository.update(recipe);

		return recipe;
	}
}

module.exports = UpdateRecipeImageService;
