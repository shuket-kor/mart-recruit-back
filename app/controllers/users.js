// const numeral = require('numeral');
const userService = require("../services/users.js");
const secretKey = require("../config/secretKey").secretKey;
const rowCount = 10;
const moment = require('moment');
module.exports = {

    // 유저 조회
    async list(req, res, next) {
        let token = req.cookies.xToken;

        // 검색을 이용할때 넘어오는 유저의 아이디
        const userLoginId = req.query.loginid
        const userType = (req.query.usertype) ? req.query.usertype : "A";
        const currentPage = (req.query.page) ? req.query.page : 1;

        // 유저 리스트를 가져온다.
        const returnData = await userService.list(secretKey, token, userType, userLoginId, currentPage, rowCount);

        res.render("userlist", {
            layout: "layouts/default",
            title: "마트인 - 한국마트협회 유저 관리",
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

        // 유저 한명의 데이터를 받아온다.
        const returnData = await userService.get(secretKey, req.cookies.xToken, seq);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData.data
        });
    },

    // 유저 생성
    async create(req, res, next) {
        let loginid = req.body.loginid;
        let active = req.body.active;
        let usertype = req.body.usertype;
        let password = req.body.password;
        let regno = (req.body.regno) ? req.body.regno : ""
        let martname = (req.body.martname) ? req.body.martname : ""

        // 유저(구직자, 마트관리자) 생성
        const userCreate = await userService.userCreate(password, active, loginid, usertype, regno, martname);

        res.json({
            result: (userCreate == null) ? 'fail' : 'success',
            data: userCreate
        });
    },
    // 아이디 중복체크
    async checkid(req, res, next) {
        let userId = req.body.loginid

        // 아이디 가 있는지 체크하고 결과를 true or false 로 반환함.
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

        // 유저 정보 업데이트
        let userUpdate = await userService.update(secretKey, token, userseq, password, active, loginid, usertype);

        res.json({
            result: (userUpdate == null) ? 'fail' : 'success'
        });
    },

    // 유저 삭제
    async remove(req, res, next) {
        let userseq = req.body.userseq;
        let token = req.cookies.xToken;

        // 유저 정보 삭제
        let userRemove = await userService.remove(secretKey, token, userseq);

        res.json({
            result: (userRemove == null) ? 'fail' : 'success'
        });
    },
};
