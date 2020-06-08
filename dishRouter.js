const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../Models/schema');
const dishRouter=express.Router();
const app = express();
var authenticate=require('../authenticate')
dishRouter.use(bodyParser.json());
'Content-Security-Policy', "default-src 'self'"
dishRouter.route('/:dishID')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishID)
    .then((dish)=>{
        console.log('Connected properly to the server');
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));
    })
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('Post is not avialbale currently on/dishes/ '+req.params.dishID);
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishID,{
        $set:req.body
    },{new:true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
    })
.delete(authenticate.verifyUser,(req,res,next)=>{
    Dishes.findByIdAndDelete(req.body.dishID)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
    });

dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Dishes.create(req.body)
    .then((dish)=>{
        console.log('dishes creted',dish);
        res.statusCode=200;
        res.setHeader=('Content-Security-Policy', "default-src 'self'",'Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});
module.exports = dishRouter;