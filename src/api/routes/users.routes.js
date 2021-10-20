const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const CreateUserService = require('../services/CreateUserService');
const CreateAdminUserService = require('../services/CreateAdminUserService');

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const user = await CreateUserService.execute({ name, email, password });

  const userWithoutPassword = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return response.status(201).json({ user: userWithoutPassword });
});

userRouter.post('/admin', ensureAuthenticated, async (request, response) => {
  const { name, email, password } = request.body;
  const { user } = request;
  const admin = await CreateAdminUserService.execute({
    name,
    email,
    password,
    user,
  });

  const adminWithoutPassword = {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  return response.status(201).json({ user: adminWithoutPassword });
});

module.exports = userRouter;
