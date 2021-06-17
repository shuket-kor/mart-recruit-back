const logger = require("../config/logger.js");
const got = require("got");


module.exports = class userService {
    // 유저 한명조회
    static async get(secretKey, token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/get`;
            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    key:secretKey,
                    seq: seq
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
            var apiURL = `${process.env.APIHOST}/api/users/list`;
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
    static async userCreate( password, active, loginid, usertype, regno, martname) {
        try {
            loginid = (loginid) ? loginid : '';
            var apiURL = `${process.env.APIHOST}/api/users/create`;
            const {body} = await got.post(apiURL, {
                json: {
                    active: active,
                    userId: loginid,
                    userType: usertype,
                    password:password,
                    bizNo: regno,
                    martName: martname
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
    // 
    static async checkid(userId) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/checkid`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId
                },
                responseType: "json",
            });
            console.log(body)
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/create: `);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/create: ${error}`);
        }
    }
    
    // 유저 수정
    static async update(secretKey, token, userseq, password, active, loginid, usertype) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/update/`;

            const {body} = await got.post(apiURL, {
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
            var apiURL = `${process.env.APIHOST}/api/users/remove/`;
            console.log(apiURL);
            const {body} = await got.post(apiURL, {
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
            if (body.result === "success") {
                console.log("body.result === success");
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `BACK - services/remove: ${body.result}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `BACK - services/remove: ${error}`);
        }   
    }
};
