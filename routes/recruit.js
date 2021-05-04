var express = require('express');
var router = express.Router();
const { verify } = require('../app/controllers/auth.js');

const { get, remove, list } = require('../app/controllers/recruit.js');

router.get('/get', verify, get);

router.get('/remove', verify, remove);

router.get('/list', verify, list);

module.exports = router;
