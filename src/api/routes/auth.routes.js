const { Router } = require('express');
const AuthenticateUserService = require('../services/AuthenticateUserService');

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const token = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ token: token });
});

module.exports = authRouter;
