const { expect } = require('chai');
const FakeRecipeRepository = require('../fakes/repositories/FakeRecipeRepository');

describe('Get a recipe by id endpoint', () => {
  let repository;

  before(async () => {
    repository = new FakeRecipeRepository();

    repository.save({
      _id: 1,
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });

    repository.save({
      _id: 2,
      name: 'Arroz',
      ingredients: 'arroz, água, alho, cebola, sal',
      preparation: 'pica tudo coloca na panela, deixe secar a água',
      userId: 1,
    });
  });

  it('should be able to get a recipe', async () => {
    const recipe = repository.findById(1);

    expect(recipe.id).to.eql(1);
    expect(recipe.name).to.eql('Feijão');
    expect(recipe.ingredients).to.eql('feijão, água, alho, louro, sal');
    expect(recipe.preparation).to.eql(
      'coloque tudo na panela de pressão por 30 minutos',
    );
    expect(recipe.userId).to.eql(1);
  });
});
