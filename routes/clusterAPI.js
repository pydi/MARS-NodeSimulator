// app/routes/clusterAPI.js

var express = require('express');
var router  = express.Router();
var responseUtil = require('../util/responseUtil');
var config  = require("../util/config");

router.route('/cluster')
   .get(function(req,res){
        var now    = new Date();
        var objRes = responseUtil.createResponse('SUCCESS');

        objRes.result = {
            "name" :config.system.clusterName,
            "nodes":[{
                "serial-number":config.system.clusterSerialNumber,
                "os-version"   :config.system.osVersion
            }],
            "system-time":parseInt(now.valueOf()/1000)
        };
        res.json(objRes);
    });

router.route('/cluster/management-interface')
   .get(function(req,res){
        var objRes = responseUtil.createResponse('SUCCESS');
        objRes.result = {
            "netmask"   : "255.255.254.0",
            "gateway"   : "172.16.84.1",
            "ip-address": "172.16.85.136"
        };
        res.json(objRes);

    });

router.route('/cluster/dns-server')
   .get(function(req,res){
        var objRes = responseUtil.createResponse('SUCCESS');
        objRes.result = {
            "domain"                : "",
            "primary-address-ipv4"  : "",
            "secondary-address-ipv4": ""
        };
        res.json(objRes);
    });


module.exports=router;
