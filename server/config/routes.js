var passport = require('passport');
var isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = function(app){
  // default route
  app.get('/', function(req,res){
    if(req.user){
      res.redirect('/home');
    } else {
      res.render('index');
    }
  });

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  // user routes
  app.get('/home', isAuthenticated, function(req, res){
    res.render('home');
  })

  // route for facebook authentication and login
  // different scopes while logging in
  app.get('/login/facebook',
    passport.authenticate('facebook', { scope : 'email' }
  ));

  // handle the callback after facebook has authenticated the user
  app.get('/login/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/home',
      failureRedirect : '/'
    })
  );
}
