import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import AlertBox from './AlertBox';
import {
	alert
} from './../Actions.js';
const mapStateToProps = (state) => {
	return Object.assign({}, state.alert);
}
const AlertContainer = connect(mapStateToProps)(AlertBox);
export default AlertContainer;