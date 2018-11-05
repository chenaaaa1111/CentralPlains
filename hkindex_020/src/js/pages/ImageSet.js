import React from 'react';
import ReactDOM from 'react-dom';
import ImageScroll from './../components/ImageScroll';
import ImgTable from './../components/ImgTable';
import ImgTableContainer from './../container/ImgTableContainer';
import ServerRequest from './../utils/ServerRequest';
import NavLink from './../components/NavLink';
import Config from './../obj/Config';
import {
	browserHistory
} from 'react-router';
import {
	fetchHousePhotosEnd,
	fetchAdPhotosEnd,
	load
} from './../Actions.js';
import {
	MAX_ROOMIMG_COUNT,
	MAX_STYLEIMG_COUNT,
	PHTOTO_TYPE_STYLE,
	PHTOTO_TYPE_ROOM,
	PHTOTO_TYPE_PLOT
} from './../obj/Const.js';
class ImageSet extends React.Component {
	constructor(props) {
		super(props);
		this.inited = false;
		this.calcPhotoWidth = this.calcPhotoWidth.bind(this);
		this.onSureClick = this.onSureClick.bind(this);
	}
	componentWillUnmount() {
		this.props.back();
	}
	componentDidMount() {
		let {
			adid,
			houseid,
			phototype,
			setTitle,
			maxCount
		} = this.props;
		setTitle("选择图片");
		if (!this.inited && this.props.inited) {
			this.inited = true;
			this.props.fetchPhotos(adid, houseid, phototype);
		}
	}
	onSureClick() {
		let {
			adid,
			phototype
		} = this.props;
		this.props.sureClick(phototype);
		browserHistory.goBack();
	}
	calcPhotoWidth(cols, paddingLeft) {
		let vWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
		return (vWidth - paddingLeft * cols) / cols;
	}
	render() {
		let {
			phototype,
			dispatch,
			allphotos,
			photos,
			maxCount
		} = this.props;
		let paddingLeft = 10;
		let cols = 4;
		let photoWidth = this.calcPhotoWidth(cols, paddingLeft);
		let totalWidth = (photoWidth + paddingLeft) * photos.length;
		let curCount = photos.length;
		return <div>
			<ImgTableContainer type={phototype} curCount={curCount} maxCount={maxCount}></ImgTableContainer>
			<div className="previewBoard">
		        <ImageScroll photos={photos} width={totalWidth} photoWidth={photoWidth}></ImageScroll>
		        <a className="surebtn" onClick={this.onSureClick}><span>确定</span><i className="count">{curCount+'/'+maxCount}</i></a>
	    	</div>
		</div>;
	}
}

//export default ImageSet;
module.exports = ImageSet;