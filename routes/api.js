var apis = require('xiaoyuer/api-offer');

/*
*获取二维码
* 若无错误则返回含ticket的json串
* 若错误返回错误码
* 无参
 */
exports.qr = function(req,res){
    apis.qr(function(err,result){
        if(err)
            res.send(err);
        else
            res.send(result) ;
    })
}

/*
*下单成功时
* 若调用则发送给下单方一条消息
* 返回的是错误码
* 正常时是0
* @param body={
*     openid:"",
*     orderID:"",  ----订单号
*     serviceName:"",-----服务名称
*     remark:""
*     }
 */
exports.orderSuccess = function(req,res){
   var  content = req.body;
    apis.orderSuccess(content.openid,content.orderID,serviceName,remark,function(result){
        res.send(result);
    })
}

/*
*下单成功时
* 发送给服务方一条消息
* 返回的是错误码
 * 正常时是0
 * @param body={
 *     openid:"",
 *     custmInfo:"",---客户信息
 *     serviceName:"",---服务名称
 *     remark:""
 *     }
 */
exports.neworder = function(req,res){
    var  content = req.body;
    apis.neworder(content.openid,content.customInfo,serviceName,remark,function(result){
        res.send(result);
    })
}

/*
 *用户支付
 * 发送一条消息
 * 返回的是错误码
 * 正常时是0
 * @param body={
 *     openid:"",
 *     tradeType:"",---交易类型
 *     curAmount:"",---交易金额
 *     remark:""
 *     }
 */
exports.pay = function(req,res){
    var content = req.body;
    apis.pay(content.openid,content.tradeType,content.remark,content.curAmount,function(result){
        res.send(result);
    })
}

/*
 *订单确认时
 * 若调用则发送给下单方一条消息
 * 返回的是错误码
 * 正常时是0
 * @param body={
 *     openid:"",
 *     orderID:"",  ----订单号
 *     remark:""
 *     }
 */
exports.ensure = function(req,res){
    var content = req.body;
    apis.ensure(content.openid,content.orderID,content.remark,function(result){
        res.send(result);
    })
}