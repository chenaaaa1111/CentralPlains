/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactIScroll from 'react-iscroll';
import DateTransform from './../../../../commons/utils/DateTransform';
import request from './../../../../commons/utils/ServerRequest';
import { loading, loadMore } from './../../../Actions.js';
import { fetchTableData, resetAgentData, fetchWeekTableData, fetchMonthTableData, fetchAgentTableData } from './Actions';
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, TAB_DAY, TAB_WEEK, TAB_MONTH, CHANGE_ESTATE } from './../../../utils/Const.js';
import Log from './../../../../commons/utils/Log';
var iScroll = require('iscroll/build/iscroll-probe');
const TableCell = (props) => <div className="col10 s2">
                               {props.label}
                             </div>;
const TableRow = (props) => <li className={props.odd ? "row lir bgff" : "row lir"}>
                              <TableCell label={props.name}></TableCell>
                              <TableCell label={props.telephone || '暂无'}></TableCell>
                              <TableCell label={props.department}></TableCell>
                              <TableCell label={props.job}></TableCell>
                              <TableCell label={props.status}></TableCell>
                            </li>;

class Agent extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.options = {
			mouseWheel: true,
			//eventPassthrough: true,
			probeType: 2,
			freeScroll: true,
		};
		this.containerId = 'scrollContainer';
	}

	componentDidMount() {
		let {tabletype, tabtype, queryStart, queryEnd, parentPath, isdocker, pageindex, pagesize} = this.props;
		Log.log('queryStart:', queryStart, 'queryEnd:', queryEnd);
		this.props.fetchAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
		let id = this.containerId;
		document.getElementById(id).addEventListener("touchmove", (e) => {
			e.preventDefault();
		}, false);
	}

	onRefresh() {
		Log.log("refresh");
	}

	onScroll() {
		//Log.log('onScroll', this.refs['iScroll']);
		let {tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize, loadmore, hasmore} = this.props;
		let iscroll = this.refs['iScroll'],
			scrollInstance = iscroll._iScrollInstance;
		if (scrollInstance.y <= scrollInstance.maxScrollY && !loadmore && hasmore) {
			this.props.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
		}
	}

	render() {
		let data = this.props.agents;
		return <div className="agentWrapper">
           <header className="agentHeader">
             <div className="row lir">
               <TableCell label="姓名"></TableCell>
               <TableCell label="手机号"></TableCell>
               <TableCell label="部门"></TableCell>
               <TableCell label="职位"></TableCell>
               <TableCell label="类别"></TableCell>
             </div>
           </header>
           <section className="agentList"
                    id={this.containerId}>
             <ReactIScroll ref="iScroll"
                           iScroll={iScroll}
                           options={this.options}
                           onScroll={this.onScroll.bind(this)}
                           onRefresh={this.onRefresh.bind(this)}>
               <ul>
                 {data.map((item, index) => {
                  	return <TableRow key={index}
                                    odd={!(index % 2)}
                                    name={item.EmpName}
                                    telephone={item.Mobile}
                                    department={item.DepartmentName}
                                    job={item.RoleName}
                                    status={item.LeaveStatus}></TableRow>;
                  })}
               </ul>
             </ReactIScroll>
           </section>
         </div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	//Log.log("state:", state);
	let {tabtype, tabletype, headers, totals, values, queryStart, queryEnd, agents, path, isdocker, hasmore, pageindex, agentPageSize} = state.login;
	let loadmore = state.commons.loadmore;
	return {
		tabtype: tabtype,
		tabletype: tabletype,
		headers: headers,
		totals: totals,
		values: values,
		parentPath: path,
		queryStart: queryStart,
		queryEnd: queryEnd,
		agents: agents,
		loadmore: loadmore,
		hasmore: hasmore,
		isdocker: isdocker,
		pageindex: pageindex,
		pagesize: agentPageSize
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			dispatch(loadMore(true));
			//Log.log('queryStart:', DateTransform.timeToMothAndDate(queryStart), 'queryEnd:', DateTransform.timeToMothAndDate(queryEnd));
			switch (tabtype) {
			case TAB_DAY:
				this.fetchDayAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_WEEK:
				this.fetchWeekAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			case TAB_MONTH:
				this.fetchMonthAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize);
				break;
			}
		},
		fetchAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, agentPageSize) {
			pageindex = 1;
			agentPageSize = 20;
			dispatch(resetAgentData(tabletype, queryStart, queryEnd, pageindex, agentPageSize));
			this.fetchMore(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, agentPageSize);
		},
		fetchDayAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			//Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), new Date(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd), new Date(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 3,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					ParentPath: parentPath,
					IsDocker: false,
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
						let len = res.ReportDtos.length,
							hasmore = len >= pagesize;
						dispatch(fetchAgentTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		fetchWeekAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			//Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 3,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					IsDocker: isdocker,
					ParentPath: parentPath,
					PageIndex: pageindex,
					PageSize: pagesize
				}
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestWeekRegister(sendData, (res) => {
					//Log.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						let len = res.ReportDtos.length,
							hasmore = len >= pagesize;
						dispatch(fetchAgentTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		},
		fetchMonthAgentData(tabletype, tabtype, parentPath, queryStart, queryEnd, isdocker, pageindex, pagesize) {
			//Log.log('beginTime:', DateTransform.timeToMothAndDate(queryStart), 'endTime:', DateTransform.timeToMothAndDate(queryEnd));
			let sendData = {
				vJsonData: {
					Etype: 3,
					BeginDate: DateTransform.GMTToLocale(queryStart),
					EndDate: DateTransform.GMTToLocale(queryEnd),
					NeedPage: 1,
					IsDocker: isdocker,
					ParentPath: parentPath,
					PageIndex: pageindex,
					PageSize: pagesize
				}
			};
			dispatch(loading(true));
			dispatch((dispatch) => {
				request.requestMothRegister(sendData, (res) => {
					Log.log("res:", res);
					dispatch(loading(false));
					dispatch(loadMore(false));
					if (res.ReportDtos) {
						let len = res.ReportDtos.length,
							hasmore = len >= pagesize;
						dispatch(fetchAgentTableData(tabletype, queryStart, queryEnd, res.ReportDtos, pageindex, pagesize, hasmore));
					}
				});
			});
		}
	}
};

const AgentContainer = connect(mapStateToProps, mapDispatchToProps)(Agent);
module.exports = AgentContainer;
