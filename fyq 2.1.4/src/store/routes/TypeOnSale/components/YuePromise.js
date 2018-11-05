/**
 * Created by mac on 17/10/12.
 */
import  React,{Component} from 'react';
import {query} from './../../../../commons/utils/Common';
import request from './../../../../commons/utils/ServerRequest';
import Message from '../../../components/Message';
import Log from "./../../../../commons/utils/Log"
class YuePromise extends Component {
    constructor(props) {
        super(props);
        this.state={isShow:false,msg:'',
            showMessage:false,timstamp:'',
            target:document.getElementById('getShareCode'),
            sname:'',
            iphone:'',
            ShareCode:''
        }

    }
    componentDidMount() {
        $('.yuekan').click(function () {
            $('.yuyuekuang').removeClass('none_');
            $('.mengban').removeClass('none_');
            var scrollTop=0;
            if(document.documentElement&&document.documentElement.scrollTop){
                scrollTop=document.documentElement.scrollTop;
            }else if(document.body){
                scrollTop=document.body.scrollTop;
            }
            var clientHeight=0;
            if(document.body.clientHeight&&document.documentElement.clientHeight){
                var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }else{
                var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
            }
            document.getElementById('yuyuekuang').style.marginTop=scrollTop-115+'px';
        });
        this.setState({
            isShow:false,showMessage:false,msg:'',
            sname:document.getElementById('CustName'),
            iphone:document.getElementById('Mobile'),
            ShareCode:document.getElementById('ShareCode'),
        });
        var self=this;
        $('#surealert').click(function () {
            self.setState({
                isShow:false,showMessage:false,msg:'',
                sname:document.getElementById('CustName'),
                iphone:document.getElementById('Mobile'),
                ShareCode:document.getElementById('ShareCode'),
            });
        });
    }
    render() {
        return (
            <div>
                <div className="yuyuekuang none_" id="yuyuekuang">
                    <ul >
                        <li>
                            <input id="CustName" data-descriptions="CustName" name="CustName" data-required="true"
                                   type="text" placeholder="请输入您的姓名"/>
                        </li>
                        <li>
                            <input id="Mobile" data-required="true" data-descriptions="CustName" type="text"
                                   placeholder="请输入您的手机号码"/>
                        </li>
                        <li className="ra">
                            <input type="text" data-validate="code" data-conditional="ShareCode"
                                   data-descriptions="ShareCode" id="ShareCode" placeholder="请输入手机验证码"/>
                            <button id="getShareCode" onClick={this.Yanzhen.bind(this)} className="yanzhenCode ab">获取验证码
                            </button>
                        </li>
                        <li className="anniu">
                            <button id="cance" onClick={this.cance.bind(this)}>取消</button>
                            <button id="yuyue" onClick={this.yuyue.bind(this)}>预约</button>
                        </li>
                    </ul>
                    {/*</form>*/}
                    <div id="message" style={this.state.showMessage?{'display':'block'}:{'display':'none'}}>{this.state.message}</div>
                </div>
                <div className="mengban none_">

                </div>
                <Message isShow={this.state.isShow} msg={this.state.msg} />
            </div>

        )
    }

