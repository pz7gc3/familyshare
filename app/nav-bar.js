module.exports.Menu = function (req) {
  var items = [];

  var currentUrl = req.originalUrl;

  // Different menus for authenticated and anonymous users
  if (req.session && req.session.user) {
    items.push( { path: '/activity', caption: 'Activity' } );
    items.push( { path: '/innovate', caption: 'Innovate' })
    // items.push( { path: '/profile', caption: 'Profile'} );
    // items.push( { path: '/logout', caption: 'Logout'} );
  } else {
    items.push( { path: '/', caption: 'Welcome'} );
    items.push( { path: '/about', caption: 'About'} );
    // items.push( { path: '/login', caption: 'Login'} );
  }
  items.map((item) => {
    item.active = currentUrl === item.path;
    return item;
  })

  // console.log(items);

  return items;
} 