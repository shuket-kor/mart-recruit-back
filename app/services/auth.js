const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class authService {
    static async authorizatoin(userId, password) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/login`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                },
                responseType: "json",
            });
            if (body.result === "success") {
                logger.writeLog('info', `services/authService/authorizatoin: ${userId}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body.data.token;
            } else {
                //실패
                logger.writeLog("error", `services/authService/authorizatoin: login fail - ${userId}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authService/authorizatoin: system error - ${error}`);
            return null;
        }
    }

    static async getUser(userId) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/getUser`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId
                },
                responseType: "json",
            });
            if (body.result === "success") {
                logger.writeLog('info', `services/authService/getUser: ${userId}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/authService/getUser: login fail - ${userId}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authService/getUser: system error - ${error}`);
            return null;
        }
    }
    
    static async verify(req) {
        try {
            var apiURL = `${process.env.APIHOST}/api/auth`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': req.cookies.xToken
                },
                json: {
                    key: secretKey,
                },
                responseType: "json",
            });

            if (body.result === "success") {
                logger.writeLog('info', `services/authService/verify: ${body.data}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/authService/verify: login fail`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authService/verify: system error - ${error}`);
            return null;
        }
    }
}