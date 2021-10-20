const { MongoClient } = require('mongodb');
const database = require('../config/database');
const User = require('../models/User');

const COLLECTION_NAME = 'users';

class UsersRepository {
  static save(user) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const result = await collection.insertOne(user);
        const { name, email, password, role, _id } = await result.ops[0];

        const newUser = new User(name, email, password, role);
        newUser._id = _id;

        return newUser;
      } finally {
        await client.close();
      }
    }
    return run();
  }

  static findOne(userEmail) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const query = { email: userEmail };
        const result = await collection.findOne(query);
        return result;
      } finally {
        await client.close();
      }
    }
    return run();
  }
}

module.exports = UsersRepository;
