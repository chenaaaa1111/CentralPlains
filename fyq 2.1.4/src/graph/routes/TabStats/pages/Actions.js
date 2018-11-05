export const CHANGE_PERFORM_TYPE = 'CHANGE_PERFORM_TYPE';
export const FETCH_PERFORM_TABLEDATA = 'FETCH_PERFORM_TABLEDATA';
export const FETCH_PERFORM_WEEK_TABLEDATA = 'FETCH_PERFORM_WEEK_TABLEDATA';
export const FETCH_PERFORM_MONTH_TABLEDATA = 'FETCH_PERFORMN_MONTH_TABLEDATA';
export const FETCH_PERFORM_NEXT_TABLEDATA = 'FETCH_PERFORM_NEXT_TABLEDATA';
export const CHANGE_PERFORM_PATH = 'CHANGE_PERFORM_PATH';
export const CHANGE_PERFORM_QUERY_TIME = 'CHANGE_PERFORM_QUERY_TIME';
export const SET_SCROLL_POS = 'SET_SCROLL_POS';
export const RESET_DATA = 'RESET_DATA';
export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
import model from './../../../utils/Model';
import Log from './../../../../commons/utils/Log'
function changePerformQueryTime(start, end) {
	return {
		type: CHANGE_PERFORM_QUERY_TIME,
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

function changePerformPath(path) {
	return {
		type: CHANGE_PERFORM_PATH,
		payload: path
	}
}

function setScrollPos(pos) {
	return {
		type: SET_SCROLL_POS,
		payload: pos
	};
}

function resetData(tabletype, queryStart, queryEnd, pageindex, pagesize) {
	console.log('resetData');
	model.setType(tabletype);
	return {
		type: RESET_DATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: queryStart,
			queryEnd: queryEnd
		}
	};
}

function fetchTableData(type, beginTime, endTime, data) {
	let datalist = model.fillDataList(beginTime, endTime, data);
	model.setData(type, datalist);
	return {
		type: FETCH_PERFORM_TABLEDATA,
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
		type: FETCH_PERFORM_WEEK_TABLEDATA,
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
		type: FETCH_PERFORM_MONTH_TABLEDATA,
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
		type: FETCH_PERFORM_NEXT_TABLEDATA,
		payload: {
			hasmore: hasmore,
			pageindex: pageindex + 1,
			pagesize: pagesize,
			queryStart: queryStart,
			queryEnd: queryEnd,
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	}
}

function changeTab(tabtype) {
	return {
		type: CHANGE_PERFORM_TYPE,
		payload: tabtype
	};
}

function fetchDataEnd(data) {
	return {
		type: FETCH_DATA_END,
		payload: data
	};
}

export { changeTab, changeQueryType, setScrollPos, fetchTableData, resetData, fetchWeekTableData, fetchMonthTableData, changePerformQueryTime, changePerformPath, fetchNextTableData };
