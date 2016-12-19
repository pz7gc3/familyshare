"use strict;"
var http = require('http');
var path = require('path');
var fs = require('fs');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// Athentication stuff
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('express-flash');
var morgan   = require('morgan');       //  for tracing requests
var session  = require('express-session');

var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
// console.log(`Connection to mongo on ${configDB.url}`);

var hbs = require('express-handlebars');
var Handlebars = require('handlebars');
var tools = require('./app/tools');


// Setting up the view engine...
app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',    // Could actually be only /views
    partialsDir: __dirname + '/views/partials/'
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// From: https://code-maven.com/handlebars-conditionals
Handlebars.registerHelper('ifeq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
Handlebars.registerHelper('ifneq', function(a, b, opts) {
    if (a != b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

Handlebars.registerPartial('navbar', fs.readFileSync(__dirname + '/views/partials/navbar.hbs'));


require('./config/passport')(passport); // pass passport for configuration

// Setting up other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(tools.reqtracer)
app.use(morgan('dev')); // log every request to the console

// required for passport
app.use(session({ secret: 'jirsensegenlillahemlighet' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//var tools = require('./app/tools');
//app.use(tools.reqtracer);

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('Hello, cload world!');
// }).listen(process.env.PORT || 8080);