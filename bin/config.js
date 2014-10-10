 var express = require('express');
 var app = express();

 app.get("/wechat",function(req,res){
     res.send(req.query.echostr);
 })
 app.listen(3000);