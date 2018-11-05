import React from 'react';
import {
	Link
} from 'react-router';
import Config from './../obj/Config';
export default React.createClass({
	render: function() {
		var to = Config.routerRoot + this.props.to;
		return <Link {...this.props} to={to} activeClassName="active"/>
	}
});