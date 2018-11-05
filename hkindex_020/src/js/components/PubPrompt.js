import React from 'react';
import ReactDOM from 'react-dom';
import {
	showPubPrompt
} from './../Actions.js';

class PubPrompt extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			msg,
			showPubPrompt,
			gotoManager,
			closeCurPage
		} = this.props;
		return <div className="dlgbox" style={{display:!showPubPrompt?"none":"block"}}>
        <div className="dlgct">{msg}</div>
	        <div className="row ptb10">
	            <a className="sure col s12" href="javascript:void(0);" onClick={()=>{closeCurPage();}}>关闭本页</a>
	        </div>
	    </div>;
	}
}

export default PubPrompt;