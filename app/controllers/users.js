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
        const userLoginId = req.query.loginid
        const userType = (req.query.usertype) ? req.query.usertype : "A";
        const currentPage = (req.query.page) ? req.query.page : 1;

        const returnData = await userService.list(secretKey, token, userType, userLoginId, currentPage, rowCount);
        res.render("userlist", {
            layout: "layouts/default",
            title: "유저 관리",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            list: returnData.data.list,
            moment: moment,
            searchId: userLoginId,
            userType: userType,
            totalCount: returnData.data.totalCount,
            rowCount: rowCount,
            page: currentPage,
        });
    },

    // 유저 한명 조회
    async get(req, res, next) {
        let seq = req.query.userseq;

        const returnData = await userService.get(secretKey, req.cookies.xToken, seq);
        // console.log(returnData);
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
        res.json({
            result: (userCreate == null) ? 'fail' : 'success',
            data: userCreate
        });
    },
    // 아이디 중복체크
    async checkid(req, res, next){
        let userId = req.body.loginid
        let userCheckId = await userService.checkid(userId);
        res.json({
            result: (userCheckId == null) ? 'fail' : 'success',
            data: userCheckId
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

        let userUpdate = await userService.update(secretKey, token, userseq, password,  active, loginid, usertype);
        res.json({
            result: (userUpdate == null) ? 'fail' : 'success',
            // data: userUpdate.data
        });
        // res.redirect('/user/list')
    },

    // 유저 삭제
    async remove(req, res, next) {
        let userseq = req.body.userseq;
        let token = req.cookies.xToken;
        let userRemove = await userService.remove(secretKey, token, userseq);

        res.json({
            result: (userRemove == null) ? 'fail' : 'success',
            // data: userRemove.data
        });
        // res.redirect('/user/list')

    },
};
