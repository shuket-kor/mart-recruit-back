module.exports = {
    async dashboard(req, res, next) {
        res.render('dashboard', { 
            layout: 'layouts/default',
            title : '마트협회 구인구직 관리자',
            hostName: process.env.APIHOST,
            unreadNoticeCount: 0,
            userSeq: req.userSeq
          });
    }
}
