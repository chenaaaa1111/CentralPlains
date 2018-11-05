/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-12 19:05:37
 * @version $Id$
 */
/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-12 17:59:16
 * @version $Id$
 */
import React, { Component } from 'react';
import Log from './../../commons/utils/Log'
class TabBody extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    let {datalist, transparent} = this.props;
    let hdtransparent = this.props.transparent;
    Log.log('datalist:', datalist);
    return (<ul>
            {datalist.map((item, index) => {
              let datas = item;
              let odd = index % 2;
              let isopacity = hdtransparent ? !odd : odd;
              return <li key={index}
                         className={isopacity ? "row lir bgff" : "row lir"}>
                       {datas.map((itemInner, indexInner) => {
                          return <div key={indexInner}
                                     className="licol">
                                  {itemInner}
                                </div>;
                        })}
                     </li>;
             })}
          </ul>);
  }
}

export default TabBody;
