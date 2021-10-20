const { MongoClient } = require('mongodb');
const database = require('./src/api/config/database');
const User = require('./src/api/models/User');

const client = new MongoClient(database.url, { useUnifiedTopology: true });

async function execute() {
	try {
		const user = new User('admin', 'root@email.com', 'admin', null, 'admin');
		await client.connect();
		const db = client.db(database.name);
		const collection = db.collection('users');
		const result = await collection.insertOne(user);
		console.log(`A user was created with _id: ${result.insertedId}`);
	} finally {
		await client.close();
	}
}

execute().catch(console.dir);
