// Chassis API
var express      = require('express');
var fs           = require('fs');
var responseUtil = require('../util/responseUtil');

var router = express.Router();

router.route('/net/interfaces/fc').get(function(req,res){
    var responseData;
    var objRes      = responseUtil.createResponse('SUCCESS');
    responseData    = JSON.parse(fs.readFileSync('./json/fc.json', 'utf8'));
    objRes.result   = responseData;
    res.json(objRes);
});

module.exports=router;
