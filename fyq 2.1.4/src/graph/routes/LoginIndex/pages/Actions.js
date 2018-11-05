export const CHANGE_LOGIN_TYPE = 'CHANGE_LOGIN_TYPE';
export const FETCH_LOGIN_TABLEDATA = 'FETCH_LOGIN_TABLEDATA';
export const FETCH_LOGIN_WEEK_TABLEDATA = 'FETCH_LOGIN_WEEK_TABLEDATA';
export const FETCH_LOGIN_MONTH_TABLEDATA = 'FETCH_LOGIN_MONTH_TABLEDATA';
export const FETCH_LOGIN_NEXT_TABLEDATA = 'FETCH_LOGIN_NEXT_TABLEDATA';
export const FETCH_LOGIN_AGENT_TABELDATA = 'FETCH_LOGIN_AGENT_TABELDATA';
export const CHANGE_LOGIN_PATH = 'CHANGE_LOGIN_PATH';
export const CHANGE_LOGIN_QUERY_TIME = 'CHANGE_LOGIN_QUERY_TIME';
export const CHANGE_LOGIN_DOCKER = 'CHANGE_LOGIN_DOCKER';
export const CHANGE_CUR_LOGIN = 'CHANGE_CUR_LOGIN';
export const CHANGE_PAGE_INDEX = 'CHANGE_PAGE_INDEX';
export const RESET_DATA = 'RESET_DATA';
export const SET_SCROLL_POS = 'SET_SCROLL_POS';
export const FETCH_MORE = 'FETCH_MORE';
export const CHANGE_QUERY_TYPE = 'CHANGE_QUERY_TYPE';
export const RESET_AGENT_DATA = 'RESET_AGENT_DATA';
import model from './../../../utils/Model';
import DateTransform from './../../../../commons/utils/DateTransform';
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
		type: CHANGE_LOGIN_DOCKER,
		payload: docker
	}
}

function changeCurLogin(cur) {
	return {
		type: CHANGE_CUR_LOGIN,
		payload: cur
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

function fetchTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	let datalist = model.fillDataList(queryStart, queryEnd, data);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_LOGIN_TABLEDATA,
		payload: {
			pageindex: pageindex,
			pagesize: pagesize,
			queryStart: DateTransform.nDayBeforeTime(queryStart, pagesize),
			queryEnd: DateTransform.nDayBeforeTime(queryEnd, pagesize),
			headers: model.getHeaderList(),
			totals: model.getTotalList(),
			values: model.getAllDataList()
		}
	};
}

function fetchWeekTableData(tabletype, queryStart, queryEnd, data, pageindex, pagesize) {
	let datalist = model.fillWeekDataList(queryStart, queryEnd, data);
	model.addMoreData(tabletype, datalist);
	return {
		type: FETCH_LOGIN_WEEK_TABLEDATA,
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
		type: FETCH_LOGIN_MONTH_TABLEDATA,
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

function fetchAgentTableData(type, beginTime, endTime, data) {
	let agentList = model.getAgentList(data);
	return {
		type: FETCH_LOGIN_AGENT_TABELDATA,
		payload: agentList
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

export { changeTab, fetchMore, setScrollPos, changeQueryType, resetData, resetAgentData, changeDocker, changePageIndex, fetchTableData, fetchWeekTableData, fetchMonthTableData, changeLoginQueryTime, changeLoginPath, changeCurLogin, fetchAgentTableData };
