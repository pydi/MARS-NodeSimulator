var express      = require('express');
var _            = require('lodash');
var responseUtil = require('../util/responseUtil');

var router=express.Router();


function generateValues(beginTime, EndTime, range){
    var values = [];
    if (beginTime < EndTime){
        for (var i =beginTime; i <= EndTime || (i - beginTime) <= 600; i++){
            values.push({ 
                "timestamp":i,
                "value":0
            });
        }
    }
    return values;
}


router.route('/stats/archives')
   .post(function(req,res){

    /* 
        Sample Request body
        {
            "object-name"  :"lun",
            "counter-names":["rw_running_latency","r_ops","w_ops","o_ops","r_bytes","w_bytes","o_bytes"],
            "begin-time"   :1408321019,
            "cluster-scope":true
        }

        Sample Response 

        {"status":{
                "responseTime":1408338262,
                "statusCode":"SUCCESS"
            },
            "result":{
                "object":"lun",
                "object-archiver-data":[{
                    "scope":"CLUSTER",
                    "instance-name":"cluster",
                    "archiver-counter-data-list":[{
                        "counter-name":"o_bytes",
                        "archiver-counter-data-series-list":[{
                            "values":[
                                {"timestamp":1408338021,"value":0},
                                {"timestamp":1408338022,"value":0},
                                {"timestamp":1408338023,"value":0},
                                {"timestamp":1408338024,"value":0},
                            ],
                            "result-sampling-rate":"ONE_SECOND",
                            "result-start-time"   :1408338021,
                            "result-end-time"     :1408338261,
                            "number-of-records"   :241
                        }]
                    }]
                }]
            }
        }


    */

        var beginTime = req.body["begin-time"];
        var endTime   = req.body["end-time"]?req.body["end-time"]:'00'; //nowUTC;
        var archiverCounterDataList = [];

        _.forEach(req.body["counter-names"], function(counterName){ 
            archiverCounterDataList.push(
                {
                    "counter-name":counterName,
                    "archiver-counter-data-series-list" : [{
                        values                : generateValues(beginTime, endTime),
                        "result-sampling-rate":"ONE_SECOND",
                        "result-start-time"   :beginTime,
                        "result-end-time"     :endTime,
                        "number-of-records"   :(endTime-beginTime)
                    }]
                }
            );
        });

        var objRes = responseUtil.createResponse('SUCCESS');
        objRes.result = {
            "object":"lun",
            "object-archiver-data":[{
                "scope"                     : "CLUSTER",
                "instance-name"             : "cluster",
                "archiver-counter-data-list": archiverCounterDataList
            }]
        }
        res.send(objRes);
    });

module.exports=router;
