/**
 * Created by mac on 17/10/11.
 */
import React, {
    Component
} from 'react';
import {query} from './../../../../commons/utils/Common';
import request from './../../../../commons/utils/ServerRequest';

class FlexBoxBottom extends Component{
    constructor(props) {
        super(props);
        this.state={imgurl:''}
    }
    componentDidMount() {
        var imgurl=0;
        var shareCode=query('sharecode');
        var shopData={vJsonData:shareCode};
            request.requestGetShop(shopData,(res)=>{
                var resheader=res.FYQEmployee;
                imgurl=resheader.WeixinPicUrl;
                localStorage.setItem("WeixinPicUrl",imgurl);
                if(!imgurl){
                }else{
                    $('.weizixun').addClass('ishasImg');
                }
                this.setState({
                    imgurl:imgurl
                });
            });
    }

    render(){
        return (<div className="flexboxbtomo">
                <div className={this.state.imgurl?"weizixun ishasImg":"weizixun"}
                     onClick={this.zixun.bind(this)}>微信咨询</div>
                <div className="lianxi" onClick={this.telphone.bind(this)}> <a href={'tel:'+this.props.telphonenuber}>联系店长</a></div>
                <div className="yuyue" onClick={this.seeHouse.bind(this)}>预约看房</div>
        </div>)
    }
    handleClick(e){
         this.props.handleclick(e);
    }
    zixun(e){
        var imgurl=localStorage.getItem("WeixinPicUrl");
        if(imgurl!=''&&imgurl!=undefined&&imgurl!=null){
        }else{
            return;
        }
        this.props.zixun(e);
    }
    telphone(e){
        //this.props.telphone(e);
    }
    seeHouse(e){
        this.props.seeHouse(e);

    }

}
module.exports=FlexBoxBottom;