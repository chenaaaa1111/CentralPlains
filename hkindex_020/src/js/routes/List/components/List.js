import React from 'react';
import ReactDOM from 'react-dom';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import {
	fetchListEnd
} from './../../../Actions';
import ListItem from './ListItem';

class List extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillUnmount() {
		this.props.fireScroll();
	}
	componentDidMount() {
		let {
			type,
			pageindex,
			pagesize,
			setTitle
		} = this.props;
		setTitle("广告管理");
		this.props.scrollHandler(type, pageindex, pagesize);
	}
	render() {
		let {
			type,
			lists,
			status,
			enablebatch
		} = this.props;
		var t = this;
		let batchClass = "mb50 mt6em";
		let normalClass = "mt6em";
		return <section className={enablebatch?batchClass:normalClass}>
           <ul className="list">
            {
                lists.map(function(item,index){
                	let info=Object.assign({},item);
					return <ListItem key={item.adid} info={info} {...t.props}></ListItem>;
                })
            }
            </ul>
            <span className="db tc" style={{display:'none'}}>下拉加载更多</span>
        </section>;
	}
}

export default List;