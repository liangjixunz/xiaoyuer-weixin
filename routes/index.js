/* GET home page. */
var api = require("./api");
var reply = require("./reply");


exports.index = function(req, res){
  res.render('index', { title: "express" });
};

exports.api = api;
exports.reply = reply;