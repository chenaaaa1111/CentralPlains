import { combineReducers } from 'redux';
import infoReducers from './routes/InformDetails/pages/Reducers';
import Log from './../commons/utils/Log';
let Reducers = combineReducers({
	info: infoReducers
});
export default Reducers;
