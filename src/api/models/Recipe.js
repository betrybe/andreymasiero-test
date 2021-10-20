class Recipe {
  constructor(name, ingredients, preparation, userId, id = null) {
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
    this._id = id;
    this.image = '';
  }
}

module.exports = Recipe;
