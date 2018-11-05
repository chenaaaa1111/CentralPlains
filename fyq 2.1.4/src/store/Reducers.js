import { combineReducers } from 'redux';
import imageViewReducer from './routes/ImageView/pages/Reducer'
import detailReducer from './routes/StoreDetails/pages/Reducer.js';
import storeReducer from './routes/MyStore/pages/Reducer.js';
import onsaleReducer from './routes/TypeOnSale/pages/Reducer.js';
import Log from './../commons/utils/Log';
let Reducers = combineReducers({
    imageView:imageViewReducer,
	detail: detailReducer,
	store: storeReducer,
	onsale: onsaleReducer
});
export default Reducers;
