class AlreadyExistsError {
  constructor(message) {
    this.message = message;
    this.statusCode = 409;
  }
}

module.exports = AlreadyExistsError;
