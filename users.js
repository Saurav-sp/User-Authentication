var express = require('express');
var router = express.Router();
var authenticate=require('../authenticate');
var bodyParser=require('body-parser');
var User=require('../Models/user');
var mongoose=require('mongoose');
var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy; 


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
///////////////////////////////////////////Signup code/////////////////////////////////////////////////////
router.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}),
  req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      passport.authenticate('local')(req,res,()=>{
        res.setHeader('Content_Type','application/json');
        res.statusCode=200;
        res.json({success:true,status:'registration successful'});
      });
    }
  });
});
///////////////////////////////////////////Login Code/////////////////////////////////////////////////////
router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,token:token,status:'You are successfully logged in!'});
});
///////////////////////////////////////////LogOut Code/////////////////////////////////////////////////////
router.get('/logout',(req,res)=>{
  if(req.session){
      req.logout();
      //res.redirect('/');
  }
  else{
    var err=new Error('You are already logout');
    err.status=403;
    //next();
  }
});
module.exports = router;