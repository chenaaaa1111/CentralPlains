export const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
export const FETCH_LOGIN_TABLEDATA = 'FETCH_LOGIN_TABLEDATA';
export const FETCH_LOGIN_WEEK_TABLEDATA = 'FETCH_LOGIN_WEEK_TABLEDATA';
export const FETCH_LOGIN_MONTH_TABLEDATA = 'FETCH_LOGIN_MONTH_TABLEDATA';
export const FETCH_LOGIN_NEXT_TABLEDATA = 'FETCH_LOGIN_NEXT_TABLEDATA';
export const FETCH_LOGIN_AGENT_TABELDATA = 'FETCH_LOGIN_AGENT_TABELDATA';
export const CHANGE_LOGIN_PATH = 'CHANGE_LOGIN_PATH';
export const CHANGE_LOGIN_QUERY_TIME = 'CHANGE_LOGIN_QUERY_TIME';
export const RESET_AGENT_DATA = 'RESET_AGENT_DATA';
import model from './../../../utils/Model';
import Log from './../../../../commons/utils/Log';

function resetAgentData(tabletype, queryStart, queryEnd, pageindex, pagesize) {
	return {
		type: RESET_AGENT_DATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: queryStart,
			queryEnd: queryEnd,
			agents: []
		}
	};
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

function changeLoginPath(path) {
	return {
		type: CHANGE_LOGIN_PATH,
		payload: path
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

function fetchAgentTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize, hasmore) {
	 Log.log('fetchAgentTableData data:', data);
	let agentList = model.getAgentList(data);
	 Log.log("agentList:", agentList);
	return {
		type: FETCH_LOGIN_AGENT_TABELDATA,
		payload: {
			agents: agentList,
			pageindex: pageindex + 1,
			pagesize: pagesize,
			hasmore: hasmore
		}
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

export { changeTab, resetAgentData, fetchTableData, fetchWeekTableData, fetchMonthTableData, changeLoginQueryTime, changeLoginPath, fetchAgentTableData };
