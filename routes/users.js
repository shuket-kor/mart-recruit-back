var express = require('express');
var router = express.Router();

const {  list, remove, get, update } = require("../app/controllers/users")

router.get('/list', list);
router.get('/remove/:userseq', remove);
router.get('/get/:userseq', get);
router.post('/update', update);


module.exports = router;
