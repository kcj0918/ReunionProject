var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./auth');
var userDao = require('../query/user/user');
passport.use(new LocalStrategy({
    usernameField: 'login_id',
    passwordField: 'password',
    passReqToCallback:true
}, function(req,login_id,password,done){
    auth.UserAuth(login_id,function(user){
      if(!user){
          return done(null, false);
      }
      if(user.password !== password){
          return done(null, false);
      }
      return done(null, user);
    });
}));

passport.serializeUser(function(user, done){
    console.log('serialize');
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
  console.log('deserialize');
    userDao.FindOne(id,function(result){
       done(null, result);
    });
});

module.exports = passport;
