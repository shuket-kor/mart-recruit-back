var express = require('express');
var router = express.Router();

const {  list, remove, get, update, create } = require("../app/controllers/users")

router.get('/list', list);
router.get('/get/:userseq', get);
router.post('/update/:userseq', update);
router.post('/remove/:userseq', remove);
router.post('/create', create);


module.exports = router;
