const { expect } = require('chai');
const frisby = require('frisby');
const connection = require('../../shared/infra/mongo/db');
const JWTAuthService = require('../../shared/infra/auth/JWTAuthService');

describe('Auth test', () => {
  let db;

  before(async () => {
    db = await connection();
  });

  after(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should be able to create a token', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const { _id, email, role } = result.user;
        const authService = new JWTAuthService();
        const token = authService.generate({ id: _id.toString(), email, role });
        expect(token).is.not.null;
      });
  });
});
