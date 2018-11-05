import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import List from './List';
import {
	fetchListEnd,
	onListItemAction,
	checkItem,
	showMenu,
	load,
	removeAllItems,
	closeMenu,
	alert,
	showHouseCount,
	prompt,
	enableScroll,
	disableScroll
} from './../../../Actions';
import {
	request
} from './../../../utils/ServerRequest';
import AppProxy from './../../../utils/AppProxy';
import {
	PUTAWAY,
	ONPUTAWAY,
	PUSH,
	LISTITEM_ACTION_PUTAWAY,
	LISTITEM_ACTION_SETHOT,
	LISTITEM_ACTION_EDIT,
	LISTITEM_ACTION_REMOVE,
	LISTITEM_ACTION_DELETE,
	LISTITEM_ACTION_SELL,
	LISTITEM_ACTION_RENT,
	LISTITEM_ACTION_CANCELHOT
} from './../../../obj/Const';

const fetchList = (dispatch, pageindex, pagesize, poststatus, posttype, fltResult) => {
	dispatch((dispatch) => {
		let req = Object.assign({
			poststatus: poststatus == "online" ? 'online' : poststatus == 'offline' ? 'offline' : '',
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
			dispatch(removeAllItems(poststatus));
			dispatch(fetchListEnd(poststatus, res.AdvertPropertys));
		});
	});
}

const mapStateToProps = (state, ownProps) => {
	let type = ownProps.type;
	var curlist;
	switch (type) {
		case PUTAWAY:
			curlist = state.putaways;
			break;
		case ONPUTAWAY:
			curlist = state.onputaways;
			break;
		case PUSH:
			curlist = state.pushs;
			break;
	}
	let enablebatch = curlist.enablebatch;
	let loadmore = curlist.loadmore;
	let flt = curlist.getFilters();
	let lis = curlist.getItems();
	let lists = [...lis];
	let filters = [...flt];
	return {
		type: type,
		loadmore: loadmore,
		status: ownProps.status,
		filters: filters,
		lists: lists,
		enablebatch: enablebatch,
		pageindex: curlist.pageindex,
		pagesize: curlist.pagesize
	};
}

