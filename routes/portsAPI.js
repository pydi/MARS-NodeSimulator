// DISK API
var express      = require('express');
var fs           = require('fs');
var responseUtil = require('../util/responseUtil');

var router       = express.Router();


router.route('/net/ports').get(function(req,res){

    var responseData;
    var objRes       = responseUtil.createResponse('SUCCESS');
    responseData     = JSON.parse(fs.readFileSync('./json/ports.json', 'utf8'));
    objRes.result    = responseData;
    res.json(objRes);
});

module.exports=router;
