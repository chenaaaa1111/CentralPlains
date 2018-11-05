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
import Table from './../../../components/Table';
import Tab from './../../../components/Tab';
import DateTransform from './../../../../commons/utils/DateTransform';
import { query, covertToBoolean } from './../../../../commons/utils/Common.js';
import request from './../../../../commons/utils/ServerRequest';
import { setTitle } from './../../../../commons/utils/Common.js';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, changeDocker, setScrollPos, changeQueryType, resetData, changePageIndex, fetchMore, fetchTableData, fetchWeekTableData, fetchMonthTableData } from './Actions';
import Log from './../../../../commons/utils/Log';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, QUERY_GLOBAL } from './../../../utils/Const.js';
require('./../../../../commons/less/more.less');
class StatsIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		let {tabletype, tabtype, pageindex, pagesize, queryStart, queryEnd} = this.props;
		let isdocker = covertToBoolean(query('isdocker'));
		this.props.changeDocker(isdocker);
		/*let start = DateTransform.nDayBeforeTime(new Date().getTime(), 10);
		let end = DateTransform.getZeroTime(new Date().getTime());*/
		setTitle('业绩报表');
		Log.log('citycode:', config.citycode, 'appVersion:', config.appVersion, 'isdocker:', isdocker);
		nConfig.sendNativeBtnConfig('注册统计', '/wap/graph/loginindex', {
			citycode: config.citycode,
			appversion: config.appVersion,
			isdocker: isdocker
		});
		// this.props.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
		this.props.fetchPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
	}
	render() {
		let {tabletype, tabtype, headers, totals, values, isdocker, pageindex, pagesize, queryStart, queryEnd, loadmore, scrollPos} = this.props;
		return ( < div>
             < header className="tc">
               < Tab tabtype={tabtype}
                     onChange={(tabtype) => {
                               	/*	let start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
                               		let end = new Date();*/
                               	this.props.changeTab(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
                               }}>
                 </Tab>
                   </header>
                     <Table hdopacity={false}
                             tabtype={tabtype}
                             tabletype={TABLE_PERFORM}
                             headers={headers}
                             totals={totals}
                             values={values}
                             querytype={QUERY_GLOBAL}
                             loadmore={loadmore}
                             scrollPos={scrollPos}
                             onScroll={(pos) => {
                                       	this.props.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, pos);
                                       }}>
                       </Table>
                         < p className="remark">
                           免责声明： 由于统计口径问题， 报表中的金额数据仅作参考， 不作为财务结算依据， 金额单位为万元。
                           </p>
                             </div> );
	}
}

const mapStateToProps = (state, ownProps) => {
	let {tabtype, tabletype, headers, totals, values, isdocker, pageindex, pagesize, queryStart, queryEnd, scrollPos} = state.stats;
	Log.log("state:", state);
	let loadmore = state.commons.loadmore;
	return {
		tabtype: tabtype,
		tabletype: tabletype,
		headers: headers,
		totals: totals,
		values: values,
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
		changeDocker(docker) {
			dispatch(changeDocker(docker));
		},
		changeTab(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore) {
			var android = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
			if (android) {
				nConfig.sendNativeBtnConfig('注册统计', '/wap/graph/loginindex', {
					citycode: config.citycode,
					appversion: config.appVersion,
					isdocker: isdocker
				});
			}
			this.fetchPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore);
		},
		fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, scrollPos) {
			dispatch(loadMore(true));
			dispatch(setScrollPos(scrollPos));
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_WEEK:
				this.fetchWeekPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_MONTH:
				this.fetchMonthPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			}
		},
		fetchPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
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
				// Log.log('TAB_WEEK:', queryStart, queryEnd);
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
				break;
			case TAB_MONTH:
				pageindex = 1;
				pagesize = 10;
				queryStart = DateTransform.nMonthBeforeTime(new Date().getTime(), pagesize);
				queryEnd = DateTransform.getDayEndTime(new Date().getTime());
				Log.log('TAB_MONTH:', queryStart, queryEnd);
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
				break;
			}
		},
		fetchDayPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
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
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestDayPerform(sendData, (res) => {
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res && res.ReportDtos) {
						dispatch(fetchTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
					}
				});
			});
		},
		fetchWeekPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
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
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestWeekPerform(sendData, (res) => {
					Log.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						dispatch(fetchWeekTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
					}
				});
			});
		},
		fetchMonthPerformData(tabletype, tabtype, queryStart, queryEnd, isdocker, pageindex, pagesize) {
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
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestMothPerform(sendData, (res) => {
					Log.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						dispatch(fetchMonthTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
					}
				});
			});
		}
	}
};

const StatsIndexContainer = connect(mapStateToProps, mapDispatchToProps)(StatsIndex);
module.exports = StatsIndexContainer;
