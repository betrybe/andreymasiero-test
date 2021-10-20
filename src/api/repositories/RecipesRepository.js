const { MongoClient, ObjectID } = require('mongodb');
const database = require('../config/database');
const Recipe = require('../models/Recipe');

const COLLECTION_NAME = 'recipes';

class RecipesRepository {
  async static save(recipe) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(database.name);
      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.insertOne(recipe);
      const { name, ingredients, preparation, userId, _id } = await result
        .ops[0];

      return new Recipe(name, ingredients, preparation, userId, _id);
    } finally {
      await client.close();
    }
  }

  async static all() {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(database.name);
      const collection = db.collection(COLLECTION_NAME);
      const recipes = await collection.find().toArray();

      return recipes;
    } finally {
      await client.close();
    }
  }

  async static findById(id) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(database.name);
      const collection = db.collection(COLLECTION_NAME);
      const query = { _id: new ObjectID(id) };
      const recipe = await collection.findOne(query);

      return recipe;
    } finally {
      await client.close();
    }
  }

  async static update(recipe) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(database.name);
      const collection = db.collection(COLLECTION_NAME);
      const query = { _id: new ObjectID(recipe._id) };

      const result = await collection.replaceOne(query, recipe);
      const { name, ingredients, preparation, userId, _id } = await result
        .ops[0];

      return new Recipe(name, ingredients, preparation, userId, _id);
    } finally {
      await client.close();
    }
  }

  async static delete(id) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    try {
      await client.connect();
      const db = client.db(database.name);
      const collection = db.collection(COLLECTION_NAME);
      const query = { _id: new ObjectID(id) };
      await collection.deleteOne(query);
    } finally {
      await client.close();
    }
  }
}

module.exports = RecipesRepository;
