class NotFoundError {
  constructor(message) {
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
