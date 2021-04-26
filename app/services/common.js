const logger = require('../config/logger.js');
const got = require('got');

module.exports = class commonService {
    static async getWorkingRegion() {
        try {
            var apiURL = '';
            if (process.env.NODE_ENV == 'develope')
                apiURL = `http://localhost:3000/api/workingRegion/list`;
            else
                apiURL = `http://localhost:3000/api/workingRegion/list`;

            const {body} = await got.get(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/commonService/getWorkingRegion: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/commonService/getWorkingRegion: ${error}`);
            return null;
        }
    }  

}