// config/database.js
module.exports = {

    // According to http://mongoosejs.com/docs/
    // this should work for a local db
    'url' : process.env.CONNECT_MONGODB || 'mongodb://localhost/tutorial'
    //  'your-settings-here' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};
