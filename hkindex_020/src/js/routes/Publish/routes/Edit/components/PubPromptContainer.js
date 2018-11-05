import React from 'react';
import ReactDOM from 'react-dom';
import {
	browserHistory
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	promptPub
} from './../../../../../Actions.js';
import PubPrompt from './PubPrompt';
import Config from './../../../../../obj/Config';
import AppProxy from './../../../../../utils/AppProxy';

const mapStateToProps = (state) => {
	return Object.assign({
		msg: state.pubPrompt.msg,
		showPubPrompt: state.pubPrompt.visible
	});
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		gotoManager: () => {
			dispatch(promptPub(false));
			let path = Config.routerRoot + "manager/";
			browserHistory.push(path);
		},
		closeCurPage: () => {
			let prev = ownProps.location.query.prev;
			dispatch(promptPub(false));
			if (prev) {
				browserHistory.goBack();
			} else {
				let proxy = new AppProxy(window);
				proxy.call("closePage");
			}
		}
	};
}
const PubPromptContainer = connect(mapStateToProps, mapDispatchToProps)(PubPrompt);
export default PubPromptContainer;