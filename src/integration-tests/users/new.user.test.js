const { expect } = require('chai');
const FakeUserRepository = require('../fakes/repositories/FakeUserRepository');
const CreateUserService = require('../../modules/user/services/CreateUserService');
const AppError = require('../../shared/errors/AppError');
const AlreadyExistsError = require('../../shared/errors/AlreadyExistsError');

describe('Create new user endpoint', () => {
  let repository;
  let service;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    service = new CreateUserService(repository);
  });

  it('should not be able to create user without name', async () => {
    try {
      const newId = repository.generateId();

      const user = await service.create(newId, {
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      });
    } catch (err) {
      expect(repository.users).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should not be able to create user without email', async () => {
    try {
      const newId = repository.generateId();

      const user = await service.create(newId, {
        name: 'Luke',
        password: 'vader2021',
      });
    } catch (err) {
      expect(repository.users).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should not be able to create user with invalid email', async () => {
    try {
      const newId = repository.generateId();

      const user = await service.create(newId, {
        name: 'Luke',
        email: 'luke@',
        password: 'vader2021',
      });
    } catch (err) {
      expect(repository.users).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should not be able to create user without password', async () => {
    try {
      const newId = repository.generateId();

      const user = await service.create(newId, {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
      });
    } catch (err) {
      expect(repository.users).to.be.an('array').to.have.lengthOf(0);
      expect(err).instanceOf(AppError);
      expect(err.message).to.equal('Invalid entries. Try again.');
    }
  });

  it('should be validate an exists email', async () => {
    try {
      const newId = repository.generateId();

      await service.create(newId, {
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      });

      await service.create(newId, {
        name: 'Vader',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
      });
    } catch (err) {
      expect(repository.users).to.be.an('array').to.have.lengthOf(1);
      expect(err).instanceOf(AlreadyExistsError);
      expect(err.message).to.equal('Email already registered');
    }
  });

  it('should be able to create a new user', async () => {
    const newId = repository.generateId();

    const user = await service.create(newId, {
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });

    expect(repository.users).to.be.an('array').to.have.lengthOf(1);

    expect(user.id).to.equal(newId);
    expect(user.name).to.equal('Luke');
    expect(user.email).to.equal('luke@iamyourfather.com');
    expect(user.password).to.equal('vader2021');
  });

  it('should be validate role property as "user"', async () => {
    const newId = repository.generateId();

    const user = await service.create(newId, {
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });

    expect(repository.users).to.be.an('array').to.have.lengthOf(1);

    expect(user.role).to.equal('user');
  });
});
