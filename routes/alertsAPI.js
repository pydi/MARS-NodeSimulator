// Chassis API
var express      = require('express');
var fs           = require('fs');
var responseUtil = require('../util/responseUtil');

var router = express.Router();

router.route('/hardware/health/alerts').get(function(req,res){
    var objRes       = responseUtil.createResponse('SUCCESS');
    var responseData = JSON.parse(fs.readFileSync('./json/alerts.json', 'utf8'));
    objRes.result    = responseData;
    res.json(objRes);
});

module.exports=router;
