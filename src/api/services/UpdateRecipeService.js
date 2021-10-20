const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class UpdateRecipeService {
	async execute({ id, name, ingredients, preparation, user }) {
		const recipesRepository = new RecipesRepository();

		const recipe = await recipesRepository.findById(id);

		if (recipe.userId !== user.id && user.role !== 'admin') {
			throw new AppError('Can only update your own recipe.', 401);
		}

		recipe.name = name ? name : recipe.name;
		recipe.ingredients = ingredients ? ingredients : recipe.ingredients;
		recipe.preparation = preparation ? preparation : recipe.preparation;

		const recipeUpdated = await recipesRepository.update(recipe);

		return recipeUpdated;
	}
}

module.exports = UpdateRecipeService;
