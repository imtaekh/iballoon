!function(){"use strict";function e(e,t){var n={};return n}angular.module("AppService",["ngRoute"]).factory("AppService",e),e.$inject=["$location","$window"]}(),function(){"use strict";function e(e,t,n,a){var o={};return o.logout=function(){a.setToken(),n.path("/")},o.isLoggedIn=function(){return a.getToken()?!0:!1},o.getUser=function(){return a.getToken()?e.get("/api/me"):t.reject({message:"User has no token"})},o}function t(e){var t={};return t.getToken=function(){return e.get("token")},t.setToken=function(t){t?e.put("token",t):e.remove("token")},t}function n(e,t,n){var a={};return a.request=function(e){var t=n.getToken();return t&&(e.headers["x-access-token"]=t),e},a.responseError=function(a){return 403==a.status&&(n.setToken(),t.path("/")),e.reject(a)},a}angular.module("AuthService",[]).factory("Auth",e).factory("AuthToken",t).factory("AuthInterceptor",n),e.$inject=["$http","$q","$location","AuthToken"],t.$inject=["$cookies"],n.$inject=["$q","$location","AuthToken"]}(),function(){"use strict";function e(e,t,n){var a=this;a.initialize=function(){n.getUser().then(function(e){e.data.success?a.user=e.data.data:delete a.user,a.isLoggedIn=a.user?!0:!1,console.log("USER : ",a.user)})},a.initialize(),e.$on("$routeChangeStart",a.initialize),a.login=function(){t.location.href="/auth/instagram"},a.logout=function(){console.log("logout"),n.logout(),delete a.user},a.menuStyle="collapse navbar-collapse",a.menuClick=function(){"navbar-collapse"==a.menuStyle?a.menuStyle="collapse navbar-collapse":a.menuStyle="navbar-collapse"}}angular.module("AppController",[]).controller("AppController",e),e.$inject=["$rootScope","$window","Auth"]}(),function(){"use strict";function e(e,t,n){var a=this;a.leftPanel="",a.myIgPics=[],a.igPic={},a.closeLeftPanel=function(){a.leftPanel="",document.querySelector("#map").className="map_inactive",document.querySelector("#side").className="side_inactive",setTimeout(function(){google.maps.event.trigger(map,"resize")},1e3)},a.igShow=function(){e.get("api/show_ig",{params:{igid:this.igId}}).success(function(e){e.success?(a.igPic=e.data,console.log(a.igPic),a.leftPanel==a.igPic.id?a.closeLeftPanel():"igNew"==a.leftPanel?(a.leftPanel=a.igPic.igId,document.querySelector("ig-show").className="",document.querySelector("ig-new").className="hidden"):(a.leftPanel=a.igPic.igId,document.querySelector("ig-show").className="",document.querySelector("ig-new").className="hidden",document.querySelector("#map").className="map_active",document.querySelector("#side").className="side_active")):(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})},a.igIndex=function(){e.get("api/my_ig").success(function(e){e.success?a.myIgPics=e.data:(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})},a.igNew=function(){"igNew"==a.leftPanel?a.closeLeftPanel():a.leftPanel?(a.leftPanel="igNew",document.querySelector("ig-show").className="hidden",document.querySelector("ig-new").className="",a.igIndex(),a.startOver()):(a.leftPanel="igNew",document.querySelector("ig-show").className="hidden",document.querySelector("ig-new").className="",document.querySelector("#map").className="map_active",document.querySelector("#side").className="side_active",a.igIndex(),a.startOver())},a.unSelectPic=function(){a.igNewPic=void 0;for(var e=document.querySelectorAll(".my_ig_pic_con_hidden"),t=0;t<e.length;t++)e[t].className="col-xs-4 my_ig_pic_con";var n=document.querySelector(".my_ig_pic_con_selected");n&&(n.className="col-xs-4 my_ig_pic_con")},a.startOver=function(){a.unSelectPic(),a.finalLatLng={},a.locationAddress="",a.locationAddressId="",a.locationAddressSearchResults="",a.selectedAddress={},a.placeName="",a.placeNameId="",a.placeNameSearchResults="",a.selectedPlaceName={},a.igShowDone=!1},a.igNewPic=void 0,a.selectPic=function(e){if(a.igNewPic)a.unSelectPic();else{var t=document.getElementById(e);a.igNewPic={id:e,image:t.dataset.image,link:t.dataset.link};for(var n=document.querySelectorAll(".my_ig_pic_con"),o=0;o<n.length;o++)n[o].className="my_ig_pic_con_hidden";t.className="my_ig_pic_con_selected",a.igShowSelectedPic=e}},a.finalLatLng={},a.locationAddress="",a.locationAddressSearchResults="",a.findByAddress=function(){e.get("api/find_location_by_address",{params:{address:a.locationAddress}}).success(function(e){e.success?a.locationAddressSearchResults=e.data:(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})},a.selectedAddress={},a.selectAddress=function(e){var t=document.getElementById("address_"+a.selectedAddressId);a.selectedAddress.name=t.dataset.name,a.selectedAddress.lat=t.dataset.lat,a.selectedAddress.lng=t.dataset.lng,a.finalLatLng.lat=t.dataset.lat,a.finalLatLng.lng=t.dataset.lng,google.maps.event.trigger(map,"resize"),a.map.setCenter(new google.maps.LatLng(a.finalLatLng.lat,a.finalLatLng.lng)),a.map.setZoom(14)},a.placeName="",a.placeNameSearchResults="",a.findByPlaceName=function(){e.get("api/find_location_by_place_name",{params:{lat:a.selectedAddress.lat,lng:a.selectedAddress.lng,placename:a.placeName}}).success(function(e){e.success?a.placeNameSearchResults=e.data.results:(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})},a.selectedPlaceName={},a.selectPlaceName=function(){var e=document.getElementById("place_"+a.selectedPlaceNameId);a.selectedPlaceName.name=e.dataset.name,a.selectedPlaceName.lat=e.dataset.lat,a.selectedPlaceName.lng=e.dataset.lng,a.finalLatLng.lat=e.dataset.lat,a.finalLatLng.lng=e.dataset.lng,google.maps.event.trigger(map,"resize"),a.map.setCenter(new google.maps.LatLng(a.finalLatLng.lat,a.finalLatLng.lng)),a.map.setZoom(16)},a.igShowDone=!1,a.confirm=function(){var t=a.finalLatLng.lat-a.centerLatLng.lat,o=a.finalLatLng.lng-a.centerLatLng.lng,l=o>=0?Math.atan(t/o):Math.PI+Math.atan(t/o),i=.001*Math.sin(l),r=.001*Math.cos(l),s={name:a.finalLatLng.name,igId:a.igNewPic.id,igImage:a.igNewPic.image,igLink:a.igNewPic.link,lat:a.centerLatLng.lat,lng:a.centerLatLng.lng,endLat:a.finalLatLng.lat,endLng:a.finalLatLng.lng,latVel:i,lngVel:r};e.post("api/balloons",s).success(function(e){e.success?(console.log(e.data),a.markers.push(e.data),a.generateMarker(a.markers[a.markers.length-1]),a.map.setCenter(new google.maps.LatLng(e.data.lat,e.data.lng)),a.map.setZoom(12),a.igShowDone=!0):(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})},a.generateMarker=function(e){e.marker=new google.maps.Marker({position:new google.maps.LatLng(e.lat,e.lng),title:e.name,igId:e.igId,icon:new google.maps.MarkerImage(e.igImage,null,null,null,new google.maps.Size(60,60))}),e.marker.setMap(a.map),google.maps.event.addListener(e.marker,"click",a.igShow)},a.markers=[],a.centerLatLng={lat:34.05223,lng:-118.24368},document.getElementById("map").style.height=window.innerHeight-50+"px",document.querySelector("ig-show").className="hidden",document.querySelector("ig-new").className="hidden";var o=function(e,t,n){var o=new google.maps.StyledMapType([{featureType:"landscape",stylers:[{hue:"#FFBB00"},{saturation:43.400000000000006},{lightness:37.599999999999994},{gamma:1}]},{featureType:"road.highway",stylers:[{hue:"#FFC200"},{saturation:-61.8},{lightness:45.599999999999994},{gamma:1}]},{featureType:"road.arterial",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:51.19999999999999},{gamma:1}]},{featureType:"road.local",stylers:[{hue:"#FF0300"},{saturation:-100},{lightness:52},{gamma:1}]},{featureType:"water",stylers:[{hue:"#0078FF"},{saturation:-13.200000000000003},{lightness:2.4000000000000057},{gamma:1}]},{featureType:"poi",stylers:[{hue:"#00FF6A"},{saturation:-1.0989010989011234},{lightness:11.200000000000017},{gamma:1}]}],{name:"map_style"}),l={zoom:n,center:new google.maps.LatLng(e,t),mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,"map_style"]}};a.map=new google.maps.Map(document.getElementById("map"),l),a.map.mapTypes.set("map_style",o),a.map.setMapTypeId("map_style"),a.markers.forEach(function(e){a.generateMarker(e)}),setInterval(function(){a.markers.forEach(function(e){e.latVel>0&&e.endLat>e.lat?e.lat+=e.latVel:e.latVel<0&&e.endLat<e.lat&&(e.lat+=e.latVel),e.lngVel>0&&e.endLng>e.lng?e.lng+=e.lngVel:e.lngVel<0&&e.endLng<e.lng&&(e.lng+=e.lngVel),e.marker.setPosition(new google.maps.LatLng(e.lat,e.lng))})},100)};e.get("api/balloons").success(function(e){e.success?(a.markers=e.data,o(a.centerLatLng.lat,a.centerLatLng.lng,12)):(alert("Something went Wrong, please login again.."),n.logout())}).error(function(e){alert("Something went Wrong, please login again..",e),n.logout()})}angular.module("MapController",[]).controller("MapController",e),e.$inject=["$http","$window","Auth"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"directives/ig_show.html"}}function t(){return{restrict:"E",templateUrl:"directives/ig_new.html"}}angular.module("MapDirectives",[]).directive("igShow",e).directive("igNew",t)}(),function(){"use strict";function e(e,t){e.when("/",{templateUrl:"views/welcome.html",controller:"AppController",controllerAs:"appCtrl",requireLogin:!1}).when("/app",{templateUrl:"views/app.html",controller:"MapController",controllerAs:"mapCtrl",requireLogin:!0}).otherwise("/"),t.html5Mode(!0)}angular.module("app.routes",["ngRoute"]).config(e),e.$inject=["$routeProvider","$locationProvider"]}(),function(){"use strict";function e(e){e.interceptors.push("AuthInterceptor")}function t(e,t,n,a){e.$on("$locationChangeStart",function(e,o,l){for(var i in t.routes)-1!=o.indexOf(i)&&t.routes[i].requireLogin&&!a.isLoggedIn()&&(alert("Please login first :D"),e.preventDefault(),n.location.href="/")})}angular.module("iBalloon",["app.routes","ngCookies","AppController","MapController","AppService","AuthService","MapDirectives"]).config(e).run(t),e.$inject=["$httpProvider"],t.$inject=["$rootScope","$route","$window","Auth"]}();