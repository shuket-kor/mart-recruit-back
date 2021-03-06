const authService = require('../services/auth.js');

module.exports = {
    async login(req, res, next) {
        var resultCode = 0; // 0: 정상 1 :로그인 에러 후
        if (req.query.result) {
          resultCode = req.query.result;
        }

        res.render('loginForm', { 
            layout: 'layouts/full',
            title : req.app.get('baseTitle') + ' 로그인',
            mediaPath: req.app.get('mediaPath'),
            resultCode: resultCode
          });
    },

    async loginProcess(req, res, next) {
      // 인증서버로부터 인증 정보를 받는다.
      const token = await authService.authorizatoin(req.body.userId, req.body.password);
      // 유저타입을 확인해서 마트유저와 유저는 권한없음으로 접속 못하게 만듦
      const getUser = await authService.getUser(req.body.userId)

      console.log(getUser);
      if (token) {
        console.log(getUser.USERTYPE);
        if(getUser.USERTYPE == 'U' || getUser.USERTYPE == 'M'){
            res.redirect("/auth/login?result=3");  
        }else if(getUser.USERTYPE == 'A'){
          res.cookie("xToken", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
          res.redirect("/");
        }
      } else {
        res.redirect("/auth/login?result=1");
      }
    },

    async verify(req, res, next) {
      const userSeq = await authService.verify(req);
      
      if (userSeq) {
        req.userType = userSeq[2];
        if(req.userType != 'A'){
          res.cookie('xToken', {expires: 0});
          res.redirect("/auth/login?result=3");
        }
        // 사용자 정보를 얻어서 보관
        req.userSeq = userSeq[0];
        req.userLoginId = userSeq[1]

        next();
      }        
      else
        res.redirect("/auth/login");
    },

    async logout(req, res, next) {
      res.cookie('xToken', {expires: 0});

      res.redirect("/");
    }
}
