const { expect } = require('chai');
const frisby = require('frisby');
const connection = require('../../shared/infra/mongo/db');
const JWTAuthService = require('../../shared/infra/auth/JWTAuthService');

describe('Auth test', () => {
  let db;

  before(async () => {
    db = await connection();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
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

  it('should be able to extract info from token', async () => {
    let token;
    let id;
    const authService = new JWTAuthService();

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
        id = _id;
        token = authService.generate({ id: _id.toString(), email, role });
      });

    const { id: idDecoded, email, role } = authService.extract(token);
    expect(idDecoded).to.equal(id);
    expect(email).to.equal('luke@iamyourfather.com');
    expect(role).to.equal('user');
  });

  it('should be able to validate a null token', async () => {
    try {
      let token;
      const authService = new JWTAuthService();
      authService.extract(token);
    } catch (err) {
      expect(err.statusCode).to.equal(401);
      expect(err.message).to.equal('missing auth token');
    }
  });

  it('should be able to validate a malformed token', async () => {
    try {
      let token = '2313ada1231';
      const authService = new JWTAuthService();
      authService.extract(token);
    } catch (err) {
      expect(err.statusCode).to.equal(401);
      expect(err.message).to.equal('jwt malformed');
    }
  });
});
