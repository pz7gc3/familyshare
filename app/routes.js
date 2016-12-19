var front = require('./routes/index');
var todo = require('./routes/todo');
var login = require('./routes/login');
var signup = require('./routes/signup');
var home = require('./routes/home');
var about = require('./routes/about')
var profile = require('./routes/profile');
var admin = require('./routes/admin');
var activity = require('./routes/activity');
var innovate = require('./routes/innovate');

module.exports = function(app, passport) {
  app.use('/', front);
  // app.use('/todo', todo);
  app.use('/login', login);
  app.use('/signup', signup);
  app.use('/home', home);
  app.use('/about', about);
  app.use('/profile', profile);
  app.use('/admin', admin);
  app.use('/activity', activity);
  app.use('/innovate', innovate)

  app.get('/logout', function(req, res) {
      delete req.session.user;
      req.logout();
      res.redirect('/');
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google-login', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
          passport.authenticate('google-login', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
          }));

  // =====================================
  // GITHUB ROUTES =======================
  // =====================================
  // send to github to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/github', passport.authenticate('github-login', { scope: [ 'user:email' ] }));

  // the callback after google has authenticated the user
  app.get('/auth/github/callback',
          passport.authenticate('github-login', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
          }));


  // =====================================
  // FACEBOOK ROUTES =======================
  // =====================================
  // send to github to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/facebook', passport.authenticate('facebook-login', { scope: [ 'user:email' ] }));

  // the callback after google has authenticated the user
  app.get('/auth/facebook/callback',
          passport.authenticate('facebook-login', {
                  successRedirect : '/profile',
                  failureRedirect : '/'
          }));
  
}