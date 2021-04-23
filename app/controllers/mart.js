const numeral = require('numeral');
// const sampleService = require('../services/dashboard.js');

module.exports = {
    async list(req, res, next) {
        res.render('list', { 
            layout: 'layouts/default',
            title : req.app.get('baseTitle') + ' 마트관리',
            hostName: req.app.get('hostName'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0
          });
    }
}
