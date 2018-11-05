import {
	ALERT_DISPLAY,
	PROMPT_DISPLAY,
	LOADING,
	LOADING_END,
	FETCH_DETAIL_END,
	SWITCH_CHANGE,
	ADD_PHOTO,
	CANCEL_ADD_PHOTO,
	DELETE_PHOTO,
	HSCROLL_READY,
	SHOW_PERMISSION,
	FETCH_LIST_END,
	FETCH_HOUSESPHOTOS_END,
	FETCH_ADPHOTOS_END,
	CHECK_IMG,
	DESC_CHANGE,
	SPEECH_END,
	SHOW_MASK,
	PUTAWAY_STATUS_CHANGE,
	SHOW_FILTER,
	ENABLE_BATCH,
	CHECK_ITEM,
	BATCH_SELECTALL,
	BATCH_CANCELHOT,
	BATCH_SETHOT,
	BATCH_OFFLINE,
	BATCH_ONLINE,
	SHOW_MENU,
	SELECT_FILTER_GROUP,
	FETCH_ESTNAME_END,
	SELECT_FILTER_CONDITION,
	FILTER_SURE,
	FILTER_RESET,
	REMOVE_ALL_LIST,
	SHOW_HOUSE_COUNT,
	UPDATE_IMGLIST_WIDTH,
	TITLE_CHANGE,
	LIST_ITEM_ACTION,
	CLOSE_MENU,
	VIEW_IMAGE,
	SET_DEFAULT,
	DELETE_IMAGE,
	FETCH_PROPERTYSTATUS_END,
	BATCH_REMOVE,
	SHOW_PUBLISH,
	SURE_SELECT_IMG,
	PUB_PROMPT,
	CHANGE_TAB,
	CANCEL_SELECT_IMG,
	ENABLE_SCROLL,
	DISABLE_SCROLL
} from './Actions.js';
import {
	PUTAWAY,
	ONPUTAWAY,
	PUSH,
	EDIT_STATE_BASE,
	EDIT_STATE_IMG,
	EDIT_STATE_VIEW,
	CHANGE_EDIT_STATE,
	DETAIL_STATUS_GETDATA,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_STYLE
} from './obj/Const';
import AdDetail from './obj/AdDetail';
import ListModel from './obj/ListModel';
const defaultState = {
	isloading: false,
	ready: false,
	mask: false,
	showPubPrompt: false,
	clickClose: false,
	closeCallback: null,
	switchactive: false,
	canPublish: false,
	activeTab: PUTAWAY,
	hscrolls: [{
		id: "houseScroll",
		ready: false,
		width: "auto"
	}, {
		id: "styleScroll",
		ready: false,
		width: "auto"
	}],
	alert: {
		msg: 'babab',
		visible: false,
		okHandler: () => {}
	},
	prompt: {
		msg: '',
		visible: false,
		okHandler: () => {},
		cancelHandler: () => {}
	},
	pubPrompt: {
		msg: '',
		visible: false,
	},
	info: new AdDetail(),
	permission: {
		total: 0,
		putaway: 0,
		publish: 0
	},
	putaways: new ListModel(PUTAWAY),
	onputaways: new ListModel(ONPUTAWAY),
	pushs: new ListModel(PUSH)
};
let Reducers = (state = defaultState, action) => {
	const {
		type,
		payload
	} = action;
	switch (type) {
		case LOADING:
			return Object.assign({}, state, {
				isloading: true
			});
			break;
		case LOADING_END:
			return Object.assign({}, state, {
				isloading: false
			});
			break;
		case SHOW_MASK:
			return Object.assign({}, state, {
				mask: payload.mask,
				clickClose: payload.clickClose,
				closeCallback: payload.closeFunc
			});
			break;
		case PUB_PROMPT:
			return Object.assign({}, state, {
				mask: payload.visible,
				pubPrompt: {
					msg: payload.msg,
					visible: payload.visible
				}
			});
			break;
		case ALERT_DISPLAY:
			return Object.assign({}, state, {
				mask: payload.visible,
				alert: {
					msg: payload.msg,
					visible: payload.visible,
					okHandler: payload.okHandler
				}
			});
			break;
		case PROMPT_DISPLAY:
			return Object.assign({}, state, {
				mask: payload.visible,
				prompt: {
					msg: payload.msg,
					visible: payload.visible,
					okHandler: payload.okHandler,
					cancelHandler: payload.cancelHandler
				}
			});
			break;
		case ENABLE_SCROLL:
			if (payload.type === PUTAWAY) {
				state.putaways.loadmore = true;
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.loadmore = true;
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.loadmore = true;
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case DISABLE_SCROLL:
			if (payload.type === PUTAWAY) {
				state.putaways.loadmore = false;
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.loadmore = false;
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.loadmore = false;
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case FILTER_RESET:
			if (payload.type === PUTAWAY) {
				state.putaways.filters.resetFilters();
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.filters.resetFilters();
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.filters.resetFilters();
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case CHANGE_TAB:
			return Object.assign({}, state, {
				activeTab: payload
			});
			break;
		case FETCH_DETAIL_END:
			let {
				info
			} = state;
			info.setInfo(payload);
			info.status = DETAIL_STATUS_GETDATA;
			return Object.assign({}, state, {
				isloading: false,
				info: info
			});
		case SHOW_PUBLISH:
			return Object.assign({}, state, {
				isloading: false,
				canPublish: payload.visible
			});
			break;
		case FETCH_HOUSESPHOTOS_END:
			state.info.setHousePhotos(payload.type, payload.photos);
			return Object.assign({}, state, {
				isloading: false,
				info: state.info
			});
			break;
		case FETCH_ADPHOTOS_END:
			state.info.setAdPhotos(payload);
			return Object.assign({}, state, {
				isloading: false,
				info: state.info
			});
			break;
		case UPDATE_IMGLIST_WIDTH:
			if (payload.type === PHTOTO_TYPE_ROOM) {
				return Object.assign({}, state, {
					info: Object.assign(state.info, {
						roomListWidth: payload.width
					})
				});
			} else if (payload.type === PHTOTO_TYPE_STYLE) {
				return Object.assign({}, state, {
					info: Object.assign(state.info, {
						styleListWidth: payload.width
					})
				});
			}
			break;
		case VIEW_IMAGE:
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					viewPhoto: payload.photo,
					showView: payload.visible
				})
			});
			break;
		case SURE_SELECT_IMG:
			state.info.addSelectPhotos(payload.type);
			state.info.removeAllPhotos();
			return Object.assign({}, state, {
				info: state.info
			});
		case CANCEL_SELECT_IMG:
			state.info.removeSelectPhotos();
			state.info.removeAllPhotos();
			return Object.assign({}, state, {
				info: state.info
			});
			break;
		case SET_DEFAULT:
			state.info.resetDefault();
			state.info.setDefault(payload.type, payload.url);
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					showView: false
				})
			});
			break;
		case DELETE_IMAGE:
			state.info.deletePhoto(payload);
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					showView: false
				})
			});
			break;
		case TITLE_CHANGE:
			state.info.title = payload.title;
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					title: payload
				})
			});
			break;
		case DESC_CHANGE:
			state.info.description = payload;
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					description: payload
				})
			});
		case SPEECH_END:
			var description = state.info.description + payload;
			state.info.description = description.substring(0, 500);
			return Object.assign({}, state, {
				info: Object.assign(state.info, {
					description: description.substring(0, 500)
				})
			});
			break;
		case REMOVE_ALL_LIST:
			if (payload.type === PUTAWAY) {
				state.putaways.removeAllItems();
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.removeAllItems();
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.removeAllItems();
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case FILTER_RESET:
			if (payload.type === PUTAWAY) {
				state.putaways.filters.resetFilters();
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.filters.resetFilters();
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.filters.resetFilters();
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case CHECK_IMG:
			let tempinfo = state.info;
			tempinfo.selectPhoto(payload.type, payload.url, payload.checked);
			return Object.assign({}, state, {
				info: tempinfo
			});
			break;
		case SWITCH_CHANGE:
			return Object.assign({}, state, {
				switchactive: !state.switchactive
			});
			break;
		case HSCROLL_READY:
			let hscrolls = state.hscrolls;
			hscrolls.forEach(function(item, index) {
				if (item["id"] === payload["id"]) {
					item["ready"] = true;
					item["width"] = payload["iw"] * payload["ilen"];
				}
			});
			return Object.assign({}, state, {
				hscrolls: hscrolls
			});
		case SHOW_PERMISSION:
			return Object.assign({}, state, {
				isloading: false,
				permission: {
					total: payload.total,
					putaway: payload.putaway,
					rest: payload.rest,
					CountRentPropertyAd:payload.CountRentPropertyAd,
					CountSalePropertyAd:payload.CountSalePropertyAd,
					PackageCount:payload.PackageCount,
					SalePackageCount:payload.SalePackageCount,
					RamainNum:payload.RamainNum

				}
			});
		case SHOW_HOUSE_COUNT:
			if (payload.type === PUTAWAY) {
				state.putaways.saleCount = payload.sale;
				state.putaways.rentCount = payload.rent;
				return Object.assign({}, state, {
					isloading: false,
					putaways: state.putaways
				});
			}
			break;
		case FETCH_LIST_END:
			let {
				putaways,
				onputaways,
				pushs
			} = state;
			let mask = state.mask;
			if (payload.type === PUTAWAY) {
				putaways.addItems(payload.data);
				return Object.assign({}, state, {
					mask: mask,
					isloading: false,
					putaways: putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				onputaways.addItems(payload.data);
				return Object.assign({}, state, {
					mask: mask,
					isloading: false,
					onputaways: onputaways
				});
			} else if (payload.type === PUSH) {
				pushs.addItems(payload.data);
				return Object.assign({}, state, {
					mask: mask,
					isloading: false,
					pushs: pushs
				});
			}
			break;
		case PUTAWAY_STATUS_CHANGE:
			if (payload.type === PUTAWAY) {
				state.putaways.setFilterStatus(payload.status);
				state.putaways.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.setFilterStatus(payload.status);
				state.onputaways.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.setFilterStatus(payload.status);
				state.pushs.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case SHOW_MENU:
			if (payload.type === PUTAWAY) {
				let item = state.putaways.getItem(payload.adid);
				item.showMenu = payload.visible;
				return Object.assign({}, state, {
					mask: true,
					clickClose: true,
					closeCallback: payload.closeMenu,
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				let item = state.onputaways.getItem(payload.adid);
				item.showMenu = payload.visible;
				return Object.assign({}, state, {
					mask: true,
					clickClose: true,
					closeCallback: payload.closeMenu,
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				let item = state.pushs.getItem(payload.adid);
				item.showMenu = payload.visible;
				return Object.assign({}, state, {
					mask: true,
					clickClose: true,
					closeCallback: payload.closeMenu,
					pushs: state.pushs
				});
			}
			break;
		case FETCH_ESTNAME_END:
			if (payload.type === PUTAWAY) {
				state.putaways.filters.setPlotList(payload.data);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.filters.setPlotList(payload.data);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			}
			break;
		case FETCH_PROPERTYSTATUS_END:
			if (payload.type === PUSH) {
				state.pushs.filters.setStatusList(payload.data);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case SELECT_FILTER_GROUP:
			if (payload.type === PUTAWAY) {
				state.putaways.filters.selectGroup(payload.groupid);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.filters.selectGroup(payload.groupid);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.filters.selectGroup(payload.groupid);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case SELECT_FILTER_CONDITION:
			if (payload.type === PUTAWAY) {
				state.putaways.filters.setGroupCondition(payload.groupid, payload.value, payload.selected);
				console.log(state.putaways.filters);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.filters.setGroupCondition(payload.groupid, payload.value, payload.selected);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.filters.setGroupCondition(payload.groupid, payload.value, payload.selected);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case SHOW_FILTER:
			if (payload.type === PUTAWAY) {
				state.putaways.fltvisible = payload.visible;
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.fltvisible = payload.visible;
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.fltvisible = payload.visible;
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case ENABLE_BATCH:
			if (payload.type === PUTAWAY) {
				state.putaways.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.changeBatch(payload.enabled);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;

		case CLOSE_MENU:
			if (payload.type === PUTAWAY) {
				let item = state.putaways.getItem(payload.adid);
				if (item) {
					item.showMenu = payload.visible;
				}
				return Object.assign({}, state, {
					mask: false,
					clickClose: false,
					closeCallback: null,
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				let item = state.onputaways.getItem(payload.adid);
				if (item) {
					item.showMenu = payload.visible;
				}
				return Object.assign({}, state, {
					mask: false,
					clickClose: false,
					closeCallback: null,
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				let item = state.pushs.getItem(payload.adid);
				if (item) {
					item.showMenu = payload.visible;
				}
				return Object.assign({}, state, {
					mask: false,
					clickClose: false,
					closeCallback: null,
					pushs: state.pushs
				});
			}
			break;
		case CHECK_ITEM:
			if (payload.type === PUTAWAY) {
				state.putaways.selectItem(payload.adid, payload.checked);
				/*let item = state.putaways.getItem(payload.adid);
				item.checked = payload.checked;*/
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.selectItem(payload.adid, payload.checked);
				/*let item = state.onputaways.getItem(payload.adid);
				item.checked = payload.checked;*/
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.selectItem(payload.adid, payload.checked);
				/*let item = state.pushs.getItem(payload.adid);
				item.checked = payload.checked;*/
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case BATCH_SELECTALL:
			if (payload.type === PUTAWAY) {
				state.putaways.selectAllItems(payload.seleted);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.selectAllItems(payload.seleted);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.selectAllItems(payload.seleted);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case BATCH_CANCELHOT:
			if (payload.type === PUTAWAY) {
				state.putaways.setBatchHot(false);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.setBatchHot(false);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.setBatchHot(false);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case BATCH_SETHOT:
			if (payload.type === PUTAWAY) {
				state.putaways.setBatchHot(true);
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			} else if (payload.type === ONPUTAWAY) {
				state.onputaways.setBatchHot(true);
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.setBatchHot(true);
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
			break;
		case BATCH_OFFLINE:
			if (payload.type === PUTAWAY) {
					state.putaways.setBatchOnOffline();
				return Object.assign({}, state, {
					putaways: state.putaways
				});
			}
			break;
		case BATCH_ONLINE:
			if (payload.type === ONPUTAWAY) {
				state.onputaways.setBatchOnOffline();
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			}
			break;
		case BATCH_REMOVE:
			if (payload.type === ONPUTAWAY) {
				state.onputaways.setBatchOnOffline();
				return Object.assign({}, state, {
					onputaways: state.onputaways
				});
			} else if (payload.type === PUSH) {
				state.pushs.setBatchOnOffline();
				return Object.assign({}, state, {
					pushs: state.pushs
				});
			}
		default:
			return state;
	}
}
export default Reducers;