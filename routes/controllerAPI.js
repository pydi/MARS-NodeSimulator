// Chass API
var express= require('express');
var fs     = require('fs');
var router = express.Router();
var responseUtil = require('../util/responseUtil');

router.route('/hardware/controllers').get(function(req,res){

    var responseData;
    var objRes        = responseUtil.createResponse('SUCCESS');
    responseData      = JSON.parse(fs.readFileSync('./json/controller.json', 'utf8'));
        objRes.result = responseData;

    res.json(objRes);
});

module.exports=router;
