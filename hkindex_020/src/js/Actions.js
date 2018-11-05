export const ALERT_DISPLAY = "ALERT_DISPLAY";
export const PROMPT_DISPLAY = "PROMPT_DISPLAY";
export const LOADING = "LOADING";
export const LOADING_END = "LOADING_END";
export const SWITCH_CHANGE = "SWITCH_CHANGE";
export const FETCH_DETAIL_END = "FETCH_DETAIL_END";
export const FETCH_HOUSESPHOTOS_END = "FETCH_HOUSESPHOTOS_END";
export const FETCH_ADPHOTOS_END = "FETCH_ADPHOTOS_END";
export const FETCH_PERMISSION_END = "FETCH_PERMISSION_END";
export const FETCH_LIST_END = "FETCH_LIST_END";
export const FETCH_ESTNAME_END = "FETCH_ESTNAME_END";
export const ADD_PHOTO = "ADD_PHOTO";
export const CANCEL_ADD_PHOTO = "CANCEL_ADD_PHOTO";
export const DELETE_PHOTO = "DELETE_PHOTO";
export const SET_DEFAULT_PHOTO = "SET_DEFAULT_PHOTO";
export const HSCROLL_READY = "HSCROLL_READY";
export const SET_IMG = "SET_IMG";
export const SHOW_PERMISSION = "SHOW_PERMISSION";
export const GET_LIST_DATA = "GET_LIST_DATA";
export const CHECK_ITEM = "CHECK_ITEM";
export const SHOW_MENU = "SHOW_MENU";
export const CLOSE_MENU = "CLOSE_MENU";
export const ENABLE_BATCH = "ENABLE_BATCH";
export const LIST_ITEM_ACTION = "LIST_ITEM_ACTION";
export const EDIT_BASE = "EDIT_BASE";
export const EDIT_IMG = "EDIT_IMG";
export const EDIT_VIEW = "EDIT_VIEW";
export const CHANGE_EDIT_STATE = "CHANGE_EDIT_STATE";
export const CHECK_IMG = "CHECK_IMG";
export const UPDATE_IMGLIST_WIDTH = "UPDATE_IMGLIST_WIDTH";
export const DESC_CHANGE = "DESC_CHANGE";
export const START_SPEECH = "START_SPEECH";
export const SPEECH_END = "SPEECH_END";
export const SHOW_MASK = "SHOW_MASK";
export const PUTAWAY_STATUS_CHANGE = "PUTAWAY_STATUS_CHANGE";
export const SHOW_FILTER = "SHOW_FILTER";
export const BATCH_SELECTALL = "BATCH_SELECTALL";
export const BATCH_CANCELHOT = "BATCH_CANCELHOT";
export const BATCH_SETHOT = "BATCH_SETHOT";
export const BATCH_OFFLINE = "BATCH_OFFLINE";
export const BATCH_ONLINE = "BATCH_ONLINE";
export const BATCH_REMOVE = "BATCH_REMOVE";
export const SELECT_FILTER_GROUP = "SELECT_FILTER_GROUP";
export const SELECT_FILTER_CONDITION = "SELECT_FILTER_CONDITION";
export const FILTER_SURE = "FILTER_SURE";
export const FILTER_RESET = "FILTER_RESET";
export const REMOVE_ALL_LIST = "REMOVE_ALL_LIST";
export const SHOW_HOUSE_COUNT = "SHOW_HOUSE_COUNT";
export const TITLE_CHANGE = "TITLE_CHANGE";
export const VIEW_IMAGE = "VIEW_IMAGE";
export const SET_DEFAULT = "SET_DEFAULT";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const SHOW_PUBLISH = "SHOW_PUBLISH";
export const SURE_SELECT_IMG = "SURE_SELECT_IMG";
export const CANCEL_SELECT_IMG = "CANCEL_SELECT_IMG";
export const FETCH_PROPERTYSTATUS_END = "FETCH_PROPERTYSTATUS_END";
export const RESET_DETAILS = "RESET_DETAILS";
export const PUB_PROMPT = "PUB_PROMPT";
export const CHANGE_TAB = "CHANGE_TAB";
export const ENABLE_SCROLL = "ENABLE_SCROLL";
export const DISABLE_SCROLL = "DISABLE_SCROLL";
import AdDetail from './obj/AdDetail';

