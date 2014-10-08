
var weixin = require('xiaoyuer/weixin');

var success = JSON.stringify({
    error:0,
    status:"success"
});
var failure = JSON.stringify({
    error:-1,
    status:"failed"
});


exports.auto_reply = weixin.reply_by_set;

exports.event_reply = function(message,callback){
    switch(message.Event) {
        case "CLICK":{
            weixin.event_reply(message.FromUserName, message.EventKey, function (result) {
                callback(result);
            });
        }
            break;
        case "subscribe": {
            callback(weixin.sub_proce(message.FromUserName,message.Ticket?message.Ticket:""));
        }
            break;
        case "unsubscribe":{
            weixin.unsbscribe(message.FromUserName,function(){
                ;
            })
        }
    }
}

/*
*获取自动回复规则
 */
exports.get_auto_reply = function(req,res){
    res.send(weixin.reply_settings.get_reply());
}

/*
 *获取关注时的回复
 */
exports.get_sub_reply = function(req,res){
    res.send(weixin.reply_settings.get_sub());
}

/*
*增加一条规则
* @param req.body.content
 */
exports.append = function(req,res){
    if(weixin.reply_settings.append(req.body.content))
        res.send(success) ;
    else
        res.send(failure)
}

/*
*删除一条规则
* @param req.query.id
 */
exports.delete = function(req,res){
    if(weixin.reply_settings.delete(req.query.id))
        res.send(success);
    else
        res.send(failure);
}

/*
*修改一条自动回复规则
* @param req.body.content
 */
exports.edit = function(req,res){
    console.log(req.body);
    if(weixin.reply_settings.edit_auto(req.body.content))
        res.send(success);
    else
        res.send(failure);
}

/*
*修改关注时的回复
* @param req.body.content
 */
exports.edit_sub = function(req,res){
    if(weixin.reply_settings.edit_sub(req.body.content))
        res.send(success);
    else
        res.send(failure);
}

exports.local_only = function(req,res,next){
    if(req.ip =="127.0.0.1")
        next();
    else
        res.send(404);
}