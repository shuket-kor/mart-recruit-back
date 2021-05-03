var express = require('express');
var router = express.Router();

const { get, remove, list } = require('../app/controllers/recruit.js');

router.get('/get', get);

router.get('/remove', remove);

router.get('/list', list);

module.exports = router;
