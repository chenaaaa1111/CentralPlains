/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-12 17:59:16
 * @version $Id$
 */
import React, { Component } from 'react';
import Log from './../../commons/utils/Log'
const dataHeader = [{
  label: '新增注册量',
  value: 3
}, {
  label: '新增冻结量',
  value: 4
}];
class TabVHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    let data = this.props.headers;
    let hdtransparent = this.props.transparent;
    return (<div className="colfix">
            <div className={hdtransparent ? "row lir" : "row lir bgff"}>
              <div className="licol"></div>
              <div className="licol">
                合计
              </div>
            </div>
            {data.map((item, index) => {
              let {label, total} = item;
              let odd = index % 2;
              let isopacity = hdtransparent ? !odd : odd;
              return <div key={index}
                          className={isopacity ? "row lir bgff" : "row lir"}>
                       <div className="licol">
                         {label}
                       </div>
                       <div className="licol">
                         {total}
                       </div>
                     </div>;
             })}
          </div>);
  }
}

export default TabVHeader;
