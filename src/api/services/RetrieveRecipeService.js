const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
  async static execute(id) {
    const recipe = await RecipesRepository.findById(id);

    if (!recipe) {
      throw new AppError('recipe not found', 404);
    }

    return recipe;
  }
}

module.exports = ListRecipesService;
