/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import {
    Router,
    Route,
    hashHistory
} from 'react-router';
import Log from  './../../../../commons/utils/Log'
import React, {
    Component
} from 'react';
import NavLink from './../../../../commons/components/NavLink'
import request from './../../../../commons/utils/ServerRequest';
import DateTransfrom from './../../../../commons/utils/DateTransform';
import { connect } from 'react-redux';
import FlexBoxBottom from '../components/FlexBoxBottom';
import {getDetailList,getTel,showdisfy,getMessage} from './Actions';
import YuePromiss from '../components/YuePromise';
import {query} from './../../../../commons/utils/Common';
import Myswiper from '../../../../commons/lib/swiper-3.4.2.min'
import Message from '../../../components/Message'
require('../../../less/jquery_swiper.less');
require('../../../less/commen.less');
require('../../../less/more.less');
require('../../../less/weiXinImage.less');
class StoreDetails extends Component {
    constructor(props) {
        super(props);
        this.tel.bind(this);
        this.componentDidMount.bind(this);
        this.state={telnum:''}

    }
    componentDidMount() {
        document.title='盘源详情';
       this.props.loadItemDetail();
       this.tel();
        document.getElementById('mainContenner').scrollIntoView(true);

    }
    render(){
        const {tel,itemDetail,pohotoList,sendPromess,isShow,message}=this.props;
        return <div id="mainContenner">
                    <div style={isShow?{'display':'block'}:{'display':'none'}}>
                        {/*<SwiperContainer photoList={this.props.itemDetail.EstatePhotoList}/>*/}
                        <div className="ra swiper-container">
                            <div className="swiper-wrapper" >
                                {
                                    itemDetail.EstatePhotoList?itemDetail.EstatePhotoList.map((value,index)=>{
                                        return  value.PhotoList.map((val,indexK)=>{
                                            return <div className="swiper-slide" style={{backgroundImage:'url("'+val.FileUrl+'")'}}
                                                        onClick={this.props.handleClick}
                                                        key={indexK} data-PhotoType={value.PhotoType}><NavLink to={'/store/imageView?photoType='
                                            +value.PhotoType
                                            + '&sharecode='+query('sharecode')
                                            +'&citycode='+query('citycode')
                                            +'&appversion='+query('appversion')} >
                                           
                                            </NavLink>
                                                </div>
                                        });
                                    }):''
                                }
                            </div>

                            <div className="ab title_swiper"  ><img
                                src={require("../../../images/tupian.png")}/><span id="activeIndex">1
                                                    </span>/<span id="imgnum"></span></div>
                        </div>
                        <div className="swiper-pagination"></div>
                        <div id="loupancon">
                            <div className="contop">
                                <h2>{this.props.itemDetail.EstateInfo?this.props.itemDetail.EstateInfo.EstateExtName:''}</h2>
                                <p>{this.props.itemDetail.EstateInfo?this.props.itemDetail.EstateInfo.APriceText:''}</p>
                            </div>

                            <ul className="items">
                                <li><span className="title">开盘时间 :</span><span className="content">
                            {(itemDetail.EstateInfo&&itemDetail.EstateInfo.DateOpen)?DateTransfrom.timformat(itemDetail.EstateInfo.DateOpen):'暂无'}</span> </li>
                                <li><span className="title">交房时间 :</span><span className="content">
                            {(itemDetail.EstateInfo&&itemDetail.EstateInfo.DateCanLive)?DateTransfrom.timformat(itemDetail.EstateInfo.DateCanLive):'暂无'}</span> </li>
                                <li><span className="title"> 楼盘地址 :</span><span className="content">
                            {itemDetail.EstateInfo?itemDetail.EstateInfo.Address:''}</span> </li>
                                <li><span className="title">物业类型 :</span><span className="content">
                            {itemDetail.EstateInfo?itemDetail.EstateInfo.PropertyUsage:''}</span> </li>
                                <li><span className="title">产权年限 :</span><span className="content">
                            {itemDetail.EstateInfo?itemDetail.EstateInfo.UseYears:'' }</span> </li>
                                <li><span className="title">开发商 :</span><span className="content">
                            {itemDetail.EstateInfo?itemDetail.EstateInfo.CompanyDev:''}</span></li>
                            </ul>
                            <div className="tabsrinop zaishou">

                                <h3>户型介绍</h3>
                                <ul>
                                    {itemDetail.RoomTypes?itemDetail.RoomTypes.map((value,key)=>{
                                        return   <li className="onSaleList" key={key} id={key}>
                                            <NavLink to={'/store/onsale?EstateID='+itemDetail.EstateInfo.EstateID+'&citycode='
                                            +query('citycode')+'&appversion='+query('appversion')+'&sharecode='+query('sharecode')
                                            +'&countf='+value.CountF+'&EstateExtName='+itemDetail.EstateInfo.EstateExtName}>
                                                <p>{value.CountF}房（{value.Count}套户型）{value.MinPrice} </p>
                                            </NavLink>
                                        </li>

                                    }):''}
                                </ul>
                            </div>
                            <div className="tabsrinop zaishou borderbottom"
                                 style={{'display':itemDetail.EstateInfo&&itemDetail.EstateInfo.EstateSalePoint?'block':'none'}}>
                                <h3>项目卖点</h3>
                                <p className="tedian ">{itemDetail.EstateInfo?itemDetail.EstateInfo.EstateSalePoint:'' }</p>
                            </div>
                        </div>
                        <input type="hidden"  id="EstateID" name="EastId" value={itemDetail.EstateInfo?itemDetail.EstateInfo.EstateID:''} />
                        <FlexBoxBottom  seeHouse={this.seeHouse} telphone={this.telphone} telphonenuber={tel} zixun={this.zixun} />
                        <button style={{'display':'block','color':'#fff'}} id='slideTo'>加载</button>
                        <YuePromiss  sendMessage={sendPromess}/>
                    </div>
                    <Message isShow={!isShow} msg={message} />
                    <input type="hidden" id="estName" value={this.props.itemDetail.EstateInfo?this.props.itemDetail.EstateInfo.EstateExtName:''} />
              </div>

    }
    seeHouse(){
        $('.yuyuekuang').removeClass('none_');
        $('.mengban').removeClass('none_');
        function preventDefaultFn(event){
            event.preventDefault();
        }
        $('body').on('touchmove', preventDefaultFn);
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
        $('#cance').click(function () {
            $('.yuyuekuang').addClass('none_');
            $('.mengban').addClass('none_');
            $('body').off('touchmove', preventDefaultFn);

        });
        $('#yuyue').click(function () {
            $('body').off('touchmove', preventDefaultFn);
        });
        $('.yuekan').click(function(){
            $('.yuyuekuang').removeClass('none_');
            $('.mengban').removeClass('none_');

        });

    }
    telphone(e){

    }
    zixun(e){
        $('#app').append('<div class="weixinImg" style="line-height: '+window.document.documentElement.clientHeight+'px;">' +
            '<img src="'+localStorage.getItem("WeixinPicUrl")+'" alt="二维码" title="二维码" id="weiCode" />' +
            '</div>');
        $('#mainContenner').css('display','none');

    }
    tel(){

    }

}
const mapStateToProps = (state, ownProps) => {
    let {itemDetail,pohotoList,tel} = state;
    return {
        itemDetail:state.detail.itemDetail,
        pohotoList:state.detail.pohotoList,
        tel:state.detail.tel,
        isShow:state.detail.isShow,
        message:state.detail.message
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadItemDetail: ()=> {
            document.getElementById('mainContenner').scrollIntoView(true);
            var seach=query('ruleid');
            var sendData={vJsonData:seach};
            var imgSendData={vJsonData:'6a81679b-b019-4e69-b63f-5e71454e786a'};
            var shareCode=query('sharecode');
            //调用浏览日志接口
            var daymessage={'shareCode':shareCode,BrowseSource:2}
            request.requestSeeDaylay(daymessage,(res)=>{
            });
            request.requestStoreItems(sendData,(res)=>{
                if(res.RtnCode==201){
                     if(res.RtnCode==201){
                         dispatch(showdisfy(false));
                         dispatch(getMessage(res.RtnMsg));
                     }
                     return;
                }else if(res.content&&res.content.EstateInfo&&res.content.EstateInfo.DeleteStatus==0){
                    dispatch(showdisfy(false));
                    dispatch(getMessage('本套房源已下架'));
                } else{
                    dispatch(showdisfy(true));
                }
                dispatch(getDetailList(res.content));
                    var photoArray=res.content.EstatePhotoList;
                    localStorage.setItem('photoArray',JSON.stringify(photoArray));//分组图片ImageView 用到的数据
                    localStorage.setItem('Imgnum',photoArray.length);//图片数量
                    var mySwiper = new Swiper('.swiper-container', {
                        direction: 'horizontal',
                        touchRatio : 0.5,
                        loop:true,
                        observer:true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true,//修改swiper的父元素时，自动初始化swiper
                        onInit:(swiper)=>{
                            $('#imgnum').html(swiper.slides.length-2>0?swiper.slides.length-2:0);
                        },
                        onSlideChangeStart: function(swiper){
                            $('#activeIndex').text(swiper.realIndex+1);
                        }
                    });
            });

            var shopData={vJsonData:shareCode};
            var self=this;
            request.requestGetShop(shopData,(res)=>{
                dispatch(getTel(res.FYQEmployee.Mobile));

            });
            $("#app").on('click','.weixinImg',function (e) {
                $('.weixinImg').remove();
                $('#mainContenner').show();
            });
                $('.weixinImg').remove();

        },
        handleClick:(e)=>{
        },
        sendPromess:(e)=>{
        }
    }


}


const StoreDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
module.exports = StoreDetailsContainer;