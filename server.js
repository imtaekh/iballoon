var appConfig = require('./config/app_config');

var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var passport    = require('passport');
var jwt         = require('jsonwebtoken');

//database setting

mongoose.connect(appConfig.db);

var db = mongoose.connection;

db.once("open",function () {
  console.log("DB connected");
});
db.on('error',function (err) {
  console.log(err);
});

//middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(allowCrossDomain);

//passport middlewares

app.use(passport.initialize());

require('./config/passport');
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.static(__dirname+"/public"));

//routing setting

var authRouter = require('./routes/auth');
var usersRouter= require('./routes/users');
var apiRouter = require('./routes/api');

app.use('/auth', authRouter);
app.use('/users', isLoggedIn, usersRouter);
app.use('/api', isLoggedIn, apiRouter);

app.get('*', function (req, res) {
  res.redirect('/');
});

//server start

http.listen(appConfig.port,function () {
  console.log("http://127.0.0.1:"+appConfig.port+"/");
});

//socket.Io

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('newBalloon', function(balloon){
    io.emit('newBalloon', balloon);
  });
  socket.on('popBalloon', function(id){
    io.emit('popBalloon', id);
  });
});


// functions

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'x-access-token');
    next();
}

function isLoggedIn(req, res, next) {

  var token = req.headers['x-access-token'];

  if(token){
    jwt.verify(token, appConfig.secret, function (err, decoded) {
      if(err)
        return res.json({success:false, message:"invalid token"});

      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({success:false, message:"token needed"});
  }
}
