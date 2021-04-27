module.exports = {
    async dashboard(req, res, next) {
        res.render('dashboard', { 
            layout: 'layouts/default',
            title : 'test',
            hostName: req.app.get('apiHost'),
            mediaPath: req.app.get('mediaPath'),
            unreadNoticeCount: 0,
            userSeq: req.userSeq
          });
    }
}
