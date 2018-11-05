/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import {GETIMGLIST,GETTEXTITEM,GETPLANLIST,GETONSALEDETAIL,GETTOTOLDETAIL} from './Actions';

const defaultState={
    imgList:{},
    textItem:{},
    planList:{},
    imageViewShow:false,
    containerShow:true,
    onsaleDetail:[],
    TotolDetail:[],
    tel:''
}


function onsaleReducer(state = defaultState, action) {
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
        case 'GETIMGLIST':
            return Object.assign({}, state, {
                imgList: action.payload
            });
            break;
        case 'GETTEXTITEM':
            return Object.assign({}, state, {
                value: action.payload
            });
            break;
        case 'GETPLANLIST':
            return Object.assign({}, state, {
                value: action.payload
            });
            break;
        case 'GETONSALEDETAIL':
            return Object.assign({},state,{
                onsaleDetail:action.payload.result
            });
            break;

        case 'GETTOTOLDETAIL':
            return Object.assign({},state,{
                TotolDetail:action.payload
            });
            break;
        case 'GETTEL':
            return Object.assign({}, state, {
                tel: action.payload
            });
            break;
	default:
		return state;
	}
}

export default onsaleReducer;
