const express = require('express');
const { create, testing, login } = require('../controllers/userController');
const router = express.Router();

router.post('/create', create);
router.get('/test', testing);
router.post('/login', login);

module.exports = router;