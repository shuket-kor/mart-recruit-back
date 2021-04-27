const logger = require('../config/logger.js');
const got = require('got');

module.exports = class martService {
    static async list(token, name, page, rowCount) {
        try {
            name = (name) ? name : '';

            var apiURL = `${process.env.APIHOST}/api/mart/list`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, 
                json: {
                    name: name,
                    page: page,
                    rowCount: rowCount
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