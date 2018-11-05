export const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
export const FETCH_LOGIN_TABLEDATA = 'FETCH_LOGIN_TABLEDATA';
export const FETCH_LOGIN_WEEK_TABLEDATA = 'FETCH_LOGIN_WEEK_TABLEDATA';
export const FETCH_LOGIN_MONTH_TABLEDATA = 'FETCH_LOGIN_MONTH_TABLEDATA';
export const FETCH_LOGIN_NEXT_TABLEDATA = 'FETCH_LOGIN_NEXT_TABLEDATA';
export const FETCH_LOGIN_AGENT_TABELDATA = 'FETCH_LOGIN_AGENT_TABELDATA';
export const CHANGE_LOGIN_PATH = 'CHANGE_LOGIN_PATH';
export const CHANGE_LOGIN_QUERY_TIME = 'CHANGE_LOGIN_QUERY_TIME';
export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
export const SET_SCROLL_POS = 'SET_SCROLL_POS';
export const RESET_DATA = 'RESET_DATA';
import model from './../../../utils/Model';
import Log from './../../../../commons/utils/Log';

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

function setScrollPos(pos) {
	return {
		type: SET_SCROLL_POS,
		payload: pos
	};
}

function changeQueryType(queryType) {
	return {
		type: CHANGE_QUERY_TYPE,
		payload: queryType
	}
}

function changeLoginQueryTime(start, end) {
	return {
		type: CHANGE_LOGIN_QUERY_TIME,
		payload: {
			queryStart: start,
			queryEnd: end
		}
	}
}

function changeLoginPath(path, label) {
	model.pushTitleObj({
		path: path,
		title: label
	});
	let titleObj = model.getCurrentTitle(path);
	Log.log('titleObj:', titleObj);
	return {
		type: CHANGE_LOGIN_PATH,
		payload: {
			path: path,
			title: titleObj.title
		}
	}
}

function fetchTableData(type, beginTime, endTime, data) {
	let datalist = model.fillDataList(beginTime, endTime, data);
	model.setData(type, datalist);
	return {
		type: FETCH_LOGIN_TABLEDATA,
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
		type: FETCH_LOGIN_WEEK_TABLEDATA,
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
		type: FETCH_LOGIN_MONTH_TABLEDATA,
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
		type: FETCH_LOGIN_NEXT_TABLEDATA,
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

function fetchAgentTableData(type, beginTime, endTime, data) {
	let agentList = model.getAgentList(data);
	return {
		type: FETCH_LOGIN_AGENT_TABELDATA,
		agentList: agentList
	};
}

function changeTab(tabtype) {
	return {
		type: CHANGE_LOGIN_TYPE,
		payload: tabtype
	};
}

function fetchDataEnd(data) {
	return {
		type: FETCH_DATA_END,
		payload: data
	};
}

export { changeTab, setScrollPos, resetData, changeQueryType, fetchTableData, fetchWeekTableData, fetchMonthTableData, changeLoginQueryTime, changeLoginPath, fetchNextTableData, fetchAgentTableData };
