const { expect, should } = require('chai');
const connection = require('../../shared/infra/mongo/db');
const RecipeRepository = require('../../modules/recipes/infra/mongo/repositories/MongoRepository');
const { ObjectID } = require('mongodb');

describe('Mongo recipe repository test', () => {
  let db;
  let recipeRepository;
  let userId;
  before(async () => {
    db = await connection();
    recipeRepository = new RecipeRepository(db);
    userId = new ObjectID();
  });

  afterEach(async () => {
    await db.collection('recipes').deleteMany({});
  });

  it('should be able to save recipe', async () => {
    const recipe = await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId,
    });

    expect(recipe).is.not.null;
    expect(recipe._id).to.exist;
    expect(recipe.name).to.exist;
    expect(recipe.ingredients).to.exist;
    expect(recipe.preparation).to.exist;
    expect(recipe.userId).to.exist;
  });

  it('should be able to retrieve a recipe by id', async () => {
    const recipe = await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId,
    });

    const retrievedRecipe = await recipeRepository.findById(recipe._id);
    expect(retrievedRecipe).is.not.null;
    expect(retrievedRecipe.name).to.equal('Feijão');
    expect(retrievedRecipe.ingredients).to.equal(
      'feijão, água, alho, louro, sal',
    );
    expect(retrievedRecipe.preparation).to.equal(
      'coloque tudo na panela de pressão por 30 minutos',
    );
  });

  it('should be able to retrieve a list of recipes', async () => {
    await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId,
    });

    await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Arroz',
      ingredients: 'arroz, água, alho, cebola, sal',
      preparation: 'pica tudo coloca na panela, deixe secar a água',
      userId,
    });

    const recipes = await recipeRepository.findAll();
    expect(recipes).to.be.an('array').to.have.lengthOf(2);
  });

  it('should be able to delete a recipe', async () => {
    const recipe = await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Feijão',
      ingredients: 'feijão, água, alho, louro, sal',
      preparation: 'coloque tudo na panela de pressão por 30 minutos',
      userId,
    });

    await recipeRepository.save({
      _id: new ObjectID(),
      name: 'Arroz',
      ingredients: 'arroz, água, alho, cebola, sal',
      preparation: 'pica tudo coloca na panela, deixe secar a água',
      userId,
    });

    await recipeRepository.delete(recipe._id);
    const recipes = await recipeRepository.findAll();
    expect(recipes).to.be.an('array').to.have.lengthOf(1);
  });

  it('should be able to generate an ID', async () => {
    const id = recipeRepository.generateId();
    expect(id).to.be.instanceOf(ObjectID);
  });

  it('should be able to validate an ID before retrieve a recipe', async () => {
    try {
      await recipeRepository.findById('123121');
    } catch (err) {
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('recipe not found');
    }
  });

  it('shoud be able to validate if a recipe exists', async () => {
    try {
      const id = new ObjectID();
      await recipeRepository.findById(id);
    } catch (err) {
      expect(err.statusCode).to.equal(404);
      expect(err.message).to.equal('recipe not found');
    }
  });
});
