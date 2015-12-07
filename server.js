// this is our server file
// intiailize the express application
var express = require('express');
// for joining paths and things
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser')
var expressSession = require('express-session');

// set up passport strategies
// instantiate and set up the app
var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
  secret:"mysecretkey",
  resave: true,
  saveUninitialized: true
}));

// require all the models
require('./server/config/mongoose.js');

// Initialize Passport
var initPassport = require('./server/passport/init.js');
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// require all the routes
require('./server/config/routes.js')(app);

// start the server and run on port 8000
app.listen(8000, function(){
  console.log('listening on port 8000');
});
