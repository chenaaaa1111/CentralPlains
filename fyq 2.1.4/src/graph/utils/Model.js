/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-13 15:32:42
 * @version $Id$
 */
import { TABLE_CASE, TABLE_PERFORM, TABLE_REGISTER, HEADER, STAT_CUSTOMER, STAT_SHARE, STAT_APPOINTMENT, STAT_CURREPORT, STAT_HOUSEREPORT, STAT_VALIDVISIT, STAT_SURESALE, STAT_SUREMONEY, STAT_SIGN, STAT_SIGNMONEY, ASC_LOGIN, ASC_FROZEN, CASE_CUSTOMER, CASE_VALIDCUSTOMER, CASE_VALIDVISIT, CASE_SURESALE, CASE_SUREMONEY, CASE_SIGN, CASE_SIGNMONEY } from './Const';
import { caseData, loginData, performData } from './data.js';
import DateTransform from './../../commons/utils/DateTransform';
import Log from './../../commons/utils/Log.js';
class Model {
	constructor() {
		this.type = 0;
		this.estateList = [];
		this.loginTitles = [];
	}
	pushTitleObj(obj) {
		let {path} = obj;
		if (!this.loginTitles) {
			return;
		}
		let matchTitle = this.loginTitles.filter((item, index) => {
			return item.path === path;
		});
		if (matchTitle && matchTitle[0]) {
			return;
		} else {
			this.loginTitles.push(obj);
		}
	}
	getCurrentTitle(path) {
		if (!this.loginTitles) {
			return;
		}
		let matchTitle = this.loginTitles.filter((item, index) => {
			return item.path === path;
		});
		if (matchTitle && matchTitle[0]) {
			return matchTitle[0];
		} else {
			return;
		}
	}
	setType(type) {
		this.type = type;
		switch (type) {
		case TABLE_CASE:
			this.data = this.getInitData(caseData);
			break;
		case TABLE_PERFORM:
			this.data = this.getInitData(performData);
			break;
		case TABLE_REGISTER:
			this.data = this.getInitData(loginData);
			break;
		}
		Log.log('setType', this.data);
	}
	getInitData(data) {
		return data.map((item, index) => {
			return Object.assign({}, item, {
				datalist: [...item.datalist]
			});
		});
	}
	getMonthList(start, end) {
		let max = {
			year: new Date(end).getFullYear(),
			month: new Date(end).getMonth() + 1
		};
		let min = {
			year: new Date(start).getFullYear(),
			month: new Date(start).getMonth() + 1
		};
		Log.log("min:", min);
		let months = DateTransform.getMonths(min, max);
		Log.log("months:", months);
		return months.map((item, index) => {
			return {
				"IsHaveNext": null,
				"DeptCompanyPath": "",
				"Path": "",
				"DepartmentName": "",
				"FullName": "",
				"EmpId": "",
				"EmpName": "",
				"QYear": item.year,
				"QMonth": item.month,
			};
		});
	}
	fillMonthDataList(start, end, datalist) {
		let initData = this.getMonthList(start, end);
		//Log.log("initData:");
		if (!initData || !datalist) {
			return;
		}
		//Log.log("initData:", initData);
		var totalIndex;
		let totalObj = datalist.filter((item, index) => {
			if (item.QYear === 1999) {
				totalIndex = index;
				return true;
			} else {
				return false;
			}
		});
		if (totalIndex !== undefined) {
			datalist.splice(totalIndex, 1);
		}
		let dataMap = initData.map((item, index) => {
			let year = item.QYear;
			let month = item.QMonth;
			let matchObj = datalist.filter((dataItem, dataIndex) => {
				//Log.log("@@@@@@@", DateTransform.timeToMothAndDate(weekStart), DateTransform.timeToMothAndDate(weekEnd), DateTransform.timeToMothAndDate(dataItem.QWeekStar), DateTransform.timeToMothAndDate(dataItem.QWeekEnd));
				return dataItem.QYear === year && dataItem.QMonth === month;
			});
			if (matchObj && matchObj[0]) {
				return Object.assign({}, item, matchObj[0]);
			} else {
				return item;
			}
		});
		if (totalObj && totalObj[0]) {
			dataMap.unshift(totalObj[0]);
		}
		// Log.log("dataMap:", dataMap);
		return dataMap;
	}
	getWeekList(start, end) {
		let weeks = DateTransform.getWeeks(start, end);
		Log.log('weeks:', weeks);
		return weeks.map((item, index) => {
			Log.log(DateTransform.timeToMothAndDate(item.QWeekStar), DateTransform.timeToMothAndDate(item.QWeekEnd));
			return {
				"IsHaveNext": null,
				"DeptCompanyPath": "",
				"Path": "",
				"DepartmentName": "",
				"FullName": "",
				"EmpId": "",
				"EmpName": "",
				"QYear": 0,
				"QWeek": 0,
				"QWeekStar": item.QWeekStar,
				"QWeekEnd": item.QWeekEnd,
			};
		});
	}
	fillWeekDataList(start, end, datalist) {
		let initData = this.getWeekList(start, end, datalist);
		if (!initData || !datalist) {
			return;
		}
		//Log.log('initData:', initData);
		var totalIndex;
		let totalObj = datalist.filter((item, index) => {
			let year = new Date(item.QueryDate).getFullYear();
			if (item.QYear === 1999) {
				totalIndex = index;
				return true;
			} else {
				return false;
			}
		});
		if (totalIndex !== undefined) {
			datalist.splice(totalIndex, 1);
		}
		//Log.log("dataMap");
		let dataMap = initData.map((item, index) => {
			let weekStart = item.QWeekStar;
			let weekEnd = item.QWeekEnd;
			let matchObj = datalist.filter((dataItem, dataIndex) => {
				//Log.log("@@@@@@@", DateTransform.timeToMothAndDate(weekStart), DateTransform.timeToMothAndDate(weekEnd), DateTransform.timeToMothAndDate(dataItem.QWeekStar), DateTransform.timeToMothAndDate(dataItem.QWeekEnd));
				return dataItem.QWeekStar >= weekStart && dataItem.QWeekEnd < weekEnd;
			});
			if (matchObj && matchObj[0]) {
				return Object.assign({}, item, matchObj[0]);
			} else {
				return item;
			}
		});
		Log.log("dataMap");
		if (totalObj && totalObj[0]) {
			dataMap.unshift(totalObj[0]);
		}
		Log.log("dataMap:", dataMap);
		return dataMap;
	}
	getDayToDayList(start, end) {
		let startTime = new Date(start).getTime();
		let endTime = new Date(end).getTime();
		let times = DateTransform.generateDTDTime(endTime, startTime);
		// Log.log("times@@@", times);
		return times.map((item, index) => {
			return {
				"IsHaveNext": null,
				"DeptCompanyPath": "",
				"Path": "",
				"DepartmentName": "",
				"FullName": "",
				"EmpId": "",
				"EmpName": "",
				"QueryDate": item,
			};
		});
	}
	fillDataList(start, end, datalist) {
		let initData = this.getDayToDayList(start, end);
		//Log.log("initData:", initData);
		if (!initData || !datalist) {
			return;
		}
		let retData = [];
		var totalIndex;
		let totalObj = datalist.filter((item, index) => {
			let year = new Date(item.QueryDate).getFullYear();
			if (year === 1999) {
				totalIndex = index;
				return true;
			} else {
				return false;
			}
		});
		if (totalIndex !== undefined) {
			datalist.splice(totalIndex, 1);
		}
		let dataMap = initData.map((item, index) => {
			let itemDate = item.QueryDate;
			let itemYear = new Date(itemDate).getFullYear();
			let itemMonth = new Date(itemDate).getMonth();
			let itemDay = new Date(itemDate).getDate();
			let itemDayTime = new Date(itemYear, itemMonth, itemDay).getTime();
			let itemNextDayTime = itemDayTime + 24 * 60 * 60 * 1000;
			let matchObj = datalist.filter((dataItem, dataIndex) => {
				//Log.log("dataItem:", DateTransform.timeToMothAndDate(dataItem.QueryDate), dataItem.QueryDate, DateTransform.timeToMothAndDate(itemDayTime), itemDayTime, DateTransform.timeToMothAndDate(itemNextDayTime), itemNextDayTime);
				return dataItem.QueryDate >= itemDayTime && dataItem.QueryDate < itemNextDayTime;
			});
			if (matchObj && matchObj[0]) {
				return Object.assign({}, item, matchObj[0]);
			} else {
				return item;
			}
		});
		if (totalObj && totalObj[0]) {
			dataMap.unshift(totalObj[0]);
		}
		// Log.log("dataMap:", dataMap);
		return dataMap;
	}

