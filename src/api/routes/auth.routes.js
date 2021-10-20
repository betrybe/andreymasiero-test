const { Router } = require('express');
const AuthenticateUserService = require('../services/AuthenticateUserService');

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const tokenCreated = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ token: tokenCreated });
});

module.exports = authRouter;
