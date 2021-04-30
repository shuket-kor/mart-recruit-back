const logger = require("../config/logger.js");
const got = require("got");


module.exports = class userService {
    // 유저 로그인
    // static async login(body) {
    //     try {
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/login";
    //         else apiURL = `http://localhost:3000/api/users/login`;

    //         const userData = await got.post(apiURL, {
    //             json: {
    //                 user_id: body.user_id,
    //                 password: body.password,
    //             },
    //             responseType: "json",
    //         });
    //         console.log("userData 는 : " + userData.body);
    //         console.log(JSON.stringify(userData.body));

    //         if (userData.body.result === "success") {
    //             console.log("userData.body.result === success");
    //             // console.log(userData.body.data)
    //             // console.log(userData.body.token)
    //             return userData.body;
    //         } else {
    //             //실패
    //             console.log("userData.body.result !== success");
    //             logger.writeLog("error", `services/userService/login: ${body}`);
    //             return userData.resultData;
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `services/tokenService/login: ${error}`);
    //     }
    // }
    // // 유저 조회
    // static async getuser(token) {
    //     try {
    //         // console.log("getUser Service 들어옴"+token)
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users";
    //         else apiURL = `http://localhost:3000/api/users`;

    //         const getUser = await got.get(apiURL, {
    //             headers: {
    //                 contentType: "application/json",
    //                 "User-Agent": "DEVICE-AGENT",
    //                 userAgent: "DEVICE-AGENT",
    //                 Authorization: token,
    //             }
    //         });
    //         console.log(getUser.body);
    //         let userList = JSON.parse(getUser.body);
    //         console.log(typeof userList);
    //         if (userList.result === "success") {
    //             console.log("body.result === success");
    //             return userList;
    //         } else {
    //             //실패
    //             console.log("실패~~~~~~~~~~~~~~~~~~");
    //             logger.writeLog("error", `services/getUserService/login: ${getUser.body.result}`);
    //             return body.resultData;
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `services/getUserService/login: ${error}`);
    //     }
    // }

        static async list(secretKey, token, name, page, rowCount) {
        try {
            name = (name) ? name : '';
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/list";
            else apiURL = `http://localhost:3000/api/users/list`;
            console.log(token);
            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    name: name,
                    page: page,
                    rowCount: rowCount,
                    key:secretKey
                },
                responseType: 'json'
            });

            if (body.result === "success") {
                return body;
            } else {
                //실패
                logger.writeLog("error", `back - services/userlist: ${body}`);
                return null
            }
        } catch (error) {
            logger.writeLog("error", `back - services/userlist: ${error}`);
        }
    }

    // static async paging(pageNumber) {
    //     try {
    //         console.log("paging Service 들어옴");
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/paging/"+pageNumber;
    //         else apiURL = `http://localhost:3000/api/users/paging/`+pageNumber;

    //         var {body} = await got.get(apiURL, {
    //             headers: {
    //                 contentType: "application/json",
    //                 "User-Agent": "DEVICE-AGENT",
    //                 userAgent: "DEVICE-AGENT",
    //                 'Authorization': token
    //             },
    //             responseType: 'json'
    //         });
    //         if (body.result === "success") {
    //             console.log("body.result === success");
    //             console.log(body);
    //             return body;
    //         } else {
    //             //실패
    //             logger.writeLog("error", `back - services/paging ${userList.body.data}`);
    //             return null
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `back - services/paging: ${error}`);
    //     }
    // }
    
    // // 유저 생성
    // static async userCreate(body) {
    //     try {
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users";
    //         else apiURL = `http://localhost:3000/api/users`;

    //         const createUser = await got.post(apiURL, {
    //             json: {
    //                 user_id: body.user_id,
    //                 password: body.password,
    //                 usertype: body.user_type,
    //                 active: body.active,
    //             },
    //             responseType: "json",
    //         });
    //         console.log("createUser.body ? ? ? " + createUser.body);
    //         // let userList = JSON.parse(createUser.body);
    //         console.log(typeof createUser);
    //         if (createUser.body.result === "success") {
    //             console.log("body.result === success");
    //             return createUser.body.data;
    //         } else {
    //             //실패
    //             logger.writeLog("error", `services/getUserService/create: ${getUser.body.result}`);
    //             return createUser.body;
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `services/getUserService/create: ${error}`);
    //     }
    // }
    // // 유저 수정
    // static async userUpdate(body) {
    //     try {
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/update";
    //         else apiURL = `http://localhost:3000/api/users/update`;

    //         const updateUser = await got.patch(apiURL, {
    //             json: {
    //                 user_id: body.user_id,
    //                 password: body.password,
    //                 usertype: body.user_type,
    //                 active: body.active,
    //                 seq: body.seq,
    //             },
    //             responseType: "json",
    //         });
    //         console.log("updateUser.body ? ? ? " + updateUser.body);
    //         if (updateUser.body.result === "success") {
    //             console.log("body.result === success");
    //             return updateUser.body.data;
    //         } else {
    //             //실패
    //             logger.writeLog("error", `services/getUserService/update: ${getUser.body.result}`);
    //             return createUser.body;
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `services/getUserService/update: ${error}`);
    //     }
    // }
    // 유저 삭제
    static async remove(secretKey, token, userseq) {
        try {
            
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/remove/"+ userseq;
            else apiURL = `http://localhost:3000/api/users/remove/` + userseq;
            console.log(apiURL);
            const {body} = await got.patch(apiURL, {
                headers: {
                    contentType: "application/json",
                    "User-Agent": "DEVICE-AGENT",
                    userAgent: "DEVICE-AGENT",
                    'Authorization': token
                },
                json: {
                    seq: userseq,
                    key: secretKey
                },
                responseType: "json"
            });
            console.log(body);
            if (body.result === "success") {
                console.log("body.result === success");
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/removeUserService/delete: ${body.result}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `services/removeService/delete: ${error}`);
        }   
    }
};
