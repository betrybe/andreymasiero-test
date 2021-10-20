class Recipe {
  constructor(name, ingredients, preparation, userId) {
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
    this._id = null;
    this.image = '';
  }
}

module.exports = Recipe;
