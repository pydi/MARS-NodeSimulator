// app/routes/lunAPI.js

var lunModel     = require('../models/lunModel');
var express      = require('express');
var async        = require("async");
var responseUtil = require('../util/responseUtil');

var router=express.Router();


router.route('/luns')
    .get(function(req,res){
        var objRes  = responseUtil.createResponse('SUCCESS');
   
        
        lunModel.find(function(err,luns){
            if(err) {res.send(err);}
  
            objRes.result = {
                "instancesTotal":0,
                "instancesCount":0,
                "instancesLimit":100,
                "instances":luns
            };

            //objRes.result.instances = luns;     
            //console.log(luns);
            res.json(objRes);
        });
        

 
    })

    .post(function(req,res){
        console.log(req);
        /*
        var lun=new lunModel(req.body);
        lun.save(function(err){
            if(err) {res.send(err);}
            res.send({message:'Lun Added'});
        });
        */
    });

router.route('/luns/bulk').post(function(req,res){
  var i;
  var itemResultsCount=0;
  var itemResults = [];
  var itemErrors  = [];
  var functions = [];

  for (i=0; i < req.body.items.length ; i++) {
      functions.push(
        (function(lun) {
          return function(callback) {
              lun.save(callback);
          };
        })( new lunModel(req.body.items[i]) )
      );
  }

  async.parallel(functions, function(err, results) {

    var lunResponse;
    if (err === undefined){
        lunResponse = responseUtil.createResponse('SUCCESS');
    }
    else{
        lunResponse = responseUtil.createResponse('PARTIALSUCCESS');
        lunResponse.error = {
            "errorMessage": {
                "text": "Some bulk operations are failed",
                "key": "WEBUI_WEBAPI_ERROR_BULK_PARTIALFAILED",
                "args": [],
                "language": "en_US"
            }
        };

        itemErrors.push({
            "id": 'Error',
            "error": {
                "errorMessage": {
                    //"text": "NODE Simulator failed to execute operation, code 27061",
                    "text": err.err,
                    "key": "WEBUI_MARS_ERROR_FAILED_EXECMD",
                    "args": [
                        "27061"
                    ],
                    "language": "en_US"
                },
                "causeMessage": {
                    "text": "Name specified for this LUN is already in use by an existing LUN.",
                    "key": "27061",
                    "args": [
                        "{}"
                    ],
                    "language": "en_US"
                }
            }
        });


    }

    for (i = 0; i < results.length; i++){
        if (results[i]){
            itemResultsCount++; 
            itemResults.push({
                "id": results[i][0].name,
                "data": {
                    "uuid": results[i][0].name
                }
            });
        }
    }



    lunResponse.result = {
      "itemTotalCount"  : functions.length,
      "itemResultsCount": itemResultsCount,
      "itemErrorsCount" : (functions.length - itemResultsCount),
      "itemResults"     : itemResults,
      "itemErrors"      : itemErrors
    };
    res.json(lunResponse);
  });


});


router.route('/luns/:id')
    .put(function(req,res){
        lunModel.findOne({_id:req.params.id},function(err,lun){

            if(err) {res.send(err);}

            for(prop in req.body){
                lun[prop]=req.body[prop];
            }

            // save the Lun
            lun.save(function(err) {
                if(err) {res.send(err);}

                res.json({ message: 'Lun updated!' });
            });

        });
    })

    .get(function(req,res){
        lunModel.findOne({_id:req.params.id},function(err, lun) {
            if(err) {res.send(err);}
            res.json(lun);
        });
    })

    .delete(function(req,res){
        lunModel.remove({
            _id: req.params.id
        }, function(err, lun) {
            if(err) {res.send(err);}
            res.json({ message: 'Successfully deleted' });
        });
    });


function onAllSaveComplete(res, itemTotalCount, itemResultsCount, itemErrorsCount, itemResults, itemErrors){
  var lunResponse;
  if (itemTotalCount === itemResultsCount){
      lunResponse = responseUtil.createResponse('SUCCESS');
  }
  else{

      lunResponse = responseUtil.createResponse('PARTIALSUCCESS');
      lunResponse.error = {
          "errorMessage": {
              "text": "Some bulk operations are failed",
              "key": "WEBUI_WEBAPI_ERROR_BULK_PARTIALFAILED",
              "args": [],
              "language": "en_US"
          }
      }
  }

  lunResponse.result = {
        "itemTotalCount"  : itemTotalCount,
        "itemResultsCount": itemResultsCount,
        "itemErrorsCount" : itemErrorsCount,
        "itemResults"     : itemResults,
        "itemErrors"      : itemErrors
  };
  console.log("---------ALL LUN Save Completed ---------");
  res.json(lunResponse);


}

module.exports=router;
