import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom';
import AlertContainer from './AlertContainer';
import PromptContainer from './PromptContainer';
import AppProxy from './../utils/AppProxy';
require('./../../css/reset.css');
require('./../../css/normalize.css');
require('./../../css/global.css');
require('./../../css/common.css');
require('./../../css/layout.css');
require('./../../css/button.css');
require('./../../css/icon.css');
require('./../../css/form.css');
require('./../../css/more.css');
require('core-js');
class App extends React.Component {
	constructor(props) {
		super(props);
		this.onMaskClick = this.onMaskClick.bind(this);
	}
	onMaskClick() {
		let {
			clickClose,
			showMask,
			clickCloseFunc
		} = this.props;
		if (clickClose) {
			if (clickCloseFunc) {
				clickCloseFunc();
			}
			showMask(false, false, null);
		}
	}
	render() {
		let {
			isloading,
			mask,
			clickClose,
			clickCloseFunc
		} = this.props;
		return <div>
		<div className="popbg" style={{display:mask?"block":"none"}} onClick={this.onMaskClick}></div>
		<div className="loadingbg" style={{display:!isloading?"none":"block"}}></div>
		<div className="loading" style={{display:!isloading?"none":"block"}}>
	        <img className="loadcircle" src={require("../../images/progress_outer.png")} alt=""/>
	    </div> 
	    <AlertContainer></AlertContainer>
	    <PromptContainer></PromptContainer>
	    {
	    	this.props.children
	    }
	   </div>;
	}
}
export default App;