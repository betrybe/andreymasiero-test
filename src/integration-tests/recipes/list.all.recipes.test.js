const { expect } = require('chai');
const FakeRecipeRepository = require('../fakes/repositories/FakeRecipeRepository');

describe('List all recipes endpoint', () => {
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

  it('should be able to list all recipes', async () => {
    const list = repository.findAll();
    expect(repository.recipes).to.be.an('array').to.have.lengthOf(2);
  });
});
