export const CHANGE_PERFORM_TYPE = 'CHANGE_PERFORM_TYPE';
export const FETCH_PERFORM_TABLEDATA = 'FETCH_PERFORM_TABLEDATA';
export const FETCH_PERFORM_WEEK_TABLEDATA = 'FETCH_PERFORM_WEEK_TABLEDATA';
export const FETCH_PERFORM_MONTH_TABLEDATA = 'FETCH_PERFORMN_MONTH_TABLEDATA';
export const FETCH_PERFORM_NEXT_TABLEDATA = 'FETCH_PERFORM_NEXT_TABLEDATA';
export const CHANGE_PERFORM_PATH = 'CHANGE_PERFORM_PATH';
export const CHANGE_PERFORM_DOCKER = 'CHANGE_PERFORM_DOCKER';
export const CHANGE_PERFORM_QUERY_TIME = 'CHANGE_PERFORM_QUERY_TIME';
export const RESET_DATA = 'RESET_DATA';
export const SET_SCROLL_POS = 'SET_SCROLL_POS';
export const FETCH_MORE = 'FETCH_MORE';
export const CHANGE_PAGE_INDEX = 'CHANGE_PAGE_INDEX';
export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
import model from './../../../utils/Model';
import DateTransform from './../../../../commons/utils/DateTransform';
import Log from './../../../../commons/utils/Log';

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

function setScrollPos(pos) {
	return {
		type: SET_SCROLL_POS,
		payload: pos
	};
}

function resetData(tabletype, queryStart, queryEnd, pageindex, pagesize) {
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

function changeQueryType(queryType) {
	return {
		type: CHANGE_QUERY_TYPE,
		payload: queryType
	}
}

function changePageIndex(index) {
	return {
		type: CHANGE_PAGE_INDEX,
		payload: index
	}
}

function changeDocker(docker) {
	return {
		type: CHANGE_PERFORM_DOCKER,
		payload: docker
	}
}

function changePerformQueryTime(start, end) {
	return {
		type: CHANGE_PERFORM_QUERY_TIME,
		payload: {
			queryStart: start,
			queryEnd: end
		}
	}
}

function changePerformPath(path) {
	return {
		type: CHANGE_PERFORM_PATH,
		payload: path
	}
}

function fetchTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	Log.log('fetchMore', queryStart, queryEnd, data, pageindex, pagesize);
	let datalist = model.fillDataList(queryStart, queryEnd, data);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_PERFORM_TABLEDATA,
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

function fetchWeekTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	// Log.log('fetchMore', queryStart, queryEnd, data, pageindex, pagesize);
	let datalist = model.fillWeekDataList(queryStart, queryEnd, data);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_PERFORM_WEEK_TABLEDATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: DateTransform.nWeekBeforeTime(queryStart, pagesize),
			queryEnd: DateTransform.nWeekBeforeTime(queryEnd, pagesize),
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	}
}

function fetchMonthTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	let datalist = model.fillMonthDataList(queryStart, queryEnd, data);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_PERFORM_MONTH_TABLEDATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: DateTransform.nMonthBeforeTime(queryStart, pagesize),
			queryEnd: DateTransform.nMonthBeforeTime(queryEnd + 1, pagesize) - 1,
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

export { changeTab, fetchMore, changeQueryType, setScrollPos, resetData, changePageIndex, changeDocker, fetchTableData, fetchWeekTableData, fetchMonthTableData, changePerformQueryTime, changePerformPath };
