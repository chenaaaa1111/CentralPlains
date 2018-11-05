/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React, { Component } from 'react';
import TabVHeader from './TabVHeader';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import HScroll from './HScroll';
import Log from './../../commons/utils/Log'
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    let {hdopacity, tabletype, tabtype, headers, totals, values, querytype, loadmore, scrollPos} = this.props;
    return (<section className="col2">
            <TabVHeader headers={totals}
                        transparent={hdopacity}></TabVHeader>
            <div className="colauto rel ovh">
              <HScroll onScroll={(pos) => {
                                  this.props.onScroll(pos);
                                 }}
                       loadmore={loadmore}
                       scrollPos={scrollPos}>
                <div className="scrollArea"
                     style={{
                              width: `${80*headers.length}px`
                            }}>
                  <TabHeader headers={headers}
                             tabletype={tabletype}
                             tabtype={tabtype}
                             transparent={hdopacity}
                             querytype={querytype}
                             onClickHeader={(path) => {
                                              this.props.onClickHeader(path);
                                            }}></TabHeader>
                  <TabBody datalist={values}
                           transparent={hdopacity}></TabBody>
                </div>
              </HScroll>
            </div>
          </section>);
  }
}

export default Table;
