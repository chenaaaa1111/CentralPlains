import React from 'react';
import ReactDOM from 'react-dom';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import VTab from './VTab';
import CditListContainer from './CditListContainer';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            mouseWheel: true,
            scrollX: false,
            scrollY: true,
            click: true
        };
        this.changeSelected = this.changeSelected.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    changeSelected(groupid, value, selected) {
        let {
            type,
            selectCondition
        } = this.props;
        selectCondition = this.props.selectCondition;
        selectCondition(type, groupid, value, selected);
    }
    onRefresh() {
        //console.log("bbbbbbbbbbbbbbbbb");
        // ev.preventDefault()
        // this.refs.iScroll.withIScroll(function(iScroll) {
        //     iScroll.scrollTop(0, 0)
        // })
    }
    componentDidUpdate() {
        //alert(this.refs.iScroll._iScrollInstance);
        if (this.refs.iScroll._iScrollInstance) {
            setTimeout(() => {
                this.refs.iScroll._iScrollInstance.refresh();
            }, 0);
        }
    }
    componentDidMount() {
        let {
            type
        } = this.props;
        this.props.getPlotsAndStatus(type);
    }
    render() {
        let {
            type,
            filters,
            visible,
            selectCondition,
            sure,
            reset,
            showFilter
        } = this.props;
        let fltShowClass = "fltwrapper";
        let flthiddenClass = "fltwrapper hidden";
        if (visible) {
            $("html,body").addClass("disableScroll");
        } else {
            $("html,body").removeClass("disableScroll");
        }
        return <div className={!visible?flthiddenClass:fltShowClass}>
            <div className="fltbg" onClick={()=>{showFilter(type,!visible)}}></div> <div className = "fltlst row bgf1">
                <div className="col s6 bgff h100">
                    <VTab {...this.props}></VTab>
                    <a href="javascript:void(0);" className="fltact bgcc" onClick={()=>{reset(type)}}>重置</a>
                    <a href="javascript:void(0);" className="fltact bgo" onClick={()=>{sure(type)}}>确认</a>
                </div> 
                <div className = "cdts col s6 h100">
                    <ReactIScroll ref="iScroll" iScroll={iScroll} options={this.options}>
                        <div>
                        {
                            filters.map((item, index) => {
                                return <CditListContainer key={item.id} type={type} group={item} refreshScroll={this.onRefresh}></CditListContainer>;
                            })
                        }
                        </div>
                    </ReactIScroll>
                </div>
            </div> 
        </div>;
    }
}

export default Filter;