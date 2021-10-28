const { expect, should } = require('chai');
const connection = require('../../shared/infra/mongo/db');
const UserRepository = require('../../modules/user/infra/mongo/repositories/MongoRepository');
const { ObjectID } = require('mongodb');

describe('Mongo user repository test', () => {
  let db;
  let userRepository;

  before(async () => {
    db = await connection();
    userRepository = new UserRepository(db);
  });

  afterEach(async () => {
    await db.collection('users').deleteMany({});
  });

  it('should be able to save an user', async () => {
    try {
      await userRepository.save({
        _id: new ObjectID(),
        name: 'Luke',
        email: 'luke@iamyourfather.com',
        password: 'vader2021',
        role: 'admin',
      });
    } catch (err) {
      expect.fail(err.message);
    }
  });

  it('should be able to find an user by email', async () => {
    await userRepository.save({
      _id: new ObjectID(),
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
      role: 'admin',
    });

    const user = await userRepository.findByEmail('luke@iamyourfather.com');
    expect(user).is.not.null;
    expect(user.name).to.equal('Luke');
    expect(user.email).to.equal('luke@iamyourfather.com');
    expect(user.password).to.equal('vader2021');
    expect(user.role).to.equal('admin');
  });

  it('should be able to generate an ID', async () => {
    const id = userRepository.generateId();
    expect(id).to.be.instanceOf(ObjectID);
  });

  it('shoud be able to validate if a recipe exists', async () => {
    const user = await userRepository.findByEmail('vader@iamyourfather.com');
    expect(user).is.null;
  });
});
