import React from 'react';
import ReactDOM from 'react-dom';

class ConditionItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			label,
			value,
			selected,
			selectFunc
		} = this.props;
		let selectedClass = "cdti flbtn active";
		let commomClass = "cdti flbtn";
		return <li className={selected?selectedClass:commomClass} onClick={()=>{selectFunc(value,selected)}}>{label}</li>;
	}
}

export default ConditionItem;