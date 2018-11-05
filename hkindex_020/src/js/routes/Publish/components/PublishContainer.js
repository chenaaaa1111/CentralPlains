import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { request } from './../../../utils/ServerRequest';
import AppProxy from './../../../utils/AppProxy';
import { load, fetchDetailEnd, showPublish } from './../../../Actions';
import Publish from './Publish';
const requestAdDetail = (dispatch, AdvertKeyId) => {
	let req = {
		AdvertKeyId: AdvertKeyId
	};
	request.requestAdDetail(req, (res) => {
		dispatch(fetchDetailEnd(res));
		// console.log('res',res)
		var resu=res;
		if (res.PropertyStatusName !== "有效") {
			dispatch(showPublish(false));
		} else {
			request.requestPermission({}, (res) => {

				// console.log('post',resu);
				if (!res.AdmPermission) {
					dispatch(showPublish(false));
				} else {
					dispatch(showPublish(true));
				}			
				if(!resu.IsOnline){
						if (resu.TradeType==1) {
								if (!res.AdmPermission ||!(res.SalePackageCount-res.CountSalePropertyAd)) {
							dispatch(showPublish(false));
								} else {
									dispatch(showPublish(true));
								}
						}
						if(resu.TradeType==2){
							if (!res.AdmPermission ||!(res.PackageCount-res.CountRentPropertyAd)) {
								dispatch(showPublish(false));
							} else {	
								dispatch(showPublish(true));
							}
						}
				}	
				

			});
		}
	


	});
};
const mapStateToProps = (state, ownProps) => {
	console.log('state',state);
	return {
		activeTab:state.activeTab,
		adid: ownProps.params.adid,
		status: state.info.status
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getToken: () => {
			let proxy = new AppProxy(window);
			proxy.addCallback("windowReady", (urlParams) => {
				let {advertKeyId, keyId, tradeType, platform, userNo, token} = urlParams;
				//alert("platform:" + platform + "userNo:" + userNo + "token:" + token + "keyId:" + keyId + "tradeType:" + tradeType + "advertKeyId:" + advertKeyId);
				request.platform = platform;
				request.userNo = userNo;
				request.token = token;
				dispatch((dispatch) => {
					dispatch(load());
					if (advertKeyId && advertKeyId != '') {
						requestAdDetail(dispatch, advertKeyId);
					} else if (keyId) {
						let req = {
							KeyId: keyId
						}
						if (tradeType) {
							req.TradeType = tradeType;
						}
						request.requestCreatePropertyAd(req, (res) => {
							advertKeyId = res.PropertyAdKeyId;
							requestAdDetail(dispatch, advertKeyId);
						});
					}
				});
			});
			proxy.call("getToken");
		},
		fetchDetails: (adid) => {
			dispatch((dispatch) => {
				dispatch(load());
				requestAdDetail(dispatch, adid);
			});
		},
		resetDetails: () => {
			dispatch(fetchDetailEnd({}));
		}
	};
};
const PublishContainer = connect(mapStateToProps, mapDispatchToProps)(Publish);
module.exports = PublishContainer;
