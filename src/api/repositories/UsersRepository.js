const { MongoClient } = require('mongodb');
const database = require('../config/database');
const User = require('../models/User');

const COLLECTION_NAME = 'users';

class UsersRepository {
	async save(user) {
		const client = new MongoClient(database.url, { useUnifiedTopology: true });
		try {
			await client.connect();
			const db = client.db(database.name);
			const collection = db.collection(COLLECTION_NAME);
			const result = await collection.insertOne(user);
			const { name, email, password, role, _id } = await result.ops[0];

			return new User(name, email, password, _id, role);
		} finally {
			await client.close();
		}
	}

	async findOne(email) {
		const client = new MongoClient(database.url, { useUnifiedTopology: true });
		try {
			await client.connect();
			const db = client.db(database.name);
			const collection = db.collection(COLLECTION_NAME);
			const query = { email: email };
			const result = await collection.findOne(query);
			return result;
		} finally {
			await client.close();
		}
	}
}

module.exports = UsersRepository;
