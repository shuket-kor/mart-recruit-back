var express = require('express');
var router = express.Router();

const { get, update, remove, list } = require('../app/controllers/mart.js');

router.get('/get', get);

router.post('/update', update);

router.get('/remove', remove);

router.get('/list', list);

module.exports = router;
