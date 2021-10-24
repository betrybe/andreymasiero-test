const Recipe = require('../../../modules/recipes/model/Recipe');

class FakeRecipeRepository {
  constructor() {
    this.recipes = [];
    this.nextId = 1;
  }

  generateId() {
    return this.nextId++;
  }

  save(recipe) {
    const { _id, name, ingredients, preparation, userId } = recipe;
    this.recipes.push({ _id, name, ingredients, preparation, userId });
  }

  findById(id) {
    const [recipe] = this.recipes.filter((recipe) => recipe._id === id);
    return Recipe.fromJson({ ...recipe });
  }

  findAll() {
    return this.recipes;
  }

  delete(id) {
    this.recipes = this.recipes.filter((recipe) => recipe._id !== id);
  }
}

module.exports = FakeRecipeRepository;
