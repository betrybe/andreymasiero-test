const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
	async execute() {
		const recipesRepository = new RecipesRepository();

		const recipes = await recipesRepository.all();

		return recipes;
	}
}

module.exports = ListRecipesService;
