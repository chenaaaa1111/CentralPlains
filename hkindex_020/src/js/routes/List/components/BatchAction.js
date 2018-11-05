import React from 'react';
import ReactDOM from 'react-dom';
import {
	PUTAWAY,
	ONPUTAWAY,
	PUSH
} from './../../../obj/Const';
class BatchAction extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {
			type,
			status,
			allselected,
			selectAll,
			cancelHot,
			setHot,
			batchOffline,
			batchOnline,
			batchDelete,
			data
		} = this.props;
		return <div className="pub content-box m0">
	        <section className="ctboxct fixedb row">
	            <div className="bcs2 col1 s2 bdf8" onClick={()=>{selectAll(type,!allselected)}}>
	                <div className="chkboxSquare checked">
	                    <span className="mark" style={{display:allselected?"block":"none"}}></span>
	                </div>
	                <span>全选</span>
	            </div>
	            <div className="bcs10 col1 s10 flbox">
	                <div className="bcs4 flbtn bgcc" style={{display:type===PUTAWAY?"block":"none"}} onClick={()=>{cancelHot(type,status,data)}}>取消笋盘</div>
	                <div className="bcs4 flbtn bgy" style={{display:type===PUTAWAY?"block":"none"}} onClick={()=>{setHot(type,status,data)}}>设置笋盘</div>
	                <div className="bcs4 flbtn bgo" style={{display:type===PUTAWAY?"block":"none"}} onClick={()=>{batchOffline(type,status,data)}}>批量下架</div>
	                <div className="bcs4 flbtn bgo" style={{display:type===ONPUTAWAY?"block":"none"}} onClick={()=>{batchDelete(type,status,data)}}>删除</div>
	                <div className="bcs8 flbtn bgo" style={{display:type===ONPUTAWAY?"block":"none"}} onClick={()=>{batchOnline(type,status,data)}}>批量上架</div>
	                <div className="bcs12 flbtn bgo" style={{display:type===PUSH?"block":"none"}} onClick={()=>{batchDelete(type,status,data)}}>删除</div>
	            </div>
	        </section>
	    </div>;
	}
}

export default BatchAction;