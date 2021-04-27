const numeral = require('numeral');
const moment = require('moment');
const martService = require('../services/mart.js');
const rowCount = 5;

module.exports = {
    async list(req, res, next) {
        // 지역 리스트를 얻는다
        const currentPage = (req.query.page) ? req.query.page : 1;
        
        const returnData = await martService.list(req.cookies.xToken, req.query.name, currentPage, rowCount);

        res.render('martList', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 마트관리',
            hostName: req.app.get('apiHost'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0,
            searchName: req.query.name,
            totalCount: returnData.totalCount,
            rowCount: rowCount,
            page: currentPage,
            list: returnData.list
          });
    }
}
