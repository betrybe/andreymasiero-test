class AppError {
  constructor(message) {
    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = AppError;
