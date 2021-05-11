var express = require('express');
var router = express.Router();

const { verify } = require('../app/controllers/auth.js')
const { list, create, view, remove, update } = require('../app/controllers/notice.js')

// 공지사항 리스트
router.get('/list', verify, list);

// 공지사항 추가
router.post('/create', verify, create);

// 공지사항 자세히 보기
router.get('/view', verify, view);

// 공지사항 수정
router.post('/update', verify, update);

// 공지사항 삭제
router.get('/remove', verify, remove);



module.exports = router;
