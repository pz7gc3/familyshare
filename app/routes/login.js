var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  // console.log(`Getting the login page...` )

  res.render('login', { 
    title: 'Login',
    message: req.flash('loginMessage') // Possible generated in the passport.authenticate('local-login', ...) call
  });
});

router.post('/', 
  passport.authenticate('local-login', {
      // successRedirect : '/activity',    // redirect to the secure profile section
      failureRedirect : '/login',   // redirect back to the signup page if there is an error
      failureFlash : true           // allow flash messages
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/activity');
    delete req.session.returnTo;
  });

// router.post('/fake', function(req, res, next) {
//   // res.setHeader('Content-Type', 'text/plain')
//   // res.write('you posted:\n')
//   // res.end(JSON.stringify(req.body, null, 2))

//   // This works with GETs
//   // var email=req.param.inputEmail;
//   var email=req.body.inputEmail
//   var password=req.body.inputPassword;

//   console.log(`User ${email} is logging in...` )

//   res.render('login', { 
//     title: 'Login' });
// });

module.exports = router;
