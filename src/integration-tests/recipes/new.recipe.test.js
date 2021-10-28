const { expect } = require('chai');
const FakeRecipeRepository = require('../fakes/repositories/FakeRecipeRepository');
const CreateRecipeService = require('../../modules/recipes/services/CreateRecipeService');
const AppError = require('../../shared/errors/AppError');

describe('Create new recipe endpoint', () => {
  let repository;
  let service;

  beforeEach(async () => {
    repository = new FakeRecipeRepository();
    service = new CreateRecipeService(repository);
  });

  it('should not be able to create recipe without name', async () => {
    try {
      const newId = repository.generateId();

      await service.create(newId, {
        ingredients: 'feijão, água, alho, louro, sal',
        preparation: 'coloque tudo na panela de pressão por 30 minutos',
      });
    } catch (err) {
      expect(repository.recipes).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should not be able to create recipe without ingredients', async () => {
    try {
      const newId = repository.generateId();

      await service.create(newId, {
        name: 'Feijão',
        preparation: 'coloque tudo na panela de pressão por 30 minutos',
      });
    } catch (err) {
      expect(repository.recipes).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should not be able to create recipe without preparation', async () => {
    try {
      const newId = repository.generateId();

      await service.create(newId, {
        name: 'Feijão',
        ingredients: 'feijão, água, alho, louro, sal',
      });
    } catch (err) {
      expect(repository.recipes).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should be able to create new recipe', async () => {
    const newId = repository.generateId();

    const recipe = await service.create(newId, {
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId: 1,
    });
    expect(repository.recipes).to.be.an('array').to.have.lengthOf(1);

    expect(recipe.id).to.equal(newId);
    expect(recipe.name).to.equal('Feijão');
    expect(recipe.ingredients).to.equal('feijão, água, alho, louro, sal');
    expect(recipe.preparation).to.equal(
      'coloque tudo na panela de pressão por 30 minutos',
    );
    expect(recipe.userId).to.equal(1);
  });
});