	getAgentList(list) {
		if (!list) {
			return;
		}
		return list.map((item, index) => {
			return item;
		});
	}

	getEstateList(list) {
		if (!list) {
			return;
		}
		this.estateList = list.map((item, index) => {
			let option = {
				label: item.Value,
				value: item.Key,
				clearableValue: false
			};
			return option;
		});
		return this.estateList;
	}
	idGetEstate(id) {
		if (!this.estateList) {
			return;
		}
		let matchEstate = this.estateList.filter((item, index) => {
			return item.value === id;
		});
		if (matchEstate && matchEstate[0]) {
			return matchEstate[0];
		}
	}
	setData(type, list) {
		this.setType(type);
		if (!list) {
			return;
		}
		// Log.log("setData:list", list, type);
		var totalIndex;
		let totalObj = list.filter((item, index) => {
			let year = item.QueryDate ? new Date(item.QueryDate).getFullYear() : item.QYear;
			if (year === 1999) {
				totalIndex = index;
				return true;
			} else {
				return false;
			}
		});
		// Log.log("setData:totalObj", totalObj, typeof list);
		if (totalIndex !== undefined) {
			// Log.log("aaaaaa");
			list.splice(totalIndex, 1);
		}
		// Log.log("setData:list", list);
		this.data.forEach((item, index) => {
			//Log.log('setData:item:', item, ',totalObj:', totalObj);
			if (totalObj && totalObj[0]) {
				//Log.log(this.getTotalCellData(type, item.id, totalObj[0]));
				item.total = this.getTotalCellData(type, item.id, totalObj[0]);
			}
			item.datalist = this.getRowData(type, item.id, list);
		});
	// Log.log("setData:this.data", this.data);
	}

