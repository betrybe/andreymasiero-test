const { ObjectID } = require('mongodb');
const User = require('../../../model/User');

class MongoRepository {
  constructor(client) {
    this.ObjectID = ObjectID;
    this.collection = client.collection('users');
  }

  async save({ _id, name, email, password, role }) {
    const user = { _id, name, email, password, role };

    await this.collection.findOneAndUpdate(
      { _id },
      { $set: user },
      { upsert: true, returnNewDocument: true },
    );
  }

  async findByEmail(email) {
    const [user] = await this.collection.find({ email }).toArray();
    if (!user) return null;
    return User.fromJson({ ...user });
  }

  generateId() {
    return new this.ObjectID();
  }
}

module.exports = MongoRepository;
