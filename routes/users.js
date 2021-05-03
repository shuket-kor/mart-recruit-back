var express = require('express');
var router = express.Router();

const {  list, remove, get, update, create } = require("../app/controllers/users")

router.get('/list', list);
router.get('/remove/:userseq', remove);
router.get('/get/:userseq', get);
router.post('/update/:userseq', update);
router.post('/create', create);


module.exports = router;
