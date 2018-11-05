require('core-js');
class AppProxy {
	constructor(win) {
		if (!win) {
			throw new Error('未完成初始化');
		}
		this.request = new AppRequest(win);
	}
	addCallback(name, callback) {
		this.request.register(name, callback);
	}
	call(action, data) {
		let sendData = {
			action: action,
			data: data
		};
		return this.request.send(sendData);
	}
}

class AppRequest {
	constructor(win) {
		if (!win) {
			throw new Error('未完成初始化');
		}
		this.win = win;
	}
	send(data) {
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = this.pack(data);
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() {
			document.documentElement.removeChild(WVJBIframe)
		}, 0);
	}
	pack(data) {
		return "centaline:" + encodeURIComponent(JSON.stringify(data));
	}
	register(name, callback) {
		if (!this.win) {
			throw new Error('未完成初始化');
		}
		this.win[name] = callback;
	}
	unregister(name, callback) {
		if (!this.win) {
			throw new Error('未完成初始化');
		}
		this.win[name] = null;
	}
}
export default AppProxy;