const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class UpdateRecipeService {
  async static execute({ id, name, ingredients, preparation, user }) {
    const recipe = await RecipesRepository.findById(id);

    if (recipe.userId !== user.id && user.role !== 'admin') {
      throw new AppError('Can only update your own recipe.', 401);
    }

    recipe.name = name || recipe.name;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.preparation = preparation || recipe.preparation;

    const recipeUpdated = await RecipesRepository.update(recipe);

    return recipeUpdated;
  }
}

module.exports = UpdateRecipeService;
