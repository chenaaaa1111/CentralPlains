import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import Thumbnail from './Thumbnail';
import {
	hscrollReady,
	changeSwitch,
	changeEditState,
	updateImgListWidth,
	viewImage
} from './../../../../../Actions.js';
import {
	EDIT_STATE_BASE,
	EDIT_STATE_IMG,
	EDIT_STATE_VIEW,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_STYLE
} from './../../../../../obj/Const';
const mapStateToProps = (state, ownProps) => {
	let info = ownProps.info;
	let type = info.type;
	let width;
	if (type === PHTOTO_TYPE_ROOM) {
		width = state.info.roomListWidth;
	} else {
		width = state.info.styleListWidth;
	}
	return {
		width: width,
		info: Object.assign({}, info)
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateImgListWidth: (type, width) => {
			dispatch(updateImgListWidth(type, width));
		},
		onSwitch: () => {
			dispatch(changeSwitch());
		},
		onImgClick: (photo, visible) => {
			dispatch(viewImage(photo, visible));
		}
	};
}
const ThumbnailContainer = connect(mapStateToProps, mapDispatchToProps)(Thumbnail);
export default ThumbnailContainer;