// app/routes/sessionAPI.js
var express      = require('express');
var responseUtil = require('../util/responseUtil');

var router = express.Router();
router.route('/sessions')
   .post(function(req,res){
        var objRes;
        // Sample Req {"username":"admin","password":"Y2hhbmdlbWU="} password is changeme
        if (req.body.username === 'admin' && req.body.password==="Y2hhbmdlbWU="){
        //Success Response
            objRes = responseUtil.createResponse('SUCCESS');
            objRes.result = "my_session_token";
            res.json(objRes);
        }
        else{
           // Error Response
            objRes = responseUtil.createResponse('SUCCESS');
            objRes.result = {
                "errorMessage":{
                    "text":"Invalid user or credential",
                    "key" :"WEBUI_WEBAPI_ERROR_INVALID_USER_CREDENTIAL",
                    "args":[],"language":"en_US"
                }
            };
            res.json(objRes);
        }

    })
    .get(function(req,res){
        var now = new Date();
        var objRes;
        if (req.headers['x-webmapi-authorization'] ==="my_session_token" ){
            objRes = responseUtil.createResponse('SUCCESS');
            objRes.result = {
                "username":"admin",
                "last-update-time":parseInt(now.valueOf()/1000),
                "time-to-live":1800
            };
            res.json(objRes);
        }
        else{
            objRes = responseUtil.createResponse('ERROR');
            objRes.error = {
                "errorMessage":{
                    "text":"Unauthorized access",
                    "key":"WEBUI_WEBAPI_ERROR_UNAUTHORIZIED_ACCESS",
                    "args":[],
                    "language":"en_US"
                }
            };
            res.json(objRes);
        }

    })
    .put(function(req,res){
        if (req.headers.Connection ==="keep-alive" ){
            //Code to increase the session timeout

            var objRes = responseUtil.createResponse('SUCCESS');
            objRes.result = {
                "x-webmapi-version" :[],
                "webmapi-compatible-versions": '0.0.0'
            };
            res.json(objRes);
        }
    });

router.route('/versions').get(function(req,res){
    var objRes = responseUtil.createResponse('SUCCESS');
    objRes.result = {
        "x-webmapi-version" :[],
        "webmapi-compatible-versions": '0.0.0'
    };
    res.json(objRes);
});


module.exports=router;
