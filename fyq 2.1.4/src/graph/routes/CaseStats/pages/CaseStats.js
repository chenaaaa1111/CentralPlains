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
import Tab from './../../../components/Tab';
import Select from 'react-select';
import request from './../../../../commons/utils/ServerRequest';
import DateTransform from './../../../../commons/utils/DateTransform';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, resetData, setScrollPos, changeQueryTime, fetchEstateList, fetchTableData, changeEstate, fetchWeekTableData, fetchMonthTableData, fetchNextTableData } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, CHANGE_ESTATE, CASE_DEFAULT_PATH } from './../../../utils/Const.js';
import 'react-select/dist/react-select.css';
import Log from './../../../../commons/utils/Log';
require('./../../../../commons/less/more.less');
class CaseStats extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.showCurTime.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
        Log.log("nextProps:", nextProps);
        if (nextProps.parentPath != this.props.parentPath) {
            let {tabletype, tabtype, curEstateId} = this.props;
			let parentPath = nextProps.parentPath;
            let {queryStart, queryEnd} = nextProps;
            this.props.fetchCaseData(tabletype, tabtype, curEstateId, parentPath, queryStart, queryEnd, 1, 10);
		}
	}

	componentDidMount() {
        let {tabletype, tabtype, curEstateId, queryStart, queryEnd } = this.props;
        let parentPath = this.props.params.parentId;
		this.props.fetchCaseData(tabletype, tabtype, curEstateId, parentPath, queryStart, queryEnd, 1, 10);
        
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
		let {tabletype, tabtype, headers, totals, values, curEstateName, curEstateId, estateList, parentPath, queryStart, queryEnd, pageindex, pagesize, loadmore, hasmore, scrollPos} = this.props;
		return (<div>
            <header className="selectContainer tc">
              <Select className="selectExt"
                      name="form-field-name"
                      value={curEstateId}
                      clearable={false}
                      options={estateList}
                      searchable={false}
                      onChange={(option) => {
                                	curEstateId != option.value && this.props.changeEstate(tabletype, tabtype, option.value, parentPath, queryStart, queryEnd);
                                }} />
            </header>
            <header className="tc">
              <Switcher onNext={() => {
                                	this.props.next(tabletype, tabtype, curEstateId, parentPath, queryStart, queryEnd);
                                }}
                        onPrev={() => {
                                	this.props.prev(tabletype, tabtype, curEstateId, parentPath, queryStart, queryEnd);
                                }}
                        time={this.showCurTime(queryStart, queryEnd)}></Switcher>
            </header>
            <Table hdopacity={false}
                   tabtype={tabtype}
                   tabletype={TABLE_CASE}
                   headers={headers}
                   totals={totals}
                   values={values}
                   loadmore={loadmore}
                   scrollPos={scrollPos}
                   onScroll={(pos) => {
                             	hasmore && this.props.fetchMore(tabletype, tabtype, curEstateId, parentPath, queryStart, queryEnd, pageindex, pagesize, pos);
                             }}></Table>
            <p className="remark">
              免责声明：由于统计口径问题，报表中的金额数据仅作参考，不作为财务结算依据，金额单位为万元。
            </p>
          </div>);
	}
}

const mapStateToProps = (state, ownProps) => {
	Log.log("state:", state);
	let {tabtype, tabletype, headers, totals, values, curEstateId, curEstateName, estateList, queryStart, queryEnd, pageindex, pagesize, hasmore, scrollPos} = state.case;
	let loadmore = state.commons.loadmore;
	return {
		tabtype: tabtype,
		tabletype: tabletype,
		curEstateId: curEstateId,
		curEstateName: curEstateName,
		estateList: [...estateList],
		headers: headers,
		totals: totals,
		values: values,
		pageindex: pageindex,
		pagesize: pagesize,
		parentPath: ownProps.params.parentId || '',
		queryStart: queryStart,
		queryEnd: queryEnd,
		loadmore: loadmore,
		hasmore: hasmore,
		scrollPos: scrollPos
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeEstate(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize) {
			dispatch(changeEstate(estateId));
			this.fetchCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, 1, 10);
		},
		fetchMore(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize, scrollPos) {
			dispatch(loadMore(true));
			dispatch(setScrollPos(scrollPos));
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize);
				break;
			case TAB_WEEK:
				this.fetchWeekCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize);
				break;
			case TAB_MONTH:
				this.fetchMonthCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize);
				break;
			}
		},
		fetchCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize) {
            switch (tabtype) {
			case TAB_DAY:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			case TAB_WEEK:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			case TAB_MONTH:
				pageindex = 1;
				pagesize = 10;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			}
		},
		fetchDayCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId,
					ParentPath: parentPath === CASE_DEFAULT_PATH ? '' : parentPath,
					PageIndex: pageindex,
					PageSize: pagesize
				},
				vFlagMenu: !estateId
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestDayCase(sendData, (res) => {
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res) {
						if (res.EstateRules) {
							dispatch(fetchEstateList(res.EstateRules));
							dispatch(changeEstate(res.EstateRules[0].Key));
						}
						if (res.ReportDtos) {
							let len = res.ReportDtos.length - 1,
                                hasmore = len >= pagesize;
                                dispatch(fetchNextTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
						}
					}
				});
			});
		},
		fetchWeekCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId,
					ParentPath: parentPath === CASE_DEFAULT_PATH ? '' : parentPath,
					PageIndex: pageindex,
					PageSize: pagesize
				},
				vFlagMenu: !estateId
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestWeekCase(sendData, (res) => {
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
		fetchMonthCaseData(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 2,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId,
					ParentPath: parentPath === CASE_DEFAULT_PATH ? '' : parentPath,
					PageIndex: pageindex,
					PageSize: pagesize
				},
				vFlagMenu: !estateId
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestMothCase(sendData, (res) => {
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
		prev(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd) {
            switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.prevDay(queryStart, queryEnd);
				dispatch(changeQueryTime(timeObj.start, timeObj.end));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, timeObj.start, timeObj.end);
				break;
            case TAB_WEEK:
                let weekObj = DateTransform.prevWeek(queryStart, queryEnd);
                dispatch(changeQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, weekObj.weekStart, weekObj.weekEnd);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.prevMonth(queryStart, queryEnd);
				dispatch(changeQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, monthObj.monthStart, monthObj.monthEnd);
				break;
			}
		},
		next(tabletype, tabtype, estateId, parentPath, queryStart, queryEnd) {
			switch (tabtype) {
			case TAB_DAY:
				let timeObj = DateTransform.nextDay(queryStart, queryEnd);
				dispatch(changeQueryTime(timeObj.start, timeObj.end));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, timeObj.start, timeObj.end);
				break;
			case TAB_WEEK:
				let weekObj = DateTransform.nextWeek(queryStart, queryEnd);
				dispatch(changeQueryTime(weekObj.weekStart, weekObj.weekEnd));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, weekObj.weekStart, weekObj.weekEnd);
				break;
			case TAB_MONTH:
				let monthObj = DateTransform.nextMonth(queryStart, queryEnd);
				dispatch(changeQueryTime(monthObj.monthStart, monthObj.monthEnd));
				this.fetchCaseData(tabletype, tabtype, estateId, parentPath, monthObj.monthStart, monthObj.monthEnd);
				break;
			}
        },
        changeLoad(load){
            dispatch(loading(load));
        }
	}
};

const CaseStatsContainer = connect(mapStateToProps, mapDispatchToProps)(CaseStats);
module.exports = CaseStatsContainer;
