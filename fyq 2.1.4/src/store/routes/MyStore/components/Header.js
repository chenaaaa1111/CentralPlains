/**
 * Created by mac on 17/10/11.
 */
import  React,{Component} from 'react';
import  imgheader from '../../../images/user_headerDefault_imgIcon.png'
import Log from  './../../../../commons/utils/Log'
class Header extends  Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render(){
        return (<header className="ra share_header">
            <div id="shoptitle"></div>
            <div className="share_" >
                <div className="touxiangdiv">
                 <img src={this.props.jingji.PhotoFilePath!=''?
                    this.props.jingji.PhotoFilePath:imgheader}/>
                </div>
                <div className="telItem">
                    <p className="telphone_">
                        {this.props.jingji.Mobile}
                        </p>
                    <p className="proCl">上架项目<span id="allCount">

                        </span></p>
                </div>
            </div>
            <div className="ab telImage" >
                <a href ={"tel:"+this.props.jingji.Mobile}>
                    <img src={require("../../../images/shapTel.png")}/>
                </a>
            </div>
        </header>)
    }
    clickHandle(e){


    }
}



module.exports=Header;