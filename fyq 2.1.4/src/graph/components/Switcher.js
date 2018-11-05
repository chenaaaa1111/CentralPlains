/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import Log from './../../commons/utils/Log'
class Switcher extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		let {onPrev, onNext, time} = this.props;
		return (<div className="switcher">
            <a href="javascript:void(0);"
               className="prevbtn"
               onClick={onPrev}><img src={require("../images/arrow.png")} /></a>
            <span className="curTxt">{time}</span>
            <a href="javascript:void(0);"
               className="nextbtn"
               onClick={onNext}><img src={require("../images/arrow.png")} /></a>
          </div>);
	}
}

export default Switcher;
