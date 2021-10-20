class User {
  constructor(name, email, password, id = null, role = 'user') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this._id = id;
  }
}

module.exports = User;
