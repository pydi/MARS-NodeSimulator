var express      = require('express');
var _            = require('lodash');
var responseUtil = require('../util/responseUtil');

var router=express.Router();

router.route('/ping')
   .get(function(req,res){

       var objRes  = {
           "success" : true,
           "MG_WEBUI_BUILD_ID" : "1432142463"
       };

       res.json(objRes);
});

module.exports=router;
