var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wechat = require('wechat');
var routes = require('./routes');
var crypto = require("crypto");

var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('xiaoyuer'));
app.use(express.cookieSession());
app.use(app.router);



app.use(express.query());
app.use('/wechat', wechat('weixin').text(function (message, req, res, next) {
         res.reply(routes.reply.auto_reply(message.Content));
}).image(function (message, req, res, next) {
    // TODO
}).voice(function (message, req, res, next) {
    // TODO
}).video(function (message, req, res, next) {
    // TODO
}).location(function (message, req, res, next) {
    // TODO
}).link(function (message, req, res, next) {
    // TODO
}).event(function (message, req, res, next) {
    routes.reply.event_reply(message,function(result){
       res.reply(result);
    })
}).middlewarify());

/*
*对于自动回复的修改和查看
 */
app.get("/reply/get/auto",routes.reply.get_auto_reply);
app.get("/reply/get/sub",routes.reply.get_sub_reply);
app.post("/reply/set/append",routes.reply.append);
app.get("/reply/set/delete",routes.reply.delete);
app.post("/reply/set/edit",routes.reply.edit);
app.post("/reply/set/sub",routes.reply.edit_sub);


/*
 *使用api时的校验
 */
var signature_check = (function(){
    var token = JSON.parse(fs.readdirSync("./appConfig.json")).token;
    var sha1 = crypto.createHash('sha1')
    return function(req,res,next){
        if(req.query.timestamp&req.query.check){
            sha1.update(token);
            sha1.update(req.query.timestamp);
            if(req.query.check==sha1.digest('hex')){
                next();
            }
            else
                res.send(JSON.stringify({code:"-10","err":"permission denied"}))
        }
        else
            res.send(JSON.stringify({code:"-10","err":"permission denied"}))
    }
})();
/*
 *提供的apis
 */
app.get("/qr",signature_check,routes.api.qr);
app.post("/order/new",signature_check,routes.api.neworder);
app.post("/order/generate",signature_check,routes.api.orderSuccess);
app.post("/order/ensure",signature_check,routes.api.ensure);



module.exports = app;