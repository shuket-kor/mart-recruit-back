const numeral = require('numeral');
const commonService = require('../services/common.js');

module.exports = {
    async list(req, res, next) {
        // 지역 리스트를 얻는다
        const regionList = await commonService.getWorkingRegion();

        res.render('recruitList', { 
            layout: 'layouts/default',
            title : req.app.get('baseTitle') + ' 구인공고 관리',
            hostName: req.app.get('apiHost'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0,
            regionList: regionList
          });
    }
}
