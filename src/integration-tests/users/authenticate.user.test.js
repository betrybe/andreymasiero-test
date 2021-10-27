const { expect } = require('chai');
const FakeUserRepository = require('../fakes/repositories/FakeUserRepository');
const FakeJWTAuthService = require('../fakes/services/FakeJWTAuthService');
const AuthenticateService = require('../../modules/user/services/AuthenticateService');
const AuthError = require('../../shared/errors/AuthError');

describe('Login endpoint', () => {
  let repository;
  let authService;
  let service;

  before(async () => {
    repository = new FakeUserRepository();
    authService = new FakeJWTAuthService();
    service = new AuthenticateService(repository, authService);

    repository.save({
      _id: 1,
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
      role: 'user',
    });
  });

  it('should not be able to authenticate user without email', async () => {
    try {
      const token = await service.execute({ password: 'vader2021' });
    } catch (err) {
      expect(err).instanceOf(AuthError);
      expect(err.message).to.equal('All fields must be filled');
    }
  });

  it('should not be able to authenticate user without password', async () => {
    try {
      const token = await service.execute({ email: 'luke@iamyourfather.com' });
    } catch (err) {
      expect(err).instanceOf(AuthError);
      expect(err.message).to.equal('All fields must be filled');
    }
  });

  it('should not be able to authenticate user with incorrect email', async () => {
    try {
      const token = await service.execute({
        email: 'luke@iamnotyourfather.com',
        password: 'vader2021',
      });
      expect.fail('should be an incorrect email.');
    } catch (err) {
      expect(err).instanceOf(AuthError);
      expect(err.message).to.equal('Incorrect username or password');
    }
  });

  it('should not be able to authenticate user with incorrect password', async () => {
    try {
      const token = await service.execute({
        email: 'luke@iamyourfather.com',
        password: 'vader2022',
      });
      expect.fail('should be an incorrect password.');
    } catch (err) {
      expect(err).instanceOf(AuthError);
      expect(err.message).to.equal('Incorrect username or password');
    }
  });

  it('should be authenticate', async () => {
    const login = {
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    };
    const token = await service.execute(login);

    expect(token).to.equal(`1-${authService.SECRET}-${login.email}-user`);
  });

  it('should be able to extract info from token', async () => {
    const token = authService.extract(
      `1-${authService.SECRET}-luke@iamyourfather.com-user`.split('-'),
    );
    expect(token.id).to.equal('1');
    expect(token.email).to.equal('luke@iamyourfather.com');
    expect(token.role).to.equal('user');
  });
});
