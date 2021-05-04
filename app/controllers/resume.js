const moment = require('moment');
const commonService = require('../services/common.js');
const resumeService = require('../services/resume.js');
const rowCount = 5;

module.exports = {
    async list(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const certificate = (req.query.cert) ? req.query.cert : 'N';

        // 지역 리스트를 얻는다
        const regionList = await commonService.getWorkingRegion();
        const resumeList = await resumeService.list(req.cookies.xToken, regions, certificate, currentPage, rowCount);

        res.render('resumeList', { 
            layout: 'layouts/default',
            title : req.app.get('baseTitle') + ' 이력서 관리',
            hostName: req.app.get('apiHost'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0,
            regionList: regionList
          });
    }
}