	addMoreData(type, list) {
		Log.log('list:', list);
		if (!list) {
			return;
		}
		if (!this.data) {
			this.setType(type);
		}
		var totalIndex;
		let totalObj = list.filter((item, index) => {
			let year = item.QueryDate ? new Date(item.QueryDate).getFullYear() : item.QYear;
			if (year === 1999) {
				totalIndex = index;
				return true;
			} else {
				return false;
			}
		});
		// Log.log("setData:totalObj", totalObj, typeof list);
		if (totalIndex !== undefined) {
			// Log.log("aaaaaa");
			list.splice(totalIndex, 1);
		}
		this.data.forEach((item, index) => {
			if (totalObj && totalObj[0]) {
				//Log.log(this.getTotalCellData(type, item.id, totalObj[0]));
				item.total = this.getTotalCellData(type, item.id, totalObj[0]);
			}
			let curDataList = [...item.datalist];
			item.datalist = curDataList.concat(this.getRowData(type, item.id, list));
		});
	// Log.log("setData:this.data", this.data);
	}

	getCaseCellData(rowId, data) {
		if (!data) {
			return;
		}
		switch (rowId) {
		case HEADER:
			return {
					label: this.getHeader(data),
					clickable: !!data.IsHaveNext,
					hasNext: data.IsHaveNext,
					path: data.Path,
					deptPath: data.DeptCompanyPath,
					year: data.QYear,
					queryDate: data.QueryDate,
					month: data.QMonth,
					weekStart: data.QWeekStar,
					weekEnd: data.QWeekEnd,
				} || {};
		case CASE_CUSTOMER:
			return data.AcceptCnt || 0;
		case CASE_VALIDCUSTOMER:
			return data.AcceptEstateCnt || 0;
		case CASE_VALIDVISIT:
			return data.ReportVistCnt || 0;
		case CASE_SURESALE:
			return data.ContractCnt || 0;
		case CASE_SUREMONEY:
			return Math.round(data.ContractDecimal * 0.0001) || 0;
		case CASE_SIGN:
			return data.PaperCnt || 0;
		case CASE_SIGNMONEY:
			return Math.round(data.PaperDecimal * 0.0001) || 0;
		}
	}
	getPerformCellData(rowId, data) {
		if (!data) {
			return;
		}
		switch (rowId) {
		case HEADER:
			return {
					label: this.getHeader(data),
					clickable: data.IsHaveNext !== null,
					hasNext: data.IsHaveNext,
					path: data.Path,
					deptPath: data.DeptCompanyPath,
					year: data.QYear,
					month: data.QMonth,
					queryDate: data.QueryDate,
					weekStart: data.QWeekStar,
					weekEnd: data.QWeekEnd,
					companyPath: data.DeptCompanyPath
				} || {};
		case STAT_CUSTOMER:
			return data.CustCnt || 0;
		case STAT_SHARE:
			return data.ShareCnt || 0;
		case STAT_APPOINTMENT:
			return data.SignCnt || 0;
		case STAT_CURREPORT:
			return data.AcceptCnt || 0;
		case STAT_HOUSEREPORT:
			return data.AcceptEstateCnt || 0;
		case STAT_VALIDVISIT:
			return data.ReportVistCnt || 0;
		case STAT_SURESALE:
			return data.ContractCnt || 0;
		case STAT_SUREMONEY:
			return Math.round(data.ContractDecimal * 0.0001) || 0;
		case STAT_SIGN:
			return data.PaperCnt || 0;
		case STAT_SIGNMONEY:
			return Math.round(data.PaperDecimal * 0.0001) || 0;
		}
	}
	getHeader(headerObj) {
		//Log.log("headerObj111:", headerObj);
		if (headerObj.EmpName) {
			return headerObj.EmpName;
		}
		if (headerObj.DepartmentName) {
			return headerObj.DepartmentName;
		}
		if (headerObj.QueryDate) {
			return DateTransform.timeToMothAndDate(headerObj.QueryDate);
		}
		if (headerObj.QWeekStar && headerObj.QWeekEnd) {
			return DateTransform.getWeekTime(headerObj.QWeekStar, headerObj.QWeekEnd);
		}
		if (headerObj.QYear && headerObj.QMonth) {
			return DateTransform.getYearAndMonth(headerObj.QYear, headerObj.QMonth);
		}
	}
	getRegisterCellData(rowId, data) {
		if (!data) {
			return;
		}
		switch (rowId) {
		case HEADER:
			return {
					label: this.getHeader(data),
					clickable: data.IsHaveNext !== null,
					hasNext: data.IsHaveNext,
					path: data.Path,
					deptPath: data.DeptCompanyPath,
					year: data.QYear,
					month: data.QMonth,
					queryDate: data.QueryDate,
					weekStart: data.QWeekStar,
					weekEnd: data.QWeekEnd,
					companyPath: data.DeptCompanyPath
				} || {};
		case ASC_LOGIN:
			return data.RegCnt || 0;
		case ASC_FROZEN:
			return data.LeaveCnt || 0;
		}
	}
	getTotalCellData(type, rowId, data) {
		if (!data) {
			return;
		}
		switch (type) {
		case TABLE_CASE:
			return this.getCaseCellData(rowId, data);
		case TABLE_PERFORM:
			return this.getPerformCellData(rowId, data);
		case TABLE_REGISTER:
			return this.getRegisterCellData(rowId, data);
		}
	}
	getRowData(type, rowId, list) {
		if (!list) {
			return;
		}
		return list.map((item, index) => {
			switch (type) {
			case TABLE_CASE:
				return this.getCaseCellData(rowId, item);
			case TABLE_PERFORM:
				return this.getPerformCellData(rowId, item);
			case TABLE_REGISTER:
				return this.getRegisterCellData(rowId, item);
			}
		});
	}

	getTotalList() {
		if (!this.data) {
			return;
		}
		let [header, ...others] = this.data;
		return others.map((item, index) => {
			return {
				id: item.id,
				label: item.label,
				total: item.total
			};
		});
	}

	getHeaderList() {
		if (!this.data) return;
		let headerObj = this.data.filter((item, index) => {
			return item.id === HEADER;
		});
		Log.log("headerObj:", headerObj);
		if (headerObj && headerObj[0]) {
			let {datalist} = headerObj[0];
			return datalist;
		}
	}

	idGetDataList(id) {
		if (!this.data) return;
		let dataObj = this.data.filter((item, index) => {
			return item.id === id;
		});
		//Log.log("dataObj:", dataObj[0]);
		if (dataObj && dataObj[0]) {
			let {datalist} = dataObj[0];
			//Log.log("datalist:", datalist);
			return datalist;
		}
	}

	getAllDataList() {
		if (!this.data) {
			return;
		}
		let t = this;
		let totalList = this.getTotalList();
		Log.log('totalList:', totalList);
		return totalList.map((item, index) => {
			return this.idGetDataList(item.id);
		});
	}
}

const testModel = new Model();
export default testModel;
