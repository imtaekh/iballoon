!function(){"use strict";function e(e,t,n){var o=this;o.initialize=function(){n.getUser().then(function(e){e.data.success?o.user=e.data.data:delete o.user,o.isLoggedIn=o.user?!0:!1,console.log("USER : ",o.user)})},o.initialize(),e.$on("$routeChangeStart",o.initialize),o.login=function(){t.location.href="/auth/instagram"},o.logout=function(){console.log("logout"),n.logout(),delete o.user},o.menuStyle="collapse navbar-collapse",o.menuClick=function(){"navbar-collapse"==o.menuStyle?o.menuStyle="collapse navbar-collapse":o.menuStyle="navbar-collapse"}}angular.module("AppController",[]).controller("AppController",e),e.$inject=["$rootScope","$window","Auth"]}(),function(){"use strict";function e(e,t){var n={};return n}angular.module("AppService",["ngRoute"]).factory("AppService",e),e.$inject=["$location","$window"]}(),function(){"use strict";function e(e,t,n,o){var r={};return r.logout=function(){o.setToken(),n.path("/")},r.isLoggedIn=function(){return o.getToken()?!0:!1},r.getUser=function(){return o.getToken()?e.get("/api/me"):t.reject({message:"User has no token"})},r}function t(e){var t={};return t.getToken=function(){return e.get("token")},t.setToken=function(t){t?e.put("token",t):e.remove("token")},t}function n(e,t,n){var o={};return o.request=function(e){var t=n.getToken();return t&&(e.headers["x-access-token"]=t),e},o.responseError=function(o){return 403==o.status&&(n.setToken(),t.path("/")),e.reject(o)},o}angular.module("AuthService",[]).factory("Auth",e).factory("AuthToken",t).factory("AuthInterceptor",n),e.$inject=["$http","$q","$location","AuthToken"],t.$inject=["$cookies"],n.$inject=["$q","$location","AuthToken"]}(),function(){"use strict";function e(e,t){e.when("/",{templateUrl:"views/welcome.html",controller:"AppController",controllerAs:"appCtrl",requireLogin:!1}).when("/app",{templateUrl:"views/app.html",requireLogin:!0}).otherwise("/"),t.html5Mode(!0)}angular.module("app.routes",["ngRoute"]).config(e),e.$inject=["$routeProvider","$locationProvider"]}(),function(){"use strict";function e(e){e.interceptors.push("AuthInterceptor")}function t(e,t,n,o){e.$on("$locationChangeStart",function(e,r,i){for(var u in t.routes)-1!=r.indexOf(u)&&t.routes[u].requireLogin&&!o.isLoggedIn()&&(alert("Please login first :D"),e.preventDefault(),n.location.href="/")})}angular.module("iBalloon",["app.routes","ngCookies","AppController","AppService","AuthService"]).config(e).run(t),e.$inject=["$httpProvider"],t.$inject=["$rootScope","$route","$window","Auth"]}();