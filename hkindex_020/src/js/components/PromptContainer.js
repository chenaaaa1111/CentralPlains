import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import {
	prompt
} from './../Actions.js';
import PromptBox from './../components/PromptBox';
const mapStateToProps = (state) => {
	return Object.assign({}, state.prompt);
}
const PromptContainer = connect(mapStateToProps)(PromptBox);
export default PromptContainer;