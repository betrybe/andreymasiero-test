const AppError = require('../errors/AppError');
const Recipe = require('../models/Recipe');
const RecipesRepository = require('../repositories/RecipesRepository');

class CreateRecipeService {
  static execute({ name, ingredients, preparation, user }) {
    async function run() {
      if (!name || !ingredients || !preparation) {
        throw new AppError('Invalid entries. Try again.');
      }

      const recipe = await RecipesRepository.save(
        new Recipe(name, ingredients, preparation, user.id),
      );

      return recipe;
    }
    return run();
  }
}

module.exports = CreateRecipeService;
