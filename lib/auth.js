

function isAuthenticated(req) {
  // Let the session store its whereever, but we trust the 
  // info in the session.
  if (req && req.session && req.session.user)
    return true;
  return false;        
}

/*
** The loginfirst returns a middleware function
** that redirects the user via a login page if the
** current session is NOT authenticated
**
** It can be used like this:
** 
**   var app = express();
**   var auth = require('auth');
**   app.get('/profile', 
**         auth.loginFirst({url: '/login'}),
**         function(req, res, next) {
**           // Normal logic goes here
**         });
*/
function loginFirst(options) {
  var loginUrl = (options || {}).url || '/login';

  // Now return the middleware function!!  
  function redirectViaLoginPage (req, res, next) {
    if (isAuthenticated(req)) {
      // Ok, user is already authenticated
      next();
    } else {
      // Well, let the user login first
      req.session.returnTo = req.originalUrl; // The login page knows about this property
      res.redirect(loginUrl);
    }
  }

  return redirectViaLoginPage;
}

function authOnly() {

  // Now return the middleware function!!  
  function onlyAllowAuthenticated (req, res, next) {
    if (isAuthenticated(req)) {

      // Ok, user is already authenticated
      next();

    } else {

      res.status(401).send();

    }
  }

  return onlyAllowAuthenticated;
}

module.exports.loginFirst = loginFirst;
module.exports.authOnly = authOnly;
module.exports.isAuthenticated = isAuthenticated;
