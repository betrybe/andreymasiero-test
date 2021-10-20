const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
	async execute(id) {
		const recipesRepository = new RecipesRepository();

		const recipe = await recipesRepository.findById(id);

		if (!recipe) {
			throw new AppError('recipe not found', 404);
		}

		return recipe;
	}
}

module.exports = ListRecipesService;
