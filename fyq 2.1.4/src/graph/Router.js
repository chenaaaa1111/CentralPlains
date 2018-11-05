import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import { config } from './../commons/config/config.js';
import App from './../commons/components/App';
import Log from './../commons/utils/Log';
const rootRoute = {
	childRoutes: [{
		path: config.routerRoot + '/graph/',
		component: App,
		childRoutes: [
			require('./routes/Agent'),
			require('./routes/TabStats'),
			require('./routes/StatsIndex'),
			require('./routes/LoginIndex'),
			require('./routes/LoginStats'),
			require('./routes/CaseStats'),
			require('./routes/CaseIndex')
		]
	}]
};

export default rootRoute;
