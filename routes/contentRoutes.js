// /routes/contentRoutes.js

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// İçerik ekleme
router.post('/content', contentController.addContent);

// İçerik listeleme
router.get('/content', contentController.getContents);

// İçerik silme
router.delete('/content/:id', contentController.deleteContent);

module.exports = router;
