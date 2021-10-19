const { Router } = require('express');
const CreateUserService = require('../services/CreateUserService');
const UsersRepository = require('../repositories/UsersRepository');
const userRouter = Router();

userRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;
	const createUserService = new CreateUserService();

	const user = await createUserService.execute({ name, email, password });

	const userWithoutPassword = {
		_id: user._id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	return response.status(201).json({ user: userWithoutPassword });
});

userRouter.get('/', async (request, response) => {
	const usersRepository = new UsersRepository();

	const users = await usersRepository.all();

	return response.json(users);
});

module.exports = userRouter;
