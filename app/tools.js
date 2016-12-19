var express = require('express');
var router = express.Router();

function reqtracer(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  if (req.method==='POST' && req.body) {
    console.log(JSON.stringify(req.body, null, 2))
  }
  next();
}

function dumpBody(req, res, next) {
  if (req.body) {
    console.log(JSON.stringify(req.body));
  }
  next();
}

module.exports = {
    dumpBody: dumpBody,
    reqtracer: reqtracer
};

// module.exports.Ctx = {
//   /*
//   ** Returns true if the user is authenticated (i.e logeed in)
//   */
//   isAuthenticated: function (req) {
//       // Let the session store its whereever, but we trust the 
//       // info in the session.
//       if (req.session && req.session.user)
//             return true;
//       return false;        
//   },

//   /*
//   ** Middleware that can be used to protect routes
//   */
//   requireAuthUser: function (req, res, next) {
//       if (isAuthenticated(req)) {
//             next();
//       } else {
//             res.status(401).send();
//       }
//   }
// };