function enableScroll(type) {
	return {
		type: ENABLE_SCROLL,
		payload: {
			type: type
		}
	};
}

function disableScroll(type) {
	return {
		type: DISABLE_SCROLL,
		payload: {
			type: type
		}
	};
}

function changeTab(type) {
	return {
		type: CHANGE_TAB,
		payload: type
	}
}

function promptPub(msg, visible) {
	return {
		type: PUB_PROMPT,
		payload: {
			msg: msg,
			visible: visible
		}
	}
}

function sureSelectImage(phototype) {
	return {
		type: SURE_SELECT_IMG,
		payload: phototype
	}
}

function cancelSelectImage() {
	return {
		type: CANCEL_SELECT_IMG
	}
}

function setDefaultImage(photo) {
	return {
		type: SET_DEFAULT,
		payload: photo
	};
}

function deleteImage(photo) {
	return {
		type: DELETE_IMAGE,
		payload: photo
	};
}

function viewImage(photo, visible) {
	return {
		type: VIEW_IMAGE,
		payload: {
			photo: photo,
			visible: visible
		}
	};
}

function onTitleChange(title) {
	return {
		type: TITLE_CHANGE,
		payload: title
	}
}

function updateImgListWidth(type, width) {
	return {
		type: UPDATE_IMGLIST_WIDTH,
		payload: {
			type: type,
			width: width
		}
	}
}

function showHouseCount(type, sale, rent) {
	return {
		type: SHOW_HOUSE_COUNT,
		payload: {
			type: type,
			sale: sale,
			rent: rent
		}
	}
}

function resetDetails() {
	return {
		type: RESET_DETAILS
	};
}

function removeAllItems(type) {
	return {
		type: REMOVE_ALL_LIST,
		payload: {
			type: type
		}
	}
}

function filterSure() {
	return {
		type: FILTER_SURE
	}
}

function filterReset(type) {
	return {
		type: FILTER_RESET,
		payload: {
			type: type
		}
	};
}

function selectCondition(type, groupid, value, seleted) {
	return {
		type: SELECT_FILTER_CONDITION,
		payload: {
			type: type,
			groupid: groupid,
			value: value,
			seleted: seleted
		}
	}
}

function fetchEstNameEnd(type, res) {
	return {
		type: FETCH_ESTNAME_END,
		payload: {
			type: type,
			data: res.Result
		}
	};
}

function fetchPropertyStatusEnd(type, res) {
	return {
		type: FETCH_PROPERTYSTATUS_END,
		payload: {
			type: type,
			data: res.Result
		}
	};
}

function selectFilterGroup(groupid, type) {
	return {
		type: SELECT_FILTER_GROUP,
		payload: {
			type: type,
			groupid: groupid
		}
	}
}

function selectAll(type, seleted) {
	return {
		type: BATCH_SELECTALL,
		payload: {
			seleted: seleted,
			type: type
		}
	};
}

function batchCancelHot(type) {
	return {
		type: BATCH_CANCELHOT,
		payload: {
			type: type
		}
	};
}

function batchSetHot(type) {
	return {
		type: BATCH_SETHOT,
		payload: {
			type: type
		}
	};
}

function batchOffline(type) {
	return {
		type: BATCH_OFFLINE,
		payload: {
			type: type
		}
	};
}

function batchOnline(type) {
	return {
		type: BATCH_ONLINE,
		payload: {
			type: type
		}
	};
}

function batchRemove(type) {
	return {
		type: BATCH_REMOVE,
		payload: {
			type: type
		}
	};
}

function showFilter(type, visible) {
	return {
		type: SHOW_FILTER,
		payload: {
			visible: visible,
			type: type
		}
	};
}

function putAwayStatusChange(type, status) {
	return {
		type: PUTAWAY_STATUS_CHANGE,
		payload: {
			type: type,
			status: status
		}
	};
}

function callSpeechEnd(content) {
	return {
		type: SPEECH_END,
		payload: content
	}
}

function showMask(visible, clickClose, closeFunc) {
	return {
		type: SHOW_MASK,
		payload: {
			mask: visible,
			clickClose: clickClose,
			closeFunc: closeFunc
		}
	}
}

function fetchListEnd(type, res) {
	return {
		type: FETCH_LIST_END,
		payload: {
			type: type,
			data: res
		}
	}
}

