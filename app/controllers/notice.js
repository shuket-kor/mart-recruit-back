const noticeService = require('../services/notice.js');
const moment = require('moment');
const http = require('http-errors');
const { get } = require('../services/mart.js');
const { check, validationResult } = require('express-validator');
const rowCount = 5;

module.exports = {
    // 공지사항 리스트 갖고오기
    async list(req, res, next) {

        const currntPage = (req.query.page) ? req.query.page : 1;

        const noticeData = await noticeService.list(currntPage, rowCount);

        res.render('noticeList', {
            layout: 'layouts/default',
            moment:moment,
            totalCount: (noticeData.list) ? noticeData.totalCount : 0,
            userSeq: req.userSeq,
            rowCount: rowCount,
            title : req.app.get('baseTitle') + ' 공지사항 관리',
            hostName: process.env.APIHOST,
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount:0,
            page: currntPage,
            list: noticeData.list

        });
    },

    // 공지사항 추가
    async create(req, res, next) {

        await check('SUBJECT')
            .isLength({  max: 50 })
            .withMessage('제목 창에 입력 하실 수 있는 글자수는 최대 50 자 입니다.')
            .trim()
            .notEmpty()
            .withMessage('제목을 입력하여 주세요')
            .run(req);
        await check('CONTENT')
            .isLength({  max: 1968 })
            .withMessage('내용 창에 입력 하실 수 있는 글자수는 최대 1970 자 입니다.')
            .notEmpty()
            .withMessage('내용을 입력하여 주세요')
            .custom( (value) => '<p><br></p>' !== value )
            .withMessage('내용을 입력하여 주세요')
            .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({
                errors: result.array(),
            });
            return;
        }

        const userSeq = req.userSeq;
        const subject = req.body.SUBJECT;      
        const content = req.body.CONTENT;
        
        const createData = await noticeService.create(userSeq, subject, content);
        
        
        res.json({
            
            result: (createData == null) ? 'fail' : 'success',
            data: createData
        });
        
    },

    // 공지사항 자세히 보기
    async view(req, res, next) {
        const userSeq = req.userSeq;
        const seq = req.query.seq;
        
        const viewData = await noticeService.view(userSeq, seq);
        
        res.json({
            result: (viewData == null) ? 'fail' : 'success',
            data: viewData
        });
    },

    // 공지사항 수정
    async update(req, res, next) {
        
        await check('SUBJECT')
            .isLength({  max: 50 })
            .withMessage('제목 창에 입력 하실 수 있는 글자수는 최대 50 자 입니다.')
            .trim()
            .notEmpty()
            .withMessage('제목을 입력하여 주세요')
            .run(req);
        await check('CONTENT')
            .isLength({  max: 1968 })
            .withMessage('내용 창에 입력 하실 수 있는 글자수는 최대 1970 자 입니다.')
            .notEmpty()
            .withMessage('내용을 입력하여 주세요')
            .custom( (value) => '<p><br></p>' !== value )
            .withMessage('내용을 입력하여 주세요')
            .run(req);
        
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({
                errors: result.array()
            });
            return;
        }

        const userSeq = req.userSeq;
        const seq = req.body.SEQ;
        const subject = req.body.SUBJECT;
        const content = req.body.CONTENT;

        const updateData = await noticeService.update(userSeq, seq, subject, content);  
        
        res.json({
            result: (updateData == null) ? 'fail' : 'success',
            data: updateData
        });

    },

    // 공지사항 삭제
    async remove(req, res, next){
        const userSeq = req.userSeq;
        const seq = req.query.seq;
        
        const deleteData = await noticeService.remove(userSeq, seq);
        
        res.json({
            result: (deleteData == null) ? 'fail' : 'success',
            data: deleteData
        });
    },

    // 공지사항 겟
    async get(req, res, next) {
        const userSeq = req.userSeq;
        const seq = req.query.seq;
        
        const returnData = await noticeService.get(userSeq, seq);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    }


}; //end