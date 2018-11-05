import 'whatwg-fetch';
import proxy from './AppProxy.js';
import { config } from './../config/config.js';
import Log from "./Log.js";
import { getAddress } from './Common.js';

class ServerRequest {
	constructor() {
		this.apiPrefix = '';
		this.userId = '';
		this.appName = 'FYQ';
		this.apiversion = '';
		this.callbackList = [];
		this.auth = config.test ? {
			"CompanyPath": "012",
			"ClientVersion": "2.0.0",
			"MachineCode": "edccc7ef400cb9071c1b5d2e46560a6d",
			"PlatForm": "iOS",
			"Sign": "53fd3270658cd0b970dcff5e5f65cffb",
			"DeviceModel": "iPhone7,1",
			"WeiXinNickname": "",
			"EmpID": "20160519163832DBA2D4B369724D5E0F",
			"Time": "2017-12-07 17:50:26",
			"OSVersion": "11.0.3",
			"DeviceID": "edccc7ef400cb9071c1b5d2e46560a6d",
			"Random": "0.2"
		} : null;
	}

	setAuth(auth, rest) {
		let defAuth = this.auth || {};
		this.auth = Object.assign(defAuth, auth, rest);
		// alert('auth:' + JSON.stringify(this.auth));
		Log.log('auth:', this.auth);
	}

	/*添加请求*/
	addRequest(callback) {
		let callbackId = new Date().getTime(),
			callbackList = this.callbackList || [];
		Log.log('addRequest:callbackId', callbackId);
		callbackList.push({
			cbId: callbackId,
			cb: callback
		});
		this.callbackList = callbackList;
		return callbackId;
	}

	/*取消请求*/
	removeRequest(callbackId) {
		let callbackList = this.callbackList;
		Log.log("removeRequest:callbackId", callbackId);
		callbackList.forEach((item, index) => {
			if (item.cbId === callbackId) {
				callbackList.splice(index, 1);
			}
		});
		this.callbackList = callbackList;
	}

	/*处理请求*/
	dealRequest(callbackId, ...params) {
		let callbackList = this.callbackList;
		Log.log("dealRequest:callbackId", callbackId);
		callbackList.forEach((item, index) => {
			if (item.cbId === callbackId) {
				if (item.cb && typeof item.cb === 'function') {
					var callback = item.cb;
					callback(...params);
					callbackList.splice(index, 1);
				}
			}
		});
		this.callbackList = callbackList;
	}

