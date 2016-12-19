var express         = require('express');
var router          = express.Router();

var navbar = require('../nav-bar.js');
var auth = require('../../lib/auth'); 

// load up the user model
var User            = require('../models/user');
var Idea            = require('../models/idea');

/* GET the profile page. */
router.get('/', 
           auth.loginFirst({url: '/login'}),
           function(req, res, next) {

    var user = req.session.user || {};

    Idea.find({ownerId: user.userId},
        function (err, items) {
          if (err) throw err;

          // console.log(items);

          var ideas = items.map(item => {
            return item.simplified();
          });

          res.render('innovate', { 
            title: 'Family Share - Ideas',
            state: 'default',
            isDefault: true,
            user: req.session.user,
            activePath: req.originalUrl,
            navbar: navbar.Menu(req),
            ideas: ideas,
            message: req.flash('submitMessage')
          });

        }); 
});

/* GET the profile page. */
router.get('/new', 
           auth.loginFirst({url: '/login'}),
           function(req, res, next) {

    var newIdea = new Idea();

    var uiObj = newIdea.simplified();
    uiObj.isNew = true; 

    res.render('innovate', { 
      title: 'Family Share - New Idea',
      state: 'new',
      isNew: true,  // This way we can eventually overcome Azure messiness
      user: req.session.user,
      activePath: req.originalUrl,
      navbar: navbar.Menu(req),
      idea: uiObj,
      message: req.flash('submitMessage')
    });
});

router.post('/new', 
           auth.authOnly(),
           function(req, res, next) {

    console.log('Creating a new idea...')

    // we are demanding an authenticated user,
    // but in the heat someting might go boinkers
    if (!req.session.user) {
      console.error('What? There should be a user!')
      console.log(req.session.user);

      throw "A user is expected at this point";
    }

    var newIdea = new Idea();
    newIdea.ownerId = req.session.user.userId;
    newIdea.caption = req.body.caption;
    newIdea.project = req.body.project;
    newIdea.description = req.body.description;

    var kw = req.body.keywords.split(',');
    newIdea.keywords = [];
    kw.forEach(function (value) {
      newIdea.keywords.push({ keyword: value })
    })
    newIdea.urls = [];
    if (req.body.url)
      newIdea.addUrl(req.body.url);
    newIdea.created = new Date().toJSON();
    newIdea.status = 'new';

    newIdea.save(function (err) {
        if (err)
            throw err;

        // console.log(newIdea);

        res.redirect('/innovate'); 
    });

});

router.get('/:id',
           auth.loginFirst({url: '/login'}),
           function(req, res, next) {
    var id = req.params.id;
    var userId = req.session.user.userId || '-1';

    Idea.findOne({ _id: id, ownerId: userId}, function (err, idea) {
      var uiObj = idea.simplified();
      uiObj.isEdit = true; 

      res.render('innovate', { 
        title: 'Family Share - New Idea',
        state: 'details',
        isDetails: true,  // This way we can eventually overcome Azure messiness
        user: req.session.user,
        navbar: navbar.Menu(req),
        idea: uiObj,
        message: req.flash('submitMessage')
      });

    });
});

router.post('/:id',
           auth.authOnly(),
           function(req, res, next) {

});

// Delete the given :id
router.delete('/:id', 
           auth.authOnly(),
           function(req, res, next) {
    var id = req.params.id;
    var userId = req.session.user.userId || '-1';

    Idea.findOneAndRemove({ _id: id, ownerId: userId}, function (err, idea) {
      if (err) throw err;

      console.log('Removed the idea with id=' + id);
      // res.redirect('/innovate');
      res.json({status: 'deleted'});
    });
});

module.exports = router;

