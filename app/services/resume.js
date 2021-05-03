const logger = require('../config/logger.js');
const got = require('got');

module.exports = class resumeService {
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/get?seq=${seq}`;

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
                logger.writeLog('error', `services/resumeService/get: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/get: ${error}`);
        }
    } 

    static async list(token, regions, name, page, rowCount) {
        try {
            name = (name) ? name : '';

            var apiURL = `${process.env.APIHOST}/api/recruit/listForAdmin?regions=${regions}&name=${name}&page=${page}&rowCount=${rowCount}`;

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
                logger.writeLog('error', `services/resumeService/list: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/list: ${error}`);
        }
    }  
 
    static async listPerRecruit(token, recruitSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/listPerRecruit?recruitSeq=${recruitSeq}`;

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
                logger.writeLog('error', `services/resumeService/listPerRecruit: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/listPerRecruit: ${error}`);
        }
    }  
}