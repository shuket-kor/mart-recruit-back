var express = require('express');
var router = express.Router();

const { list } = require('../app/controllers/recruit.js');

router.get('/list', list);

module.exports = router;
