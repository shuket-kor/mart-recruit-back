var express = require('express');
var router = express.Router();
const { verify } = require('../app/controllers/auth.js');

const { get, remove, certificate, clearCertificate, list } = require('../app/controllers/resume.js');


router.get('/get', verify, get);

router.get('/remove', verify, remove);

router.get('/certificate', verify, certificate);

router.get('/clearCertificate', verify, clearCertificate);

router.get('/list', verify, list);

module.exports = router;
