/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-13 10:13:32
 * @version $Id$
 */
import { HEADER, STAT_CUSTOMER, STAT_SHARE, STAT_APPOINTMENT, STAT_CURREPORT, STAT_HOUSEREPORT, STAT_VALIDVISIT, STAT_SURESALE, STAT_SUREMONEY, STAT_SIGN, STAT_SIGNMONEY, ASC_LOGIN, ASC_FROZEN, CASE_CUSTOMER, CASE_VALIDCUSTOMER, CASE_VALIDVISIT, CASE_SURESALE, CASE_SUREMONEY, CASE_SIGN, CASE_SIGNMONEY } from './Const';
import Log from './../../commons/utils/Log.js';
export const caseData = [
	/*{
		label: '认购金额',
		id: CASE_SUREMONEY,
		order: 5,
		total: 20,
		count: 10,
		datalist: [1, 2, 3, 4, 5]
	},*/
	{
		id: HEADER,
		label: '',
		order: 0,
		total: '',
		count: 10,
		datalist: []
	}, {
		label: '报备来客',
		id: CASE_CUSTOMER,
		order: 1,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '有效报客',
		id: CASE_VALIDCUSTOMER,
		order: 2,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '有效到访',
		id: CASE_VALIDVISIT,
		order: 3,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '认购套数',
		id: CASE_SURESALE,
		order: 4,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '认购金额',
		id: CASE_SUREMONEY,
		order: 5,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '签合同套数',
		id: CASE_SIGN,
		order: 6,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '签合同金额',
		id: CASE_SIGNMONEY,
		order: 7,
		total: 0,
		count: 10,
		datalist: []
	}
];
export const loginData = [
	/*{
		label: '新增注册量',
		id: ASC_LOGIN,
		order: 1,
		total: 20,
		count: 10,
		datalist: [1, 2, 3, 4, 5]
	},*/
	{
		id: HEADER,
		label: '',
		order: 0,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '新增注册量',
		id: ASC_LOGIN,
		order: 1,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '新增冻结量',
		id: ASC_FROZEN,
		order: 2,
		total: 0,
		count: 10,
		datalist: []
	}
];
export const performData = [
	/*{
	label: '新增私客',
	id: STAT_CUSTOMER,
	order: 1,
	total: 20,
	count: 10,
	datalist: [1, 2, 3, 4, 5]
},*/
	{
		id: HEADER,
		label: '',
		order: 0,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '新增私客',
		id: STAT_CUSTOMER,
		order: 1,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '分享',
		id: STAT_SHARE,
		order: 2,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '预约',
		id: STAT_APPOINTMENT,
		order: 3,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '报备客量',
		id: STAT_CURREPORT,
		order: 4,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '报备盘数',
		id: STAT_HOUSEREPORT,
		order: 5,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '有效到访',
		id: STAT_VALIDVISIT,
		order: 6,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '认购套数',
		id: STAT_SURESALE,
		order: 7,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '认购金额',
		id: STAT_SUREMONEY,
		order: 8,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '签合同套数',
		id: STAT_SIGN,
		order: 9,
		total: 0,
		count: 10,
		datalist: []
	}, {
		label: '签合同金额',
		id: STAT_SIGNMONEY,
		order: 10,
		total: 0,
		count: 10,
		datalist: []
	}
];
