// app/routes/lunAPI.js

var lunModel     = require('../models/lunModel');
var express      = require('express');
var responseUtil = require('../util/responseUtil');

var router  = express.Router();

router.route('/igroups')
    .get(function(req,res){
        var objRes  = responseUtil.createResponse('SUCCESS');
        objRes.result = {
            "instancesTotal":0,
            "instancesCount":0,
            "instancesLimit":100,
            "instances":[]
        };
        res.json(objRes);

    })
    .post(function(req,res){
        var lun=new lunModel(req.body);
        lun.save(function(err){
            if(err) {res.send(err);}
            res.send({message:'Lun Added'});
        });
    });
module.exports=router;
