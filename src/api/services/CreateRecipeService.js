const AppError = require('../errors/AppError');
const Recipe = require('../models/Recipe');
const RecipesRepository = require('../repositories/RecipesRepository');

class CreateRecipeService {
  async static execute({ name, ingredients, preparation, user }) {
    if (!name || !ingredients || !preparation) {
      throw new AppError('Invalid entries. Try again.');
    }

    const recipe = await RecipesRepository.save(
      new Recipe(name, ingredients, preparation, user.id),
    );

    return recipe;
  }
}

module.exports = CreateRecipeService;
