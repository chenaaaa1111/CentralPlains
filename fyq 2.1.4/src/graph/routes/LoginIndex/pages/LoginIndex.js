/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { config } from './../../../../commons/config/config.js';
import { nConfig } from './../../../../commons/config/nConfig.js';
import Tab from './../../../components/Tab';
import Table from './../../../components/Table';
import DateTransform from './../../../../commons/utils/DateTransform';
import { query, covertToBoolean } from './../../../../commons/utils/Common.js';
import request from './../../../../commons/utils/ServerRequest';
import { setTitle } from './../../../../commons/utils/Common.js';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, setScrollPos, changeCurLogin, changeQueryType, changeDocker, resetData, changePageIndex, fetchMore, fetchTableData, fetchWeekTableData, fetchMonthTableData } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, CHANGE_ESTATE, QUERY_GLOBAL } from './../../../utils/Const.js';
import Log from './../../../../commons/utils/Log';
require('./../../../../commons/less/more.less');
class LoginIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    let {tabletype, tabtype, pageindex, pagesize, queryStart, queryEnd} = this.props;
    let isdocker = covertToBoolean(query('isdocker'));
    let start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
    let end = new Date();
    setTitle('注册用户统计');
    nConfig.sendNativeBtnConfig('业绩报表', '/wap/graph/statsindex', {
      citycode: config.citycode,
      appversion: config.appVersion,
      isdocker: isdocker
    });
    this.props.changeDocker(isdocker);
    this.props.fetchLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
  }
  render() {
    let {tabletype, tabtype, headers, totals, values, cur, isdocker, pageindex, pagesize, queryStart, queryEnd, loadmore, scrollPos} = this.props;
    return (<div>
            <header className="statsHeader">
              <p>
                <span className="cur">{cur}</span>人
              </p>
              <p>
                当前用户量
              </p>
            </header>
            <header className="statsTab tc">
              <Tab tabtype={tabtype}
                   onChange={(tabtype) => {
                              this.props.changeTab(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore);
                             }}></Tab>
            </header>
            <Table hdopacity={true}
                   tabtype={tabtype}
                   tabletype={TABLE_REGISTER}
                   headers={headers}
                   totals={totals}
                   values={values}
                   querytype={QUERY_GLOBAL}
                   loadmore={loadmore}
                   scrollPos={scrollPos}
                   onScroll={(pos) => {
                              this.props.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, pos);
                             }}></Table>
          </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  Log.log("state:", state);
  let {tabtype, tabletype, headers, totals, values, cur, isdocker, pageindex, pagesize, queryStart, queryEnd, scrollPos} = state.login;
  let loadmore = state.commons.loadmore;
  return {
    tabtype: tabtype,
    tabletype: tabletype,
    headers: headers,
    totals: totals,
    values: values,
    cur: cur,
    isdocker: isdocker,
    pageindex: pageindex,
    pagesize: pagesize,
    queryStart: queryStart,
    queryEnd: queryEnd,
    loadmore: loadmore,
    scrollPos: scrollPos
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTab(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore) {
      var android = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
      if (android) {
        nConfig.sendNativeBtnConfig('业绩报表', '/wap/graph/statsindex', {
          citycode: config.citycode,
          appversion: config.appVersion,
          isdocker: isdocker
        });
      }
      this.fetchLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore);
    },
    changeDocker(docker) {
      dispatch(changeDocker(docker));
    },
    fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, scrollPos) {
      dispatch(loadMore(true));
      dispatch(setScrollPos(scrollPos));
      Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
      switch (tabtype) {
      case TAB_DAY:
        this.fetchDayLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
        break;
      case TAB_WEEK:
        this.fetchWeekLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
        break;
      case TAB_MONTH:
        this.fetchMonthLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
        break;
      }
    },
    fetchLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
      dispatch(changeTab(tabtype));
      dispatch(changeQueryType(QUERY_GLOBAL));
      switch (tabtype) {
      case TAB_DAY:
        pageindex = 1;
        pagesize = 10;
        queryEnd = DateTransform.getDayEndTime(new Date().getTime());
        queryStart = DateTransform.nDayBeforeTime(queryEnd, pagesize) + 1;
        dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
        this.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
        break;
      case TAB_WEEK:
        pageindex = 1;
        pagesize = 10;
        queryStart = DateTransform.nWeekBeforeTime(new Date().getTime(), pagesize);
        queryEnd = DateTransform.getZeroTime(new Date().getTime());
        dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
        this.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
        break;
      case TAB_MONTH:
        pageindex = 1;
        pagesize = 10;
        queryStart = DateTransform.nMonthBeforeTime(new Date().getTime(), pagesize);
        queryEnd = DateTransform.getDayEndTime(new Date().getTime());
        dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
        this.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
        break;
      }
    },
    fetchDayLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
      let beginTime = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
      let endTime = new Date();
      Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
      let sendData = {
        vJsonData: {
          Etype: QUERY_GLOBAL,
          NeedSum: 1,
          BeginDate: DateTransform.GMTToLocale(queryStart),
          EndDate: DateTransform.GMTToLocale(queryEnd),
          NeedPage: 1,
          IsDocker: isdocker
        }
      };
      dispatch((dispatch) => {
        dispatch(loading(true));
        request.requestDayRegister(sendData, (res) => {
          dispatch(loading(false));
          dispatch(loadMore(false));
          dispatch(changeCurLogin(res.CurrentUserCount));
          if (res.ReportDtos) {
            dispatch(fetchTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
          }
        });
      });
    },
    fetchWeekLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
      let beginTime = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
      let endTime = new Date();
      Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
      let sendData = {
        vJsonData: {
          Etype: QUERY_GLOBAL,
          NeedSum: 1,
          BeginDate: DateTransform.GMTToLocale(queryStart),
          EndDate: DateTransform.GMTToLocale(queryEnd),
          NeedPage: 1,
          IsDocker: isdocker
        }
      };
      dispatch((dispatch) => {
        dispatch(loading(true));
        request.requestWeekRegister(sendData, (res) => {
          Log.log("res:", res);
          dispatch(loading(false));
          dispatch(loadMore(false));
          dispatch(changeCurLogin(res.CurrentUserCount));
          if (res.ReportDtos) {
            dispatch(fetchWeekTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
          }
        });
      });
    },
    fetchMonthLoginData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
      let beginTime = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
      let endTime = new Date();
      Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
      let sendData = {
        vJsonData: {
          Etype: QUERY_GLOBAL,
          NeedSum: 1,
          BeginDate: DateTransform.GMTToLocale(queryStart),
          EndDate: DateTransform.GMTToLocale(queryEnd),
          NeedPage: 1,
          IsDocker: isdocker
        }
      };
      dispatch((dispatch) => {
        dispatch(loading(true));
        request.requestMothRegister(sendData, (res) => {
          //Log.log("res:", res);
          dispatch(loading(false));
          dispatch(loadMore(false));
          dispatch(changeCurLogin(res.CurrentUserCount));
          if (res.ReportDtos) {
            dispatch(fetchMonthTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
          }
        });
      });
    }
  }
};

const LoginIndexContainer = connect(mapStateToProps, mapDispatchToProps)(LoginIndex);
module.exports = LoginIndexContainer;
