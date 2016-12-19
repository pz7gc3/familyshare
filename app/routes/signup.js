var express = require('express');
var router = express.Router();
var passport = require('passport');
// var flash    = require('express-flash');


/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { 
    title: 'Signup',
    message: req.flash('signupMessage')
  });
});



function d(req, res, next) {
  return passport.authenticate('local-signup', {
    successRedirect : '/home',    // redirect to the secure profile section
    failureRedirect : '/signup',  // redirect back to the signup page if there is an error
    failureFlash : true           // allow flash messages
  });
}
// process the signup form
// router.post('/', dumpBody, d);

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/home',    // redirect to the secure profile section
    failureRedirect : '/signup',  // redirect back to the signup page if there is an error
    failureFlash : true           // allow flash messages
}));

module.exports = router;
