/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-24 18:51:09
 * @version $Id$
 */
// document.getElementById("resultWrapper").classList.remove("dn");
	setTimeout(function(){
		document.getElementById('mess').style.display='none';
	},3000)
var sharescore = GetQueryString('sharescore');
//获取设备ID
document.getElementById("iframe").src = "https://wap.centanet.com/applink/?sharesocre=" + sharescore;
$("#dlBtn").click(function() {
	var u = navigator.userAgent;
	var isAndroid = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isiOS) {
		window.location.href = "https://t.growingio.com/app/at0/vkorq3P1";
	} else {
		window.location.href = "https://t.growingio.com/app/at0/yYo1XQPl";
	}

});

// function log(msg) {
// 	document.getElementById("test").innerHTML = '测试：' + msg;
// }

function checkPhone(data) {
	if (data.Phone) {
		//说明绑定了手机号记录数据
		document.getElementById("download").classList.add("dn");
		document.getElementById("resultWrapper").classList.remove("dn");
		//记录数据此处添加代码
		var Phone = data.Phone;
		var dataObj = {
			"CusMobile": Phone, //（客户手机号）
			"EmpNo": sharescore, //（经纪人编号）
			"IsMobileRequest": true
		};
		var nowtime = new Date().getTime();
		var delta = (nowtime / 1000).toString();
		var sign = $.md5("CYDAP_com-group~Centa@" + delta + sharescore);
		var headerObj = {
			"staffno": sharescore,
			"number": delta,
			"sign": sign
		}
		var url = "https://gzapi.centaline.com.cn:442/api/permission/add-empcusrelations"; //正式环境
		//    var url="https://10.3.19.66:8080/api/permission/add-empcusrelations";//SIM环境
		//    var url="https://10.3.19.146:15061/api/permission/add-empcusrelations";//测试环境


		$.ajax({
			type: "POST",
			url: url,
			headers: headerObj,
			data: dataObj,
			success: function(res) {
				
			},
			error: function(XMLhttpsRequest, textStatus, errorThrown) {}
		});

	} else {
		//说明没有绑定手机号跳到app绑定手机
		window.WebViewJavascriptBridge.callHandler(
			'bindingPhone', {},
			function(responseData) {

			}
		);
	}
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// function log(msg) {
// 	document.getElementById("test").innerHTML = '测试：' + msg;
// }
//注册事件监听
function connectWebViewJavascriptBridge(callback) {
	//alert(1);
	//log(1);
	if (window.WebViewJavascriptBridge) {
		//alert(12);
		//log(12);

		return callback(WebViewJavascriptBridge);
	}
	document.addEventListener(
		'WebViewJavascriptBridgeReady',
		function() {
			// alert(13);
			// log(13);

			callback(WebViewJavascriptBridge)
		},
		false
	);
	if (window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	// alert(14);
	//log(14);
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}
connectWebViewJavascriptBridge(function(bridge) {
	// alert(15);
	//log(15);

	var android = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
	if (android) {
		// alert(16);
		//log(16);

		bridge.init(function(message, responseCallback) {
			console.log('JS got a message', message);
			var data = {
				'Javascript Responds': '测试中文!'
			};
			console.log('JS responding with', data);
			responseCallback(data);
		});
	}
	window.WebViewJavascriptBridge.callHandler(
		'getDeviceId', {},
		function(getDeviceId) {
			if (getDeviceId) { //获取到设备ID说明在app中
				window.WebViewJavascriptBridge.callHandler(
					'userInfo', {},
					function(userInfo) {
						//log(17);
						var getUserInfo = JSON.parse(userInfo);
						checkPhone(getUserInfo);
					}
				);
			}
		}
	);

	bridge.registerHandler("nativeLoginSuccess", function(data, responseCallback) {
		//java调用js代码
		var nativeData = JSON.parse(data);
		checkPhone(nativeData);
		var responseData = "Javascript Says Right back aka!";
		responseCallback(responseData);
	});

});