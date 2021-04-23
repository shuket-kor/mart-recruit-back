var express = require('express');
var router = express.Router();

const { dashboard } = require('../app/controllers/dashboard.js');

router.get('/', dashboard);

module.exports = router;
