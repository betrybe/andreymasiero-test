const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class DeleteRecipeService {
  async static execute({ id, user }) {
    const recipe = await RecipesRepository.findById(id);

    if (recipe.userId !== user.id && user.role !== 'admin') {
      throw new AppError('Can only delete your own recipe.', 401);
    }

    await RecipesRepository.delete(id);
  }
}

module.exports = DeleteRecipeService;
