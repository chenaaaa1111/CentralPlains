import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import Tab from './Tab';
import {
	changeTab,
	alert,
	prompt
} from './../../../Actions.js';
const mapStateToProps = (state, ownProps) => {
	let activeTab = state.activeTab;
	return Object.assign({
		activeTab: activeTab
	});
}
const mapDispatchToProps = (dispatch) => {
	return {
		changeTab: (type) => {
			dispatch(changeTab(type));
		},
		reset: () => {
			dispatch(alert('', false));
			dispatch(prompt('', false));
		}
	};
}
const TabContainer = connect(mapStateToProps, mapDispatchToProps)(Tab);
module.exports = TabContainer;