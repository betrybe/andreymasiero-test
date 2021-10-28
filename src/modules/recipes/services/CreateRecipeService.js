const Recipe = require('../model/Recipe');
const RecipeRepository = require('../repositories/RecipeRepository');

class CreateRecipeService {
  constructor(repository) {
    this.repository = new RecipeRepository();
    this.repository.strategy = repository;
  }

  async create(newId, { name, ingredients, preparation, userId }) {
    const recipe = new Recipe({
      id: newId,
      name,
      ingredients,
      preparation,
      userId,
    });

    await this.repository.save(recipe.toJson());

    return recipe;
  }
}

module.exports = CreateRecipeService;
