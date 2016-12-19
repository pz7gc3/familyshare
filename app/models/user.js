// app/models/user.js
// This file is based on the tutorial on
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    github           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },

    // Other "normal" properties

    // Primary email.
    // This is basically the username for this particular user
    // Alla of the above authenticatioin providers MAY have different
    // emails for the same user. The email below is the primary email.
    email: String,
    name: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User; 
if (mongoose.models.User) {
  User = mongoose.model('User');
} else {
  User = mongoose.model('User', userSchema);
}
// create the model for users and expose it to our app
module.exports = User;