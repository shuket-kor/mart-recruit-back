const noticeService = require('../services/notice.js');
const moment = require('moment');
const http = require('http-errors');
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
            hostName: req.app.get('apiHost'),
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
        const subject = req.body.subject;      
        const content = req.body.content;
        
        const createData = await noticeService.create(userSeq, subject, content);
        
        res.redirect('/notice/list');
        
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
        const subject = req.body.mdSubject;
        const content = req.body.mdContent;
        const seq = req.body.mdSeq;
    
        const updateData = await noticeService.update(userSeq, seq, subject, content);

        res.redirect('list');
        

    },

    // 공지사항 삭제
    async remove(req, res, next){
         const userSeq = req.userSeq;
        const seq = req.query.seq;
        
        const deleteData = await noticeService.remove(userSeq, seq);
        
        res.redirect('list');
    }


}; //end