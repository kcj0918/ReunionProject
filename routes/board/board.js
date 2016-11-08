var express = require('express');
var router = express.Router();

//게시판 Router
router.get('/list',function(req,res,next){
  res.render('board/list');
});

router.get('/read',function(req,res,next){
  res.render('board/read');
});

router.get('/write',function(req,res,next){
  res.render('board/write');
});

module.exports = router;
