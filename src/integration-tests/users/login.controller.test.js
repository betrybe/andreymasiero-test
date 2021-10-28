const { expect } = require('chai');
const frisby = require('frisby');
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
    ];
    await db.collection('users').insertMany(users);
  });

  after(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should not be able to login with a invalid email', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'vader@iamyourfather.com',
        password: 'admin',
      })
      .expect('status', 401)
      .then((response) => {
        const { message } = JSON.parse(response.body);
        expect(message).to.equal('Incorrect username or password');
      });
  });

  it('should not be able to login with a invalid password', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 401)
      .then((response) => {
        const { message } = JSON.parse(response.body);
        expect(message).to.equal('Incorrect username or password');
      });
  });

  it('should not be able to login without email', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        password: 'admin',
      })
      .expect('status', 401)
      .then((response) => {
        const { message } = JSON.parse(response.body);
        expect(message).to.equal('All fields must be filled');
      });
  });

  it('should not be able to login without password', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
      })
      .expect('status', 401)
      .then((response) => {
        const { message } = JSON.parse(response.body);
        expect(message).to.equal('All fields must be filled');
      });
  });

  it('should be login', async () => {
    await frisby
      .post('http://localhost:3000/login/', {
        email: 'root@iamyourfather.com',
        password: 'admin',
      })
      .expect('status', 200);
  });
});
