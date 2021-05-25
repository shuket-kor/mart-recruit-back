const logger = require('../config/logger.js');
const got = require('got');

module.exports = class noticeService {

    // 공지사항 리스트
    static async list( page, rowCount) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/list';
            } else {
                apiURL = 'http://localhost:3000/api/notice/list';
            }
            const {body} = await got.post(apiURL + "?page=" + page + "&offset=" + rowCount, { 
                json : {
                    page: page,
                    rowCount: rowCount 
                },
                responseType: 'json'});
    
            if (body.result === 'success'){
                console.log('response.result === success ');
                //console.log(body.data);
                return body.data;
                
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list  :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }

    // 공지사항 추가 리스트
    static async create(userSeq, SUBJECT, CONTENT) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/create';
            } else {
                apiURL = 'http://localhost:3000/api/notice/create';
            }
            const {body} = await got.post(apiURL, {
                json : {
                    USER_SEQ: userSeq,
                    SUBJECT: SUBJECT,
                    CONTENT: CONTENT
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success');
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }

    // 공지사항 자세히 보기
    static async view(userSeq, seq) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/view';
            } else {
                apiURL = 'http://localhost:3000/api/notice/view';
            }
            const {body} = await got.post(apiURL + "?seq=" + seq , { json : {
                USER_SEQ: userSeq,
                SEQ:seq
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success ');
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }

    // 공지사항 수정하기
    
    static async update(userSeq, SEQ, SUBJECT, CONTENT) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/update';
            } else {
                apiURL = 'http://localhost:3000/api/notice/update';
            }
            
            const {body} = await got.post(apiURL, {
                json : {
                    USER_SEQ: userSeq,
                    SEQ:SEQ,
                    SUBJECT: SUBJECT,
                    CONTENT: CONTENT
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success ');
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list  :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }

    // 공지사항 삭제하기
    static async remove(userSeq, seq) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/remove';
            } else {
                apiURL = 'http://localhost:3000/api/notice/remove';
            }
            const {body} = await got.post(apiURL + "?seq=" + seq , { 
                json:{
                    SEQ: seq,
                    USER_SEQ:userSeq
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success ');
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list  :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }

    // 공지사항 겟
    static async get(userSeq, seq) {
        try {
            
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/get';
            } else {
                apiURL = 'http://localhost:3000/api/notice/get';
            }
            const {body} = await got.post(apiURL , { 
                json:{
                    SEQ: seq,
                    USER_SEQ:userSeq
                },
                responseType: 'json'});
    
            if (body.result == 'success'){
                console.log('response.result === success ');
                return body.data;
            }else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeServies/list  :  ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `servies/noticeServies/list  : ${error}`);
            return null;
        }
    }



}; //end