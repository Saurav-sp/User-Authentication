'use strict'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs=require('fs');
const mongoose=require('mongoose');
const User=require('./Models/user');
const MongoStore=require('connect-mongo');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session=require('express-session');
var bodyParser=require('body-parser');
var FileStore=require('session-file-store')(session);
const dishRouter=require('./routes/dishRouter');
//var dependencyCheck = require('dependency-check');
var config=require('./config');
var passport=require('passport');
var encoder =bodyParser.urlencoded({ extended: true });

////////////////////////////////////////////////////////////////////////////////////////////////////////////
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//----------------------------------------------------------------------------------------------
//Session use
/*app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-------------
//-------------------------CONNECT MONGO DRIVE(ATLAS)------------------------------------------
const Url=config.mongoUrl;
mongoose.connect('mongodb+srv://Sauravpandey:<password>@saurav-5irg5.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}
);
//-----------------------------------------------------------------------------------------------
//-----------------------------Testing of dataBase with some post and push operation-------------


//---------------------------------------------------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
 
//////////////////////////////////// NO CHANGES REQUIRED HERE/////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen((3000),console.log('connected properly to the server'));
//module.exports = app;