	request(url, sendData, callbackId, errorCallback = null) {
		/*Log.log('sendData:', JSON.stringify(Object.assign({
			vAuthObj: this.auth
		}, sendData)));*/
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Object.assign({
				vAuthObj: this.auth
			}, sendData))
		}).then(response => response.json()).then((responseJson) => {
			if (responseJson && responseJson.RtnCode === 200) {
				Log.log('接口请求成功：url:', url, 'responseJson：', responseJson);
				this.dealRequest(callbackId, responseJson.content, responseJson.RtnCode, responseJson.RtnMsg);
			} else if (responseJson && responseJson.RtnCode === 403) {
				proxy.call('authError', null);
			} else {
				Log.log('接口请求失败：url:', url, 'auth:', this.auth, ',sendData:', sendData, 'responseJson:', responseJson);
			}
		}).catch((err) => {

		});
	}

	requestWithAuth(url, sendData, callbackId, errorCallback = null) {
		if (config && !config.test) {
			proxy.call('getAuth', null, (auth) => {
				this.setAuth(JSON.parse(auth));
				this.request(url, sendData, callbackId, errorCallback = null);
			});
		} else {
			this.request(url, sendData, callbackId, errorCallback = null);
		}
	}

	requestNoAuth(url, sendData, callbackId, errorCallback = null) {
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Object.assign({
				vAuthObj: {
					"CompanyPath": this.auth.CompanyPath,
					"ClientVersion": this.auth.ClientVersion
				}
			}, sendData))
		}).then(response => response.json()).then((responseJson) => {
			if (responseJson && responseJson.RtnCode === 200) {
				Log.log('接口请求成功：url:', url, 'responseJson：', responseJson)
				this.dealRequest(callbackId, responseJson.content, responseJson.RtnCode, responseJson.RtnMsg);
			} else {
				Log.log('接口请求失败：url:', url, 'auth:', this.auth, ',sendData:', sendData, 'responseJson:', responseJson);
			}
		}).catch((err) => {

		});
	}
	requestNoAuthCode(url, sendData, callbackId, errorCallback = null) {
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Object.assign({
				vAuthObj: {
					"CompanyPath": this.auth.CompanyPath,
					"ClientVersion": this.auth.ClientVersion
				}
			}, sendData))
		}).then(response => response.json()).then((responseJson) => {
			Log.log('接口请求：url:', url, 'auth:', this.auth, ',sendData:', sendData, 'responseJson:', responseJson);
			this.dealRequest(callbackId, responseJson.content, responseJson.RtnCode, responseJson.RtnMsg);
		}).catch((err) => {

		});
	}
	requestNoAuthCodeBase(url, sendData, callbackId, errorCallback = null) {
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Object.assign({
				vAuthObj: {
					"CompanyPath": this.auth.CompanyPath,
					"ClientVersion": this.auth.ClientVersion
				}
			}, sendData))
		}).then(response => response.json()).then((responseJson) => {
			Log.log('接口请求：url:', url, 'auth:', this.auth, ',sendData:', sendData, 'responseJson:', responseJson);
			this.dealRequest(callbackId, responseJson, responseJson.RtnCode, responseJson.RtnMsg);
		}).catch((err) => {

		});
	}
	requestWxSign(url, sendData, callback) {
		let callbackId = this.addRequest(callback);
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body:JSON.stringify(Object.assign({
				vAuthObj: {
					"CompanyPath": this.auth.CompanyPath,
					"ClientVersion": this.auth.ClientVersion
				}
			}, sendData))
		}).then(response => response.json()).then((responseJson) => {
			Log.log('接口请求：url:', url, "body:",JSON.stringify(Object.assign({
				vAuthObj: {
					"CompanyPath": this.auth.CompanyPath,
					"ClientVersion": this.auth.ClientVersion
				}
			}, sendData)));
			this.dealRequest(callbackId, responseJson);
		}).catch((err) => {

		});
	}
	requestCityList(url, citycode, appVersion, callback) {
		let sendData = {
			vJsonData: {
				AppName: this.appName,
				Version: appVersion
			}
		};
		config.appVersion = appVersion;
		config.citycode = citycode;
		config.domain = config.test ? '' : getAddress();
		config.appVersion = appVersion;
		let callbackId = this.addRequest((res) => {
			if (res) {
				let cityinfo = res.filter((item, index) => {
					let citylist = item.CityList;
					if (citylist) {
						return citylist.some((city, cindex) => {
							return city.CityCode === citycode;
						});
					} else {
						return false;
					}
				});
				if (cityinfo && cityinfo[0] && cityinfo[0].CityList) {
					let mcitys = cityinfo[0].CityList;
					let mcity = mcitys.filter((city, cindex) => {
						return city.CityCode === citycode;
					});
					if (mcity && mcity[0]) {
						let cityUrl = mcity[0].CityWebApiUrl;
						this.apiPrefix = cityUrl.replace(/\/$/, '');
					}
					Log.log("requestCityList:callbackId", callbackId);
					if (callback && typeof callback === 'function') {
						callback();
					}
				} else {
					Log.log('Error:未找到匹配城市的api地址');
				}
			} else {
				Log.log('Error:获取城市api配置出错！');
			}
		});
		this.requestNoAuth(url, sendData, callbackId);
	}

	requestWeidianList(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/shop/readlist', sendData, callbackId);
		return callbackId;
	}

	requestManItem(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/myshop/getshop', sendData, callbackId);
		return callbackId;
	}

	requestOnsaleDetail(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/estatesapp/getestateroomtypebyroomtypeId', sendData, callbackId);
		return callbackId;
	}

	requestOnsaleHouseList(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/estatesapp/getestateroomtype', sendData, callbackId);
		return callbackId;
	}

	requestOnsaleSwiperImages(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/estatesapp/getestateroomtypeimgs', sendData, callbackId);
		return callbackId;
	}
	requestEastPhotoList(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/estatesapp/getestatephoto', sendData, callbackId);
		return callbackId;
	}
	requestStoreItems(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuthCodeBase(this.apiPrefix + '/fyqapp/estatesapp/getestateInfo', sendData, callbackId);
		return callbackId;
	}
	requestSendYueYueMessage(sendData, callback) {
		let callbackId = this.addRequest(callback);

		this.requestNoAuthCodeBase(this.apiPrefix + '/fyqapp/shop/saveuserorder', sendData, callbackId);
		return callbackId;
	}
	requestShareCode(sendData, callback) {
		//获取分享码
		let callbackId = this.addRequest(callback);
		this.requestNoAuthCode(this.apiPrefix + '/fyqapp/myshop/getsharecode', sendData, callbackId);
		return callbackId;
	}
	requestCheckMobileCode(sendData, callback) {
		//验证分享码
		let callbackId = this.addRequest(callback);
		this.requestNoAuthCodeBase(this.apiPrefix + '/fyqapp/appcommon/checkcode', sendData, callbackId);
		return callbackId;
	}
	requestMobileCode(sendData, callback) {
		//获取手机验证码
		let callbackId = this.addRequest(callback);
		this.requestNoAuthCodeBase(this.apiPrefix + '/fyqapp/appcommon/getcode', sendData, callbackId);
		return callbackId;
	}
	requestGetShop(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/shop/getshop', sendData, callbackId);
		return callbackId;
	}
	requestSeeDaylay(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + '/fyqapp/shop/saveentity', sendData, callbackId);
		return callbackId;
	}
	requestDayCase(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getdaytjreportforms", sendData, callbackId);
		return callbackId;
	}
	requestWeekCase(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getweektjreportforms", sendData, callbackId);
		return callbackId;
	}
	requestMothCase(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getmonthtjreportforms", sendData, callbackId);
		return callbackId;
	}
	requestDayPerform(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getdayreportforms", sendData, callbackId);
		return callbackId;
	}
	requestWeekPerform(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getweekreportforms", sendData, callbackId);
		return callbackId;
	}
	requestMothPerform(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getmonthreportforms", sendData, callbackId);
		return callbackId;
	}
	requestDayRegister(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getdayregreportforms", sendData, callbackId);
		return callbackId;
	}
	requestWeekRegister(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getweekregreportforms", sendData, callbackId);
		return callbackId;
	}
	requestMothRegister(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestWithAuth(this.apiPrefix + "/fyqapp/reportform/getmonthregreportforms", sendData, callbackId);
		return callbackId;

	}
	requestNewsMessage(sendData, callback) {
		let callbackId = this.addRequest(callback);
		this.requestNoAuth(this.apiPrefix + "/fyqapp/fyqappnotice/getlayout", sendData, callbackId);
		return callbackId;
	}

}
const request = new ServerRequest();
export default request;
