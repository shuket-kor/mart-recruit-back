const numeral = require('numeral');
// const sampleService = require('../services/dashboard.js');

module.exports = {
    async dashboard(req, res, next) {
        res.render('dashboard', { 
            layout: 'layouts/default',
            title : 'test',
            hostName: req.app.get('host_name'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0
          });
    }
}
