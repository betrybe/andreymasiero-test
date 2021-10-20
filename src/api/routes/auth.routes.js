const { Router } = require('express');
const AuthenticateUserService = require('../services/AuthenticateUserService');

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const tokenCreated = await AuthenticateUserService.execute({
    email,
    password,
  });

  return response.json({ token: tokenCreated });
});

module.exports = authRouter;
