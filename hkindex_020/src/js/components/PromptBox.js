import React from 'react';
import ReactDOM from 'react-dom';

/*
 props {
	msg:''
 }
 */
import {
	prompt
} from './../Actions.js';
class PromptBox extends React.Component {
	constructor(props) {
		super(props);
		this.okClickHandler = this.okClickHandler.bind(this);
		this.cancelClickHandler = this.cancelClickHandler.bind(this);
	}
	okClickHandler() {
		let {
			okHandler,
			dispatch
		} = this.props;
		if (okHandler) {
			okHandler();
		}
		dispatch(prompt('', false));
	}
	cancelClickHandler() {
		let {
			cancelHandler,
			dispatch
		} = this.props;
		if (cancelHandler) {
			cancelHandler();
		}
		dispatch(prompt('', false));
	}
	render() {
		let {
			msg,
			visible,
			okHandler,
			cancelHandler
		} = this.props;
		return <div className="dlgbox" style={{display:!visible?"none":"block"}}>
        <div className="dlgct">{msg}</div>
	        <div className="row ptb10">
	            <a className="cancel col s6" href="javascript:void(0);" onClick={this.cancelClickHandler}>取消</a>
	            <a className="sure col s6" href="javascript:void(0);" onClick={this.okClickHandler}>确定</a>
	        </div>
	    </div>;
	}
}
export default PromptBox;