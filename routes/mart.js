var express = require('express');
var router = express.Router();
const { verify } = require('../app/controllers/auth.js')
const { get, update, updateLogo, remove, list } = require('../app/controllers/mart.js');

router.get('/get', get);

router.post('/update', verify, update);

router.post('/updateLogo', verify, updateLogo);

router.get('/remove', verify, remove);

router.get('/list', list);

module.exports = router;
