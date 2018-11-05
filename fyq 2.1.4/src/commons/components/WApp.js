/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 19:58:37
 * @version $Id$
 */
import React, { Component } from 'react';
import proxy from './../utils/AppProxy';
import request from './../utils/ServerRequest';
import { config } from './../config/config';
import { query } from './../utils/Common';
import Log from './../utils/Log.js';
require('core-js');
require('./../less/reset.less');
require('./../less/common.less');
require('./../less/layout.less');
require('./../less/button.less');
class WApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apiRequestEnd: false,
		};
	}
	componentDidMount() {
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
				this.setState({
					apiRequestEnd: true
				});
			});
		}, 'common/config.product');
	}

	render() {
		let allcomplete = this.state.apiRequestEnd;
		return (
			<div>
     {allcomplete && this.props.children}
   </div>
			);
	}
}

export default WApp;
