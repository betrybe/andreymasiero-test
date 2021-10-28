const { ObjectID } = require('mongodb');
const Recipe = require('../../../model/Recipe');
const NotFoundError = require('../../../../../shared/errors/NotFoundError');

class MongoRepository {
  constructor(client) {
    this.ObjectID = ObjectID;
    this.collection = client.collection('recipes');
  }

  generateId() {
    return new this.ObjectID();
  }

  async save({ _id, name, ingredients, preparation, userId, image }) {
    const recipe = { _id, name, ingredients, preparation, userId, image };
    await this.collection.findOneAndUpdate(
      { _id },
      { $set: recipe },
      { upsert: true, returnNewDocument: true },
    );

    return recipe;
  }

  async findById(id) {
    if (!this.ObjectID.isValid(id)) {
      throw new NotFoundError('recipe not found');
    }
    const recipe = await this.collection.findOne({ _id: this.ObjectID(id) });
    if (!recipe) {
      throw new NotFoundError('recipe not found');
    }
    return Recipe.fromJson(recipe);
  }

  findAll() {
    return this.collection.find({}).toArray();
  }

  delete(id) {
    this.collection.deleteOne({ _id: id });
  }
}

module.exports = MongoRepository;
