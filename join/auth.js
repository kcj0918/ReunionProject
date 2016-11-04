var mysql=require('mysql');
var connection=require('./connection');

var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour
var validateJwt = require('express-jwt')({secret: SECRET});


function UserAuth(login_id,callback){
  connection.query("SELECT id,login_id,password FROM user where login_id=?",login_id,function(err, row){


    callback(row[0]);


  });
}

/*Angular2 이용시 토큰 사용*/
// JWT 토큰 생성 함수
function signToken(id) {
    return jwt.sign({id: id}, SECRET, {expiresIn: EXPIRES});
}


// 토큰을 해석하여 유저 정보를 얻는 함수
function isAuthenticated() {
  return compose()
      // Validate jwt
      .use(function(req, res, next) {
        // 만약 access_token 파라메터에 토큰을 설정한 경우 리퀘슽 헤더에 토큰을 설정한다.
        if(req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // 토큰 인증 로직
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        req.user = {
          id: req.user.id,
          name: 'name of ' + req.user.id
        };
        next();
      });

}


exports.signToken = signToken;
exports.isAuthenticated = isAuthenticated;
exports.UserAuth = UserAuth;
