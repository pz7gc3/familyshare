// load the things we need
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

// define the schema for our user model
var ideaSchema = mongoose.Schema({
    // The user who owns this idea
    ownerId : ObjectId,

    // caption. For listings and such
    caption : String,

    // could be named category as well
    project : String,

    // new,reaseach,implemented,rejected
    status : String, 

    // For filtering purpose
    keywords: [{ 
      _id:false,  // No need for own ids here.
      keyword: String}],

    // Urls (normally and ides should contain at least one reference)
    urls: [{ 
      _id:false,        // No need for own ids here.
      title: String,    // Not all urls are human friendly :()  
      url: String
    } ],

    // References
    refs: [ { type: String, href: String, caption: String} ],

    description: String,

    created: String,
    modified: String
});

// methods ======================
// helper function to store new ideas
// This lighter/simpler version of the ovject is
// considerable easier for a templating engine
// to consume. The handlebar ones do not
// seem to have that much expressive power in
// that respect.
ideaSchema.methods.simplified = function() {
  var url = (this.urls.length>0 ? this.urls[0].url: '');
  var keywords = this.keywords.map(kw => kw.keyword).join(', ');

  var dateStr = '';
  if (this.created) 
    dateStr = new Date(this.created).toISOString();

  var obj = {
    _id: this._id,
    caption: this.caption,
    project: this.project,
    url: url,
    keywords: keywords,
    description: this.description,
    created_date: dateStr.replace(/T.+$/, ''),
    created: dateStr,
    modified: this.modified
  }

  // console.log('Simplified idea:');
  // console.log(JSON.stringify(obj));

  return obj;
};

// helper function to store new ideas
ideaSchema.methods.addUrl = function(href) {
  href = (href || '').replace(/^\s+|\s+$/g, '');    // trim ala Crockford
  if (href) {
    this.urls.push({url: href});
  }
};

// this is here for reference only. this is how you access
// variables of the object self in a method
// ideaSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

// If the schema is required using different path's 
// the initialization might actually be run several times.
var Idea; 
if (mongoose.models.Idea) {
  Idea = mongoose.model('ideas');
} else {
  Idea = mongoose.model('ideas', ideaSchema);
}
// create the model for users and expose it to our app
module.exports = Idea;