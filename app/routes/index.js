var express = require('express');
var router = express.Router();
var navbar = require('../nav-bar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { 
    title: 'Family Share',
    navbar: navbar.Menu(req)
  });
  
});

module.exports = router;
