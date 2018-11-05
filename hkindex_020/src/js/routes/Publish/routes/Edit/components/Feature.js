import React from 'react';
import ReactDOM from 'react-dom';

/*
 props {
	msg:''
 }
 */
class Feature extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div className="content-box m0">
	        <section className="ctboxct bgf1"><span className="selbtn">拎包入住</span>
	            <span className="selbtn">拎包入住</span>
	            <span className="selbtn">拎包入住</span>
	            <span className="selbtn">拎包入住</span>
	            <span className="selbtn">拎包入住</span></section>
	    </div>;
	}
}

export default Feature;