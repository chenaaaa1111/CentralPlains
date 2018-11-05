import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import ImageSet from './ImageSet';
import AppProxy from './../../../../../utils/AppProxy';
import {
	request
} from './../../../../../utils/ServerRequest';
import {
	MAX_ROOMIMG_COUNT,
	MAX_STYLEIMG_COUNT,
	PHTOTO_TYPE_STYLE,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_PLOT,
	DETAIL_STATUS_GETDATA
} from './../../../../../obj/Const.js';
import {
	fetchHousePhotosEnd,
	fetchAdPhotosEnd,
	load,
	alert,
	sureSelectImage,
	cancelSelectImage
} from './../../../../../Actions.js';
const mapStateToProps = (state, ownProps) => {
	let type = parseInt(ownProps.params.type);
	let photos = state.info.selectPhotoCache;
	var maxCount;
	var curCount;
	if (type === PHTOTO_TYPE_ROOM) {
		curCount = state.info.roomPhotos.length;
		maxCount = Math.max(MAX_ROOMIMG_COUNT - curCount, 0);
	} else if (type === PHTOTO_TYPE_STYLE) {
		curCount = state.info.stylePhotos.length;
		maxCount = Math.max(MAX_STYLEIMG_COUNT - curCount, 0);
	}
	return {
		adid: state.info.adid,
		houseid: state.info.houseid,
		phototype: type,
		maxCount: maxCount,
		allphotos: [...state.info.allphotos],
		photos: [...photos],
		inited: state.info.status === DETAIL_STATUS_GETDATA
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchPhotos: (adid, houseid, phototype) => {
			dispatch((dispatch) => {
				let req = {
					SourceObjectKeyId: houseid,
					PhotoType: phototype,
					SortField: '',
					Ascending: false,
					PageIndex: 1,
					PageSize: 100
				};
				dispatch(load());
				request.requestHousePhotoList(req, (res) => {
					dispatch(fetchHousePhotosEnd(phototype, res.Result));
				});
			});
		},
		back: () => {
			dispatch(cancelSelectImage());
			dispatch(alert('', false));
		},
		sureClick: (type) => {
			dispatch(sureSelectImage(type));
			let proxy = new AppProxy(window);
			proxy.call("selectedPhotos", 0);
		},
		setTitle: (title) => {
			let proxy = new AppProxy(window);
			proxy.call("setTitle", title);
		},
		onClick: () => {
			dispatch(changeSwitch());
		}
	};
}

const ImgSetContainer = connect(mapStateToProps, mapDispatchToProps)(ImageSet);
module.exports = ImgSetContainer;