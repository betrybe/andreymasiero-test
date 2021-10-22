const { Router } = require('express');
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');

const routes = new Router();

routes.use('/users', usersRouter);
routes.use('/login', authRouter);

routes.use((err, req, res, next) => {
  if (next) console.log('only for lint pass');
  return res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = routes;
