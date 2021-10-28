class ForbiddenError {
  constructor(message) {
    this.message = message;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