    yuyue(e) {
        var CustName = $('#CustName').val();
        var Mobile = $('#Mobile').val();
        var EstateID = query('EstateID');
        var yanzhengCode = $('#ShareCode').val();
        var sharecode = query('sharecode');
        var estname=$('#estName').val();
        var isClose=false;
        if (!CustName) {
            this.setState({
                isShow:false,showMessage:true,message:'请输入姓名'
            })
            isClose=true;
            return;
        }else
        if (!Mobile) {
            this.setState({
                isShow:false,showMessage:true,message:'请输入手机号码'
            })
            isClose=true;
            return;
        } else
        // if(!(/^1[3|4|5|6|7|8|][0-9]\d{8}$/.test(Mobile))){
        if(!(/^1\d{10}$/.test(Mobile))){
            this.setState({
                isShow:false,showMessage:true,message:'请输入正确的手机号'
            })
            return false;
            Log.log('length',Mobile.length);
            if(Mobile.length!=11){
                this.setState({
                    isShow:false,showMessage:true,message:'请输入正确的手机号'
                })
                return;
            }
        } else
        if (!yanzhengCode) {
            this.setState({
                isShow:false,showMessage:true,message:'请输入手机验证码'
            })
            isClose=true;
            return;
        }else {
            this.setState({
                isShow:false,showMessage:false,message:''
            })
        }
        var shareCode=query('sharecode');
        if(!isClose){
            var daymessage={'shareCode':shareCode,BrowseSource:2}
            var sendMessage = {
                'CustName': CustName,
                'Mobile': Mobile,
                'EstateID': EstateID,
                "OrderFlag": 2,
                'ShareCode': sharecode,
                'OrderEstateName':estname
            }
            var sendcode={vJsonData:{'Mobile':Mobile,Code:yanzhengCode,"Target":"UserOrder"}};
            request.requestCheckMobileCode(sendcode,(res)=>{//验证验证码
                if(res.RtnCode!=200){
                    this.setState({
                        isShow:false,showMessage:true,message:res.RtnMsg
                    });
                    return;
                }else{
                    $('.yuyuekuang').addClass('none_');
                    $('.mengban').addClass('none_');
                    $('.yuyuekuang').addClass('none_');
                    $('.mengban').addClass('none_');
                    this.setState({
                        isShow:true,showMessage:false,msg:'预约成功',timstamp:clearInterval(this.state.timstamp)
                    });
                    this.state.sname.value='';
                    this.state.iphone.value='';
                    this.state.ShareCode.value='';
                    var target=document.getElementById('getShareCode');
                    target.innerText='获取验证码';
                    target.disabled=false;
                    request.requestSendYueYueMessage(sendMessage, (res) => {//增加预约量／客户预约
                       // Log.log('res.RtnCode',res)
                        if(res.RtnCode!=200){
                            this.setState({
                                isShow:true,showMessage:false,msg:res.RtnMsg
                            });
                        }else{


                        }

                    });

                }
            });

            event.preventDefault();
            var self = this;
        }
    }
    Yanzhen(e) {
        var mobile = $('#Mobile').val();
        if (!mobile) {
            this.setState({
                isShow:false,showMessage:true,message:'请输入手机号码'
            })
            return;
        }
        if(!(/^1[3|4|5|6|7|8|][0-9]\d{4,8}$/.test(mobile))){
            this.setState({
                isShow:false,showMessage:true,message:'请输入正确的手机号'
            })
            return false;

        }else if(mobile.length!=11){
            this.setState({
                isShow:false,showMessage:true,message:'请输入正确的手机号'
            })
            return;
        }

        var sendData={
            vJsonData:{Target:'UserOrder', Mobile:mobile},
            GetCodeReq:'',
        };
        var self=this;
        request.requestMobileCode(sendData,(res)=>{
            var target=document.getElementById('getShareCode');
            target.setAttribute('disabled','disabled');
            //Log.log('res',res);

            var i=60;
            self.setState({timstamp:setInterval(function () {
                target.innerText=i+'s后重试';
                var timstamp=self.state.timstamp;
                if(i==0){
                    clearInterval(timstamp);
                    target.innerText='获取验证码';
                    target.disabled=false;
                }
                i--;
            },1000)})
            if(res.RtnCode==200){
                this.setState({ isShow:false,showMessage:true,message:'发送成功'});
            }else if(res.RtnCode==201){
                this.setState({ isShow:false,msg:res.RtnMsg,showMessage:true,message:res.RtnMsg});
            }else {
                this.setState({ isShow:false,msg:res.RtnMsg,showMessage:true,message:'发送失败请稍后再试'});
            }
        });
    }
    cance(){
        $('.yuyuekuang').addClass('none_');
        $('.mengban').addClass('none_');
        this.state.sname.value='';
        this.state.iphone.value='';
        this.state.ShareCode.value='';
        this.setState({
            isShow:false,showMessage:false,message:'',timstamp:clearInterval(this.state.timstamp)
        })
        var target=document.getElementById('getShareCode');
        target.innerText='获取验证码';
        target.disabled=false;

    }
}
export default YuePromise;