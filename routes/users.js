var express = require('express');
var router = express.Router();

const { verify } = require('../app/controllers/auth.js');
const {  list, remove, get, update, create, checkid } = require("../app/controllers/users")

router.get('/list', verify, list);

router.get('/get', verify, get);

router.post('/update', verify, update);

router.post('/remove', verify, remove);

router.post('/create', verify, create);

// 아이디 체크
router.post('/checkid', checkid);

module.exports = router;
