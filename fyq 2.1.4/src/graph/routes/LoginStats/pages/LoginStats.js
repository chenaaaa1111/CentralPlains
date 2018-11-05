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
import DateTransform from './../../../../commons/utils/DateTransform';
import { setTitle } from './../../../../commons/utils/Common.js';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, resetData, setScrollPos, changeLoginQueryTime, changeLoginPath, fetchTableData, fetchWeekTableData, fetchMonthTableData, fetchNextTableData } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, DOCKER_DEFAULT_PATH } from './../../../utils/Const.js';
import Log from './../../../../commons/utils/Log';
require('./../../../../commons/less/more.less');
class LoginStats extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.showCurTime.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		Log.log("nextProps:", nextProps);
		if (nextProps.parentPath != this.props.parentPath) {
			let {tabletype, tabtype, isdocker} = this.props;
			let parentPath = nextProps.parentPath;
			let title = nextProps.title;
			let {queryStart, queryEnd} = nextProps;
			this.props.changeTitle(parentPath, '');
			this.props.fetchLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, 1, 10);
		}
	}

	componentDidMount() {
		let {tabletype, tabtype, queryStart, queryEnd, isdocker} = this.props;
		let parentPath = this.props.params.parentId;
		this.props.fetchLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, 1, 10);
	}

	showCurTime() {
		let {queryStart, queryEnd, tabtype} = this.props;
		Log.log('queryStartqueryStart:', queryStart);
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
		let {tabletype, tabtype, headers, totals, values, parentPath, queryStart, queryEnd, isdocker, title, pageindex, pagesize, loadmore, hasmore, scrollPos} = this.props;
		setTitle(title || '注册用户统计');
		Log.log('title:', title);
		return (<div>
            <header className="tc">
              <Switcher onNext={() => {
                                	this.props.next(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker);
                                }}
                        onPrev={() => {
                                	this.props.prev(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker);
                                }}
                        time={this.showCurTime(queryStart, queryEnd)}></Switcher>
            </header>
            <Table hdopacity={false}
                   tabtype={tabtype}
                   tabletype={TABLE_REGISTER}
                   headers={headers}
                   totals={totals}
                   values={values}
                   loadmore={loadmore}
                   scrollPos={scrollPos}
                   onScroll={(pos) => {
                             	hasmore && this.props.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, pos);
                             }}></Table>
          </div>);
	}
}

const mapStateToProps = (state, ownProps) => {
	Log.log("state:", state);
	let {tabtype, tabletype, headers, totals, values, queryStart, queryEnd, isdocker, title, pageindex, pagesize, hasmore, scrollPos} = state.login;
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
		time: '',
		isdocker: isdocker,
		title: title,
		pageindex: pageindex,
		pagesize: pagesize,
		loadmore: loadmore,
		hasmore: hasmore,
		scrollPos: scrollPos
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeTitle(path, regionName) {
			dispatch(changeLoginPath(path, regionName));
		},
		fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, scrollPos) {
			dispatch(loadMore(true));
			dispatch(setScrollPos(scrollPos));
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_WEEK:
				this.fetchWeekLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_MONTH:
				this.fetchMonthLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			}
		},
		fetchLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			switch (tabtype) {
			case TAB_DAY:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
				break;
			case TAB_WEEK:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
				break;
			case TAB_MONTH:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, 0);
				break;
			}
		},
		fetchDayLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), queryStart, new Date(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd), queryEnd, new Date(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
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
				request.requestDayRegister(sendData, (res) => {
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
		fetchWeekLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
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
				request.requestWeekRegister(sendData, (res) => {
					Log.log("res:", res);
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
		fetchMonthLoginData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
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
			dispatch(loadMore(false));
			dispatch((dispatch) => {
				request.requestMothRegister(sendData, (res) => {
					Log.log("res:", res);
					dispatch(loading(false));
					if (res.ReportDtos) {
						let len = res.ReportDtos.length - 1,
							hasmore = len >= pagesize;
						dispatch(fetchNextTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		prev(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker) {
			switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.prevDay(queryStart, queryEnd);
				Log.log("timeObj:", queryStart, queryEnd, DateTransform.timeToMothAndDate(queryStart), DateTransform.timeToMothAndDate(queryEnd));
				Log.log("timeObj:", timeObj.start, timeObj.end, DateTransform.timeToMothAndDate(timeObj.start), DateTransform.timeToMothAndDate(timeObj.end));
				dispatch(changeLoginQueryTime(timeObj.start, timeObj.end));
				this.fetchLoginData(tabletype, tabtype, parentPath, timeObj.start, timeObj.end, isdocker);
				break;
			case TAB_WEEK:
				let weekObj = DateTransform.prevWeek(queryStart, queryEnd);
				Log.log("weekObj:", weekObj);
				dispatch(changeLoginQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchLoginData(tabletype, tabtype, parentPath, weekObj.weekStart, weekObj.weekEnd, isdocker);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.prevMonth(queryStart, queryEnd);
				Log.log("monthObj:", monthObj);
				dispatch(changeLoginQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchLoginData(tabletype, tabtype, parentPath, monthObj.monthStart, monthObj.monthEnd, isdocker);
				break;
			}
		},
		next(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker) {
			switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.nextDay(queryStart, queryEnd);
				Log.log("timeObj:", timeObj);
				dispatch(changeLoginQueryTime(timeObj.start, timeObj.end));
				this.fetchLoginData(tabletype, tabtype, parentPath, timeObj.start, timeObj.end, isdocker);
				break;
			case TAB_WEEK:
				let weekObj = DateTransform.nextWeek(queryStart, queryEnd);
				Log.log("weekObj:", weekObj);
				dispatch(changeLoginQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchLoginData(tabletype, tabtype, parentPath, weekObj.weekStart, weekObj.weekEnd, isdocker);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.nextMonth(queryStart, queryEnd);
				Log.log("monthObj:", monthObj);
				dispatch(changeLoginQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchLoginData(tabletype, tabtype, parentPath, monthObj.monthStart, monthObj.monthEnd, isdocker);
				break;
			}
		}
	}
};

const LoginStatsContainer = connect(mapStateToProps, mapDispatchToProps)(LoginStats);
module.exports = LoginStatsContainer;
