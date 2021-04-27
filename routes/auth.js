var express = require('express');
var router = express.Router();

const { login, loginProcess } = require('../app/controllers/auth.js');

router.get('/login', login);

router.post('/loginProcess', loginProcess);

module.exports = router;
