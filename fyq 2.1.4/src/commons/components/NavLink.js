import React, { Component } from 'react';
import { Link } from 'react-router';
import { config } from './../config/config.js';
import Log from "./../utils/Log";
const NavLink = (props) => {
	var to = config.routerRoot + props.to;
	return <Link {...props}
              to={to}
              activeClassName="active" />
};
export default NavLink;
