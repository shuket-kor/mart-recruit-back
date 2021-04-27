const numeral = require('numeral');
const commonService = require('../services/common.js');

module.exports = {
    async list(req, res, next) {
        // 지역 리스트를 얻는다
        const regionList = await commonService.getWorkingRegion();

        res.render('martList', { 
            layout: 'layouts/default',
            title : req.app.get('baseTitle') + ' 마트관리',
            hostName: req.app.get('hostName'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0,
            regionList: regionList
          });
    }
}