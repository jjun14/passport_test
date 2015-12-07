var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

module.exports = function(passport){
  passport.use('login', new LocalStrategy({
      passReqToCallback: true,
      'usernameField': 'email',
      'passwordField': 'password'
    },
    function(req, username, password, done){
      User.findOne({'email': username},
        function(err, user){
          if(err){
            return done(err);
          }
          if(!user){
            console.log('User Not found with email ' + username);
            return done(null, false);
          }
          if(!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false);
          }
          return done(null, user);
        })
    })
  )
}
