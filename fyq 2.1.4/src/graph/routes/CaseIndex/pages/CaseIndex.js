/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './../../../components/Table';
import Tab from './../../../components/Tab';
import Select from 'react-select';
import DateTransform from './../../../../commons/utils/DateTransform';
import request from './../../../../commons/utils/ServerRequest';
import { setTitle } from './../../../../commons/utils/Common.js';
import { loading, loadMore } from './../../../Actions.js';
import { changeTab, changeHouse, changeQueryType, setScrollPos, fetchMore, resetData, changePageIndex, fetchEstateList, fetchNextTableData, fetchTableData, changeEstate, fetchWeekTableData, fetchMonthTableData, changePath, changeQueryTime } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, QUERY_GLOBAL, QUERY_DEPARTMENT, QUERY_AGENT } from './../../../utils/Const.js';
import 'react-select/dist/react-select.css';
import Log from './../../../../commons/utils/Log';
require('./../../../../commons/less/more.less');
class CaseIndex extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		let {tabletype, tabtype, curEstateId, pageindex, pagesize, queryStart, queryEnd} = this.props;
		setTitle('案场报表');
		this.props.fetchCaseData(tabletype, tabtype, curEstateId, queryStart, queryEnd);
        
    }

	render() {
		let {tabletype, tabtype, headers, totals, values, curEstateName, curEstateId, queryStart, queryEnd, estateList, pageindex, pagesize, loadmore, scrollPos} = this.props;
		return (<div>
            <header className="selectContainer tc">
              <Select className="selectExt"
                      name="form-field-name"
                      value={curEstateId}
                      options={estateList}
                      clearable={false}
                      searchable={false}
                      onChange={(option) => {
                                	curEstateId != option.value && this.props.changeEstate(tabletype, tabtype, option.value, queryStart, queryEnd, pageindex, pagesize);
                                }} />
            </header>
            <header className="tc">
              <Tab tabtype={tabtype}
                   onChange={(tabtype) => {
                             	this.props.changeEstate(tabletype, tabtype, curEstateId, queryStart, queryEnd, pageindex, pagesize);
                             }}></Tab>
            </header>
            <Table hdopacity={false}
                   tabtype={tabtype}
                   tabletype={TABLE_CASE}
                   headers={headers}
                   totals={totals}
                   values={values}
                   querytype={QUERY_GLOBAL}
                   loadmore={loadmore}
                   scrollPos={scrollPos}
                   onScroll={(pos) => {
                             	this.props.fetchMore(tabletype, tabtype, curEstateId, queryStart, queryEnd, pageindex, pagesize, pos);
                             }}></Table>
            <p className="remark">
              免责声明：由于统计口径问题，报表中的金额数据仅作参考，不作为财务结算依据，金额单位为万元。
            </p>
          </div>);
	}
}

const mapStateToProps = (state, ownProps) => {
	Log.log("state:", state);
	let {tabtype, tabletype, headers, totals, values, curEstateId, curEstateName, estateList, pageindex, pagesize, queryStart, queryEnd, scrollPos} = state.case;
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
		queryStart: queryStart,
		queryEnd: queryEnd,
		loadmore: loadmore,
		scrollPos: scrollPos
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeEstate(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize) {
			dispatch(changeEstate(estateId));
			this.fetchCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize);
		},
		fetchMore(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize, scrollPos) {
			dispatch(loadMore(true));
			dispatch(setScrollPos(scrollPos));
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize);
				break;
			case TAB_WEEK:
				this.fetchWeekCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize);
				break;
			case TAB_MONTH:
				this.fetchMonthCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize);
				break;
			}
		},
		fetchCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize) {
			dispatch(changeTab(tabtype));
			dispatch(changeQueryType(QUERY_GLOBAL));
			switch (tabtype) {
			case TAB_DAY:
				pageindex = 1;
				pagesize = 10;
				queryEnd = DateTransform.getDayEndTime(new Date().getTime());
				queryStart = DateTransform.nDayBeforeTime(queryEnd, pagesize) + 1;
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			case TAB_WEEK:
				pageindex = 1;
				pagesize = 10;
				queryStart = DateTransform.nWeekBeforeTime(new Date().getTime(), pagesize);
				queryEnd = DateTransform.getDayEndTime(new Date().getTime());
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			case TAB_MONTH:
				pageindex = 1;
				pagesize = 10;
				queryStart = DateTransform.nMonthBeforeTime(new Date().getTime(), pagesize);
				queryEnd = DateTransform.getDayEndTime(new Date().getTime());
				dispatch(resetData(tabletype, queryStart, queryEnd, pageindex, pagesize));
				this.fetchMore(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize, 0);
				break;
			}
		},
		fetchDayCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: QUERY_GLOBAL,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId
				},
				vFlagMenu: !estateId
			};
			dispatch((dispatch) => {
				dispatch(loading(true));
				request.requestDayCase(sendData, (res) => {
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res) {
						if (res.EstateRules) {
							dispatch(fetchEstateList(res.EstateRules));
							dispatch(changeEstate(res.EstateRules[0].Key));
						}
						if (res.ReportDtos) {
							dispatch(fetchTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
						}
					}
				});
			});
		},
		fetchWeekCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: QUERY_GLOBAL,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId
				},
				vFlagMenu: !estateId
			};
			dispatch((dispatch) => {
				dispatch(loading(true));
				request.requestWeekCase(sendData, (res) => {
					Log.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						dispatch(fetchWeekTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize));
					}
				});
			});
		},
		fetchMonthCaseData(tabletype, tabtype, estateId, queryStart, queryEnd, pageindex, pagesize) {
			Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd), 'startTime:', DateTransform.timeToString(queryStart), 'endTime:', DateTransform.timeToString(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: QUERY_GLOBAL,
					NeedSum: 1,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					EstateRID: estateId
				},
				vFlagMenu: !estateId
			};
			dispatch((dispatch) => {
				dispatch(loading(true));
				request.requestMothCase(sendData, (res) => {
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

const CaseIndexContainer = connect(mapStateToProps, mapDispatchToProps)(CaseIndex);
module.exports = CaseIndexContainer;
