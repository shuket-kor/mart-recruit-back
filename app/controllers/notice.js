const noticeService = require('../services/notice.js');
const moment = require('moment');
const http = require('http-errors');
const { get } = require('../services/mart.js');
const rowCount = 5;

module.exports = {
    // 공지사항 리스트 갖고오기
    async list(req, res, next) {

        //const seq = req.query.seq;
        const currntPage = (req.query.page) ? req.query.page : 1;

        const noticeData = await noticeService.list(currntPage, rowCount);
        //console.log(noticeData);
        res.render('noticeList', {
            layout: 'layouts/default',
            moment:moment,
            //totalCount: noticeData.totalCount,
            // noticedata.list = null totalcont=0 ,
            totalCount: (noticeData.list) ? noticeData.totalCount : 0,
            userSeq: req.userSeq,
            rowCount: rowCount,
            title : req.app.get('baseTitle') + ' 공지사항 관리',
            hostName: process.env.APIHOST,
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount:0,
            page: currntPage,
            list: noticeData.list
            //list: (noticeData) ? noticeData.list :0
        });
    },

    // 공지사항 추가
    async create(req, res, next) {

        const userSeq = req.userSeq;
        const SUBJECT = req.body.SUBJECT;      
        const CONTENT = req.body.CONTENT;
        console.log(SUBJECT);
        console.log(CONTENT);
        
        const createData = await noticeService.create(userSeq, SUBJECT, CONTENT);
        
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

        const userSeq = req.userSeq;
        const SEQ = req.body.SEQ;
        const SUBJECT = req.body.SUBJECT;
        const CONTENT = req.body.CONTENT;
        
        const updateData = await noticeService.update(userSeq, SEQ, SUBJECT, CONTENT);

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
        
        res.redirect('list');
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