import React from 'react';
import ReactDOM from 'react-dom';
import {
	browserHistory
} from 'react-router';
import {
	connect
} from 'react-redux';
import Edit from './Edit';
import {
	Switch,
	changeSwitch,
	changeEditState,
	load,
	alert,
	loadend,
	promptPub,
	showPublish
} from './../../../../../Actions.js';
import {
	EDIT_STATE_BASE,
	EDIT_STATE_IMG,
	EDIT_STATE_VIEW,
	PUTAWAY_VALUE,
	ONPUTAWAY_VALUE,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_STYLE,
	TRADE_SALE,
	TRADE_RENT,
	NO_ENTRUST,
	ENTRUST_FAILED,
	ENTRUST_PASS,
	ENTRUST_ONPASS,
} from './../../../../../obj/Const';
import Config from './../../../../../obj/Config';
import AppProxy from './../../../../../utils/AppProxy';
import {
	request
} from './../../../../../utils/ServerRequest';

function testEntrust(houseid, callback,info) {
	let entrustSuccess = false;
	request.requestPermission({}, (res) => {
		let isTrustOn = parseInt(res.RegisterTrustsOnOff);
		let isTrustAuditOn = parseInt(res.RegisterTrustAudit);
			
		if (isTrustOn) {
			request.requestHasRegisterTrust({
				PropertyKeyId: houseid
			}, (res) => {
				if (isTrustAuditOn && res.Status === ENTRUST_PASS || !isTrustAuditOn && res.Status !== NO_ENTRUST) {
					entrustSuccess = true;
				} else {
					entrustSuccess = false;
				}
				if (callback && typeof callback === 'function')
					callback(entrustSuccess);
			});
		} else {
			entrustSuccess = true;
			if (callback && typeof callback === 'function')
				callback(entrustSuccess);
		}
	});
}

