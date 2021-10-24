const { expect } = require('chai');
const Recipe = require('../../modules/recipes/model/Recipe');

describe('Validate recipe model methods', () => {
  it('should be able to convert a recipe object to json format', () => {
    const recipe = new Recipe({
      id: 1,
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });

    const object = recipe.toJson();

    expect(object._id).to.equal(1);
    expect(object.name).to.equal('Feijão');
    expect(object.ingredients).to.equal('feijão, água, alho, louro, sal');
    expect(object.preparation).to.equal(
      'coloque tudo na panela de pressão por 30 minutos',
    );
    expect(object.userId).to.equal(1);
  });

  it('should be able to create a recipe from json format object', () => {
    const recipe = Recipe.fromJson({
      _id: 1,
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });

    expect(recipe.id).to.equal(1);
    expect(recipe.name).to.equal('Feijão');
    expect(recipe.ingredients).to.equal('feijão, água, alho, louro, sal');
    expect(recipe.preparation).to.equal(
      'coloque tudo na panela de pressão por 30 minutos',
    );
    expect(recipe.userId).to.equal(1);
  });
});