function onDescChange(desription) {
	return {
		type: DESC_CHANGE,
		payload: desription
	};
}

function onListItemAction(adid, houseid, type, action) {
	return {
		type: LIST_ITEM_ACTION,
		payload: {
			adid: adid,
			houseid: houseid,
			type: type,
			action: action
		}
	};
}

function checkImg(type, url, checked) {
	return {
		type: CHECK_IMG,
		payload: {
			type: type,
			url: url,
			checked: checked
		}
	}
}

function changeBatch(type, enabled) {
	return {
		type: ENABLE_BATCH,
		payload: {
			type: type,
			enabled: enabled
		}
	};
}

function closeMenu(adid, type, visible) {
	return {
		type: CLOSE_MENU,
		payload: {
			visible: visible,
			type: type,
			adid: adid
		}
	}
}

function showMenu(adid, type, visible, closeMenu) {
	return {
		type: SHOW_MENU,
		payload: {
			visible: visible,
			type: type,
			adid: adid,
			closeMenu: closeMenu
		}
	}
}

function checkItem(adid, type, checked) {
	return {
		type: CHECK_ITEM,
		payload: {
			adid: adid,
			type: type,
			checked: checked
		}
	}
}

function showPermission(total, putaway, rest,CountRentPropertyAd,CountSalePropertyAd,PackageCount,SalePackageCount,RamainNum){
	return {
		type: SHOW_PERMISSION,
		payload: {
			total: total,
			putaway: putaway,
			rest: rest,
			"CountRentPropertyAd":CountRentPropertyAd,
			CountSalePropertyAd:CountSalePropertyAd,
			PackageCount:PackageCount,
			SalePackageCount:SalePackageCount,
			RamainNum:RamainNum
		}
	};
}

function showPublish(visible) {
	return {
		type: SHOW_PUBLISH,
		payload: {
			visible: visible
		}
	};
}

function fetchHousePhotosEnd(type, photos) {
	return {
		type: FETCH_HOUSESPHOTOS_END,
		payload: {
			type: type,
			photos: photos
		}
	}
}

function fetchAdPhotosEnd(photos) {
	return {
		type: FETCH_ADPHOTOS_END,
		payload: photos
	}
}

function hscrollReady(id, iw, ilen) {
	return {
		type: HSCROLL_READY,
		payload: {
			id: id,
			iw: iw,
			ilen: ilen
		}
	};
}

function changeSwitch() {
	return {
		type: SWITCH_CHANGE
	};
}

function fetchDetailEnd(data) {
	return {
		type: FETCH_DETAIL_END,
		payload: data
	};
}

function load() {
	return {
		type: LOADING,
		payload: {}
	};
}

function loadend() {
	return {
		type: LOADING_END,
		payload: {}
	};
}

function alert(text = '', visible = false, okHandler = null) {
	return {
		type: ALERT_DISPLAY,
		payload: {
			msg: text,
			visible: visible,
			okHandler: okHandler,
			visible: visible
		}
	};
}

function prompt(text = '', visible = false, okHandler = null, cancelHandler = null) {
	return {
		type: PROMPT_DISPLAY,
		payload: {
			msg: text,
			visible: visible,
			callback: null,
			okHandler: okHandler,
			cancelHandler: cancelHandler
		}
	};
}

export {
	load,
	loadend,
	alert,
	prompt,
	fetchDetailEnd,
	changeSwitch,
	hscrollReady,
	fetchHousePhotosEnd,
	fetchAdPhotosEnd,
	showPermission,
	checkItem,
	showMenu,
	changeBatch,
	onListItemAction,
	fetchListEnd,
	checkImg,
	onDescChange,
	showMask,
	callSpeechEnd,
	putAwayStatusChange,
	showFilter,
	selectAll,
	batchCancelHot,
	batchSetHot,
	batchOffline,
	selectFilterGroup,
	fetchEstNameEnd,
	selectCondition,
	filterSure,
	filterReset,
	removeAllItems,
	updateImgListWidth,
	showHouseCount,
	onTitleChange,
	closeMenu,
	setDefaultImage,
	deleteImage,
	viewImage,
	fetchPropertyStatusEnd,
	batchOnline,
	batchRemove,
	showPublish,
	sureSelectImage,
	resetDetails,
	promptPub,
	changeTab,
	cancelSelectImage,
	enableScroll,
	disableScroll
}