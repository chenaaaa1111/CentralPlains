import React from 'react';
import ReactDOM from 'react-dom';
import NavLink from './../../../components/NavLink';
import PutAwayContainer from './PutAwayContainer';
import OnPutAwayContainer from './OnPutAwayContainer';
import PushContainer from './PushContainer';
import {
    PUTAWAY,
    ONPUTAWAY,
    PUSH
} from './../../../obj/Const';
class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.activeContent = this.activeContent.bind(this);
    }
    componentWillUnmount() {
        this.props.reset();
    }
    activeContent(active) {
        switch (active) {
            case PUTAWAY:
                return <PutAwayContainer></PutAwayContainer>;
                break;
            case ONPUTAWAY:
                return <OnPutAwayContainer></OnPutAwayContainer>;
                break;
            case PUSH:
                return <PushContainer></PushContainer>;
                break;
        }
    }
    render() {
        let {
            activeTab,
            changeTab
        } = this.props;
        return <div>
        <ul className="lstststab row tabs bgf1">
            <li className="tab col s4"><a className={activeTab===PUTAWAY?"active":""} href="javascript:void(0);" onClick={()=>{changeTab(PUTAWAY);}}>上架区</a></li>
            <li className="tab col s4"><a className={activeTab===ONPUTAWAY?"active":""} href="javascript:void(0);" onClick={()=>{changeTab(ONPUTAWAY);}}>待上架区</a></li>
            <li className="tab col s4"><a className={activeTab===PUSH?"active":""} href="javascript:void(0);" onClick={()=>{changeTab(PUSH);}}>草稿</a></li>
        </ul>
        {this.activeContent(activeTab)}
        </div>;
    }
}

//export default Tab;
module.exports = Tab;