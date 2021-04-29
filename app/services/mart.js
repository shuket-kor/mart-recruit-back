const logger = require('../config/logger.js');
const got = require('got');

module.exports = class martService {
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/get?seq=${seq}`;

            const {body} = await got.get(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/get: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/get: ${error}`);
        }
    }  

    static async update(token, SEQ, NAME, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/update`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    SEQ: SEQ,
                    NAME: NAME,
                    REGNO: REGNO,
                    POSTCODE: POSTCODE,
                    ADDRESS: ADDRESS,
                    ADDRESSEXTRA: ADDRESSEXTRA,
                    CONTACT: CONTACT,
                    HRONAME: HRONAME,
                    HROCONTACT: HROCONTACT,
                    HRORANK: HRORANK,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/update: 마트 정보 업데이트 실패 SEQ: ${SEQ}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/update: ${error}`);
        }
    }  

    static async remove(token, SEQ, page) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/remove?seq=${SEQ}`;

            const {body} = await got.get(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/remove: ${SEQ}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/remove: ${error}`);
        }
    } 
    
    static async list(token, name, page, rowCount) {
        try {
            name = (name) ? name : '';

            var apiURL = `${process.env.APIHOST}/api/mart/list?name=${name}&page=${page}&rowCount=${rowCount}`;

            const {body} = await got.get(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/list: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/list: ${error}`);
        }
    }  
 

}