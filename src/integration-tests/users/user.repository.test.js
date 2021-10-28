const { expect } = require('chai');
const UserRepository = require('../../modules/user/repositories/UserRepository');
const FakeUserRepository = require('../fakes/repositories/FakeUserRepository');
const User = require('../../modules/user/model/User');

describe('Validate UserRepository methods', () => {
  let repository;

  before(() => {
    repository = new UserRepository();
    repository.strategy = new FakeUserRepository();
  });

  it('should be able to generate a new id', () => {
    const firstId = repository.generateId();
    expect(firstId).to.equal(1);

    const secondId = repository.generateId();
    expect(secondId).to.equal(2);
  });

  it('should be able to save an user', () => {
    const user = new User({
      id: 1,
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });

    repository.save(user.toJson());

    expect(repository.strategy.users).to.be.an('array').to.have.lengthOf(1);
  });

  it('should be able to retrieve an user by email', () => {
    const user = new User({
      id: 1,
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });

    repository.save(user.toJson());

    const userRetrieved = repository.findByEmail('luke@iamyourfather.com');

    expect(userRetrieved.id).to.equal(1);
    expect(userRetrieved.name).to.equal('Luke');
    expect(userRetrieved.email).to.equal('luke@iamyourfather.com');
    expect(userRetrieved.password).to.equal('vader2021');
  });
});
