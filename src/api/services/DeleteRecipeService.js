const RecipesRepository = require('../repositories/RecipesRepository');
const AuthValidation = require('../validations/AuthValidation');

class DeleteRecipeService {
  static execute({ id, user }) {
    async function run() {
      const recipe = await RecipesRepository.findById(id);

      AuthValidation.authorize({ recipe, user });

      await RecipesRepository.delete(id);
    }
    run();
  }
}

module.exports = DeleteRecipeService;
