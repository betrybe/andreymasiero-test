const AppError = require('../errors/AppError');
const RecipesRepository = require('../repositories/RecipesRepository');

class DeleteRecipeService {
	async execute({ id, user }) {
		const recipesRepository = new RecipesRepository();

		const recipe = await recipesRepository.findById(id);

		if (recipe.userId !== user.id && user.role !== 'admin') {
			throw new AppError('Can only delete your own recipe.');
		}

		await recipesRepository.delete(id);
	}
}

module.exports = DeleteRecipeService;
