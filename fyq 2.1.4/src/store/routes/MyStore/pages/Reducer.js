/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import {
    GETLIST,
    JINGJIITEM
} from './Actions'
const defaultState={
   list:[{

   }
   ],
    headerList:{},
    totolnum:6,

}

function storeReducer(state = defaultState, action) {
     const {
            type,
            payload
    } = action;
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
        case 'GETLIST':
        return Object.assign({},state,{
            list:action.payload.result
        });
            break;
        case 'JINGJIITEM':
            return Object.assign({},state,{
                headerList:action.payload.result
            });
            break;
	default:
		return state;
	}
}

export default storeReducer;
