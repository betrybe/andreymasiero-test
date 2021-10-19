const AppError = require('../errors/AppError');
const User = require('../models/User');
const UsersRepository = require('../repositories/UsersRepository');

class CreateUserService {
	async execute({ name, email, password }) {
		if (!name || !email || !password) {
			throw new AppError('Invalid entries. Try again.');
		}

		if (email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]*/) == null) {
			throw new AppError('Invalid entries. Try again.');
		}

		const usersRepository = new UsersRepository();

		const checkUserExists = await usersRepository.findOne(email);

		if (checkUserExists) {
			throw new AppError('Email already registered.');
		}

		const user = await usersRepository.save(new User(name, email, password));

		return user;
	}
}

module.exports = CreateUserService;
