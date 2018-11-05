/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import { combineReducers } from 'redux';
import Log from './../../../../commons/utils/Log';
import LOADMESSAGE from "./Actions"

const defaultState = {"message":{}};
let Reducers = (state = defaultState, action) => {
	switch (action.type) {
		case "LOADMESSAGE":
		 return Object.assign({}, state, {
			"message": action.payload
		});
		
		break; 
	default:
		return state;
	}
}
export default Reducers;