const scrollHandler = (dispatch, pageindex, pagesize, poststatus, posttype, fltResult) => {
	var scrollTop = $("body").scrollTop();
	var docHeight = $("#app").height();
	var vHeight = $(window).height();
	if (scrollTop >= docHeight - vHeight) {
		$(window).off("scroll");
		if (poststatus == "online" || poststatus == 'offline') {
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
				dispatch(enableScroll(poststatus));
				request.requestAdList(req, (res) => {
					dispatch(disableScroll(poststatus));
					if (res.AdvertPropertys) {
						let count = res.AdvertPropertys.length;
						dispatch(fetchListEnd(poststatus, res.AdvertPropertys));
						if (count === pagesize) {
							pageindex++;
							$(window).on("scroll", () => {
								scrollHandler(dispatch, pageindex, pagesize, poststatus, posttype, fltResult);
							});
						}
					}
				});
			});
		} else {
			dispatch((dispatch) => {
				let tradetype = posttype.toLowerCase() === "s" ? 1 : 2;
				let propertyStatus = fltResult ? fltResult.PropertyStatusKeyId : '';
				let req = {
					TradeType: tradetype,
					PropertyStatusKeyId: propertyStatus,
					PageIndex: pageindex,
					PageSize: pagesize
				};
				dispatch(load());
				dispatch(enableScroll(poststatus));
				request.requestPushList(req, (res) => {
					let count = res.SecondHandPropertyPublics.length;
					dispatch(disableScroll(poststatus));
					dispatch(fetchListEnd(poststatus, res.SecondHandPropertyPublics));
					if (count === pagesize) {
						pageindex++;
						$(window).on("scroll", () => {
							scrollHandler(dispatch, pageindex, pagesize, poststatus, posttype, fltResult);
						});
					}
				});
			});
		}
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	let type = ownProps.type;
	return {
		fireScroll: () => {
			$(window).off("scroll");
		},
		onListItemAction: (adid, houseid, type, action, valid) => {
			dispatch(closeMenu(adid, type, false));
			switch (action) {
				case LISTITEM_ACTION_PUTAWAY:
					request.requestPermission({}, (res) => {
						if (!res.AdmPermission || !res.CountPropertyAd||(res.CountPropertyAd==0)) {
							dispatch(alert("超过发布次数！", true));
						} else if (!valid) {
							dispatch(alert("此房源为非有效房源，无法上架！", true));
						} else {
							dispatch(prompt("确定要上架广告吗？", true, () => {
								request.requestBatchOnline({
									KeyIds: [adid]
								}, (res) => {
									if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
										let fltResult = ownProps.filters.getFilterResult();
										let posttype = ownProps.status || '';
										let poststatus = type;
										dispatch(removeAllItems(poststatus));
										$(window).off("scroll");
										scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
									} else {
										dispatch(alert(res.OperateResult.FaildReason, true));
									}
								});
							}));
						}
					});
					break;
				case LISTITEM_ACTION_SETHOT:
					request.requestPermission({}, (res) => {
						if (!res.AdmPermission) {
							dispatch(alert("您没有操作权限！", true));
						} else if (res.CountTotalHotPropertyAd - res.CountHotPropertyAd <= 0) {
							dispatch(alert("设置笋盘数已达上限，无法设置！", true));
						} else {
							dispatch(prompt("确定要设置为笋盘吗？", true, () => {
								request.requestBatchSetHot({
									KeyIds: [adid]
								}, (res) => {
									let fltResult = ownProps.filters.getFilterResult();
									let posttype = ownProps.status || '';
									let poststatus = type;
									dispatch(removeAllItems(poststatus));
									$(window).off("scroll");
									scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
								});
							}));
						}
					});
					break;
				case LISTITEM_ACTION_CANCELHOT:
					request.requestPermission({}, (res) => {
						if (!res.AdmPermission) {
							dispatch(alert("您没有操作权限！", true));
						} else {
							dispatch(prompt("确定要取消笋盘吗？", true, () => {
								request.requestBatchCancelHot({
									KeyIds: [adid]
								}, (res) => {
									let fltResult = ownProps.filters.getFilterResult();
									let posttype = ownProps.status || '';
									let poststatus = type;
									dispatch(removeAllItems(poststatus));
									$(window).off("scroll");
									scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
								});
							}));
						}
					});
					break;
				case LISTITEM_ACTION_DELETE:
					dispatch(prompt("确定要删除广告房源吗？", true, () => {
						request.requestBatchRemove({
							KeyIds: [adid]
						}, (res) => {
							let fltResult = ownProps.filters.getFilterResult();
							let posttype = ownProps.status || '';
							let poststatus = type;
							dispatch(removeAllItems(poststatus));
							$(window).off("scroll");
							scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
						});
					}));
					break;
				case LISTITEM_ACTION_REMOVE:
					dispatch(prompt("确定要下架广告房源吗？", true, () => {
						request.requestBatchOffline({
							KeyIds: [adid]
						}, (res) => {
							if (res.Flag && res.OperateResult && res.OperateResult.OperateResult) {
								let fltResult = ownProps.filters.getFilterResult();
								let posttype = ownProps.status || '';
								let poststatus = type;
								request.requestPermission({}, (res) => {
									dispatch(showHouseCount(type, res.CountSalePropertyAd, res.CountRentPropertyAd));
								});
								dispatch(removeAllItems(poststatus));
								$(window).off("scroll");
								scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
							} else {
								dispatch(alert(res.OperateResult.FaildReason, true));
							}
						});
					}));
					break;
			}
		},
		onCheck: (adid, type, checked) => {
			dispatch(checkItem(adid, type, checked));
		},
		closeMenu: (adid, type, visible) => {
			dispatch(closeMenu(adid, type, !visible));
		},
		onShowMenu: (adid, type, visible) => {
			dispatch(showMenu(adid, type, visible, () => {
				dispatch(closeMenu(adid, type, !visible));
			}));
		},
		setTitle: (title) => {
			let proxy = new AppProxy(window);
			proxy.call("setTitle", title);
		},
		scrollHandler: (type, pageindex, pagesize) => {
			let fltResult = ownProps.filters.getFilterResult();
			let posttype = ownProps.status || '';
			let poststatus = type;
			scrollHandler(dispatch, 1, 10, poststatus, posttype, fltResult);
		}
	}
};
const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer;