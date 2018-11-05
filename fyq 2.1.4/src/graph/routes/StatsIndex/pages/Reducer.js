/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import { FETCH_MORE, SET_SCROLL_POS, CHANGE_QUERY_TYPE, RESET_DATA, CHANGE_PERFORM_TYPE, CHANGE_PAGE_INDEX, CHANGE_PERFORM_DOCKER, CHANGE_PERFORM_PATH, CHANGE_PERFORM_QUERY_TIME, FETCH_PERFORM_NEXT_TABLEDATA, FETCH_PERFORM_TABLEDATA, FETCH_PERFORM_WEEK_TABLEDATA, FETCH_PERFORM_MONTH_TABLEDATA } from './Actions';
import { TAB_DAY, TABLE_PERFORM, QUERY_GLOBAL } from './../../../utils/Const';
import DateTransform from './../../../../commons/utils/DateTransform.js'
import Log from './../../../../commons/utils/Log';

const defaultState = {
	tabtype: TAB_DAY,
	tabletype: TABLE_PERFORM,
	headers: [],
	totals: [],
	values: [],
	queryStart: DateTransform.nDayBeforeTime(DateTransform.getDayEndTime(new Date().getTime(), 10)) + 1,
	queryEnd: DateTransform.getDayEndTime(new Date().getTime()),
	path: '',
	isdocker: false,
	pageindex: 1,
	pagesize: 10,
	queryType: QUERY_GLOBAL,
	hasmore: true,
	scrollPos: null
};

function statsReducer(state = defaultState, action) {
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
	case CHANGE_PERFORM_TYPE:
		return Object.assign({}, state, {
			tabtype: action.payload
		});
		break;
	case CHANGE_PERFORM_DOCKER:
		return Object.assign({}, state, {
			isdocker: action.payload
		});
		break;
	case CHANGE_PERFORM_PATH:
		return Object.assign({}, state, {
			path: action.payload
		});
	case CHANGE_PERFORM_QUERY_TIME:
		return Object.assign({}, state, {
			queryStart: action.payload.queryStart,
			queryEnd: action.payload.queryEnd
		});
		break;
	case FETCH_PERFORM_NEXT_TABLEDATA:
	case FETCH_PERFORM_MONTH_TABLEDATA:
	case FETCH_PERFORM_WEEK_TABLEDATA:
	case FETCH_PERFORM_TABLEDATA:
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

export default statsReducer;
