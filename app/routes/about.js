var express = require('express');
var router = express.Router();
var navbar = require('../nav-bar.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.originalUrl);

  res.render('about', { 
    title: 'About',
    navbar: navbar.Menu(req),
    user: req.session.user
  });

});

module.exports = router;
