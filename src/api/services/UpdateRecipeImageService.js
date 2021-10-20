const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');
const AuthValidation = require('../validations/AuthValidation');

class UpdateRecipeImageService {
  static execute({ recipeId, imageFilename, user, host }) {
    async function run() {
      const recipe = await RecipesRepository.findById(recipeId);

      if (!recipe) {
        throw new AppError('recipe not found', 404);
      }

      AuthValidation.authorize({ recipe, user });

      const filename = `${host}/images/${imageFilename}`;

      recipe.image = filename;
      await RecipesRepository.update(recipe);

      return recipe;
    }
    return run();
  }
}

module.exports = UpdateRecipeImageService;
