// const numeral = require('numeral');
const userService = require("../services/users.js");
const secretKey = require("../config/secretKey").secretKey;
const rowCount = 10;
const moment = require('moment');
module.exports = {
    //  // 유저 로그인
    // async login(req, res, next) {
    //     const body = req.body;
    //     let userInfo = await userService.login(body);
    //     // console.log(userInfo.token);
    //     res.cookie("xToken", userInfo.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    //     res.render("user", {
    //         layout: "layouts/default",
    //         info: userInfo,
    //     });
    // },

    // 유저 조회
    async list(req, res, next) {
        let token = req.cookies.xToken;
        console.log(req.query.loginid);
        const userLoginId = req.query.loginid
        const userType = (req.query.usertype) ? req.query.usertype : "A";
        const currentPage = (req.query.page) ? req.query.page : 1;
        const returnData = await userService.list(secretKey, token, userType, userLoginId, currentPage, rowCount);
        console.log("유저타입은 ? ? ? ? " + userType)
        res.render("userlist", {
            layout: "layouts/default",
            title: "유저 관리",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            list: returnData.data,
            moment: moment,
            searchId: userLoginId,
            userType: userType,
            totalCount: returnData.totalCount,
            rowCount: rowCount,
            page: currentPage,
        });
    },

    // 유저 한명 조회
    async get(req, res, next) {
        let userSEQ = req.params.userseq;
        console.log(userSEQ);
        const returnData = await userService.get(secretKey, req.cookies.xToken, userSEQ);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData.data
        });
    },

    // // 유저 생성
    async create(req, res, next) {
        let loginid = req.body.loginid;
        let active = req.body.active;
        let usertype = req.body.usertype;
        let password = req.body.password;

        let userCreate = await userService.userCreate( password,  active, loginid, usertype);
        console.log("@@@@@@@@@");
        console.log(userCreate);
        res.json({
            result: (userCreate == null) ? 'fail' : 'success',
            data: userCreate
        });
    },

    // // 유저 수정
    async update(req, res, next) {
        let userseq = req.body.userseq;
        let loginid = req.body.loginid;
        let active = req.body.active;
        let usertype = req.body.usertype;
        let token = req.cookies.xToken;
        let password = req.body.password;
        // console.log("백오피스 컨트롤러 토큰 ? ? "+token);
        let userUpdate = await userService.update(secretKey, token, userseq, password,  active, loginid, usertype);
        res.json({
            result: (userUpdate == null) ? 'fail' : 'success',
            data: userUpdate.data
        });
        res.redirect('/user/list')
    },

    // 유저 삭제
    async remove(req, res, next) {
        let userseq = req.params.userseq;
        let token = req.cookies.xToken;
        let userDelete = await userService.remove(secretKey, token, userseq);

        res.redirect('/user/list')

    },
};
