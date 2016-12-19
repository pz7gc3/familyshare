// var infra = require('./../infra';)
var express = require('express');
var router = express.Router();
var navbar = require('../nav-bar.js');
var auth = require('../../lib/auth'); 

/* GET page. */
router.get('/', 
           auth.loginFirst({url: '/login'}),
           function(req, res, next) {

  res.render('activity', { 
    title: 'Family Share - Dashboard',
    navbar: navbar.Menu(req),
    user: req.session.user 
  });
  
});


module.exports = router;
