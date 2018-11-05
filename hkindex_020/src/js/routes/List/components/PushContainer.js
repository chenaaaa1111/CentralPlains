import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import Push from './Push';
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
	batchRemove,
	removeAllItems,
	alert,
	prompt,
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
			let tradetype = posttype.toLowerCase() === "s" ? 1 : 2;
			let propertyStatus = fltResult ? fltResult.PropertyStatusKeyId : '';
			let req = {
				TradeType: tradetype,
				PropertyStatusKeyId: propertyStatus,
				PageIndex: pageindex,
				PageSize: pagesize
			};
			dispatch(load());
			request.requestPushList(req, (res) => {
				let count = res.SecondHandPropertyPublics.length;
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
const mapStateToProps = (state, ownProps) => {
	let status = state.pushs.getFilterStatus();
	let fltvisible = state.pushs.fltvisible;
	let enablebatch = state.pushs.enablebatch;
	let allselected = state.pushs.allselected;
	return {
		status: status,
		allselected: allselected,
		fltvisible: fltvisible,
		enablebatch: enablebatch,
		data: state.pushs
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
								let posttype = ownProps.status || '';
								let poststatus = type;
								dispatch(removeAllItems(poststatus));
								$(window).off("scroll");
								scrollHandler(dispatch, 1, 10, type, status, );
							} else if (!res.Flag && res.OperateResult && res.OperateResult.FaildReason) {
								dispatch(alert(res.OperateResult.FaildReason, true));
							}
						});
					});
				}));
			}
		},
		onStatusChange: (type, filters, status) => {
			dispatch((dispatch) => {
				let fltResult = filters.getFilterResult();
				let tradetype = status.toLowerCase() === "s" ? 1 : 2;
				let propertyStatus = fltResult ? fltResult.PropertyStatusKeyId : '';
				let pageindex = 1;
				let pagesize = 10;
				let req = {
					TradeType: tradetype,
					PropertyStatusKeyId: propertyStatus,
					PageIndex: pageindex,
					PageSize: pagesize
				};
				dispatch(load());
				dispatch(putAwayStatusChange(type, status));
				dispatch(showFilter(type, false));
				request.requestPushList(req, (res) => {
					dispatch(removeAllItems(type));
					dispatch(fetchListEnd(type, res.SecondHandPropertyPublics));
				});
			});
		},
		showFilter: (type, visible) => {
			dispatch(showFilter(type, visible));
			//dispatch(changeBatch(type, false));
		},
		changeBatch: (type, enabled) => {
			dispatch(changeBatch(type, enabled));
			dispatch(showFilter(type, false));
		},
		resetFilter: (type) => {
			dispatch(filterReset(type));
		},
		clearAllItems(type) {
			dispatch(removeAllItems(type));
		}
	};
};
const PushContainer = connect(mapStateToProps, mapDispatchToProps)(Push);
export default PushContainer;