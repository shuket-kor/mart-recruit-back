var express = require('express');
var router = express.Router();

const {  list, remove } = require("../app/controllers/users")

router.get('/list', list);
router.get('/remove/:userseq', remove)


module.exports = router;
