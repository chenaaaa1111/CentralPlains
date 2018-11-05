import React from 'react';
import ReactDOM from 'react-dom';
import AdBaseInfo from './AdBaseInfo';
import ThumbnailContainer from './ThumbnailContainer';
import NavLink from './../../../../../components/NavLink';
import SpeechContainer from './SpeechContainer';
import ImgViewContainer from './ImgViewContainer';
import PubPromptContainer from './PubPromptContainer.js';
import ServerRequest from './../../../../../utils/ServerRequest';
import {
	FETCH_DETAIL,
	load,
	fetchDetailEnd
} from './../../../../../Actions.js';
import {
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_STYLE,
	PUTAWAY_VALUE,
	ONPUTAWAY_VALUE,
	TRADE_SALE,
	TRADE_RENT
} from './../../../../../obj/Const';

class Edit extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

		
	}
	render() {
		let {
			info,
			canPublish,
			switchactive,
			onSwitch,
			publish,
			saveOnPutAway,
			housePhotos,
			stylePhotos,
			setTitle
		} = this.props;
		let housePhotoInfo = {
			id: "houseScroll",
			adid: info.adid,
			houseid: info.houseid,
			type: PHTOTO_TYPE_ROOM,
			photos: housePhotos,
			title: "选取室内图",
			remark: "点击查看大图设置橱窗"
		}
		let stylePhotoInfo = {
			id: "styleScroll",
			adid: info.adid,
			houseid: info.houseid,
			type: PHTOTO_TYPE_STYLE,
			photos: stylePhotos,
			title: "选取户型图",
			remark: ""
		}
		let title = info.tradetype === TRADE_SALE ? "发布出售" : "发布出租";
		setTitle(title);
		return <div>
			<AdBaseInfo info={info} {...this.props}></AdBaseInfo>
			<SpeechContainer></SpeechContainer>
			<ThumbnailContainer info={housePhotoInfo}></ThumbnailContainer>
			<ThumbnailContainer info={stylePhotoInfo}></ThumbnailContainer>
		    <div className="pub content-box m0">
		        <div className="fill"></div>
		        <section className="ctboxct fixedb row">
		            <a href="javascript:void(0)" className="sbtn mr10 col1 s6" onClick={()=>{saveOnPutAway(info,ONPUTAWAY_VALUE)}}>保存到待上架</a>
		            <a href="javascript:void(0)" style={{"display":canPublish?"block":"none"}} className="pbtn col1 s6" onClick={()=>{publish(info,PUTAWAY_VALUE)}}>发布到外网</a>
		        </section>
		    </div>
		    <ImgViewContainer></ImgViewContainer>
		    <PubPromptContainer {...this.props}></PubPromptContainer>
		</div>;
	}
}

//export default Edit;
module.exports = Edit;