import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import SpeechTextarea from './SpeechTextarea';
import AppProxy from './../../../../../utils/AppProxy';
import {
	onDescChange,
	showMask,
	callSpeechEnd,
	onTitleChange
} from './../../../../../Actions.js';
const mapStateToProps = (state, ownProps) => {
	let {
		title,
		description
	} = state.info;
	return Object.assign({}, state.info, {
		title: title,
		description: description
	});
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onTitleChange: (title) => {
			dispatch(onTitleChange(title));
		},
		onDescChange: (description) => {
			dispatch(onDescChange(description));
		},
		onSpeech: () => {
			let appProxy = new AppProxy(window);
			appProxy.call("open_voiceRecognition");
		},
		speechInit: () => {
			/*let count = 0;
			count++;
			document.getElementById("output").innerHTML = "aaaa" + count;*/
			let appProxy = new AppProxy(window);
			appProxy.addCallback("speechComplete", (content) => {
				/*count++;
				document.getElementById("output").innerHTML = "bbbb" + count;*/
				dispatch(callSpeechEnd(content));
			});
		}
	}
}
const SpeechContainer = connect(mapStateToProps, mapDispatchToProps)(SpeechTextarea);
export default SpeechContainer;