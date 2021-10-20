const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class UpdateRecipeImageService {
  async static execute({ recipeId, imageFilename, user, host }) {
    const recipe = await RecipesRepository.findById(recipeId);

    if (!recipe) {
      throw new AppError('recipe not found', 404);
    }

    if (recipe.userId !== user.id && user.role !== 'admin') {
      throw new AppError('Can only update your own recipe.', 401);
    }

    const filename = `${host}/images/${imageFilename}`;

    recipe.image = filename;
    await RecipesRepository.update(recipe);

    return recipe;
  }
}

module.exports = UpdateRecipeImageService;
