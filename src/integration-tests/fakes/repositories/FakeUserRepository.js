const User = require('../../../modules/user/model/User');

class FakeUserRepository {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  save(user) {
    const { _id, name, email, password, role } = user;
    this.users.push({ _id, name, email, password, role });
  }

  findByEmail(email) {
    const [user] = this.users.filter((user) => user.email === email);
    if (!user) return null;
    return User.fromJson({ ...user });
  }

  generateId() {
    return this.nextId++;
  }
}

module.exports = FakeUserRepository;
