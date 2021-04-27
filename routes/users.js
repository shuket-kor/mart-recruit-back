var express = require('express');
var router = express.Router();
const {  getuser, paging } = require("../app/controllers/users")

router.get('/list',getuser);
router.get('/list/:page', paging);

module.exports = router;
