const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
  static execute() {
    async function run() {
      const recipes = await RecipesRepository.all();

      return recipes;
    }
    return run();
  }
}

module.exports = ListRecipesService;
