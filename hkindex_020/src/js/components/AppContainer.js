import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import {
	createStore
} from 'redux';
import {
	load,
	loadend,
	showMask
} from './../Actions.js';
import App from './../components/App';
const mapStateToProps = (state) => {
	return {
		isloading: state.isloading,
		mask: state.mask,
		clickClose: state.clickClose,
		clickCloseFunc: state.closeCallback
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		showMask: (visible, clickClose, closeFunc) => {
			dispatch(showMask(visible, clickClose, closeFunc));
		},
		closeClick: () => {
			dispatch(closeAlert);
		}
	}
};
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
// export default AppContainer;
module.exports = AppContainer;