export const CHANGE_TYPE = 'CHANGE_TAB';
export const CHANGE_ESTATE = 'CHANGE_ESTATE';
export const FETCH_ESTATELIST = 'FETCH_ESTATELIST';
export const FETCH_TABLEDATA = 'FETCH_TABLEDATA';
export const FETCH_WEEK_TABLEDATA = 'FETCH_WEEK_TABLEDATA';
export const FETCH_MONTH_TABLEDATA = 'FETCH_MONTH_TABLEDATA';
export const FETCH_NEXT_TABLEDATA = 'FETCH_NEXT_TABLEDATA';
export const CHANGE_PATH = 'CHANGE_PATH';
export const CHANGE_QUERY_TIME = 'CHANGE_QUERY_TIME';
export const RESET_DATA = 'RESET_DATA';
export const FETCH_MORE = 'FETCH_MORE';
export const CHANGE_PAGE_INDEX = 'CHANGE_PAGE_INDEX';
export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
export const LOAD_NO_MORE = 'LOAD_NO_MORE';
export const SET_SCROLL_POS = 'SET_SCROLL_POS';
import model from './../../../utils/Model';
import DateTransform from './../../../../commons/utils/DateTransform';
import Log from './../../../../commons/utils/Log';

function fetchNoMore(hasmore) {
	return {
		type: LOAD_NO_MORE,
		payload: hasmore
	};
}

function setScrollPos(pos) {
	return {
		type: SET_SCROLL_POS,
		payload: pos
	};
}

function fetchMore(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	Log.log('fetchMore', queryStart, queryEnd, data, pageindex, pagesize);
	let datalist = model.fillDataList(queryStart, queryEnd, data);
	Log.log('datelisttest:', datalist);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_MORE,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: DateTransform.nDayBeforeTime(queryStart, pagesize),
			queryEnd: DateTransform.nDayBeforeTime(queryEnd, pagesize),
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	}
}

function resetData(tabletype, queryStart, queryEnd, pageindex, pagesize) {
	model.setType(tabletype);
	return {
		type: RESET_DATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: queryStart,
			queryEnd: queryEnd,
            hasmore: true
		}
	};
}

function changePageIndex(index) {
	return {
		type: CHANGE_PAGE_INDEX,
		payload: index
	}
}

function changeQueryTime(start, end) {
	return {
		type: CHANGE_QUERY_TIME,
		payload: {
			queryStart: start,
			queryEnd: end
		}
	}
}

function changeQueryType(queryType) {
	return {
		type: CHANGE_QUERY_TYPE,
		payload: queryType
	}
}

function changePath(path) {
	return {
		type: CHANGE_PATH,
		payload: path
	}
}

function fetchTableData(type, beginTime, endTime, data) {
	let datalist = model.fillDataList(beginTime, endTime, data);
	model.setData(type, datalist);
	return {
		type: FETCH_TABLEDATA,
		payload: {
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	};
}

function fetchWeekTableData(type, beginTime, endTime, data) {
	let datalist = model.fillWeekDataList(data);
	model.setData(type, datalist);
	return {
		type: FETCH_WEEK_TABLEDATA,
		payload: {
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	};
}

function fetchMonthTableData(type, beginTime, endTime, data) {
	let datalist = model.fillMonthDataList(data);
	model.setData(type, datalist);
	return {
		type: FETCH_MONTH_TABLEDATA,
		payload: {
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	};
}

function fetchNextTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize, hasmore) {
    model.addMoreData(tabletype, data);
	return {
		type: FETCH_NEXT_TABLEDATA,
		payload: {
			pageindex: pageindex + 1,
			pagesize: pagesize,
			queryStart: queryStart,
			queryEnd: queryEnd,
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList(),
			hasmore: hasmore
		}
	}
}

function fetchEstateList(list) {
	return {
		type: FETCH_ESTATELIST,
		payload: model.getEstateList(list)
	};
}

function changeEstate(newEstateId) {
	let newEstate = model.idGetEstate(newEstateId);
	return {
		type: CHANGE_ESTATE,
		payload: {
			newEstateName: newEstate ? newEstate.label : '',
			newEstateId: newEstate ? newEstate.value : ''
		}
	};
}

function changeTab(tabtype) {
	return {
		type: CHANGE_TYPE,
		payload: tabtype
	};
}

function changeHouse(houseId) {
	return {
		type: CHANGE_TYPE,
		payload: houseId
	};
}

function fetchDataEnd(data) {
	return {
		type: FETCH_DATA_END,
		payload: data
	};
}

export { changeTab, changeHouse, setScrollPos, fetchNoMore, changeQueryType, resetData, fetchEstateList, fetchTableData, fetchWeekTableData, fetchMonthTableData, fetchNextTableData, changeEstate, changeQueryTime, changePath };
