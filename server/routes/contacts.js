const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts fetched successfully',
        contacts: contacts
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .populate('group')
    .then(contact => {
      res.status(200).json({
        message: 'Contact fetched successfully',
        contact: contact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    group: req.body.group.map(groupContact => groupContact._id)
  });
  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOneAndUpdate({
      id: req.params.id
    }, req.body, {
      new: true
    })
    .then(updatedContact => {
      res.status(204).json({
        message: 'Contact updated successfully'
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOneAndDelete({
      id: req.params.id
    })
    .then(() => {
      res.status(204).json({
        message: "Contact deleted successfully"
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;
