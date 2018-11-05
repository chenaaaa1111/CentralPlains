import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import OnPutAway from './OnPutAway';
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
	batchOnline,
	removeAllItems,
	closeMenu,
	alert,
	prompt,
	batchRemove,
	filterReset
} from './../../../Actions';
import {
	request
} from './../../../utils/ServerRequest';
const scrollHandler = (dispatch, pageindex, pagesize, poststatus, posttype, fltResult) => {
	var scrollTop = $("body").scrollTop();
	var docHeight = $("#app").height();
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
	let status = state.onputaways.getFilterStatus();
	let fltvisible = state.onputaways.fltvisible;
	let enablebatch = state.onputaways.enablebatch;
	let allselected = state.onputaways.allselected;
	//console.log("status", status, "fltvisible", fltvisible, "enablebatch", enablebatch, "allselected", allselected);
	return {
		status: status,
		allselected: allselected,
		fltvisible: fltvisible,
		enablebatch: enablebatch,
		data: state.onputaways
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectAll: (type, seleted) => {
			dispatch(selectAll(type, seleted));
		},
		batchDelete: (type, status, data) => {
			let keyids = data.getCheckedKeyIds();
			if (!keyids || keyids.length === 0) {
				dispatch(alert("请选择要删除的房源广告!", true));
			} else {
				dispatch(prompt("确定要删除选中广告吗？", true, () => {
					dispatch((dispatch) => {
						let req = {
							KeyIds: keyids
						};
						request.requestBatchRemove(req, (res) => {
							if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
								//dispatch(batchRemove(type));
								let fltResult = data.filters.getFilterResult();
								let posttype = status || '';
								let poststatus = type;
								dispatch(removeAllItems(poststatus));
								$(window).off("scroll");
								scrollHandler(dispatch, 1, 10, type, status, );
							} else if (res.Flag && res.OperateResult && res.OperateResult.FaildReason) {
								dispatch(alert(res.OperateResult.FaildReason));
							}
						});
					});
				}));
			}
		},
		batchOnline: (type, status, data) => {
			request.requestPermission({}, (res) => {
				if (!res.AdmPermission) {
					dispatch(alert("您没有操作权限！", true));
				} else if (res.CountPropertyAd < data.getCheckedKeyIds().length) {
					dispatch(alert("上架广告数已达上限！", true));
				} else {
					let keyids = data.getCheckedKeyIds();
					if (!keyids || keyids.length === 0) {
						dispatch(alert("请选择要上架的房源广告!", true, () => {}));
					} else if (!data.testBatchValid()) {
						dispatch(alert("已选中包含非有效房源，请取消重新勾选！", true, () => {}));
					} else {
						dispatch(prompt("确定要上架房源广告吗？", true, () => {
							let req = {
								KeyIds: keyids
							};
							request.requestBatchOnline(req, (res) => {
								if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
									//dispatch(batchOnline(type));
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
				}
			});
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
					EstateKeyId: '',
					CountF: '',
					RangePrice: '',
					SortField: '',
					Ascending: false
				}, fltResult);
				dispatch(load());
				dispatch(putAwayStatusChange(type, status));
				dispatch(showFilter(type, false));
				request.requestAdList(req, (res) => {
					dispatch(removeAllItems(type));
					dispatch(fetchListEnd(type, res.AdvertPropertys));
				});
			});
		},
		showFilter: (type, visible) => {
			dispatch(showFilter(type, visible));
			//dispatch(changeBatch(type, false));
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
const OnPutAwayContainer = connect(mapStateToProps, mapDispatchToProps)(OnPutAway);
export default OnPutAwayContainer;