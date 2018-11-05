/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:25:26
 * @version $Id$
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
import rootRoute from './Router';
import Log from './../commons/utils/Log';
const defaultState = {
	isloading: false,
	ready: false,
	mask: false,
};
let store = createStore(Reducers, applyMiddleware(thunk));
render((<Provider store={store}>
          <Router history={browserHistory}
                  routes={rootRoute} />
        </Provider>),
	document.getElementById('app'));
