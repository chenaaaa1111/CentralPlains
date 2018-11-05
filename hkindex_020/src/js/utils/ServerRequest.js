class ServerRequest {
	constructor(platform, token, userNo) {
		this.domain = "";
		this.method = "POST";
		this.platform = platform;
		this.token = token;
		this.userNo = userNo;
		this.ismoblie = true;
	}
	request(url, sendData, callback, errorCallback = null) {
		let method = this.method,
			requrl = this.domain + url,
			ismoblie = this.ismoblie,
			header = {
				token: this.token
			};
		sendData.IsMobileRequest = ismoblie;
		$.ajax({
			type: method,
			url: requrl,
			headers: header,
			data: JSON.stringify(sendData),
			contentType: "application/json",
			dataType: "json",
			success: function(data, status) {
				if (callback && typeof callback === "function") {
					callback(data);
				}
			},
			error: function(xhr, textStatus, errorThrown) {
				if (errorCallback && typeof errorCallback === "function") {
					errorCallback();
				}
			}
		});
	}
	requestAdDetail(sendData, callback) {
		this.request("/api/advert/property-detail", sendData, callback);
	}
	requestPermission(sendData, callback) {
		this.request("/api/advert/online-permissions", sendData, callback);
	}
	requestAdList(sendData, callback) {
		this.request("/api/advert/properties", sendData, callback);
	}
	requestPushList(sendData, callback) {
		this.request("/api/external/publish-properties", sendData, callback);
	}
	requestBatchOnline(sendData, callback) {
		this.request("/api/advert/batch-online", sendData, callback);
	}
	requestBatchOffline(sendData, callback) {
		this.request("/api/advert/batch-offline", sendData, callback);
	}
	requestBatchRefresh(sendData, callback) {
		this.request("/api/advert/batch-refresh", sendData, callback);
	}
	requestHousePhotoList(sendData, callback) {
		this.request("/api/external/get-photos", sendData, callback);
	}
	requestAdPhotoList(sendData, callback) {
		this.request("/api/external/advert-photos", sendData, callback);
	}
	requestBatchSetHot(sendData, callback) {
		this.request("/api/external/batch-set-hot", sendData, callback);
	}
	requestBatchCancelHot(sendData, callback) {
		this.request("/api/external/batch-cancel-hot", sendData, callback);
	}
	requestBatchRemove(sendData, callback) {
		this.request("/api/advert/batch-remove", sendData, callback);
	}
	requestCreatePropertyAd(sendData, callback) {
		this.request("/api/external/batch-create-property-advert", sendData, callback);
	}
	requestBatchEditPropertyAd(sendData, callback) {
		this.request("/api/external/batch-modify-property-advert", sendData, callback);
	}
	requestFindEstateNames(sendData, callback) {
		this.request("/api/external/get-estate-names", sendData, callback);
	}
	requestFindPropertyStatus(sendData, callback) {
		this.request("/api/external/get-property-status-list", sendData, callback);
	}
	requestIsPublished(sendData, callback) {
		this.request("/api/external/exist-property-advert", sendData, callback);
	}
	requestHasRegisterTrust(sendData, callback) {
		this.request("/api/external/exist-register-trust-property", sendData, callback);
	}
}
const request = new ServerRequest('android', "KmmbAW8Mh3hZF2Wow/69Fk7bt5bBTNvaN/MnWZmAEdRFnN+40KdmiKN+aG4hxl+W5DU7FpzfIQpzHYZGKeyO6QKLdM9YmAMRX/80SevKI6fD9/til2M0alvArj2rjfTs2Mp8nQzb7YSIT5HcoUCbaSYn/GEhJ/L+evIoYlS7dr5at3ybuQAE5J81eFSTuoaBlEDa9Tx4Ct+5cGvq8tCg7tD3L1CdMvVyn44LJzq2vlo5XRq71LutJ9uJ9x56X0mKxPskX+sgPyPBMN4qIoxackMBQV6FyQs8RJF2Wz2W0o9g1CXoU7wtvD8RmRUY4yb/+JFmQRmTYRw=", 'Ceshigz2016110212');
export {
	request
};