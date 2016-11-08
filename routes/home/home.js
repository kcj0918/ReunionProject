var express = require('express');
var router = express.Router();
var passport = require('../../join/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home/main');
});
router.get('/login/:category', function (req, res, next) {
    //TODO: 여기에 에러메시지 띄우게 하기
    console.error("로그인 get flash is "+ req.flash('error'));
    res.render('home/login');
});
/* POST action으로 들어온 인증처리를 /login에서 하도록 하고 passport.authenticate를 ‘local’ strategy로 호출한다.*/
// router.post('/login/:category', passport.authenticate('local', {
//     successRedirect: '/main', // 로그인 성공 Redirect URL
//     failureRedirect: '/home' // 로그인 실패 Redirect URL
// }));

//로그인 폼을 눌렀을때 불리는 함수
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
                return next(err);
            }
            //로그인이 정상적으로 완료 된 경우 
            return res.redirect('/main/');
        });
    })(req, res, next);
});

router.get('/ipfind', function (req, res, next) {
    res.render('home/IPfind');
});


module.exports = router;
