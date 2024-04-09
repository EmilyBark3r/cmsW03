const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/documents');

function returnError(res, error, message = 'An error occurred') {
  res.status(500).json({
    message: message,
    error: error
  });
}

router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully',
        documents: documents
      });
    })
    .catch(error => {
      returnError(res, error, 'Failed to fetch documents');
    });
});

router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
      returnError(res, error, 'Failed to add document');
    });
});

router.put('/:id', (req, res, next) => {
  Document.findOneAndUpdate({
      id: req.params.id
    }, req.body, {
      new: true
    })
    .then(updatedDocument => {
      res.status(200).json({
        message: 'Document updated successfully',
        document: updatedDocument
      });
    })
    .catch(error => {
      returnError(res, error, 'Failed to update document');
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOneAndDelete({
      id: req.params.id
    })
    .then(() => {
      res.status(204).json({
        message: "Document deleted successfully"
      });
    })
    .catch(error => {
      returnError(res, error, 'Failed to delete document');
    });
});

module.exports = router;
