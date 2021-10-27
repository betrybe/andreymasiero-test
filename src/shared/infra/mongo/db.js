const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://localhost:27017/Cookmaster';

async function mongoConnection() {
  const connection = await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection.db('Cookmaster');
}

module.exports = mongoConnection;
