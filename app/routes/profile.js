var express         = require('express');
var router          = express.Router();
var navbar = require('../nav-bar.js');

var auth = require('../../lib/auth'); 

// load up the user model
var User            = require('../models/user');

/* GET the profile page. */
router.get('/', 
           auth.loginFirst({url: '/login'}),
           function(req, res, next) {

    var userId = req.session.user.userId || -1;
    User.findOne({ '_id' :  userId }, function(err, user) {
      res.render('profile', { 
        title: 'Family Share - Profile',
        user: user,
        isProfile: true,
        isLocalAuth: req.session.user.authType === 'local',
        navbar: navbar.Menu(req),
        message: req.flash('updateMessage')
      });
    })

});

router.post('/', auth.authOnly(), function(req, res, next) {
  var formData = {
    email: req.body.email,
    displayname: req.body.displayname
  }

  console.log('Updating profile info...');
  
  // This is implemented as an ajax eventhandler.
  updateUserProfile(req, req.session.user, formData,
    function (err, user) {
      if (err) {
        console.log(err);
        res.json({status: 'error', errors: [ err.toString() ]});
        return;
      }

      res.json({
        status: 'ok', 
        errors: [ ],
        user: {
          email: user.email,
          name: user.name 
        }
      });
    })
});


function updateUserProfile(req, userCtx, formData, done) {
    var userId = userCtx.userId || '';    

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ '_id' :  userId }, function(err, user) {
      if (err) {
        req.flash('updateMessage', err);
        return done(err);
      }

      if (!user) {
        var msg = 'Unknown user';
        req.flash('updateMessage', msg);
        return done(msg);
      }

      // IRL we would have to verify this email adress.
      // Now it is possible to giveaway this account, which is NOT nice
      // Lets make this in baby steps...

      var email   = formData.email || '';
      var name    = formData.displayname || '';

      if (email) {
        userCtx.email = email;
        // We can only change the email of the local authentication provider
        if (userCtx.authType === 'local' && user.local)
          user.local.email = email; 
        user.email = email;
      }

      if (name) {
        userCtx.name = name;
        user.name = name;
      }

      console.log(user);

      user.save(function(err) {
          if (err)
              throw err;
          return done(null, user);
      });

    });
}

module.exports = router;

