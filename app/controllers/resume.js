const moment = require('moment');
const commonService = require('../services/common.js');
const resumeService = require('../services/resume.js');
const rowCount = 5;

module.exports = {
    async get(req, res, next) {
        const seq = req.query.seq;
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const certificate = (req.query.certificate) ? req.query.certificate : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const name = (req.query.name) ? req.query.name : '';
        
        const resumeInfo = await resumeService.get(req.cookies.xToken, seq);
        const careerList = (resumeInfo) ? await resumeService.listCareer(req.cookies.xToken, seq) : null;

        res.render('resumeView', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 이력서 상세',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            regions: regions,
            jobKinds: jobKinds,
            name: name,
            certificate: certificate,
            page: currentPage,
            resumeInfo: resumeInfo,
            careerList: careerList
        });
    },
    
    async remove(req, res, next) {
        const seq = (req.query.seq) ? req.query.seq : null;
       
        const returnData = await resumeService.remove(req.cookies.xToken, seq);

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

    async certificate(req, res, next) {
        const seq = (req.query.seq) ? req.query.seq : null;
       
        const returnData = await resumeService.certificate(req.cookies.xToken, seq);

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

    async clearCertificate(req, res, next) {
        const seq = (req.query.seq) ? req.query.seq : null;
       
        const returnData = await resumeService.clearCertificate(req.cookies.xToken, seq);

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
        const certificate = (req.query.certificate) ? req.query.certificate : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const name = (req.query.name) ? req.query.name : '';
        
        // 지역 리스트를 얻는다
        const regionList = await commonService.getWorkingRegion();
        // 직종 리스트를 얻는다
        const jobKindList = await commonService.getJobKind();
        const returnData = await resumeService.list(req.cookies.xToken, regions, name, jobKinds, certificate, currentPage, rowCount);
        console.log(returnData.list);
        res.render('resumeList', { 
            layout: 'layouts/default',
            moment: moment,
            title : req.app.get('baseTitle') + ' 이력서 관리',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            regionList: regionList,
            regions: regions,
            jobKindList: jobKindList,
            jobKinds: jobKinds,
            name: name,
            certificate: certificate,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null
        });
    }
}
