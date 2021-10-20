const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth');
const AppError = require('../errors/AppError');

module.exports = function ensureAuthenticated(request, response, next) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('jwt malformed.', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = verify(token, authConfig.jwt.secret);
		const { id, email, role } = decoded;
		request.user = {
			id,
			email,
			role,
		};

		return next();
	} catch {
		throw new AppError('jwt malformed.', 401);
	}
};
