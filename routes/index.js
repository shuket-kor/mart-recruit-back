var express = require('express');
var router = express.Router();

const { dashboard } = require('../app/controllers/dashboard.js');
const { verify } = require('../app/controllers/auth.js');

router.get('/', verify, dashboard);


module.exports = router;
