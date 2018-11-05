import React from 'react';
import {
  render
} from 'react-dom';
import {
  Provider
} from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute
} from 'react-router';
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';
const rootRoute = {
  childRoutes: [{
    path: '/MobileExtend/',
    component: require('./components/AppContainer'),
    childRoutes: [
      require('./routes/Publish'),
      require('./routes/List'),
      require('./routes/Manager')
    ]
  }]
};
let store = createStore(Reducers, applyMiddleware(thunk));
render((<Provider store={store}>
  <Router history={browserHistory} routes={rootRoute} />
</Provider>),
  document.getElementById('app'));