import React from 'react';
import ReactDOM from 'react-dom';

class ImageView extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			showView,
			photo,
			onDeleteClick,
			onSetDefaultClick,
			onBackClick
		} = this.props;
		return <div className="imgfullsize" style={{display:showView?"block":"none"}}>
	        <header className="top bg102">
		        <a href="javascript:void(0);" className="back" onClick={()=>{onBackClick(photo,false)}}><i className="indicator left"></i></a>
		        <a href="javascript:void(0);" className="delete" onClick={()=>{onDeleteClick(photo)}}>
		        	<span>删除</span>
		        </a>
	        </header>
	        <section className="main">
	            <img src={photo.url||require("../../../../../../images/scan.png")} alt="" />
	        </section>
	        <a className="bottom" href="javascript:void(0);" onClick={()=>{onSetDefaultClick(photo)}}>设置橱窗</a>
	    </div>;
	}
}

export default ImageView;