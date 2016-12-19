var express = require('express');
var router = express.Router();
var navbar = require('../nav-bar.js');
var auth = require('../../lib/auth'); 

var apiKey = process.env.SENDGRID_API_KEY || '';
var apiSecret = process.env.SENDGRID_SECRET || '';

// var sendgrid = require('sendgrid')(apiKey, apiSecret);

router.get('/', auth.loginFirst({url: '/login'}), function(req, res, next) {
  res.render('admin', { 
    title: 'Family Share - Admin',
    activePath: req.originalUrl,
    navbar: navbar.Menu(req)
 });
});


function send(toSend){
  // console.log(JSON.stringify(toSend, null, 2))
  // console.log(JSON.stringify(toSend))

  if (apiKey.length !== 48)
    console.log('Wrong API key?');

  var sg = require('sendgrid').SendGrid(apiKey);
  if (!sg)
    console.log('No sendgrid?');

  var requestBody = toSend;
  var emptyRequest = require('sendgrid-rest').request;
  var requestPost = JSON.parse(JSON.stringify(emptyRequest));
  requestPost.method = 'POST';
  requestPost.path = '/v3/mail/send';
  requestPost.body = requestBody;
  sg.API(requestPost, function (error, response) {
    if (error) {
      console.error(error);
    } else {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    }
  })
}

function testMessage(message){
  var helper = require('sendgrid').mail;

  var from_email = new helper.Email("test@example.com");
  var to_email = new helper.Email( message.to );
  var subject = message.subject; // "Hello World from the SendGrid Node.js Library"
  var content = new helper.Content("text/plain", message.text); //"some text here")
  var mail = new helper.Mail(from_email, subject, to_email, content)
  // var email = new helper.Email("test2@example.com")
  // mail.personalizations[0].addTo(to_email)

  return mail.toJSON()
}

function sendEmail(message, done) {
  // https://docs.microsoft.com/en-us/azure/store-sendgrid-nodejs-how-to-send-email

  console.log('Constructing SendGrid message...');
  var sgMessage = testMessage(message);
  console.log(JSON.stringify(sgMessage, null, 2));

  send(sgMessage);

  // sendgrid.send(email, function(err, json) {
  //   if(err) { 
  //     console.error(err);
  //     done(err); 
  //   }
  //   console.log(json);
  //   done(null, json);
  // })
 
  // //Create email data 
  // var email = {
  //   to: 'Johan.Sundstrom@iki.fi',
  //   from: 'julbisin@contoso.com',
  //   subject: 'Snart är det jul igen',
  //   text: 'Hello plain world!',
  //   html: '<p>Hello HTML world!</p>',
  // };
 
// mailer.send(email)
//   .then(() => {
//     console.log('Dit for min test e-mail...')
//     //Celebrate 
//   })
//   .catch(msg => {
//     console.error(msg);
//   });


}

router.get('/emailtest', auth.loginFirst({url: '/login'}), function(req, res, next) {
  res.render('emailtest', { 
    title: 'Family Share - Send Email' });
});

// Ajax callback
router.post('/emailtest', function(req, res, next) {
  var message = {
    to: req.body.mailto || 'Johan.Sundstrom@iki.fi',
    from: 'admin@familyshare.com',
    subject: req.body.subject || 'No subject',
    text: req.body.message || 'Empty message'
  }

  // console.log( JSON.stringify(message, null, 2) );
  sendEmail(message);

  res.status(200).send();
  // sendEmail(message, function(err,json) {
  //   if (err){
  //     res.json({error: err});
  //     return;
  //   } 

  //   res.json(json);
  // })

});

module.exports = router;
