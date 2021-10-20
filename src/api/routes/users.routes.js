const { Router } = require('express');
const CreateUserService = require('../services/CreateUserService');
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

module.exports = userRouter;
