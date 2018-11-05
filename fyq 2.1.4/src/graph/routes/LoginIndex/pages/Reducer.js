/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import { FETCH_MORE, SET_SCROLL_POS, RESET_DATA, RESET_AGENT_DATA, CHANGE_LOGIN_TYPE, CHANGE_PAGE_INDEX, CHANGE_LOGIN_DOCKER, CHANGE_LOGIN_PATH, CHANGE_CUR_LOGIN, CHANGE_LOGIN_QUERY_TIME, FETCH_LOGIN_NEXT_TABLEDATA, FETCH_LOGIN_TABLEDATA, FETCH_LOGIN_WEEK_TABLEDATA, FETCH_LOGIN_MONTH_TABLEDATA, FETCH_LOGIN_AGENT_TABELDATA } from './Actions';
import { TAB_DAY, CHANGE_QUERY_TYPE, TABLE_REGISTER, QUERY_GLOBAL } from './../../../utils/Const';
import DateTransform from './../../../../commons/utils/DateTransform.js'
import Log from './../../../../commons/utils/Log';

const defaultState = {
	tabtype: TAB_DAY,
	tabletype: TABLE_REGISTER,
	headers: [],
	totals: [],
	values: [],
	queryStart: DateTransform.nDayBeforeTime(DateTransform.getDayEndTime(new Date().getTime(), 10)) + 1,
	queryEnd: DateTransform.getDayEndTime(new Date().getTime()),
	path: '',
	agents: [],
	cur: 0,
	isdocker: false,
	title: '',
	pageindex: 1,
	pagesize: 10,
	queryType: QUERY_GLOBAL,
	hasmore: true,
	agentPageSize: 20,
	scrollPos: null
};

function loginReducer(state = defaultState, action) {
	// Log.log("action:", action);
	switch (action.type) {
	case SET_SCROLL_POS:
		return Object.assign({}, state, {
			scrollPos: action.payload
		});
		break;
	case CHANGE_QUERY_TYPE:
		return Object.assign({}, state, {
			queryType: action.payload
		});
	case FETCH_MORE:
		return Object.assign({}, state, {
			pageindex: action.payload.pageindex,
			pagesize: action.payload.pagesize,
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd,
			headers: [...action.payload.headers],
			totals: [...action.payload.totals],
			values: [...action.payload.values]
		});
		break;
	case RESET_AGENT_DATA:
		return Object.assign({}, state, {
			pageindex: action.payload.pageindex,
			pagesize: action.payload.pagesize,
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd,
			agents: action.payload.agents
		});
		break;
	case RESET_DATA:
		return Object.assign({}, state, {
			pageindex: action.payload.pageindex,
			pagesize: action.payload.pagesize,
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd
		});
		break;
	case CHANGE_PAGE_INDEX:
		return Object.assign({}, state, {
			pageindex: action.payload
		});
		break;
	case CHANGE_LOGIN_TYPE:
		return Object.assign({}, state, {
			tabtype: action.payload
		});
		break;
	case CHANGE_LOGIN_DOCKER:
		return Object.assign({}, state, {
			isdocker: action.payload
		});
		break;
	case CHANGE_CUR_LOGIN:
		return Object.assign({}, state, {
			cur: action.payload
		});
		break;
	case CHANGE_LOGIN_PATH:
		return Object.assign({}, state, {
			path: action.payload.path,
			title: action.payload.title
		});
	case CHANGE_LOGIN_QUERY_TIME:
		return Object.assign({}, state, {
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd
		});
		break;
	case FETCH_LOGIN_AGENT_TABELDATA:
		let agents = [...state.agents];
		agents.push(...action.payload.agents);
		//Log.log('agents:', agents);
		return Object.assign({}, state, {
			pageindex: action.payload.pageindex,
			pagesize: action.payload.pagesize,
			hasmore: action.payload.hasmore,
			agents: agents
		});
		break;
	case FETCH_LOGIN_NEXT_TABLEDATA:
	case FETCH_LOGIN_MONTH_TABLEDATA:
	case FETCH_LOGIN_WEEK_TABLEDATA:
	case FETCH_LOGIN_TABLEDATA:
		return Object.assign({}, state, {
			hasmore: action.payload.hasmore,
			pageindex: action.payload.pageindex,
			pagesize: action.payload.pagesize,
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd,
			headers: [...action.payload.headers],
			totals: [...action.payload.totals],
			values: [...action.payload.values]
		});
		break;
	default:
		return state;
	}
}

export default loginReducer;
