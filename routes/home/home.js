var express = require('express');
var router = express.Router();
var passport = require('../../join/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/main');
});
router.get('/login/:category', function(req, res, next) {
  res.render('home/login');
});
router.post('/login/:category', passport.authenticate('local', {
    successRedirect: '/main', // 로그인 성공 Redirect URL
    failureRedirect: '/home', // 로그인 실패 Redirect URL
}));

router.get('/ipfind', function(req, res, next) {
  res.render('home/IPfind');
});


module.exports = router;
