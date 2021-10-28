const { expect } = require('chai');
const frisby = require('frisby');
const UserController = require('../../modules/user/controllers/UserController');
const ForbiddenError = require('../../shared/errors/ForbiddenError');
const JWTAuthService = require('../../shared/infra/auth/JWTAuthService');
const connection = require('../../shared/infra/mongo/db');

describe('User Controller test', () => {
  let db;

  before(async () => {
    db = await connection();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = [
      {
        name: 'admin',
        email: 'root@iamyourfather.com',
        password: 'admin',
        role: 'admin',
      },
      {
        name: 'Darth Vader',
        email: 'vader@iamyourfather.com',
        password: 'vader2021',
        role: 'user',
      },
    ];
    await db.collection('users').insertMany(users);
  });

  after(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should not be able to create user without name', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 400);
  });

  it('should not be able to create user without email', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        password: 'vader2021',
      })
      .expect('status', 400);
  });

  it('should not be able to create user with invalid email', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@',
        password: 'vader2021',
      })
      .expect('status', 400);
  });

  it('should not be able to create user without password', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
      })
      .expect('status', 400);
  });

  it('should be validate an exists email', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'root@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 409);
  });

  it('should be able to create a new user', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 201);
  });

  it('should be validate role property as "user"', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 201)
      .then((response) => {
        const { user } = JSON.parse(response.body);
        expect(user.role).to.equal('user');
      });
  });

  it('should not be able to create a admin user as "regular user"', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'vader@iamyourfather.com',
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
          .post(`http://localhost:3000/users/admin`, {
            name: 'Luke',
            email: 'luke@iamyourfather.com',
            password: 'vader2021',
          })
          .expect('status', 403);
      });
  });

  it('should be able to create a admin user', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
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
          .post(`http://localhost:3000/users/admin`, {
            name: 'Luke',
            email: 'luke@iamyourfather.com',
            password: 'vader2021',
          })
          .expect('status', 201);
      });
  });

  it('should not be able to create a admin user without "name"', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
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
          .post(`http://localhost:3000/users/admin`, {
            email: 'luke@iamyourfather.com',
            password: 'vader2021',
          })
          .expect('status', 400);
      });
  });

  it('should not be able to create a admin user without "email"', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
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
          .post(`http://localhost:3000/users/admin`, {
            name: 'Luke',
            password: 'vader2021',
          })
          .expect('status', 400);
      });
  });

  it('should not be able to create a admin user with incorrect email', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
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
          .post(`http://localhost:3000/users/admin`, {
            name: 'Luke',
            email: 'luke@',
            password: 'vader2021',
          })
          .expect('status', 400);
      });
  });

  it('should be able to create a admin user without "password"', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
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
          .post(`http://localhost:3000/users/admin`, {
            name: 'Luke',
            email: 'luke@iamyourfather.com',
          })
          .expect('status', 400);
      });
  });

  it('should validate an admin token', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const authService = new JWTAuthService();
        const controller = new UserController(null, authService);
        try {
          controller.onlyAdmin(result.token);
        } catch (err) {
          expect.fail(err.message);
        }
      });
  });

  it('should not validate an user token as admin', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'vader@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const authService = new JWTAuthService();
        const controller = new UserController(null, authService);
        try {
          controller.onlyAdmin(result.token);
        } catch (err) {
          expect(err).instanceOf(ForbiddenError);
        }
      });
  });
});
