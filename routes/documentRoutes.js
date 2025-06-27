const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Create document
router.post('/create', documentController.createDocument);
// Get document by id
router.get('/:id', documentController.getDocument);
// Get all documents for a user
router.get('/user/:userId', documentController.getUserDocuments);
// Update document
router.put('/save/:id', documentController.saveDocument);
// Delete document
router.delete('/delete/:id', documentController.deleteDocument);

module.exports = router;
