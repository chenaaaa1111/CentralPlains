import React from 'react';
import ReactDOM from 'react-dom';

class CheckBoxItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            label,
            value,
            selected,
            selectFunc,
        } = this.props;
        return <li className="cdti flbtn" onClick={()=>{selectFunc(value,selected)}}><span className="mr25">{this.props.label}</span>
            <div className="chkboxSquare checked r mr10">
                <span className="mark" style={{display:selected?"block":"none"}}></span>
            </div>
        </li>;
    }
}

export default CheckBoxItem;