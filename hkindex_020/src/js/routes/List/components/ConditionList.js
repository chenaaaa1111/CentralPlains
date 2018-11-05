import React from 'react';
import ReactDOM from 'react-dom';
import ConditionItem from './ConditionItem';
import CheckBoxItem from './CheckBoxItem';
import {
    GROUP_TYPE_MULTI,
    GROUP_TYPE_SINGLE
} from './../../../obj/Const';

class ConditionList extends React.Component {
    constructor(props) {
        super(props);
        this.changeSelected = this.changeSelected.bind(this);
    }
    changeSelected(value, selected) {
        let {
            type,
            group,
            selectFunc
        } = this.props;
        selectFunc(type, group.id, value, selected);
    }
    render() {
        let {
            group,
            type,
            refreshScroll
        } = this.props;
        refreshScroll();
        return <ul className="cdtilst" style={{display:group.active?'block':'none'}}>
            {
                group.groupList.map((condition,index)=>{
                    let item=Object.assign({},condition);
                    if(item.type===GROUP_TYPE_SINGLE){
                        return <ConditionItem key={index} label={item.label} value={item.value} selected={item.selected} selectFunc={this.changeSelected}></ConditionItem>;
                    }else if(item.type===GROUP_TYPE_MULTI){
                        return <CheckBoxItem key={index} label={item.label} value={item.value} selected={item.selected} selectFunc={this.changeSelected}></CheckBoxItem>;
                    }
                })
            }
        </ul>;
    }
}

export default ConditionList;