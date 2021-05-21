const moment = require('moment');
const commonService = require('../services/common.js');
const martService = require('../services/mart.js');
const recruitService = require('../services/recruit.js');
const resumeService = require('../services/resume.js');
const rowCount = 20;

module.exports = {
    async get(req, res, next) {
        const seq = (req.query.seq) ? req.query.seq : null;
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const name = (req.query.name) ? req.query.name : '';
        const active = (req.query.active) ? req.query.active : '';

        const recruitInfo = (seq) ? await recruitService.get(req.cookies.xToken, seq) : null;
        const resumeList = (recruitInfo) ? await resumeService.listForRecruit(req.cookies.xToken, seq) : null;
        const martInfo = (recruitInfo) ? await martService.get(req.cookies.xToken, recruitInfo.MART_SEQ) : null;
        res.render('recruitView', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 구인공고 상세',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            regions: regions,
            name: name,
            active: active,
            page: currentPage,
            martInfo: martInfo,
            recruitInfo: recruitInfo,
            resumeList: resumeList
          });
    },

    async remove(req, res, next) {
        const seq = (req.query.seq) ? req.query.seq : null;
       
        const returnData = await recruitService.remove(req.cookies.xToken, seq);

        if (returnData) {           
            res.status(200).json({
                result: 'success',
                data: seq
            });
        } else {
            res.status(200).json({
                result: 'fail',
                data: seq
            });            
        }
    },

    async list(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const name = (req.query.name) ? req.query.name : '';
        const active = (req.query.active) ? req.query.active : '';

        // 지역 리스트를 얻는다
        const regionList = await commonService.getWorkingRegion();       
        const returnData = await recruitService.list(req.cookies.xToken, regions, name, active, currentPage, rowCount);
        res.render('recruitList', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 구인공고 관리',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            regionList: regionList,
            regions: regions,
            name: name,
            active: active,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null
          });
    }
}
