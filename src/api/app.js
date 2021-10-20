const express = require('express');
require('express-async-errors');
const AppError = require('./errors/AppError');
const uploadConfig = require('./config/upload');

const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/images', express.static(uploadConfig.directory));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
	response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(routes);

app.use((err, request, response, next) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			message: err.message,
		});
	}

	console.error(err);

	return response.status(500).json({
		message: 'Internal Server Error',
	});
});

module.exports = app;
