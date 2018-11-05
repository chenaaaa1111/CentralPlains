/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-04-23 12:05:05
 * @version $Id$
 */
import React,{Component} from 'react';
// import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import request from './../../../../commons/utils/ServerRequest';
import {LoadnewsItem} from "./Actions";
import format from "./../../../../commons/utils/DateTransform";
import {getShare} from "./../../../../commons/utils/wxShare";
require("./../../../css/information.css"); 
class InformDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.loadMessage();
    }
	render() {
		let sltytle={"padding":" 20px  20px 10px 20px ",
		"font-family":"微软雅黑",   "color":"#000","fontSize":"18px"},
		slcontent={"box-sizing":"border-box", "padding":"10px 20px 10px 20px",
		"maxWidth":"100%","width":"100%"}
			const {loadMessage, params,message}=this.props;
			return (<div className="ssfs" id="111">
			<p className="newsTitle" style={sltytle}>{message.NoticeTitle}</p>
			<p style={{color:"#666","fontSize":"12px","padding":"0px 20px 5px 20px"}}>{message.AddDate}</p>
			<div style={slcontent}  dangerouslySetInnerHTML={{
                    __html: message.NoticeInfor}}></div>
			</div>)
	}
}

const mapStateToProps = (state, ownProps) => {
	let {message}=state;
	return {
		message:state.info.message
	};
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		loadMessage:function(){
			request.requestNewsMessage({"Id":ownProps.params.infoId},function(res){
				let response=res;
				var img=response.ImgInfos[0]?response.ImgInfos[0].ImgUrl:"";
				var linkurl=location.href.split('#')[0];
				var options={"linkurl":linkurl,title:response.NoticeTitle,des:response.NoticeDescription,imgurl:img};
				getShare(options);
				let timestate=format.getFDate(response.AddDate);
				response.AddDate=timestate;
				dispatch(LoadnewsItem(response));
			});
		}
	}
};

const InformDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(InformDetails);
module.exports = InformDetailsContainer;
