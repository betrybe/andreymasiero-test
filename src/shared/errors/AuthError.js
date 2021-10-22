class AuthError {
  constructor(message) {
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = AuthError;
