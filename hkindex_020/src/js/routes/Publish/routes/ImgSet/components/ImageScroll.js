import React from 'react';
import ReactDOM from 'react-dom';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

class ImageScroll extends React.Component {
	constructor(props) {
		super(props);
		this.options = {
			mouseWheel: true,
			scrollX: true,
			scrollY: false,
			eventPassthrough: true,
			click: true
		};
	}
	render() {
		let {
			photos,
			width,
			photoWidth
		} = this.props;
		return <ReactIScroll ref="iScroll" iScroll = {iScroll} options = {this.options}>
			<ul className="grids" style={{width:width+"px"}}>
			{
				photos.map(function(item,index){
					return <li className="grid-item" key={index}><span className="imgBox" style={{width:photoWidth}}><img src={item.url+"?width=200"||require("../../../../../../images/list_img.png")} alt="" /></span></li>;
				})
			}
	        </ul> 
	    </ReactIScroll>;
	};
}

export default ImageScroll;