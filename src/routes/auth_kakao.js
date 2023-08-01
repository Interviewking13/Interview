const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const KakaoStrategy = require('passport-kakao').Strategy;
const cors = require('cors'); 
const { User }  = require('../models/index');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

router.use(express.json());
router.use(cors({
    origin: 'https://port-0-interviewking13-7xwyjq992llj5sps0m.sel4.cloudtype.app', // 접근 가능한 도메인
    credentials: 'true', // 응답 헤더 Access-Control-Allow-Credentials
    optionsSuccessStatus: 200,
}));

/** express session 연결 */
router.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            //세션정보 DB에 저장
            mongoUrl: process.env.DB_Link,
          })
    })
);

/** passport 초기화 및 session 연결 */
router.use(passport.initialize());
router.use(passport.session());

/** login이 최초로 성공했을 때만 호출되는 함수 */
passport.serializeUser((user, done) => {
    done(null, user.id)
});

/** 페이지를 방문할 때마다 호출되는 함수 */
passport.deserializeUser((id, done) => {
    done(null, id);
});

/** Kakao login 전략 */
passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_ID,
            callbackURL: process.env.KAKAO_CALLBACK_URL,
            // clientSecret: process.env.KAKAO_SECRET,
            // passReqToCallback: true,
        },   
        async function (req, accessToken, refreshToken, profile, done) {

            try {

              const { accessToken, refreshToken, id, email, name } = profile._json;
              const findUser = await User.findOne({ user_id: id });

              if (!findUser) {
                 const newUser = await User.create({
                    sns_id: id,
                    user_name: name,
                    email: email,
                    provider: 'kakao',
                 });
                 done(null, newUser); 
              }         
           } catch (err) {
             throw new Error(err);
           }
            return done(null, profile);
        },
    )
);

router.get('/', passport.authenticate('kakao'));

router.get('/callback',
    passport.authenticate('kakao', {
        failureRedirect: 'https://port-0-interviewking13-7xwyjq992llj5sps0m.sel4.cloudtype.app',
    }), 
    async (req, res) => {
        const findUser = await User.findOne({ user_id: req.user.id });
        const payload = {
            user_id: findUser._id,// 사용자의 MongoDB ObjectID
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });// 토큰 만료시간 
        res.status(200).json({
            resultCode: "200",
            message: "로그인 성공",
            data: {
                user_id: findUser._id,
                user_name: findUser.user_name,
                email: findUser.email,
                token
            }
        });
    }
);

module.exports = router;