const mapStateToProps = (state, ownProps) => {
	let housePhotos = state.info.getPhotosByType(PHTOTO_TYPE_ROOM);
	let stylePhotos = state.info.getPhotosByType(PHTOTO_TYPE_STYLE);
	return {
		info: Object.assign(state.info, ownProps.params),
		canPublish: state.canPublish,
		switchactive: state.switchactive,
		housePhotos: housePhotos,
		stylePhotos: stylePhotos
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		
		onSwitch: () => {
			dispatch(changeSwitch());
		},
		setTitle: (title) => {
			let proxy = new AppProxy(window);
			proxy.call("setTitle", title);
		},
		saveOnPutAway: (info, status) => {
			let req = info.getEditInfo(status);
			if (info.size < 2 || info.size > 10000000) {
				dispatch(alert("房源面积为2-10000000m ²之间。请通过编辑房源补充信息!", true));
			} else if (info.tradetype === TRADE_SALE && (info.sellprice < 5 || info.sellprice > 10000)) {
				dispatch(alert("广告房源的出售价格区间值为5万至1亿之间！", true));
			} else if (info.tradetype === TRADE_RENT && (info.rentprice < 800 || info.rentprice > 500000)) {
				dispatch(alert("广告房源的出租价格区间值为800元至50万之间！", true));
			} else if (!info.direction) {
				dispatch(alert("朝向不能为空，请通过编辑房源补充信息！", true));
			} else if (!info.propertyright) {
				dispatch(alert("产权性质不能为空，请通过编辑房源补充信息！", true));
			} else if (info.floor === '') {
				dispatch(alert("楼层不能为空，请联系数据组同事补充信息！", true));
			} else if (!info.propertytype) {
				dispatch(alert("房屋用途不能为空，请通过编辑房源补充信息！", true));
			} else if (!req.Title || req.Title.length < 5 || req.Title.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
				dispatch(alert("房源标题不能少于5个字！", true));
			} else if (!req.Description || req.Description.length < 10 || req.Description.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
				dispatch(alert("房源描述不能少于10个字！", true));
			} else if (req.Title && info.containTaboo(req.Title)) {
				let taboo = info.containTaboo(req.Title);
				if (taboo && taboo != '') {
					dispatch(alert('标题中不能包含违禁词"' + taboo + '",请谨慎填写！', true));
				}
			} else if (req.Description && info.containTaboo(req.Description)) {
				let taboo = info.containTaboo(req.Description);
				if (taboo && taboo != '') {
					dispatch(alert('描述中不能包含违禁词"' + taboo + '",请谨慎填写！', true));
				}
			} else if (!req.Photos || req.Photos.length === 0) {
				dispatch(alert("室内图或户型图至少上传一张且必须选择一张图片作为橱窗！", true));
			} else {
				let hasDefault = req.Photos.some((photo, index) => {
					return photo.isDefault;
				});
				if (!hasDefault) {
					dispatch(alert('橱窗图不能为空！', true));
				} else {
					dispatch(load());
					request.requestBatchEditPropertyAd(req, (res) => {
						dispatch(loadend());
						dispatch(promptPub("保存成功！", true));
					});
				}
			}
		},
		publish: (info, status) => {
			dispatch((dispatch) => {
				testEntrust(info.houseid, (result) => {
					if (!result) {
						dispatch(alert("此房源无委托或委托未审核通过，无法发布房源!", true));
						return;
					} else {
						let req = info.getEditInfo(status);
						if (info.size < 2 || info.size > 10000000) {
							dispatch(alert("房源面积为2-10000000m ²之间。请通过编辑房源补充信息!", true));
						} else if (info.tradetype === TRADE_SALE && (info.sellprice < 5 || info.sellprice > 10000)) {
							dispatch(alert("广告房源的出售价格区间值为5万至1亿之间！", true));
						} else if (info.tradetype === TRADE_RENT && (info.rentprice < 800 || info.rentprice > 500000)) {
							dispatch(alert("广告房源的出租价格区间值为800元至50万之间！", true));
						} else if (!info.direction) {
							dispatch(alert("朝向不能为空，请通过编辑房源补充信息！", true));
						} else if (!info.propertyright) {
							dispatch(alert("产权性质不能为空，请通过编辑房源补充信息！", true));
						} else if (!info.floor) {
							dispatch(alert("楼层不能为空，请通过编辑房源补充信息！", true));
						} else if (!info.propertytype) {
							dispatch(alert("房屋用途不能为空，请通过编辑房源补充信息！", true));
						} else if (!req.Title || req.Title.length < 5 || req.Title.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
							dispatch(alert("房源标题不能少于5个字！", true));
						} else if (!req.Description || req.Description.length < 10 || req.Description.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
							dispatch(alert("房源描述不能少于10个字！", true));
						} else if (req.Title && info.containTaboo(req.Title)) {
							let taboo = info.containTaboo(req.Title);
							if (taboo && taboo != '') {
								dispatch(alert('标题中不能包含违禁词"' + taboo + '",请谨慎填写！', true));
							}
						} else if (req.Description && info.containTaboo(req.Description)) {
							let taboo = info.containTaboo(req.Description);
							if (taboo && taboo != '') {
								dispatch(alert('描述中不能包含违禁词"' + taboo + '",请谨慎填写！', true));
							}
						} else if (!req.Photos || req.Photos.length === 0) {
							dispatch(alert("室内图或户型图至少上传一张且必须选择一张图片作为橱窗！", true));
						} else {
							let hasDefault = req.Photos.some((photo, index) => {
								return photo.isDefault;
							});
							if (!hasDefault) {
								dispatch(alert('橱窗图不能为空！', true));
							} else if (!info.valid) {
								dispatch(alert("此房源为非有效房源，无法上架！", true));
							} else {
								dispatch(load());
								request.requestBatchEditPropertyAd(req, (res) => {
									dispatch(loadend());
									dispatch(promptPub("保存成功！", true));
								});
							}
						}
					}
				},info);
			});
		}
	}
}
const EditContainer = connect(mapStateToProps, mapDispatchToProps)(Edit);
module.exports = EditContainer;