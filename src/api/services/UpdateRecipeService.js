const RecipesRepository = require('../repositories/RecipesRepository');
const AuthValidation = require('../validations/AuthValidation');

class UpdateRecipeService {
  static execute({ id, name, ingredients, preparation, user }) {
    async function run() {
      const recipe = await RecipesRepository.findById(id);

      AuthValidation.authorize({ recipe, user });

      recipe.name = name || recipe.name;
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.preparation = preparation || recipe.preparation;

      const recipeUpdated = await RecipesRepository.update(recipe);

      return recipeUpdated;
    }
    return run();
  }
}

module.exports = UpdateRecipeService;
