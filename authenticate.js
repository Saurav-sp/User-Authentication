var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./Models/user');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const jwt=require('jsonwebtoken'); // Used to create, sign and verify token.
const config=require('./config');

exports.local=passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,{
        expiresIn:3600
    });
};
var opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;
exports.jwtPassport=passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("Jwt Payload: ",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))
exports.verifyUser=passport.authenticate('jwt',{session:false});





