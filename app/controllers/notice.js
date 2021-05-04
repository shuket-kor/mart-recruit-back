const noticeService = require('../services/notice.js');
const moment = require('moment');
const rowCount = 5;

module.exports = {
    // 공지사항 리스트 갖고오기
    async noticeList(req, res, next) {
        
        const currntPage = (req.query.page) ? req.query.page : 1;

        const noticeData = await noticeService.list(currntPage, rowCount);
        
        res.render('noticeList', {
            layout: 'layouts/default',
            moment:moment,
            totalCount: noticeData.totalCount,
            rowCount: rowCount,
            title : req.app.get('baseTitle') + ' 공지사항 관리',
            hostName: req.app.get('apiHost'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount:0,
            page: currntPage,
            list: noticeData.list
        });
    },

    // 공지사항 추가
    async noticeCreate(req, res, next) {
        const userSeq = req.userSeq;
        const SUBJECT = req.body.subject;      
        const CONTENT = req.body.content;
        
        const createData = await noticeService.create(userSeq, SUBJECT, CONTENT);
        /*res.json({
            result: (createData != null) ? 'success' : 'fail',
            data: createData
        });*/
        res.redirect('/notice/list');
        
    },

    // 공지사항 자세히 보기
    async noticeView(req, res, next) {
        const seq = req.query.seq;
        
        const viewData = await noticeService.view(seq);
        
        res.json({
            result: (viewData == null) ? 'fail' : 'success',
            data: viewData
        });
    },

    // 공지사항 수정
    async noticeUpdate(req, res, next) {
        
        const SUBJECT = req.body.mdSubject;
        const CONTENT = req.body.mdContent;
        const seq = req.body.mdSeq;
        console.log(req);
        const updateData = await noticeService.update(seq, SUBJECT, CONTENT);

        res.json({
            result: (updateData == null) ? 'fail' : 'success',
            data: updateData
        }); 

    },

    // 공지사항 삭제
    /*async noticeDelete(req, res, next){
        const seq = req.query.seq;
        
        const deleteData = await noticeService.remove(seq);
        
        res.json({
            result: (deleteData == null) ? 'fail' : 'success',
            data: deleteData
        }); 
    }*/

 




}; //end