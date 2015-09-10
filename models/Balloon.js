var mongoose = require('mongoose');

var BalloonSchema = mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User',  required:true},
  name: {type:String, required:true},
  igId: {type:String, required:true},
  igImage: {type:String, required:true},
  igLink: {type:String, required:true},
  lat: {type:Number, required:true},
  lng: {type:Number, required:true},
  endLat: {type:Number, required:true},
  endLng: {type:Number, required:true},
  latVel: {type:Number},
  lngVel: {type:Number},
  created_at:{type:Date,default:Date.now},
  arrived_at:{type:Date,default:null}
});

module.exports = mongoose.model("Balloon",BalloonSchema);
