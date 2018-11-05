/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import {GETITEMDETAIL,GETPHOTOLIST,GETTEL,ISSHOW,MESSAGE} from './Actions';
import Log from "./../../../../commons/utils/Log"
const deFaultState={
    itemDetail:{},
    pohotoList:[],
    tel:'',
    isShow:true,
    message:''
}

function detailsReducer(state = deFaultState, action) {
	switch (action.type) {
	case 'CHANGE_COUNT':
		return Object.assign({}, state, {
			count: action.payload
		});
        break;
	case 'CHANGE_VALUE':
		return Object.assign({}, state, {
			value: action.payload
		});
        break;
        case 'GETITEMDETAIL':

            return Object.assign({},state,{
                itemDetail:action.payload.result
            });
            break;
        case 'GETPHOTOLIST':
            return Object.assign({},state,{
                pohotoList:action.payload.result
            })
        break;
        case 'GETTEL':
            Log.log('action.payload',action.payload);
            return Object.assign({}, state, {
                tel: action.payload
            });
            break;
        case ISSHOW:
            return Object.assign({}, state, {
                isShow: action.payload
            });
            break;
        case MESSAGE:
            return Object.assign({}, state, {
                message: action.payload
            });
            break;
	default:
		return state;
	}
}


export default detailsReducer;
