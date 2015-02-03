// DISK API
var express=require('express');
var router=express.Router();
var responseUtil = require('../util/responseUtil');
var config = require('../util/config');



router.route('/storage/disks').get(function(req,res){

    var objRes = responseUtil.createResponse('SUCCESS');
    var i;
    var instances      = [];
    var healthStates   = ['unknown'  ,'ok','warning','critical'];
    var states         = ['DiskReady', 'DiskNotExist', 'DiskNotReady', 'DiskInitFailed', 'DiskOpen', 'DiskZeroing', 'DiskFaulted', 'DiskSanitizing', 'DiskFwUpdating', 'DiskPoweredOff'];
    var wearLevelStatus= ['unknown'  , 'ok', 'warning', 'critical'];

    // Good Disk
    for (i=0; i<= 23 ; i++){
        instances.push({
            "name" :"0b."+config.system.shelfId+"."+i,
            "state":states[0],
            "bay"  :i,
            "uid"  :"5:002:538550:3f7b"+i,
            "firmware-revision":"NA00",
            "physical-space":480103981056,
            "vendor-id"     :"NETAPP",
            "product-id"    :"X435_SG843480ASY",
            "serial-number" :"S16MNEAD74084"+i,
            "shelf-id":config.system.shelfId,
            "bytes-per-sector":512,
            "ssd-info":{
               "temperature":24,
               "percent-rated-life-used":100,
               "percent-spares-consumed":4,
               "power-on-hours":4469,
               "wear-level":0,
               "wear-level-status":wearLevelStatus[1],
               "bytes-read":0,
               "sectors-written":23739616
            },
            "health-state":healthStates[1]
        });
    }


    objRes.result = {
        "instancesTotal":24,
        "instancesCount":24,
        "instancesLimit":24,
        "instances" :instances
    };
    res.json(objRes);
});

module.exports=router;
