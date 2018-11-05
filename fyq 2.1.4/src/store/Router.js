import React from 'react';
import { render } from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import { config } from './../commons/config/config.js';
import Log from "./../commons/utils/Log";
import WApp from './../commons/components/WApp';
const rootRoute = {
	childRoutes: [{
		path: config.routerRoot + '/store/',
		component: WApp,
		childRoutes: [
			require('./routes/ImageView'),
			require('./routes/MyStore'),
			require('./routes/StoreDetails'),
			require('./routes/TypeOnSale')
		]
	}]
};

export default rootRoute;
