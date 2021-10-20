const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
  static execute(id) {
    async function run() {
      const recipe = await RecipesRepository.findById(id);

      if (!recipe) {
        throw new AppError('recipe not found', 404);
      }

      return recipe;
    }
    return run();
  }
}

module.exports = ListRecipesService;
