const { expect } = require('chai');
const User = require('../../modules/user/model/User');

describe('Validate user model methods', () => {
  it('should be able to convert a user object to json format', () => {
    const user = new User({
      id: 1,
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
    });

    const object = user.toJson();

    expect(object._id).to.equal(1);
    expect(object.name).to.equal('Luke');
    expect(object.email).to.equal('luke@iamyourfather.com');
    expect(object.role).to.equal('user');
    expect(object.password).to.equal('vader2021');
  });

  it('should be able to create a user from json format object', () => {
    const user = User.fromJson({
      _id: 1,
      name: 'Luke',
      email: 'luke@iamyourfather.com',
      password: 'vader2021',
      role: 'admin',
    });

    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luke');
    expect(user.email).to.equal('luke@iamyourfather.com');
    expect(user.password).to.equal('vader2021');
    expect(user.role).to.equal('admin');
  });
});
