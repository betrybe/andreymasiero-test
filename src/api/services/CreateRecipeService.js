const AppError = require('../errors/AppError');
const Recipe = require('../models/Recipe');
const RecipesRepository = require('../repositories/RecipesRepository');

class CreateRecipeService {
	async execute({ name, ingredients, preparation, user }) {
		if (!name || !ingredients || !preparation) {
			throw new AppError('Invalid entries. Try again.');
		}

		const recipesRepository = new RecipesRepository();

		const recipe = await recipesRepository.save(
			new Recipe(name, ingredients, preparation, user.id),
		);

		return recipe;
	}
}

module.exports = CreateRecipeService;
