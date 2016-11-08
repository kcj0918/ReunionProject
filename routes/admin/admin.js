var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/request', function(req, res, next) {
  res.render('admin/request');
});
router.get('/send', function(req, res, next) {
  res.render('admin/send');
});
router.get('/guide', function(req, res, next) {
  res.render('admin/guide');
});
router.get('/list',function(req,res,next){
  res.render('admin/list');
});//회원 엑셀로 추가시 list목록 임시로 추가


module.exports = router;
