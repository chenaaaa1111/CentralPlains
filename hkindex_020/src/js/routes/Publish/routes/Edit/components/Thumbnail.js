import React, {
	Component,
	PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import NavLink from './../../../../../components/NavLink';
import {
	hscrollReady
} from './../../../../../Actions.js';
import {
	EDIT_STATE_BASE,
	EDIT_STATE_IMG,
	EDIT_STATE_VIEW
} from './../../../../../obj/Const';

class Thumbnail extends React.Component {
	constructor(props) {
		super(props);
		this.options = {
			mouseWheel: true,
			scrollX: true,
			scrollY: false,
			eventPassthrough: true,
			click: true
		};
		this.getImageBoxWidth = this.getImageBoxWidth.bind(this);
	}

	getImageBoxWidth() {
		let imgbox = document.querySelector(".grid-item");
		//console.log("imgbox:", imgbox);
		if (imgbox) {
			return imgbox.offsetWidth;
		} else {
			return 0;
		}
	}

	componentDidUpdate() {
		let {
			width,
			info,
			updateImgListWidth
		} = this.props;
		let {
			photos,
			type
		} = info;
		let imgWidth = this.getImageBoxWidth();
		let listWidth = imgWidth * photos.length;
		//console.log("imgWidth:" + imgWidth + "len:" + photos.length + ",listWidth:" + listWidth);
		if (width !== listWidth) {
			updateImgListWidth(type, listWidth);
		}
	}

	componentDidMount() {
		let {
			info,
			updateImgListWidth
		} = this.props;
		let {
			id,
			photos,
			type
		} = info;
		let imgWidth = this.getImageBoxWidth();
		let listWidth = imgWidth * photos.length;
		//console.log("imgWidth:" + imgWidth + "len:" + photos.length + ",listWidth:" + listWidth);
		updateImgListWidth(type, listWidth);
		document.getElementById(id).addEventListener("touchmove", (e) => {
			e.preventDefault();
		}, false);
	}

	render() {
		let {
			id,
			adid,
			houseid,
			type,
			photos,
			title,
			remark
		} = this.props.info;
		let width = this.props.width;
		let getremark = function(remark) {
			if (remark && remark != '') {
				return <span className="lb9a12">{remark}</span>;
			} else {
				return '';
			}
		};
		return <div className="content-box">
	        <header className="ctboxtl"><strong className="mr10">{title}</strong>{getremark(remark)}</header>
	        <section className="ctboxct flbox">
		        <NavLink to={"publish/imageset/"+type}>
			        <div className="editBox fll">
				        <span></span>
			            <span></span>
		            </div>
		        </NavLink>
	            <div id={id} className="flr ovh">
		            <ReactIScroll iScroll = {iScroll} options = {this.options}>
						<ul className="grids" style={{width:width+'px'}}>
						{
							photos.map((photo,index)=>{
								return <li className="grid-item" key={index} onClick={()=>{this.props.onImgClick(photo,true)}}><span className="imgBox thumbnail"><img src={photo.url+"?width=200"||require("../../../../../../images/imageset.png")} alt="" /></span> <img className="default" style={{display:photo.isdefault?"block":"none"}} src={require("../../../../../../images/default.png")} alt=""/></li>;
							})
						}
		                </ul>
	        		</ReactIScroll>
	            </div>
	        </section>
	    </div>;
	}
}
Thumbnail.PropTypes = {
	id: PropTypes.any.isRequired
}
export default Thumbnail;