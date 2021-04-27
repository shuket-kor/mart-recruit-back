// const numeral = require('numeral');
const userService = require("../services/users.js");

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
    async getuser(req, res, next) {
        // let token = req.cookies.xToken;
        // console.log("token ? ? " + token);
        let getUserList = await userService.getuser();

        res.render("userlist", {
            layout: "layouts/default",
            title: "test",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            // id:getuser.data[i].LOGINID,
            // usertype:getuser.data[i].USERTYPE,
            // list: JSON.stringify(getuser.data)
            list: getUserList,
        });
    },
    async paging(req, res, next) {
        let pageNumber = req.params.page
        console.log("현제 페이지의 넘버 ? "+pageNumber);
        let page = await userService.paging(pageNumber);
        console.log("페이징 진입")
        console.log(JSON.stringify(page))
        res.render("userlist", {
            layout: "layouts/default",
            title: "test",
            hostName: req.app.get("host_name"),
            mediaPath: req.app.get("mediaPath"),
            unreadNoticeCount: 0,
            // id:getuser.data[i].LOGINID,
            // usertype:getuser.data[i].USERTYPE,
            // list: JSON.stringify(getuser.data)
            list: page.data,
            pnTotal: page.pnTotal,
            pnEnd: page.pnEnd,
            pnSize: page.pnSize,
            pageNum: page.pageNum,
            TotalNum : page.TotalNum,
            showUser: page.showUser,
            totalSet: page.totalSet,
            curSet : page.curSet,
            pntStart : page.pntStart
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
