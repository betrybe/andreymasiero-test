const { expect } = require('chai');
const frisby = require('frisby');
const connection = require('../../shared/infra/mongo/db');
const UserRoutes = require('../../shared/infra/routes/users.routes');
const AuthRoutes = require('../../shared/infra/routes/auth.routes');
const { Router } = require('express');

describe('User route test', () => {
  let db;

  before(async () => {
    db = await connection();
  });

  after(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should have a connection', async () => {
    expect(db).is.not.null;
  });

  it('should be able to use a route to create an user', async () => {
    await frisby
      .post('http://localhost:3000/users', {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      })
      .expect('status', 201);
  });

  it('should have a instance of user routes', async () => {
    expect(UserRoutes).is.not.null;
  });

  it('should have a instance of auth routes', async () => {
    expect(AuthRoutes).is.not.null;
  });
});
