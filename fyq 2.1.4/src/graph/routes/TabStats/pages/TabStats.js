/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Switcher from './../../../components/Switcher';
import Table from './../../../components/Table';
import request from './../../../../commons/utils/ServerRequest';
import { query } from './../../../../commons/utils/Common.js';
import DateTransform from './../../../../commons/utils/DateTransform';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, resetData, setScrollPos, changePerformQueryTime, fetchTableData, fetchWeekTableData, fetchMonthTableData, fetchNextTableData } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, QUERY_DEPARTMENT, DOCKER_DEFAULT_PATH } from './../../../utils/Const.js';
import Log from './../../../../commons/utils/Log'
require('./../../../../commons/less/more.less');
class TabStats extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.showCurTime.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		console.log("nextProps:", nextProps, nextState);
		if (nextProps.parentPath != this.props.parentPath) {
			let {tabletype, tabtype, isdocker} = this.props;
			let parentPath = nextProps.parentPath;
			let {queryStart, queryEnd, queryType} = nextProps;
			this.props.fetchPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, 1, 10, queryType);
		}
	}

	componentDidMount() {
		let {tabletype, tabtype, queryStart, queryEnd, isdocker, queryType} = this.props;
		let parentPath = this.props.params.parentId;
		this.props.fetchPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, 1, 10, queryType);
	}

	showCurTime() {
		let {queryStart, queryEnd, tabtype} = this.props;
		switch (tabtype) {
		case TAB_DAY:
			return DateTransform.timeToMothAndDate(queryStart);
		case TAB_WEEK:
			return DateTransform.getWeekTime(queryStart, queryEnd);
		case TAB_MONTH:
			return DateTransform.timeToYearAndMonth(queryStart);
		}
	}

	render() {
		let {tabletype, tabtype, headers, totals, values, parentPath, queryStart, queryEnd, isdocker, queryType, pageindex, pagesize, loadmore, hasmore, scrollPos} = this.props;
		return (<div>
            <header className="tc">
              <Switcher onNext={() => {
                                	this.props.next(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, queryType);
                                }}
                        onPrev={() => {
                                	this.props.prev(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, queryType);
                                }}
                        time={this.showCurTime(queryStart, queryEnd)}></Switcher>
            </header>
            <Table hdopacity={false}
                   tabtype={tabtype}
                   tabletype={TABLE_PERFORM}
                   headers={headers}
                   totals={totals}
                   values={values}
                   querytype={queryType}
                   loadmore={loadmore}
                   scrollPos={scrollPos}
                   onScroll={(pos) => {
                             	hasmore && this.props.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType, pos);
                             }}></Table>
            <p className="remark">
              免责声明：由于统计口径问题，报表中的金额数据仅作参考，不作为财务结算依据，金额单位为万元。
            </p>
          </div>);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log("state:", state);
	let {tabtype, tabletype, headers, totals, values, queryStart, queryEnd, isdocker, pageindex, pagesize, hasmore, scrollPos} = state.stats;
	let type = parseInt(query('type')) || QUERY_DEPARTMENT;
	let loadmore = state.commons.loadmore;
	return {
		tabtype: tabtype,
		tabletype: tabletype,
		headers: headers,
		totals: totals,
		values: values,
		parentPath: ownProps.params.parentId || '',
		queryStart: queryStart,
		queryEnd: queryEnd,
		isdocker: isdocker,
		queryType: type,
		pageindex: pageindex,
		pagesize: pagesize,
		loadmore: loadmore,
		hasmore: hasmore,
		scrollPos: scrollPos
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType, scrollPos) {
			dispatch(loadMore(true));
			dispatch(setScrollPos(scrollPos));
			console.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType);
				break;
			case TAB_WEEK:
				this.fetchWeekPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType);
				break;
			case TAB_MONTH:
				this.fetchMonthPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType);
				break;
			}
		},
		fetchPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType) {
			switch (tabtype) {
			case TAB_DAY:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType, 0);
				break;
			case TAB_WEEK:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType);
				break;
			case TAB_MONTH:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType, 0);
				break;
			}
		},
		fetchDayPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType) {
			console.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), new Date(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd), new Date(queryEnd));
			let etype = queryType ? queryType : 2;
			let sendData = {
				vJsonData: {
					Etype: etype,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					ParentPath: isdocker && parentPath === DOCKER_DEFAULT_PATH ? '' : parentPath,
					IsDocker: isdocker,
					PageIndex: pageindex,
					PageSize: pagesize
				}
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestDayPerform(sendData, (res) => {
					console.log('res:', res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res && res.ReportDtos) {
						let len = res.ReportDtos.length - 1,
							hasmore = len >= pagesize;
						dispatch(fetchNextTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		fetchWeekPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType) {
			console.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let etype = queryType ? queryType : 2;
			let sendData = {
				vJsonData: {
					Etype: etype,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					ParentPath: isdocker && parentPath === DOCKER_DEFAULT_PATH ? '' : parentPath,
					IsDocker: isdocker,
					PageIndex: pageindex,
					PageSize: pagesize
				}
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestWeekPerform(sendData, (res) => {
					console.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						let len = res.ReportDtos.length - 1,
							hasmore = len >= pagesize;
						dispatch(fetchNextTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		fetchMonthPerformData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, queryType) {
			console.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let etype = queryType ? queryType : 2;
			let sendData = {
				vJsonData: {
					Etype: etype,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					ParentPath: isdocker && parentPath === DOCKER_DEFAULT_PATH ? '' : parentPath,
					IsDocker: isdocker,
					PageIndex: pageindex,
					PageSize: pagesize
				}
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestMothPerform(sendData, (res) => {
					console.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						let len = res.ReportDtos.length - 1,
							hasmore = len >= pagesize;
						dispatch(fetchNextTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		prev(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, queryType) {
			switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.prevDay(queryStart, queryEnd);
				dispatch(changePerformQueryTime(timeObj.start, timeObj.end));
				this.fetchPerformData(tabletype, tabtype, parentPath, timeObj.start, timeObj.end, isdocker, 1, 10, queryType);
				break;
			case TAB_WEEK:
				let weekObj = DateTransform.prevWeek(queryStart, queryEnd);
				dispatch(changePerformQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchPerformData(tabletype, tabtype, parentPath, weekObj.weekStart, weekObj.weekEnd, isdocker, 1, 10, queryType);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.prevMonth(queryStart, queryEnd);
				dispatch(changePerformQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchPerformData(tabletype, tabtype, parentPath, monthObj.monthStart, monthObj.monthEnd, isdocker, 1, 10, queryType);
				break;
			}
		},
		next(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, queryType) {
			switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.nextDay(queryStart, queryEnd);
				dispatch(changePerformQueryTime(timeObj.start, timeObj.end));
				this.fetchPerformData(tabletype, tabtype, parentPath, timeObj.start, timeObj.end, isdocker, 1, 10, queryType);
				break;
			case TAB_WEEK:
				let weekObj = DateTransform.nextWeek(queryStart, queryEnd);
				dispatch(changePerformQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchPerformData(tabletype, tabtype, parentPath, weekObj.weekStart, weekObj.weekEnd, isdocker, 1, 10, queryType);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.nextMonth(queryStart, queryEnd);
				dispatch(changePerformQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchPerformData(tabletype, tabtype, parentPath, monthObj.monthStart, monthObj.monthEnd, isdocker, 1, 10, queryType);
				break;
			}
		}
	}
};

const TabStatsContainer = connect(mapStateToProps, mapDispatchToProps)(TabStats);
module.exports = TabStatsContainer;
