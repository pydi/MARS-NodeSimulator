var express=require('express');
var _      = require('lodash');
var router=express.Router();
var responseUtil = require('../util/responseUtil');


router.route('/stats')
   .post(function(req,res){

        var beginTime = req.body["begin-time"];
        var endTime   = req.body["end-time"]?req.body["end-time"]:'00'; //nowUTC;
        var counterValues = [];

        _.forEach(req.body.counters, function(counterName){ 
            counterValues.push({
                "counter-name":counterName,
                "counter-value":[7678792704]
            });
        });

        var objRes = responseUtil.createResponse('SUCCESS');
        if (req.body.object == 'capacity'){
            objRes.result = {
              "counter-value":{
                 "object-name":"capacity",
                 "cm-sessionid":"8f57d408-28e7-11e4-87ef-00a098435ebc",
                 "object-value":[{
                       "instance-name":"cluster",
                       "instance-values":[{
                            "timestamp":1408593574,
                            "counter-values":counterValues
                        }]
                 }]
               }
            }
              
        }
    res.send(objRes);
});

module.exports=router;
