/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import { combineReducers } from 'redux';
import { LOADING, READY, LOAD_MORE } from './Actions';
import caseReducers from './routes/CaseIndex/pages/Reducer';
import loginReducers from './routes/LoginIndex/pages/Reducer';
import statsReducers from './routes/StatsIndex/pages/Reducer';
import Log from "./../commons/utils/Log"
const defaultState = {};
const commonReducers = (state = defaultState, action) => {
	switch (action.type) {
	case LOADING:
		return Object.assign({}, state, {
			loading: action.payload
		});
		break;
	case READY:
		return Object.assign({}, state, {
			ready: action.payload
		});
		break;
	case LOAD_MORE:
		return Object.assign({}, state, {
			loadmore: action.payload
		});
		break;
	default:
		return state;
	}
}
let Reducers = combineReducers({
	commons: commonReducers,
	stats: statsReducers,
	case: caseReducers,
	login: loginReducers
});
export default Reducers;
