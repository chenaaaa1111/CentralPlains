import React from 'react';
import ReactDOM from 'react-dom';

class VTab extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {
            filters,
            type,
            selectGroup
        } = this.props;
        let activeClass = "tab flbtn active";
        let commonClass = "tab flbtn";
        return <ul className="vtabs">
        {
            filters.map((item,index)=>{
             // console.log(group.active);
              let group=Object.assign({},item);
              return <li key={group.id} className={group.active?activeClass:commonClass} onClick={()=>{selectGroup(group.id,type)}}>{group.groupName}</li>;
            })
        }
        </ul>;
    }
}

export default VTab;