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
    // 유저 한명조회
    static async get(secretKey, token, seq) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/get/"+seq;
            else apiURL = `http://localhost:3000/api/users/get/`+seq;
            console.log(token);
            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    key:secretKey
                },
                responseType: 'json'
            });

            if (body.result === "success") {
                return body;
            } else {
                //실패
                logger.writeLog("error", `back - services/userGet: ${body}`);
                return null
            }
        } catch (error) {
            logger.writeLog("error", `back - services/userGet: ${error}`);
        }
    }
    // 유저 조회
        static async list(secretKey, token, userType, userLoginId, currentPage, rowCount) {
        try {
            
            userLoginId = (userLoginId) ? userLoginId : '';
            userType = (userType) ? userType : 'A';
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/list";
            else apiURL = `http://localhost:3000/api/users/list`;
            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    userLoginId: userLoginId,
                    page: currentPage,
                    rowCount: rowCount,
                    key:secretKey,
                    userType: userType
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

    // 유저 생성
    static async userCreate( password, active, loginid, usertype) {
        try {
            var apiURL = "";
            loginid = (loginid) ? loginid : '';
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/create";
            else apiURL = `http://localhost:3000/api/users/create`;
            const {body} = await got.post(apiURL, {
                json: {
                    active: active,
                    userId: loginid,
                    userType: usertype,
                    password:password
                },
                responseType: "json",
            });
            if (body.result === "success") {
                console.log("body.result === success");
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `back -services/userService/create: ${getUser.body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `back catch - services/userService/create: ${error}`);
        }
    }

    // 유저 수정
    static async update(secretKey, token, userseq, password, active, loginid, usertype) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/update/"+userseq;
            else apiURL = `http://localhost:3000/api/users/update/`+userseq;

            const {body} = await got.patch(apiURL, {
                headers: {
                    contentType: "application/json",
                    "User-Agent": "DEVICE-AGENT",
                    userAgent: "DEVICE-AGENT",
                    'Authorization': token
                },
                json: {
                    active: active,
                    userId: loginid,
                    userType: usertype,
                    seq: userseq,
                    key: secretKey,
                    password:password
                },
                responseType: "json",
            });
            if (body.result === "success") {
                console.log("body.result === success");
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `back - services/UserService/update: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `back - services/userService/update: ${error}`);
        }
    }
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
