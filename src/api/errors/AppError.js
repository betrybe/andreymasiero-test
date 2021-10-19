class AppError {
	constructor(message, statusCode = 400) {
		this.message = message;
		this.statusCode = statusCode;
		Object.freeze(this);
	}
}

module.exports = AppError;
