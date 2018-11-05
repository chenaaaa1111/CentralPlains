import React, {
	Component,
	PropTypes
} from 'react'
import {
	alert
} from './../Actions.js';
import ReactDOM from 'react-dom';

class AlertBox extends Component {
	constructor(props) {
		super(props);
		this.okClickHandler = this.okClickHandler.bind(this);
	}
	okClickHandler() {
		let {
			okHandler,
			dispatch
		} = this.props;
		if (okHandler) {
			okHandler();
		}
		dispatch(alert('', false));
	}
	render() {
		let {
			msg,
			visible,
			okHandler
		} = this.props;
		return <div className="dlgbox" style={{display:visible?"block":"none"}}>
        <div className="dlgct">{msg}</div>
        <div className="row ptb10">
            <a className="sure col s12" href="javascript:void(0);" onClick={this.okClickHandler}>确定</a>
        </div>
    </div>;
	}
}

AlertBox.propTypes = {
	msg: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired
}
export default AlertBox;