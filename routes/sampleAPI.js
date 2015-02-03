// Sample API template
var express=require('express');
var router=express.Router();
var responseUtil = require('../util/responseUtil');


router.route('/hardware/chassis')
   .post(function(req,res){
        res.json({
            "status":"Hello Post"
        });
    })
    .get(function(req,res){
        var objRes      = responseUtil.createResponse('SUCCESS');
        res.send(objRes);
    });

module.exports=router;
