import React from 'react';
import ReactDOM from 'react-dom';
import NavLink from './../components/NavLink';
import EditContainer from './../container/EditContainer';
import ImgSetContainer from './../container/ImgSetContainer';
import ImgViewContainer from './../container/ImgViewContainer';
import {
	DETAIL_STATUS_GETDATA
} from './../obj/Const';
class Publish extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillUnmount() {
		this.props.resetDetails();
	}
	componentDidMount() {
		let adid = this.props.adid;
		if (adid) {
			this.props.fetchDetails(adid);
		} else {
			this.props.getToken();
		}
	}
	render() {
		let status = this.props.status;
		let renderContent = (status) => {
			if (status === DETAIL_STATUS_GETDATA) {
				return <div>
					{this.props.children}
				</div>;
			} else {
				return <div></div>;
			}
		};
		return <div>
		{
			renderContent(status)
		}
        </div>;
	}
}

export default Publish;