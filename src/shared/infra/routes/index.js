const express = require('express');
const path = require('path');
const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');
const recipesRouter = require('./recipes.routes');

const routes = new express.Router();

routes.use('/users', usersRouter);
routes.use('/login', authRouter);
routes.use('/recipes', recipesRouter);
routes.use('/images', express.static(path.join(__dirname, '../../../uploads')));

routes.use((err, req, res, next) => {
  if (next) console.log('only for lint pass');
  return res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = routes;
