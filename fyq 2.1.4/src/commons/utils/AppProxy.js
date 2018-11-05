import Log from "./Log"
function connectWebViewJavascriptBridge(callback) {
	// alert('connectWebViewJavascriptBridge ready...');
    Log.log('connectWebViewJavascriptBridge ready...');
	if (window.WebViewJavascriptBridge) {
        Log.log('window.WebViewJavascriptBridge:', window.WebViewJavascriptBridge);
		return callback(WebViewJavascriptBridge);
	}
	document.addEventListener(
		'WebViewJavascriptBridgeReady', function() {
            Log.log('WebViewJavascriptBridgeReady:');
			callback(WebViewJavascriptBridge)
		},
		false
	);
	if (window.WVJBCallbacks) {
        Log.log('window.WVJBCallbacks:', window.WVJBCallbacks);
		return window.WVJBCallbacks.push(callback);
	}
	// alert(22);
    Log.log('WVJBIframe');
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}

class AppProxy {
	constructor() {
		this.readyHandlers = [];
	}
	init(readyFunc) {
		connectWebViewJavascriptBridge((bridge) => {
			// alert('connectWebViewJavascriptBridge ready!');
            Log.log('connectWebViewJavascriptBridge ready!');
			var android = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
			if (android) {
				bridge.init(function(message, responseCallback) {
                    Log.log('JS got a message', message);
					var data = {
						'Javascript Responds': '测试中文!'
					};
                    Log.log('JS responding with', data);
					responseCallback(data);
				});
			}
			this.bridge = bridge;
			bridge.registerHandler("functionInJs", function(data, responseCallback) {
				var responseData = "Javascript Says Right back aka!";
                Log.log('测试functionInJs：data', data, ',responseData:', responseData);
				responseCallback(responseData);
			});
			this.readyHandlers.forEach((func, index) => {
				let {funcName, callback} = func;
				if (funcName && callback && typeof callback === 'function') {
					bridge.registerHandler(funcName, function(data, responseCallback) {
						var responseData = "";
                        Log.log('添加readyFunc：funcName:', funcName, ',data', data, ',responseData:', responseData);
						responseCallback(responseData);
					});
				}
			});
			if (readyFunc && typeof readyFunc === 'function') {
				readyFunc();
			}
		})
	}
	addReadyFunc(funcName, callback) {
		this.readyHandlers.push({
			funcName: funcName,
			callback: callback
		});
	}
	call(funcName, params, callback) {
		var response;
		if (!window || !window.WebViewJavascriptBridge) {
			throw new Error('WebViewJavascriptBridge还未初始化！');
		} else {
            Log.log('js调用Native方法：', funcName, '，传入参数：', params);
			window.WebViewJavascriptBridge.callHandler(
				funcName, {
					'param': params
				}, function(responseData) {
                    Log.log('Native方法', funcName, '返回值：', responseData);
					if (responseData && callback && typeof callback === 'function') {
						callback(responseData);
					}
				}
			);
		}
	}
	addCallback(funcName, callback) {
		if (!this.bridge) {
			throw new Error('WebViewJavascriptBridge还未初始化！');
		} else {
			this.bridge.registerHandler(funcName, function(data, responseCallback) {
                Log.log('Native调用js方法：', funcName, '，Native传入参数：', data);
				if (callback && typeof callback === 'function') {
					let responseData = callback(data);
					if (responseData) {
                        Log.log('Native调用js方法', funcName, '返回值：', responseData);
						responseCallback(responseData);
					}
				}
			});
		}
	}
}

const proxy = new AppProxy();
export default proxy;
