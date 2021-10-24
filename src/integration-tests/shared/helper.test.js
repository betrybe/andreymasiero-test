const { expect } = require('chai');
const { isRef } = require('joi');
const AlreadyExistsError = require('../../shared/errors/AlreadyExistsError');
const AppError = require('../../shared/errors/AppError');
const ValidationHelper = require('../../shared/helpers/ValidationHelper');

describe('ValidationHelper functions test', () => {
  describe('equals objects', () => {
    it('success', async () => {
      ValidationHelper.assertEquals('Luke', 'Luke', 'They are equals');
    });

    it('fail', async () => {
      try {
        ValidationHelper.assertEquals('Luke', 'Vader', 'They are different');
        expect.fail('Object are the same. They need to be different');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('They are different');
      }
    });
  });

  describe('not equals objects', () => {
    it('success', async () => {
      ValidationHelper.assertNotEquals('Luke', 'Vader', 'They are different');
    });

    it('fail', async () => {
      try {
        ValidationHelper.assertNotEquals('Luke', 'Luke', 'They are equals');
        expect.fail('Object aren´t the same. They need to be equals');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('They are equals');
      }
    });
  });

  describe('object already exists', () => {
    it('success', async () => {
      try {
        const object = { name: 'Luke' };
        ValidationHelper.assertAlreadyExists(object, 'Object already exists');
        expect.fail('Object need to be null.');
      } catch (err) {
        expect(err).instanceOf(AlreadyExistsError);
        expect(err.message).to.equal('Object already exists');
      }
    });

    it('fail', async () => {
      ValidationHelper.assertAlreadyExists(null, 'Object not exists');
    });
  });

  describe('object not null', () => {
    it('success', async () => {
      const object = { name: 'Luke' };
      ValidationHelper.assertNotNull(object, 'This object has content');
    });

    it('fail', async () => {
      let object = null;
      try {
        ValidationHelper.assertNotNull(object, 'This object has no content');
        expect.fail('it was excepted a null object');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('This object has no content');
      }
    });
  });

  describe('object null', () => {
    it('success', async () => {
      const object = null;
      ValidationHelper.assertNull(object, 'This object has no content');
    });

    it('fail', async () => {
      let object = { name: 'Luke' };
      try {
        ValidationHelper.assertNull(object, 'This object has content');
        expect.fail('it was excepted a filled object');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('This object has content');
      }
    });
  });

  describe('true validation', () => {
    it('success', async () => {
      ValidationHelper.assertTrue(true, 'condition true');
    });

    it('fail', async () => {
      try {
        ValidationHelper.assertTrue(false, 'condition false');
        expect.fail('it was expect a false condition');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('condition false');
      }
    });
  });

  describe('false validation', () => {
    it('success', async () => {
      ValidationHelper.assertFalse(false, 'condition false');
    });

    it('fail', async () => {
      try {
        ValidationHelper.assertFalse(true, 'condition true');
        expect.fail('it was expect a true condition');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('condition true');
      }
    });
  });

  describe('list not empty', () => {
    it('success', async () => {
      const list = ['Luke', 'Leia', 'Vader'];
      ValidationHelper.assertNotEmpty(list, 'there are few names in list');
    });

    it('fail: empty', async () => {
      try {
        ValidationHelper.assertNotEmpty([], 'there are no names in list');
        expect.fail('it was expect an empty list');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('there are no names in list');
      }
    });

    it('fail: null', async () => {
      let list;
      try {
        ValidationHelper.assertNotEmpty(list, 'the list is null');
        expect.fail('it was expect a null list');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('the list is null');
      }
    });
  });

  describe('email validation', () => {
    it('success', async () => {
      ValidationHelper.assertIsEmail(
        'luke@iamyourfather.com',
        'it is an email',
      );
    });

    it('fail', async () => {
      try {
        ValidationHelper.assertIsEmail('luke@', 'it is not an email');
        expect.fail('it was not expect an email');
      } catch (err) {
        expect(err).instanceOf(AppError);
        expect(err.message).to.equal('it is not an email');
      }
    });
  });
});
