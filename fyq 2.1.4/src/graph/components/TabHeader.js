/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-12 17:59:16
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { config } from './../../commons/config/config.js';
import { changePath, changeQueryTime } from './../routes/CaseIndex/pages/Actions';
import { changeLoginPath, changeLoginQueryTime } from './../routes/LoginIndex/pages/Actions';
import { changePerformPath, changePerformQueryTime } from './../routes/StatsIndex/pages/Actions';
import NavLink from './../../commons/components/NavLink';
import Log from './../../commons/utils/Log';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, QUERY_GLOBAL, QUERY_DEPARTMENT, QUERY_AGENT, DOCKER_DEFAULT_PATH, CASE_DEFAULT_PATH } from './../utils/Const.js';

class TabHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    let {tabtype, tabletype, headers, transparent, querytype} = this.props;
    // Log.log('lllll:', tabtype, tabletype, headers, transparent, querytype);
    return (<header className={transparent ? "row lir" : "row lir bgff"}>
            {headers.map((item, index) => {
              let {clickable} = item;
              return <div key={index}
                          className="licol">
                       <a href="javascript:void(0);"
                          onClick={() => {
                                    this.props.clickHeader(tabletype, tabtype, item, querytype);
                                   }}
                          className={querytype !== QUERY_AGENT && clickable ? "active" : ""}>
                         {item.label}
                       </a>
                     </div>;
             })}
          </header>);
  }
}

const gotoStatsPage = (tabletype, pPath) => {
  let path;
  switch (tabletype) {
  case TABLE_CASE:

    pPath = pPath ? pPath : CASE_DEFAULT_PATH;
    
    path = config.routerRoot + '/graph/casestats/' + pPath;
    break;
  case TABLE_PERFORM:
    pPath = pPath ? pPath : DOCKER_DEFAULT_PATH;
    path = config.routerRoot + '/graph/tabstats/' + pPath;
    break;
  case TABLE_REGISTER:
    pPath = pPath ? pPath : DOCKER_DEFAULT_PATH;
    path = config.routerRoot + '/graph/loginstats/' + pPath;
    break;
  }
  browserHistory.push(path);
}

const changeQueryPath = (dispatch, tabletype, path, regionName) => {
  switch (tabletype) {
  case TABLE_CASE:
    dispatch(changePath(path));
    break;
  case TABLE_PERFORM:
    dispatch(changePerformPath(path));
    break;
  case TABLE_REGISTER:
    dispatch(changeLoginPath(path, regionName));
    break;
  }
};

const changeNextQueryTime = (dispatch, tabletype, start, end) => {
  switch (tabletype) {
  case TABLE_CASE:
    dispatch(changeQueryTime(start, end));
    break;
  case TABLE_PERFORM:
    dispatch(changePerformQueryTime(start, end));
    break;
  case TABLE_REGISTER:
    dispatch(changeLoginQueryTime(start, end));
    break;
  }
}

const gotoLastPath = (tabletype, pPath) => {
  let path;
  switch (tabletype) {
  case TABLE_CASE:
    break;
  case TABLE_PERFORM:
    path = config.routerRoot + '/graph/tabstats/' + pPath + '?type=' + QUERY_AGENT;
    browserHistory.push(path);
    break;
  case TABLE_REGISTER:
    path = config.routerRoot + '/graph/agent';
    browserHistory.push(path);
    break;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickHeader(tabletype, tabtype, headerObj, querytype) {
      Log.log("headerObj2222:", headerObj);
      if (querytype === QUERY_AGENT || !headerObj) {
        return;
      }
      if (querytype === QUERY_GLOBAL) {
        let path,
          start,
          end;
        // Log.log('tabletype:', tabletype, 'tabtype:', tabtype);
        switch (tabtype) {
        case TAB_DAY:
          if (headerObj && headerObj.queryDate) {
            let tyear = new Date(headerObj.queryDate).getFullYear();
            let tmonth = new Date(headerObj.queryDate).getMonth();
            let tdate = new Date(headerObj.queryDate).getDate();
            start = new Date(tyear, tmonth, tdate).getTime();
            end = new Date(tyear, tmonth, tdate).getTime() + 24 * 60 * 60 * 1000 - 1;
            changeNextQueryTime(dispatch, tabletype, start, end);
            if (headerObj.hasNext) {
              gotoStatsPage(tabletype, headerObj.path);
            } else if (headerObj.hasNext !== null) {
              changeQueryPath(dispatch, tabletype, headerObj.path, headerObj.label);
              gotoLastPath(tabletype, headerObj.path);
            }
          }
          break;
        case TAB_WEEK:
          if (headerObj && headerObj.weekStart && headerObj.weekEnd) {
            start = headerObj.weekStart;
            end = headerObj.weekEnd;
            changeNextQueryTime(dispatch, tabletype, start, end);
           if (headerObj.hasNext) {
              gotoStatsPage(tabletype, headerObj.path);
            } else if (headerObj.hasNext !== null) {
              changeQueryPath(dispatch, tabletype, headerObj.path, headerObj.label);
              gotoLastPath(tabletype, headerObj.path);
            }
          }
          break;
        case TAB_MONTH:
          if (headerObj && headerObj.year && headerObj.month) {
            let {year, month} = headerObj;
            start = new Date(year, month - 1, 1).getTime();
            end = new Date(year, month, 1).getTime() - 1;
            changeNextQueryTime(dispatch, tabletype, start, end);
            if (headerObj.hasNext) {
              gotoStatsPage(tabletype, headerObj.path);
            } else if (headerObj.hasNext !== null) {
              changeQueryPath(dispatch, tabletype, headerObj.path, headerObj.label);
              gotoLastPath(tabletype, headerObj.path);
            }
          }
          break;
        }
        return;
      }
      if (!headerObj.hasNext) {
        if (headerObj.hasNext !== null) {
          changeQueryPath(dispatch, tabletype, headerObj.path, headerObj.label);
          gotoLastPath(tabletype, headerObj.path);
        }
      } else {
        if (headerObj.path) {
          changeQueryPath(dispatch, tabletype, headerObj.path, headerObj.label);
          gotoStatsPage(tabletype, headerObj.path);
        }
      }
    }
  };
};

const TabHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(TabHeader);
export default TabHeaderContainer;
