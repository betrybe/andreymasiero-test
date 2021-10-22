const ValidationHelper = require('../../../shared/helpers/ValidationHelper');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

class User {
  constructor({ id, name, email, password, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role || 'user';
  }

  set id(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objId = value;
  }

  get id() {
    return this.objId;
  }

  set name(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objName = value;
  }

  get name() {
    return this.objName;
  }

  set email(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    ValidationHelper.assertIsEmail(value, NOT_NULL_MESSAGE);
    this.objEmail = value;
  }

  get email() {
    return this.objEmail;
  }

  set role(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objRole = value;
  }

  get role() {
    return this.objRole;
  }

  set password(value) {
    ValidationHelper.assertNotNull(value, NOT_NULL_MESSAGE);
    this.objPassword = value;
  }

  get password() {
    return this.objPassword;
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
    };
  }

  static fromJson({ _id, name, email, password, role }) {
    const user = new User({
      id: _id,
      name,
      email,
      password,
      role,
    });

    return user;
  }
}

module.exports = User;
