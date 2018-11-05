/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-13 18:29:47
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Log from './../../commons/utils/Log'
import { TAB_DAY, TAB_WEEK, TAB_MONTH } from './../utils/Const';
class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (<ul className="tabs row">
            <li className="col s4">
              <a href="javascript:void(0);"
                 className={this.props.tabtype === TAB_DAY ? "tab active" : "tab"}
                 onClick={() => {
                            this.props.onChange(TAB_DAY);
                          }}>日</a>
            </li>
            <li className="col s4">
              <a href="javascript:void(0);"
                 onClick={() => {
                            this.props.onChange(TAB_WEEK);
                          }}
                 className={this.props.tabtype === TAB_WEEK ? "tab active" : "tab"}>周</a>
            </li>
            <li className="col s4">
              <a href="javascript:void(0);"
                 onClick={() => {
                            this.props.onChange(TAB_MONTH);
                          }}
                 className={this.props.tabtype === TAB_MONTH ? "tab active" : "tab"}>月</a>
            </li>
          </ul>);
  }
}

export default Tab;
