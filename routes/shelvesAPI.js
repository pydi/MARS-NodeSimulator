// Chass API
var express      = require('express');
var fs           = require('fs');
var responseUtil = require('../util/responseUtil');

var router = express.Router();

router.route('/storage/shelves').get(function(req,res){

    var objRes    = responseUtil.createResponse('SUCCESS');
    objRes.result = JSON.parse(fs.readFileSync('./json/shelves.json', 'utf8'));
    res.json(objRes);
});

module.exports=router;
