import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import ImageView from './ImageView';
import {
	setDefaultImage,
	deleteImage,
	viewImage
} from './../../../../../Actions.js';
const mapStateToProps = (state, ownProps) => {
	return {
		showView: state.info.showView,
		photo: state.info.viewPhoto
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onBackClick: (photo, visible) => {
			dispatch(viewImage(photo, visible));
		},
		onDeleteClick: (photo) => {
			dispatch(deleteImage(photo));
		},
		onSetDefaultClick: (photo) => {
			dispatch(setDefaultImage(photo));
		}
	};
}
const ImgViewContainer = connect(mapStateToProps, mapDispatchToProps)(ImageView);
export default ImgViewContainer;