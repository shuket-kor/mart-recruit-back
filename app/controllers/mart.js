const moment = require('moment');
const martService = require('../services/mart.js');
const rowCount = 5;

module.exports = {
    
    // 한개의 마트를 가져온다.
    async get(req, res, next) {
        let martSEQ = req.query.seq;
        
        const returnData = await martService.get(req.cookies.xToken, martSEQ);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // 마트정보를 업데이트한다.
    async update(req, res, next) {
        const SEQ = req.body.SEQ;
        const NAME = req.body.NAME;
        const REGNO = req.body.REGNO;
        const POSTCODE = req.body.POSTCODE;
        const ADDRESS = req.body.ADDRESS;
        const ADDRESSEXTRA = req.body.ADDRESSEXTRA;
        const CONTACT = req.body.CONTACT;
        const HRONAME = req.body.HRONAME;
        const HROCONTACT = req.body.HROCONTACT;
        const HRORANK = req.body.HRORANK;
        
        const returnData = await martService.update(req.cookies.xToken, SEQ, NAME, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // 마트 로고 업데이트
    async updateLogo(req, res, next) {
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const LOGOFILE = location + "/" + req.body.LOGOFILE;
        
        const returnData = await martService.updateLogo(req.cookies.xToken, SEQ, LOGOFILE);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // 마트 리스트를 가져온다.
    async list(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const message = (req.query.message) ? req.query.message : 0;
        
        const returnData = await martService.list(req.cookies.xToken, req.query.name, currentPage, rowCount);

        res.render('martList', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 마트관리',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            searchName: req.query.name,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null,
            message: message
          });
    },

    // 마트를 삭제한다.
    async remove(req, res, next) {
        let martSEQ = req.query.seq;
        let currentPage = req.query.page;
        let name = req.query.name;
        
        const returnData = await martService.remove(req.cookies.xToken, martSEQ, currentPage);
        res.redirect(`/mart/list?name=${name}&page=${currentPage}${(returnData == martSEQ) ? '' : '&message=1'}`);
    }
}
