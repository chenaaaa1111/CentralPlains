import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import { config } from './../commons/config/config.js';
import Log from "./../commons/utils/Log";
import WApp from './../commons/components/WApp';
const rootRoute = {
	childRoutes: [{
		path: config.routerRoot + '/inform/',
		component: WApp,
		childRoutes: [
			require('./routes/InformDetails')
		]
	}]
};

export default rootRoute;
