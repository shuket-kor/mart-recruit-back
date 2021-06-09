const numeral = require('numeral');
const analyticsService = require('../services/analytics.js');

module.exports = {
    async dashboard(req, res, next) {

        const returnData = await analyticsService.getDashboard(req.cookies.xToken);

        console.log(returnData[0]);
        res.render('dashboard', { 
            layout: 'layouts/default',
            title : '마트협회 구인구직 관리자',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            userSeq: req.userSeq,
            numeral: numeral,
            dashboardData : returnData[0]
          });
    }
}
