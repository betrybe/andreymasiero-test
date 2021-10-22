const AppError = require('../errors/AppError');
const AlreadyExistsError = require('../errors/AlreadyExistsError');

class ValidationHelper {
  static assertEquals(objectA, objectB, message) {
    if (objectA !== objectB) {
      throw new AppError(message);
    }
  }

  static assertNotEquals(objectA, objectB, message) {
    if (objectA === objectB) {
      throw new AppError(message);
    }
  }

  static assertAlreadyExists(object, message) {
    if (object) {
      throw new AlreadyExistsError(message);
    }
  }

  static assertNotNull(object, message) {
    if (!object) {
      throw new AppError(message);
    }
  }

  static assertNull(object, message) {
    if (object) {
      throw new AppError(message);
    }
  }

  static assertTrue(value, message) {
    if (!value) {
      throw new AppError(message);
    }
  }

  static assertFalse(value, message) {
    if (value) {
      throw new AppError(message);
    }
  }

  static assertNotEmpty(value = [], message) {
    if (value.length === 0) {
      throw new AppError(message);
    }
  }

  static assertIsEmail(value = '', message) {
    if (/\S+@\S+\.\S+/.test(value) === false) {
      throw new AppError(message);
    }
  }
}

module.exports = ValidationHelper;
