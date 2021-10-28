const { expect } = require('chai');
const frisby = require('frisby');
const connection = require('../../shared/infra/mongo/db');
const RecipeRoutes = require('../../shared/infra/routes/recipes.routes');

describe('Recipe route test', () => {
  let db;

  before(async () => {
    db = await connection();
    await db.collection('users').deleteMany({});
    db.collection('users').insertOne({
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });
  });

  after(async () => {
    await db.collection('recipes').deleteMany({});
    await db.collection('users').deleteMany({});
  });

  it('should be able to create a new recipe', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          })
          .post(`http://localhost:3000/recipes`, {
            name: 'Feijão',
            ingredients: 'feijão, água, alho, louro, sal',
            preparation: 'coloque tudo na panela de pressão por 30 minutos',
          })
          .expect('status', 201);
      });
  });

  it('should have a connection', async () => {
    expect(db).is.not.null;
  });

  it('should be able to use a route to list recipes', async () => {
    await frisby.get('http://localhost:3000/recipes').expect('status', 200);
  });

  it('should be able to get a recipe by id', async () => {
    await frisby
      .get('http://localhost:3000/recipes')
      .expect('status', 200)
      .then((response) => {
        const [recipe] = JSON.parse(response.body);
        return frisby
          .get(`http://localhost:3000/recipes/${recipe._id}`)
          .expect('status', 200)
          .then((response) => {
            const recipe = JSON.parse(response.body);
            expect(recipe).is.not.null;
            expect(recipe.name).to.equal('Feijão');
            expect(recipe.ingredients).to.equal(
              'feijão, água, alho, louro, sal',
            );
            expect(recipe.preparation).to.equal(
              'coloque tudo na panela de pressão por 30 minutos',
            );
          });
      });
  });

  it('should be able to delete a recipe', async () => {
    let id;
    await frisby
      .get('http://localhost:3000/recipes')
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const [recipe] = JSON.parse(body);
        id = recipe._id;
        return frisby
          .post('http://localhost:3000/login/', {
            email: 'luke@iamyourfather.com',
            password: 'vader2021',
          })
          .expect('status', 200)
          .then((response) => {
            const { body } = response;
            const { token } = JSON.parse(body);
            return frisby
              .setup({
                request: {
                  headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                  },
                },
              })
              .delete(`http://localhost:3000/recipes/${id}`)
              .expect('status', 204);
          });
      });
  });

  it('should have a instance of recipe routes', async () => {
    expect(RecipeRoutes).is.not.null;
  });
});
