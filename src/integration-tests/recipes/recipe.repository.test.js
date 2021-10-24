const { expect } = require('chai');
const RecipeRepository = require('../../modules/recipes/repositories/RecipeRepository');
const FakeRecipeRepository = require('../fakes/repositories/FakeRecipeRepository');
const Recipe = require('../../modules/recipes/model/Recipe');

describe('Validate RecipeRepository methods', () => {
  let repository;

  beforeEach(() => {
    repository = new RecipeRepository();
    repository.strategy = new FakeRecipeRepository();
  });

  it('should be able to generate a new id', () => {
    const firstId = repository.generateId();
    expect(firstId).to.equal(1);

    const secId = repository.generateId();
    expect(secId).to.equal(2);
  });

  it('should be able to save a new recipe', () => {
    const recipe = new Recipe({
      id: 1,
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });

    repository.save(recipe.toJson());

    expect(repository.strategy.recipes).to.be.an('array').to.have.lengthOf(1);
  });

  it('should be able to retrieve a recipe by id', () => {
    const recipe = new Recipe({
      id: 1,
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });

    repository.save(recipe.toJson());

    const recipeRetrieved = repository.findById(1);

    expect(recipeRetrieved.id).to.equal(1);
    expect(recipeRetrieved.name).to.equal('Feijão');
    expect(recipeRetrieved.ingredients).to.equal(
      'feijão, água, alho, louro, sal',
    );
    expect(recipeRetrieved.preparation).to.equal(
      'coloque tudo na panela de pressão por 30 minutos',
    );
    expect(recipeRetrieved.userId).to.equal(1);
  });
});
