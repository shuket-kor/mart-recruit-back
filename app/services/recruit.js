const logger = require('../config/logger.js');
const got = require('got');
const secretKey = require('../config/secretKey').secretKey;

module.exports = class recruitService {
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/get`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    seq: seq,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/get: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/get: ${error}`);
        }
    } 

    static async remove(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/remove`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    seq: seq,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/remove: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/remove: ${error}`);
        }
    } 

    static async list(token, regions, name, active, page, rowCount) {
        try {
            name = (name) ? name : '';

            var apiURL = `${process.env.APIHOST}/api/recruit/listForAdmin`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    regions: regions,
                    name: name,
                    active: active,
                    page: page,
                    rowCount: rowCount,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/list: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/list: ${error}`);
            return null;
        }
    }  
 

}