const multer = require('multer');
const path = require('path');

const folder = path.resolve(__dirname, '..', '..', 'uploads');

module.exports = {
	directory: folder,
	storage: multer.diskStorage({
		destination: folder,
		filename(request, file, callback) {
			const { id } = request.params;
			const filename = `${id}.jpeg`;
			return callback(null, filename);
		},
	}),
};
