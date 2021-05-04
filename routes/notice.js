var express = require('express');
var router = express.Router();

const { noticeList, noticeCreate, noticeView, noticeDelete, noticeUpdate } = require('../app/controllers/notice.js')

// 공지사항 리스트
router.get('/list', noticeList);

// 공지사항 추가
router.post('/create', noticeCreate);

// 공지사항 자세히 보기
router.get('/view', noticeView);

// 공지사항 수정
router.post('/update', noticeUpdate);

// 공지사항 삭제
router.get('/remove', noticeDelete);



module.exports = router;
