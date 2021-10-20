const AppError = require('../errors/AppError');
const UsersRepository = require('../repositories/UsersRepository');
const { jwt } = require('../config/auth');
const { sign } = require('jsonwebtoken');

class AuthenticateUserService {
	async execute({ email, password }) {
		if (!email || !password) {
			throw new AppError('All fields must be filled.', 401);
		}

		const usersRepository = new UsersRepository();
		const user = await usersRepository.findOne(email);

		if (!user || user.password !== password) {
			throw new AppError('Incorrect username or password.', 401);
		}

		const { secret, expiresIn } = jwt;

		const token = sign(
			{
				id: user._id,
				email: user.email,
				role: user.role,
			},
			secret,
			{
				subject: user._id.toString(),
				expiresIn: expiresIn,
			},
		);

		return token;
	}
}

module.exports = AuthenticateUserService;
