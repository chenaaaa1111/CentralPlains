import React from 'react';
import ReactDOM from 'react-dom';
import NavLink from './../../../components/NavLink';

class Manager extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setTitle("广告管理");
		this.props.getToken();
	}
	render() {
		let {
			total,
			putaway,
			rest,		
		CountRentPropertyAd,
		CountSalePropertyAd,
		PackageCount,
		SalePackageCount,
		RamainNum
		} = this.props;
		return <section className="manager content-box">
			<NavLink to="list/">
				<section className="ctboxct flbox">
		            <div className="fll mr30">
		                <img className="mgrlogo" src={require("../../../../images/logo.png")} alt="" /><br/>
		                <span className="mgrtl fco tc db" >中原外网</span>
		            </div>
		            <div className="flr">
		                <p className="flrp"><span className="lb6a14 mr25">套餐总量：<i>{(PackageCount?PackageCount:0)+(SalePackageCount?SalePackageCount:0)}</i></span></p>
		                <p className="flrp"><span className="lb6a14 mr25">租套餐：<i>{CountRentPropertyAd?CountRentPropertyAd:0}/{PackageCount?PackageCount:0}</i></span><span className="lb6a14 mr25">售套餐：<i>{CountSalePropertyAd?CountSalePropertyAd:0}/{SalePackageCount?SalePackageCount:0}</i></span></p>
		                <p className="flrp"><span className="lb6a14 mr25">已上架：<i>{putaway}</i></span><span className="lb6a14 mr25">可发布：<i>{RamainNum}</i></span></p>
		            </div>
		        </section>
			</NavLink>
	    </section>;
	}
}

//export default Manager;
module.exports = Manager;