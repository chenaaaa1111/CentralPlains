import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import PutAway from './PutAway';
import {
	fetchListEnd,
	onListItemAction,
	checkItem,
	showMenu,
	load,
	putAwayStatusChange,
	showFilter,
	changeBatch,
	selectAll,
	batchCancelHot,
	batchSetHot,
	batchOffline,
	removeAllItems,
	requestPermission,
	showHouseCount,
	closeMenu,
	alert,
	batchRemove,
	prompt,
	filterReset
} from './../../../Actions';
import {
	request
} from './../../../utils/ServerRequest';

const scrollHandler = (dispatch, pageindex, pagesize, poststatus, posttype, fltResult) => {
	var scrollTop = $("body").scrollTop();
	var docHeight = $(document).height();
	var vHeight = $(window).height();
	if (scrollTop >= docHeight - vHeight) {
		$(window).off("scroll");
		dispatch((dispatch) => {
			let req = Object.assign({
				poststatus: poststatus,
				pageindex: pageindex,
				pagesize: pagesize,
				staffno: request.userNo,
				posttype: posttype,
				PageIndex: pageindex,
				PageSize: pagesize,
				EstateKeyId: '',
				CountF: '',
				RangePrice: '',
				SortField: '',
				Ascending: false
			}, fltResult);
			dispatch(load());
			request.requestAdList(req, (res) => {
				if (res.AdvertPropertys) {
					let count = res.AdvertPropertys.length;
					dispatch(fetchListEnd(poststatus, res.AdvertPropertys));
					if (count >= pagesize) {
						pageindex++;
						$(window).on("scroll", () => {
							scrollHandler(dispatch, pageindex, pagesize, poststatus, posttype, fltResult);
						});
					}
				}
			});
		});
	}
}

const mapStateToProps = (state, ownProps) => {
	let status = state.putaways.getFilterStatus();
	let fltvisible = state.putaways.fltvisible;
	let enablebatch = state.putaways.enablebatch;
	let allselected = state.putaways.allselected;
	let pageindex = state.putaways.pageindex;
	let pagesize = state.putaways.pagesize;
	let saleCount = state.putaways.saleCount;
	let rentCount = state.putaways.rentCount;
	return {
		status: status,
		allselected: allselected,
		fltvisible: fltvisible,
		enablebatch: enablebatch,
		data: state.putaways,
		saleCount: saleCount,
		rentCount: rentCount
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchHouseCount: (type) => {
			dispatch((dispatch) => {
				dispatch(load());
				request.requestPermission({}, (res) => {
					dispatch(showHouseCount(type, res.CountSalePropertyAd, res.CountRentPropertyAd));
				});
			});
		},
		selectAll: (type, seleted) => {
			dispatch(selectAll(type, seleted));
		},
		cancelHot: (type, status, data) => {
			let keyids = data.getCheckedKeyIds();
			if (!keyids || keyids.length === 0) {
				dispatch(alert("请选择要取消的笋盘？", true));
			} else if (!data.testBatchHot(false)) {
				dispatch(alert("已选中房源包含非笋盘，请取消重新勾选！", true));
			} else {
				dispatch(prompt("确定要取消选中笋盘吗？", true, () => {
					let req = {
						KeyIds: keyids
					};
					request.requestBatchCancelHot(req, (res) => {
						if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
							dispatch(batchCancelHot(type));
						} else if (!res.Flag && res.OperateResult && res.OperateResult.FaildReason) {
							dispatch(alert(res.OperateResult.FaildReason, true));
						}
					});
				}));
			}
		},
		setHot: (type, status, data) => {
			request.requestPermission({}, (res) => {
				if (!res.AdmPermission) {
					dispatch(alert("您没有操作权限！", true));
				} else {
					let keyids = data.getCheckedKeyIds();
					if (!keyids || keyids.length === 0) {
						dispatch(alert("请选择要设置为笋盘的房源广告？", true, () => {}));
					} else if (!data.testBatchHot(true)) {
						dispatch(alert("已选中房源包含笋盘，请取消重新勾选！", true, () => {}));
					} else if (data.getCheckedKeyIds().length > res.CountTotalHotPropertyAd - res.CountHotPropertyAd) {
						dispatch(alert("设置笋盘数已达上限，无法设置！", true));
					} else {
						dispatch(prompt("确定要设置为笋盘吗？", true, () => {
							let req = {
								KeyIds: keyids
							};
							request.requestBatchSetHot(req, (res) => {
								if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
									dispatch(batchSetHot(type));
								} else if (res.Flag && res.OperateResult && res.OperateResult.FaildReason) {
									dispatch(alert(res.OperateResult.FaildReason, true));
								}
							});
						}));
					}
				}
			});
		},
		batchOffline: (type, status, data) => {
			let keyids = data.getCheckedKeyIds();
			if (!keyids || keyids.length === 0) {
				dispatch(alert("请选择要下架的广告房源！", true));
			} else {
				dispatch(prompt("确定要下架广告房源吗？", true, () => {
					let req = {
						KeyIds: keyids
					};
					request.requestBatchOffline(req, (res) => {
						if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
							//dispatch(batchOffline(type));
							request.requestPermission({}, (res) => {
								dispatch(showHouseCount(type, res.CountSalePropertyAd, res.CountRentPropertyAd));
							});
							let fltResult = data.filters.getFilterResult();
							let posttype = status || '';
							let poststatus = type;
							dispatch(removeAllItems(poststatus));
							$(window).off("scroll");
							scrollHandler(dispatch, 1, 10, type, status, );
						} else if (!res.Flag && res.OperateResult && res.OperateResult.FaildReason) {
							dispatch(alert(res.OperateResult.FaildReason, true));
						}
					});
				}));
			}
		},
		onStatusChange: (type, filters, status) => {
			dispatch((dispatch) => {
				let fltResult = filters.getFilterResult();
				let poststatus = type == "online" ? 'online' : type == 'offline' ? 'offline' : '';
				let req = Object.assign({
					poststatus: poststatus,
					pageindex: 1,
					pagesize: 10,
					staffno: request.userNo,
					posttype: status,
					PageIndex: 1,
					PageSize: 10,
					CountF: '',
					RangePrice: '',
					SortField: '',
					Ascending: false
				}, fltResult);
				dispatch(load());
				dispatch(putAwayStatusChange(type, status));
				dispatch(showFilter(type, false));
				request.requestPermission({}, (res) => {
					dispatch(showHouseCount(type, res.CountSalePropertyAd, res.CountRentPropertyAd));
				});
				request.requestAdList(req, (res) => {
					dispatch(removeAllItems(type));
					dispatch(fetchListEnd(type, res.AdvertPropertys));
				});
			});
		},
		showFilter: (type, visible) => {
			dispatch(showFilter(type, visible));
		},
		resetFilter: (type) => {
			dispatch(filterReset(type));
		},
		changeBatch: (type, enabled) => {
			dispatch(changeBatch(type, enabled));
			dispatch(showFilter(type, false));
		},
		clearAllItems(type) {
			dispatch(removeAllItems(type));
		}
	};
};
const PutAwayContainer = connect(mapStateToProps, mapDispatchToProps)(PutAway);
export default PutAwayContainer;