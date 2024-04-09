const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  return Sequence.findOne()
    .then(function (sequence) {
      if (!sequence) {
        return Sequence.create({
          maxDocumentId: 0,
          maxMessageId: 0,
          maxContactId: 0
        }).then(function (newSequence) {
          sequenceId = newSequence._id;
          maxDocumentId = newSequence.maxDocumentId;
          maxMessageId = newSequence.maxMessageId;
          maxContactId = newSequence.maxContactId;
        });
      } else {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
      }
    })
    .catch(function (err) {
      console.error('Error fetching sequence:', err);
      throw err;
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = {
        maxDocumentId: maxDocumentId
      };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = {
        maxMessageId: maxMessageId
      };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = {
        maxContactId: maxContactId
      };
      nextId = maxContactId;
      break;
    default:
      return Promise.reject(new Error("Invalid collection type"));
  }

  return Sequence.updateOne({
      _id: sequenceId
    }, {
      $set: updateObject
    })
    .exec()
    .then(function () {
      return nextId;
    })
    .catch(function (err) {
      console.error('Error updating sequence:', err);
      throw err;
    });
};

module.exports = new SequenceGenerator();
