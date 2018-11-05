import React from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'react-redux';
import ConditionList from './ConditionList';
import {
	selectCondition
} from './../../../Actions';
const mapStateToProps = (state, ownProps) => {
	let group = Object.assign({}, ownProps.group);
	return Object.assign({}, {
		type: ownProps.type,
		group: group,
		refreshScroll: ownProps.refreshScroll
	});
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectFunc: (type, groupid, value, seleted) => {
			dispatch(selectCondition(type, groupid, value, seleted));
		}
	}
}
const CditListContainer = connect(mapStateToProps, mapDispatchToProps)(ConditionList);
export default CditListContainer;