/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import ReactIScroll from 'react-iscroll';
import Log from './../../commons/utils/Log'
// var iScroll = require('iscroll');
var iScroll = require('iscroll/build/iscroll-probe');
class HScroll extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.options = {
			mouseWheel: true,
			scrollX: true,
			scrollY: true,
			eventPassthrough: true,
			click: true,
			bounce: false,
			probeType: 2
		};
		this.containerId = 'scrollContainer';
	}

	onRefresh() {
	    Log.log("refresh");
		// Log.log("refresh");
	/*if (this.props.scrollPos === 0) {
			let iscroll = this.refs['iScroll'],
				scrollInstance = iscroll._iScrollInstance;
			scrollInstance.scrollTo(0, 0);
	}*/
	}

	onScroll() {
		let loadmore = this.props.loadmore;
		let iscroll = this.refs['iScroll'],
			scrollInstance = iscroll._iScrollInstance;
		if (scrollInstance.x <= scrollInstance.maxScrollX && !loadmore) {
			this.props.onScroll(scrollInstance.x);
		}
	}

	componentDidMount() {
		let id = this.containerId;
		document.getElementById(id).addEventListener("touchmove", (e) => {
			e.preventDefault();
		}, false);
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.scrollPos === 0 && this.props.scrollPos != nextProps.scrollPos) {
			let iscroll = this.refs['iScroll'],
				scrollInstance = iscroll._iScrollInstance;
			if (scrollInstance) {
				scrollInstance.scrollTo(0, 0);
			}
		}
	}

	render() {
		return (
			<div id={this.containerId}>
     <ReactIScroll ref="iScroll"
                   iScroll={iScroll}
                   options={this.options}
                   onScroll={this.onScroll.bind(this)}
                   onRefresh={this.onRefresh.bind(this)}>
       {this.props.children}
     </ReactIScroll>
   </div>
			);
	}
}
export default HScroll;
