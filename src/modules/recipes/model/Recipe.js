const ValidationHelper = require('../../../shared/helpers/ValidationHelper');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

class Recipe {
  constructor({ id, name, ingredients, preparation, userId }) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
  }

  set id(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objId = value;
  }

  get id() {
    return this.objId;
  }

  set name(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objName = value;
  }

  get name() {
    return this.objName;
  }

  set ingredients(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objIngredients = value;
  }

  get ingredients() {
    return this.objIngredients;
  }

  set preparation(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objPreparation = value;
  }

  get preparation() {
    return this.objPreparation;
  }

  set userId(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objUserId = value;
  }

  get userId() {
    return this.objUserId;
  }

  set image(value) {
    this.objImage = value;
  }

  get image() {
    return this.objImage;
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      ingredients: this.ingredients,
      preparation: this.preparation,
      userId: this.userId,
      image: this.image,
    };
  }

  static fromJson({ _id, name, ingredients, preparation, userId, image }) {
    const recipe = new Recipe({
      id: _id,
      name,
      ingredients,
      preparation,
      userId,
    });
    recipe.image = image;

    return recipe;
  }
}

module.exports = Recipe;
