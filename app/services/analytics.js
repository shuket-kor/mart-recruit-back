const logger = require('../config/logger.js');
const got = require('got');
const secretKey = require('../config/secretKey').secretKey;

module.exports = class analyticsService {
    static async getDashboard(token) {
        try {
            var apiURL = `${process.env.APIHOST}/api/analytics/getDashboard`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/analyticsService/getDashboard: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/analyticsService/getDashboard: ${error}`);
            return null;
        }
    }  

}