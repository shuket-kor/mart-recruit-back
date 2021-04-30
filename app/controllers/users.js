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
        const userLoginId = req.query.loginId
        const userType = (req.query.usertype) ? req.query.usertype : "A";
        const currentPage = (req.query.page) ? req.query.page : 1;

        console.log(currentPage)
        const returnData = await userService.list(secretKey, token, userType, userLoginId, currentPage, rowCount);
        
        res.render("userlist", {
            layout: "layouts/default",
            title: "유저 관리",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            list: returnData.data,
            moment: moment,
            searchId: req.query.loginId,
            userType: req.query.userType,
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
    // async create(req, res, next) {
    //     const body = req.body;
    //     let userCreate = await userService.userCreate(body);
    //     // console.log("완료 이다음 렌더 해야함.");
    //     res.render("user", {
    //         layout: "layouts/default",
    //         info: userCreate,
    //     });
    // },

    // // 유저 수정
    async update(req, res, next) {
        let userseq = req.params.userseq;
        let loginid = req.params.loginid;
        let active = req.params.active;
        let usertype = req.params.usertype;
        let token = req.cookies.xToken;
        let password = req.params.password;
        console.log(password);
        let userUpdate = await userService.update(secretKey, token, userseq, password,  active, loginid, usertype);
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
