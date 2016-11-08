var express = require('express');
var router = express.Router();
var passport = require('../../join/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home/main');
});
//get 으로 로그인 페이지에 들어온경우
router.get('/login/:category', function (req, res, next) {
    //에러가 있으면 message 로  에러를 보내준다.
    res.render('home/login',{message:req.flash('error')});
});

/* POST action으로 들어온 인증처리를 /login에서 하도록 하고 passport.authenticate를 ‘local’로 한다. 내부 함수에서 에러가 있는 경우 다시 로그인 화면으로 redirect 한다*/
router.post('/login/:category', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        //error 인경우
        if (err) {
            return res.redirect(req.params.category);
        }
        //유저 객체가 없는경우
        if (!user) {
            return res.redirect(req.params.category);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.redirect(req.params.category);
            }
            //로그인이 정상적으로 완료 된 경우

            //TODO: 첫번째 로그인인경우
            return res.redirect('/main/');
        });
    })(req, res, next);
});

router.get('/ipfind', function (req, res, next) {
    res.render('home/IPfind');
});


module.exports = router;
