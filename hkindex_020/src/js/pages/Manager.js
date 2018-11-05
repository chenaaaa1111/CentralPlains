import React from 'react';
import ReactDOM from 'react-dom';
import NavLink from './../components/NavLink';

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
			rest
		} = this.props;
		return <section className="manager content-box">
			<NavLink to="list/">
				<section className="ctboxct flbox">
		            <div className="fll mr30">
		                <img className="mgrlogo" src={require("../../images/logo.png")} alt="" /><br/>
		                <span className="mgrtl fco tc db">中原外网</span>
		            </div>
		            <div className="flr">
		                <p><span className="lb6a14 mr25">套餐总量：<i>{total}</i></span></p>
		                <p><span className="lb6a14 mr25">已上架：<i>{putaway}</i></span><span className="lb6a14 mr25">可发布：<i>{rest}</i></span></p>
		            </div>
		        </section>
			</NavLink>
	    </section>;
	}
}

//export default Manager;
module.exports = Manager;