var appConfig = require('../config/app_config');

var XMLHttpRequest= require("xhr2");
var express       = require('express');
var router        = express.Router();

router.route('/me')
  .get(function (req, res) {
    res.json({success:true, data:req.decoded});
  });
router.route('/my_ig')
  .get(function (req, res) {
    var user = req.decoded;
    getJSON("https://api.instagram.com/v1/users/"+user.instagramId+"/media/recent?count=9&access_token="+user.accessToken,
      function (data) {
        res.json({success:true, data:data.data});
      },
      function (status) {
        res.json({success:false, message:status});
      }
    );
  });
router.route('/find_location_by_address')
  .get(function (req, res) {
    getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+req.query.address+"&key="+appConfig.GOOGLE_API_KEY,
      function (data) {
        res.json({success:true, data:data.results});
      },
      function (status) {
        res.json({success:false, message:status});
      }
    );
  });
router.route('/find_location_by_place_name')
  .get(function (req, res) {
    var user = req.decoded;
    getJSON("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.query.lat+","+req.query.lng+"&radius=50000&name="+req.query.placename+"&key="+appConfig.GOOGLE_API_KEY,
      function (data) {
        res.json({success:true, data:data});
      },
      function (status) {
        res.json({success:false, message:status});
      }
    );
  });

function getJSON(url, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function() {
   var status;
   var data;
   // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
   if (xhr.readyState == 4) { // `DONE`
     status = xhr.status;
     if (status == 200) {
       data = JSON.parse(xhr.responseText);
       successHandler && successHandler(data);
     } else {
       errorHandler && errorHandler(status);
     }
   }
  };
  xhr.send();
}
module.exports = router;
