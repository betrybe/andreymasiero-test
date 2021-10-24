const { expect } = require('chai');
const FakeUserRepository = require('../fakes/repositories/FakeUserRepository');
const CreateUserService = require('../../modules/user/services/CreateUserService');

describe('Create new admin user endpoint', () => {
  let repository;
  let service;

  beforeEach(async () => {
    repository = new FakeUserRepository();
    service = new CreateUserService(repository);
  });

  it('should be able to create a new admin user', async () => {
    const newId = repository.generateId();

    const user = await service.create(newId, {
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
      role: 'admin',
    });

    expect(repository.users).to.be.an('array').to.have.lengthOf(1);

    expect(user.id).to.equal(newId);
    expect(user.name).to.equal('Luke');
    expect(user.email).to.equal('luke@iamyourfather.com');
    expect(user.password).to.equal('vader2021');
    expect(user.role).to.equal('admin');
  });
});
