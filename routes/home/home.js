var express = require('express');
var router = express.Router();
var passport = require('../../join/passport');
var userDao = require('../../query/user/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home/main');
});
/* get 으로 로그인 페이지에 들어온경우*/
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

            //첫번째 로그인인지 확인한다.
            userDao.firstLogin(user.id,function(result){
                console.error("result is "+result);

                //첫번째 로그인이 아닌경우 main 화면으로 간다.
                if(result == "true"){
                    return res.redirect('/main/');
                }else{
                    //첫번째 로그인인경우 비밀번호 변경 페이지로 간다.
                    var id = user.id;
                    return res.redirect('/home/login_first/'+id);
                }
            });
        });
    })(req, res, next);
});

//첫번째 로그인시
router.get('/login_first/:login_id',function(req,res,next){

    //TODO : 로그인 했는지 확인 하기. 로그인이 되어있는 경우가 아니면 redirect
    if(passport.deserializeUser(id)){
    }
    var msg = req.flash('error');
    res.render('home/login_first',{message:msg});
});

//비밀번호 변경
router.post('/login_first/:login_id',function(req,res,next){

    console.error("login id is "+req.params.login_id)
    //TODO: 비밀번호 변경 실패시 에러메시지 flash로 보내기  (ex. 비밀번호가 생년월일과 같을경우)
    if(req.body.password != req.body.password_confirm){
        req.flash('error', "비밀번호와 비밀번호 확인이 다릅니다");
        return res.redirect('/home/login_first/'+req.params.login_id)
    }
});

router.get('/ipfind', function (req, res, next) {
    res.render('home/IPfind');
});


module.exports = router;
