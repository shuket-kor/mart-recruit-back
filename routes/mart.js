var express = require('express');
var router = express.Router();

const { list } = require('../app/controllers/mart.js');

router.get('/', list);

module.exports = router;
