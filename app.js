var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs") ;
var wechat = require('wechat');
var routes = require('./routes');

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


app.get("/reply/get/auto",routes.reply.get_auto_reply);
app.get("/reply/get/sub",routes.reply.get_sub_reply);
app.post("/reply/set/append",routes.reply.append);
app.get("/reply/set/delete",routes.reply.delete);
app.post("/reply/set/edit",routes.reply.edit);
app.post("/reply/set/sub",routes.reply.edit_sub);

app.get("/api/qr",routes.api.qr);
app.post("/api/order/new",routes.api.neworder);
app.post("/api/order/generate",routes.api.orderSuccess);
app.post("/api/order/ensure",routes.api.ensure);


module.exports = app;