/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 19:58:37
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import proxy from './../utils/AppProxy';
import request from './../utils/ServerRequest';
import { config } from './../config/config';
import { query } from './../utils/Common.js';
import { notifyReady } from './../../graph/Actions';
import Log from "./../utils/Log";
require('./../less/reset.less');
require('./../less/common.less');
require('./../less/layout.less');
require('./../less/button.less');
require('core-js');
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.getCityList.bind(this);
	}

	getCityList() {
		let citycode = query('citycode');
		let appVersion = query('appversion');
		// Log.log("urlParams:", "citycode=", citycode, "appVersion=", appVersion);
		request.setAuth({
			CompanyPath: citycode,
			ClientVersion: appVersion
		});
		require.ensure([], (require) => {
			let deploy = require('./../config/config.product.js');
			config.apiRequestUrl = deploy.cityApiUrl;
			request.requestCityList(deploy.cityApiUrl, citycode, appVersion, () => {
				this.props.notifyReady(true);
			});
		}, 'common/config.product');
	}

	componentDidMount() {
		if (config && !config.test) {
			proxy.init(() => {
				this.getCityList();
			});
		} else {
			this.getCityList();
		// this.props.notifyReady(true);
		}
	}

	render() {
		let {loading, ready} = this.props;
		return (
			<div>
     <div className="loadingbg"
          style={{
                 	display: loading ? "block" : "none"
                 }}>
       <div className="loading">
         <img className="loadImg"
              src={require('./../images/loading.gif')}
              alt="" />
       </div>
     </div>
     {ready && this.props.children}
   </div>
			);
	}
}

const mapStateToProps = (state, ownProps) => {
	Log.log("state:", state);
	let {loading, ready} = state.commons;
	return {
		loading: loading,
		ready: ready
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		notifyReady: (ready) => {
			dispatch(notifyReady(ready));
		}
	}
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
module.exports = AppContainer;
