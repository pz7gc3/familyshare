
var host = 'https://familyshare.azurewebsites.net';
if (process.env.NODE_ENV === 'dev')
    host = 'http://localhost:8080';

module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_APP_ID || 'your App ID',
        'clientSecret'  : process.env.FACEBOOK_SECRET || 'your App Secret',
        'callbackURL'   : host + '/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : host + '/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
        'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
        'callbackURL'   : host + '/auth/google/callback'
    },

    'githubAuth' : {
        'clientID'      : process.env.GITHUB_CLIENT_ID || 'your_github_client_id',
        'clientSecret'  : process.env.GITHUB_CLIENT_SECRET || 'your_github_client_secret',
        'callbackURL'   : host + '/auth/github/callback'
    }

};