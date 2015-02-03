// app/routes/raidAPI.js
var express      = require('express');
var fs           = require('fs');
var responseUtil = require('../util/responseUtil');

var router=express.Router();

router.route('/storage/raid/status')
    .get(function(req,res){
        var objRes    = responseUtil.createResponse('SUCCESS');
        objRes.result = JSON.parse(fs.readFileSync('./json/raid.json', 'utf8'));
        res.json(objRes);

    });
module.exports=router;
