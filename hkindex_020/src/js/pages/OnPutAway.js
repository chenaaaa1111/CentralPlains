import React from 'react';
import ReactDOM from 'react-dom';
import Tab from './../components/Tab';
import BatchAction from './../components/BatchAction';
import FilterContainer from './../container/FilterContainer';
import ListContainer from './../container/ListContainer';
import {
    ONPUTAWAY,
    STATUS_TYPE_SALE,
    STATUS_TYPE_RENT
} from './../obj/Const';
const statusClass = "tab col s6";
const statusActiveClass = "tab col s6 active";
const filterClass = "fltrigger col s2 g9";
const filterActiveClass = "fltrigger col s2 g9 active";

class OnPutAway extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        this.props.clearAllItems(ONPUTAWAY);
        this.props.changeBatch(ONPUTAWAY, false);
        this.props.showFilter(ONPUTAWAY, false);
        this.props.resetFilter(ONPUTAWAY);
        console.log("onputawayWillUnmount");
    }
    render() {
        let {
            status,
            fltvisible,
            allselected,
            enablebatch,
            onStatusChange,
            showFilter,
            changeBatch,
            data
        } = this.props;
        var t = this;
        let batch = (enablebatch) => {
            if (enablebatch) {
                return <span>完成</span>;
            } else {
                return <img className="btcicon" src={require("../../images/batch.png")} alt="" />;
            }
        };
        let batchBar = (enablebatch) => {
            if (enablebatch) {
                return <BatchAction type={ONPUTAWAY} {...t.props}></BatchAction>;
            } else {
                return '';
            }
        }
        return <div>
            <div className="lstflttab row tabs bgff">
                <div className="tabs col s8">
                    <div className={status===STATUS_TYPE_SALE?statusActiveClass:statusClass} onClick={()=>{onStatusChange(ONPUTAWAY,data.filters,STATUS_TYPE_SALE)}}>{"出售房源"}</div>
                    <div className={status===STATUS_TYPE_RENT?statusActiveClass:statusClass} onClick={()=>{onStatusChange(ONPUTAWAY,data.filters,STATUS_TYPE_RENT)}}>{"出租房源"}</div>
                </div>
                <div className={!fltvisible?filterClass:filterActiveClass} onClick={()=>{showFilter(ONPUTAWAY,!fltvisible)}}>筛选<i className="flticon"></i></div>
                <div className="btcbtn col s2" onClick={()=>{changeBatch(ONPUTAWAY,!enablebatch)}}>{batch(enablebatch)}</div>
            </div>
            <FilterContainer type={ONPUTAWAY} visible={fltvisible} status={status} data={data}></FilterContainer>
            <ListContainer type={ONPUTAWAY} status={status} filters={data.filters}></ListContainer>
            {batchBar(enablebatch)}
        </div>;
    }
}
export default OnPutAway;