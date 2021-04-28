// const numeral = require('numeral');
const userService = require("../services/users.js");
const rowCount = 10;
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

    // // 유저 조회
    // async getuser(req, res, next) {
    //     let token = req.cookies.xToken;
    //     console.log("token ? ? " + token);
    //     let getuser = await userService.getuser(token);

    //     res.render("userlist", {
    //         layout: "layouts/default",
    //         info: getuser,
    //     });
    // },
    async list(req, res, next) {
        // let token = req.cookies.xToken;
        // console.log("token ? ? " + token);
        const currentPage = (req.query.page) ? req.query.page : 1;

        // const returnData = await userService.list(req.cookies.xToken, req.query.name, currentPage, rowCount);
        const returnData = await userService.list(req.query.name, currentPage, rowCount);
        // console.log(returnData.totalCount);
        res.render("userlist", {
            layout: "layouts/default",
            title: "유저 관리",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            list: returnData.data,
            searchName: req.query.name,
            totalCount: returnData.totalCount,
            rowCount: rowCount,
            page: currentPage,
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
    // async update(req, res, next) {
    //     const body = req.body;
    //     let userUpdate = await userService.userUpdate(body);
    //     // console.log("완료 이다음 렌더 해야함.");
    //     res.render("userupdate", {
    //         layout: "layouts/default",
    //         info: userUpdate,
    //     });
    // },

    // // 유저 삭제
    // async delete(req, res, next) {
    //     const body = req.body;
    //     let userDelete = await userService.userDelete(body);
    //     // console.log("완료 이다음 렌더 해야함.");
    //     res.render("userdelete", {
    //         layout: "layouts/default",
    //         info: userDelete,
    //     });
    // },
};
