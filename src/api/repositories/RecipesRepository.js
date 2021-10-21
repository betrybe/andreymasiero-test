const { MongoClient, ObjectID } = require('mongodb');
const database = require('../config/database');
const Recipe = require('../models/Recipe');

const COLLECTION_NAME = 'recipes';

class RecipesRepository {
  static save(recipe) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const result = await collection.insertOne(recipe);
        const { name, ingredients, preparation, userId, id } = await result
          .ops[0];

        const newRecipe = new Recipe(name, ingredients, preparation, userId);
        newRecipe.id = id;

        return newRecipe;
      } finally {
        await client.close();
      }
    }
    return run();
  }

  static all() {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
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
    return run();
  }

  static findById(id) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const query = { id: new ObjectID(id) };
        const recipe = await collection.findOne(query);

        return recipe;
      } finally {
        await client.close();
      }
    }
    return run();
  }

  static update(recipe) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const query = { id: new ObjectID(recipe.id) };

        const result = await collection.replaceOne(query, recipe);
        const { name, ingredients, preparation, userId, id } = await result
          .ops[0];

        const newRecipe = new Recipe(name, ingredients, preparation, userId);
        newRecipe.id = id;

        return newRecipe;
      } finally {
        await client.close();
      }
    }
    return run();
  }

  static delete(id) {
    const client = new MongoClient(database.url, { useUnifiedTopology: true });
    async function run() {
      try {
        await client.connect();
        const db = client.db(database.name);
        const collection = db.collection(COLLECTION_NAME);
        const query = { id: new ObjectID(id) };
        await collection.deleteOne(query);
      } finally {
        await client.close();
      }
    }
    run();
  }
}

module.exports = RecipesRepository;
