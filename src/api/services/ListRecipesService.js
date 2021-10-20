const RecipesRepository = require('../repositories/RecipesRepository');

class ListRecipesService {
  async static execute() {
    const recipes = await RecipesRepository.all();

    return recipes;
  }
}

module.exports = ListRecipesService;
