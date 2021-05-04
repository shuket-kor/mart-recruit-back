const logger = require('../config/logger.js');
const got = require('got');
const secretKey = require('../config/secretKey').secretKey;

module.exports = class recruitService {
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/get?seq=${seq}&key=${secretKey}`;

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
                logger.writeLog('error', `services/recruitService/get: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/get: ${error}`);
        }
    } 

    static async remove(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/remove?seq=${seq}&key=${secretKey}`;

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
                logger.writeLog('error', `services/recruitService/remove: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/remove: ${error}`);
        }
    } 

    static async list(token, regions, name, page, rowCount) {
        try {
            name = (name) ? name : '';

            var apiURL = `${process.env.APIHOST}/api/recruit/listForAdmin?regions=${regions}&name=${name}&page=${page}&rowCount=${rowCount}&key=${secretKey}`;

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
                logger.writeLog('error', `services/recruitService/list: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/list: ${error}`);
            return null;
        }
    }  
 

}