// config/database.js
module.exports = {

    // According to http://mongoosejs.com/docs/
    // this should work for a local db
    'sendGridUser' : process.env.SEND || 'mongodb://localhost/tutorial';
    //  'your-settings-here' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
