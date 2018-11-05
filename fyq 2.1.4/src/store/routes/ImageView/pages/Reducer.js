/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:04:12
 * @version $Id$
 */
import {GETPHOTOLIST,GETSHOWLIST} from './Actions';
const deFaultState={
    ImageViewList:[],
    showList:[]
}

function imageViewReducer(state = deFaultState, action) {
	switch (action.type) {
	case 'GETPHOTOLIST':
		return Object.assign({},state, {
            ImageViewList: action.payload
		});
        case 'GETSHOWLIST':
            return Object.assign({},state,{
                showList:action.payload
            });
	default:
		return state;
	}
}


export default imageViewReducer;
