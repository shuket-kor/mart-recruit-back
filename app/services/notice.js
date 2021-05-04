const logger = require('../config/logger.js');
const got = require('got');

module.exports = class noticeService {

    // 공지사항 리스트
    static async list(page, rowCount) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/list';
            } else {
                apiURL = 'http://localhost:3000/api/notice/list';
            }
            var {body} = await got.get(apiURL + "?page=" + page + "&offset=" + rowCount, { responseType: 'json' });
            //var {body} = await got.get(apiURL, {responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success 확인');
                //console.log(body.data);
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list 확인1 :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list 확인2 : ${error}`);
            return null;
        }
    }

    // 공지사항 추가 리스트
    static async create(body, SUBJECT, CONTENT) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/create';
            } else {
                apiURL = 'http://localhost:3000/api/notice/create';
            }
            //var {body} = await got.post(apiURL + "?page=" + page + "&offset=" + rowCount, { responseType: 'json' });
            var {body} = await got.post(apiURL, {
                json : {
                   
                    SUBJECT: SUBJECT,
                    CONTENT: CONTENT
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success 확인');
                //console.log(body.data);
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list 확인1 :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list 확인2 : ${error}`);
            return null;
        }
    }

    // 공지사항 자세히 보기
    static async view(seq) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/view';
            } else {
                apiURL = 'http://localhost:3000/api/notice/view';
            }
            var {body} = await got.get(apiURL + "?seq=" + seq , { responseType: 'json' });
    
            if (body.result == 'success'){
                console.log('response.result === success 확인1111');
                //console.log(body.data);
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list 확인1111111 :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list 확인22222 : ${error}`);
            return null;
        }
    }

    // 공지사항 수정하기
    static async update(seq, SUBJECT, CONTENT) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/update';
            } else {
                apiURL = 'http://localhost:3000/api/notice/update';
            }
            //var {body} = await got.post(apiURL + "?page=" + page + "&offset=" + rowCount, { responseType: 'json' });
            const {body} = await got.post(apiURL, {
                json : {
                    SEQ:seq,
                    SUBJECT: SUBJECT,
                    CONTENT: CONTENT
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success 확인');
                //console.log(body.data);
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list 확인1 :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list 확인2 : ${error}`);
            return null;
        }
    }

    // 공지사항 삭제하기
    static async remove(seq) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/remove';
            } else {
                apiURL = 'http://localhost:3000/api/notice/remove';
            }
            var {body} = await got.get(apiURL + "?seq=" + seq , { responseType: 'json' });
    
            if (body.result == 'success'){
                console.log('response.result === success 확인');
                console.log(body.data);
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list 확인1 :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list 확인2 : ${error}`);
            return null;
        }
    }



}; //end