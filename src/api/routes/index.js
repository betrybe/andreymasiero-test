const { Router } = require('express');
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');
const recipesRouter = require('./recipes.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', authRouter);
routes.use('/recipes', recipesRouter);
module.exports = routes;
