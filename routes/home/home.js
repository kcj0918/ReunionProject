var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/main');
});
router.get('/ipfind', function(req, res, next) {
  res.render('home/IPfind');
});


module.exports = router;
