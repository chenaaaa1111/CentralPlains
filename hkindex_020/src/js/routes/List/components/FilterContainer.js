import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import Filter from './Filter';
import {
	request
} from './../../../utils/ServerRequest';
import {
	selectFilterGroup,
	fetchEstNameEnd,
	load,
	fetchListEnd,
	filterReset,
	removeAllItems,
	showFilter,
	fetchPropertyStatusEnd
} from './../../../Actions';
import {
	PUTAWAY,
	ONPUTAWAY,
	PUSH,
	GROUP_PLOT,
	GROUP_STATUS
} from './../../../obj/Const';
const scrollHandler = (dispatch, pageindex, pagesize, poststatus, posttype, fltResult) => {
	var scrollTop = $("body").scrollTop();
	var docHeight = $("#app").height();
	var vHeight = $(window).height();
	//console.log("filter", "scrollTop:", scrollTop, "docHeight:", docHeight, "vHeight", vHeight);
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
				request.requestAdList(req, (res) => {
					if (res.AdvertPropertys) {
						let count = res.AdvertPropertys.length;
						dispatch(fetchListEnd(poststatus, res.AdvertPropertys));
						if (count === pagesize) {
							pageindex++;
							//pageindex = parseInt(pageindex) + parseInt(pagesize);
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
}
const mapStateToProps = (state, ownProps) => {
	let type = ownProps.type;
	let visible = ownProps.visible;
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
	let flt = curlist.getFilters();
	let lis = curlist.getItems();
	let lists = [...lis];
	let filters = [...flt];
	return {
		type: type,
		visible: visible,
		filters: filters,
		lists: lists,
		pageindex: curlist.pageindex,
		pagesize: curlist.pagesize
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	let type = ownProps.type;
	return {
		getPlotsAndStatus: (type) => {
			switch (type) {
				case PUTAWAY:
					request.requestFindEstateNames({}, (res) => {
						dispatch(fetchEstNameEnd(type, res));
					});
					break;
				case ONPUTAWAY:
					request.requestFindEstateNames({}, (res) => {
						dispatch(fetchEstNameEnd(type, res));
					});
					break;
				case PUSH:
					request.requestFindPropertyStatus({}, (res) => {
						dispatch(fetchPropertyStatusEnd(type, res));
					});
					break;
			}
		},
		selectGroup: (groupid, type) => {
			dispatch(selectFilterGroup(groupid, type));
			if (groupid == GROUP_PLOT) {
				request.requestFindEstateNames({}, (res) => {
					dispatch(fetchEstNameEnd(type, res));
				});
			} else if (groupid == GROUP_STATUS) {
				request.requestFindPropertyStatus({}, (res) => {
					dispatch(fetchPropertyStatusEnd(type, res));
				});
			}
		},
		showFilter: (type, visible) => {
			dispatch(showFilter(type, visible));
		},
		sure: (type) => {
			let pageindex = 1;
			let pagesize = 10;
			let fltResult = ownProps.data.filters.getFilterResult();
			let posttype = ownProps.status || '';
			let poststatus = type;
			dispatch(removeAllItems(type));
			dispatch(showFilter(type, false));
			$(window).off("scroll");
			setTimeout(() => {
				scrollHandler(dispatch, pageindex, pagesize, poststatus, posttype, fltResult);
			}, 0);
		},
		reset: (type) => {
			dispatch(filterReset(type));
		}
	};
};
const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default FilterContainer;