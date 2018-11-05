import React from 'react';
import ReactDOM from 'react-dom';
import {
	TRADE_SALE,
	TRADE_RENT
} from './../../../../../obj/Const';

class AdBaseInfo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			info,
			switchactive,
			onSwitch
		} = this.props;
		let pricelabel = '售价：';
		let pricevalue = 0;
		let tradetype = '';
		if (info.tradetype == TRADE_SALE) {
			pricelabel = "售价：";
			pricevalue = info.sellprice + "万元";
			tradetype = "出售";
		} else if (info.tradetype == TRADE_RENT) {
			pricelabel = "租价：";
			pricevalue = info.rentprice + "元/月";
			tradetype = "出租";
		} else {

		}
		let switchClass = "indicator down";
		let switchActiveClass = "indicator up";
		return <div className="summary content-box">
	        <header className="tl16 pt15"><span className="mr10">{info.estname}</span><span className="mr10">{info.buildName}</span><span className="mr10">{info.houseNo}</span></header>
	        <section className="ctboxct row">
		        <div className="collapsible-body" style={{display:!switchactive?"none":"block"}}>  
			        <div className="col s6"><span className="lb9a14">{pricelabel}</span><span className="lb3a14">{pricevalue}</span></div>
		            <div className="col s6"><span className="lb9a14">交易类型：</span><span className="lb3a14">{tradetype}</span></div>
		            <div className="col s6"><span className="lb9a14">面积：</span><span className="lb3a14">{info.size+"㎡"}</span></div>
		            <div className="col s6"><span className="lb9a14">房型：</span><span className="lb3a14">{info.housetype}</span></div>
	            </div>
		        <a className="collapsible-trigger db tc" href="javascript:void(0);" onClick={onSwitch}><span className={!switchactive?switchClass:switchActiveClass}></span></a>
	        </section>
	    </div>;
	}
}

export default AdBaseInfo;