import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import AppProxy from './../../../../../utils/AppProxy';
class ImgTable extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let proxy = new AppProxy(window);
        proxy.call("selectedPhotos", 1);
    }
    render() {
        let {
            allphotos,
            onCheck
        } = this.props;
        var disabledClass = "grid-item disabled";
        var enabledClass = "grid-item";
        return <ul className="imglst grids-4 pb110">
        {
            allphotos.map((item,index)=>{
                return <li key={index} className="grid-item">
                    <a className = "imgChkBox" onClick={()=>{onCheck(item.type, item.url,!item.checked)}} >
                        <LazyLoad height={88}><img src={item.url+"?width=200"||require('../../../../../../images/imageset.png')} alt="" /></LazyLoad>
                        <div className = "chkboxCirle">
                            <span className="mark" style={{display:!item.checked?"none":"block"}}></span> 
                        </div> 
                    </a>
                </li>
            })
        }
        </ul>;
    }
}
export default ImgTable;