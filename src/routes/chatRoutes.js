const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/init', chatController.initializeVectorStore);
router.post('/ask', chatController.askQuestion);

module.exports = router;