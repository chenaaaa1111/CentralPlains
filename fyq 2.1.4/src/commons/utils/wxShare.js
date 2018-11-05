/**
 * Created by hanay on 2015/11/2.
 */
import request from "./../../commons/utils/ServerRequest.js"
import Log from "./Log.js";
function getShare (options){ 
            getwxconfig();
            var linkurl = options.linkurl;
            var title = options.title;
            var des = options.des;
            var imgurl = options.imgurl;
            wxshare(linkurl,title,des,imgurl);


};
//获取微信配置信息
function getwxconfig() {
    var url = "http://apifang.centaline.com.cn/index/fyqapp/WeChat/GetShareInfo";
    //var targetUrl=encodeURIComponent(location.href.split('#')[0]);
    var targetUrl=location.href.split('#')[0];
    Log.log("targetUrl",targetUrl);
    // targetUrl=targetUrl.replace('&', '%26');
    request.requestWxSign(url,{"vJsonData":targetUrl},(responseJson)=>{
        wx.config({
                        debug: false,
                        appId: responseJson["AppId"],
                        timestamp: responseJson["GenTimeSpan"],
                        nonceStr: responseJson["nocrete"],
                        signature: responseJson["Sign"],
                        jsApiList: [
                            // 所有要调用的 API 都要加到这个列表中
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
    })
    wx.error(function(res){

        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res);
        alert(res);
    });
}
//微信分享
function wxshare(linkurl,title,des,imgurl) {

    wx.ready(function () {
        //微信分享
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: des, // 分享描述
            link: linkurl, // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                //alert("成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert("失败");
            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: des, // 分享描述
            link: linkurl, // 分享链接
            imgUrl: imgurl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                //alert("成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert("失败");
            }
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: des, // 分享描述
            link: linkurl, // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: des, // 分享描述
            link: linkurl, // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function (res) {

            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
        });
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: des, // 分享描述
            link: linkurl, // 分享链接
            imgUrl: imgurl, // 分享图标
            success: function (res) {

            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
        });
    });
}
export {
    getShare
}