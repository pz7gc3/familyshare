
// create a new user context
module.exports.UserCtx = function(req, authType, user) {
  if (req && req.session)
     this.sessionId = req.session.id;
  else
     this.sessionId = '';
  user = user || {};   
  this.userId = user._id || '';

  this.email = user.email || '';
  // Prepare for multi passport strategies
  if (!this.email && user.local);
      this.email = user.local.email;

  this.name = user.name || '';

  this.authType = authType || 'local';
};