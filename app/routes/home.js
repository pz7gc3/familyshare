// var infra = require('./../infra';)
var express = require('express');
var router = express.Router();
var navbar = require('../nav-bar.js');

/* GET page. */
router.get('/', function(req, res, next) {
  // This page should only be accessible 
  // to authenticated users

  res.render('home', { 
    title: 'Home',
    navbar: navbar.Menu(req),
    user: req.session.user 
  });
});

router.post('/', function(req, res, next) {
  // res.setHeader('Content-Type', 'text/plain')
  // res.write('you posted:\n')
  // res.end(JSON.stringify(req.body, null, 2))

  // This works with GETs
  // var email=req.param.inputEmail;
  var email=req.body.inputEmail
  var password=req.body.inputPassword;

  console.log(`User ${email} is logging in...` )

  res.render('login', { 
    title: 'Login' });
});

module.exports = router;
