// app/models/lunModel.js

var mongoose=require('mongoose');
var schema  =mongoose.Schema;

var lunSchema = new schema({
   "admin-state": String,
   "block-size" : Number,
   "name"       : {type: String, required: true, unique: true},
   "serial"     : String,
   "size"       : {type: String, required: true},
   "space-used" : Number,
   "uuid"       : String,
   "max-extent-size": String,
   "igroups"    : [String],
   "maps"       : [{"LunMapInfoType": {"igroup-name": String, "lun-id": Number, "lun-name": String}}]
});

module.exports=mongoose.model('lunModel',lunSchema, 'lun'); // lun is the name of collection in mongo

/*
lunModel.schema.path('max-extent-size').validate(function (value) {
  return /maxDefault|max8K|max16K|max32K|orange|max64K/i.test(value);
}, 'Invalid max-extent-size');
*/