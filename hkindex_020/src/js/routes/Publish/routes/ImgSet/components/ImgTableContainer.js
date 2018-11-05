import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import ImgTable from './ImgTable';
import AppProxy from './../../../../../utils/AppProxy';
import {
	checkImg,
	alert
}from './../../../../../Actions.js';
const mapStateToProps = (state, ownProps) => {
	let type = ownProps.type;
	let photos = state.info.getPhotosByType(type);
	return {
		adid: state.info.adid,
		allphotos: [...state.info.allphotos]
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onCheck: (type, url, checked) => {
			let curCount = ownProps.curCount;
			let maxCount = ownProps.maxCount;
			if (checked && curCount < maxCount || !checked) {
				let proxy = new AppProxy(window);
				dispatch(checkImg(type, url, checked));
				if (checked) {
					proxy.call("selectedPhotos", curCount + 1);
				} else {
					proxy.call("selectedPhotos", curCount - 1);
				}
			} else {
				dispatch(alert("选择图片超过上限！", true));
			}
		}
	}
}
const ImgTableContainer = connect(mapStateToProps, mapDispatchToProps)(ImgTable);
export default ImgTableContainer;