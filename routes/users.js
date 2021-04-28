var express = require('express');
var router = express.Router();

const {  list } = require("../app/controllers/users")

router.get('/list',list);


module.exports = router;
