/**
 * Created by mac on 17/10/9.
 */
import {
    Router,
    Route,
    hashHistory,
    Link
} from 'react-router';
import React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import {getImgList,getOnsaleDetail,getTotolDetail,getTel} from './Actions'
import FlexBoxBottom from '../components/FlexBoxBottom';
import  request from '../../../../commons/utils/ServerRequest';
import YuePromiss from '../components/YuePromise';
import {query} from './../../../../commons/utils/Common';
import Log from  './../../../../commons/utils/Log'
require('../../../less/jquery_swiper.less');
require('../../../less/commen.less');
require('../../../less/more.less');
require('../../../less/weiXinImage.less');
class TypeOnSale extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title='户型介绍';
        this.props.loadItemDetail();
        document.getElementById('tabImg').scrollIntoView(true);

    }
    componentDidUpdate(){
    }
    render(){
        let {imgList,tel,onsaleDetail,TotolDetail}=this.props;
        return(<div id="mainContenner">
                    <header className="houseChange" style={{display:this.props.containerOnshow?'block':'none'}}>
                        <ul id="tabImg">
                            {/*{Log.log('TotolDetail',TotolDetail)}*/}
                            {TotolDetail?TotolDetail.map((val,index)=>{
                                return <li className={val.CountF==query('countf')?"houseOne changed":'houseOne '} id={val.CountF} data-sid="onHose"
                                           onClick={this.props.toggle} key={index} >{val.CountF}房<span className={val.CountF==query('countf')?"changed":''} ></span></li>
                            }):''}
                        </ul>
                    </header>

                    <div id="container" style={{display:this.props.containerOnshow?'block':'none'}}>
                        <div id="onHose"  style={{'display':'block'}}>
                            <div className="ra swiper-container" id="onHouseSwiper">
                                <div className="swiper-wrapper">
                                    {imgList.result?imgList.result.map((val,index)=>{
                                       return <div className="swiper-slide" key={index} id={val.WNPRoomTypeID} style={{backgroundImage:'url("'+val.imgFilePath+'")'}} >
                                           {/*<img src={val.imgFilePath}/>*/}
                                       </div>
                                    }):''}

                                </div>
                                {/*{Log.log('onsaleDetail',onsaleDetail)}*/}
                                <h1 id="onsaleMessage">{onsaleDetail.RoomTypeInfo} {onsaleDetail.RoomTypePrices}元  首付{onsaleDetail.FirstPayMent}元</h1>
                            </div>
                            <div className="tabs  itemlist">
                                <ul>
                                    <li className="itemsdetail">
                                        <div className="itemLeft">均价 : <span>{onsaleDetail.Aprice?onsaleDetail.Aprice:''}元／平</span></div><div className="itemRight">
                                        总价 : <span>{onsaleDetail.SystemCalculatePrices?onsaleDetail.SystemCalculatePrices:''}</span>
                                    </div>
                                    </li>
                                    <li className="itemsdetail">
                                        <div className="itemLeft">参考面积 : <span>{onsaleDetail.Squares?onsaleDetail.Squares:''}</span></div><div className="itemRight">
                                        朝向 : <span>{onsaleDetail.FaceDesc?onsaleDetail.FaceDesc:''}</span>
                                    </div>
                                    </li>
                                    <li className="itemsdetail">
                                        <div className="itemLeft">
                                            在售状态 : <span>{onsaleDetail.AvilStatus?onsaleDetail.AvilStatus:''}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="tabs zhiye">
                                <h1>置业计划</h1>
                                {onsaleDetail.LoanPlanDes?onsaleDetail.LoanPlanDes.map((val,key)=>{
                                    return <div key={key} dangerouslySetInnerHTML={{__html:'<div>'+val+'</div>'}}></div>
                                }):''}

                            </div>
                        </div>
                        <h6>注：资料仅供参考，请以实际购房为准</h6>

                        <FlexBoxBottom seeHouse={this.seeHouse} telphone={this.telphone} telphonenuber={tel} zixun={this.zixun} />
                    </div>
            <YuePromiss  />
            <input type="hidden" id="swiperIndex" />
            <input type="hidden" id="estName" value={query('EstateExtName')} />
        </div>)

    }
    tottle(e){

        var tartget=e.target;

        var id=tartget.getAttribute('data-sid');
        $(tartget).addClass('changed').siblings().removeClass('changed');
        $("#"+id).css('display','block').siblings().css('display','none');
        var counf=$(tartget).attr('id');
        var totldetail=JSON.parse(localStorage.getItem('TotolDetail'));
        totldetail.map((val,key)=>{
           if(val.CountF=counf){
               dispatch(getImgList(val.RoomTypes.RoomeTypeImages));
               dispatch(getOnsaleDetail(val.RoomTypes));
           }
        });

    };
    seeHouse(e){
        $('.yuyuekuang').removeClass('none_');
        $('.mengban').removeClass('none_');
        function preventDefaultFn(event){
            event.preventDefault();
        }
        $('#yuyue').click(function () {
            if(preventDefaultFn){
                $('body').off('touchmove', preventDefaultFn);
            }

        });
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

        $('.yuekan').click(function(){
            $('.yuyuekuang').removeClass('none_');
            $('.mengban').removeClass('none_');
        });
        $('#yuyue').click(function () {
            $('.yuyuekuang').addClass('none_');
            $('.mengban').addClass('none_');
        });

    }
    zixun(e){
        $('#app').append('<div class="weixinImg" style="display: block; line-height: '+window.document.documentElement.clientHeight+'px">' +
                     '<img src="'+localStorage.getItem("WeixinPicUrl")+'" alt="二维码" title="二维码" id="weiCode" />' +
            '</div>');
         $('#mainContenner').css('display','none');
    }
}

const mapStateToProps = (state, ownProps) => {
    let {imgList,textItem,planList,imageViewShow,onsaleDetail,TotolDetail,tel} = state;
    return {
          imageViewShow:state.onsale.imageViewShow,
          containerOnshow:state.onsale.containerShow,
          onsaleDetail:state.onsale.onsaleDetail,
          imgList:state.onsale.imgList,
          TotolDetail:state.onsale.TotolDetail,
          tel:state.onsale.tel
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadItemDetail: ()=> {
            var esateId=query('EstateID');
            let  senddata={"vJsonData":esateId}//楼盘Id
            request.requestOnsaleHouseList(senddata,(res)=>{
                //Log.log('res',res);
                dispatch(getTotolDetail(res));
                Log.log(1);
                var imgArray=[];
                var roomTypes=[];
                Log.log(2);
                res.map((val,key)=>{
                    if(val.CountF==query('countf')){
                        //Log.log('val',val);
                        //Log.log(3);
                        roomTypes=val.RoomTypes;
                    }
                });
                //Log.log(4);
                roomTypes.map((value,keyIndex)=>{
                    Log.log('value',value);
                    imgArray.push({'imgFilePath':value.RoomeTypeImages?value.RoomeTypeImages[0]:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512649584315&di=5a4d519ad12a20595548736e5b8bb188&imgtype=0&src=http%3A%2F%2Fimg10.3lian.com%2Fedu121104%2Fphotoshop%2Fpshecheng%2F201210%2Fcb36a77d669ecd350dbe9e307ee36d2e.jpg',
                        'WNPRoomTypeID':value.WNPRoomTypeID});
                });
                Log.log('imgArray',imgArray);
                dispatch(getImgList(imgArray));
                dispatch(getOnsaleDetail(roomTypes[0]));
                //Log.log(5);
                localStorage.setItem('roomTypes',JSON.stringify(roomTypes));
                localStorage.setItem('TotolDetail',JSON.stringify(res));
                Log.log('11');
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    touchRatio : 1,
                    loop:false,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    onInit: function(swiper){
                        $('#swiperIndex').val(swiper.realIndex);

                    },
                    onSlideChangeStart: function(swiper){
                        $('#swiperIndex').val(swiper.realIndex);
                        var swiperIndex=$('#swiperIndex').val();
                        var vxId=$('.swiper-slide')[swiperIndex].getAttribute('id');
                        var houseTypeList=JSON.parse(localStorage.getItem('roomTypes'));
                        houseTypeList.map((value,key)=>{
                            if(vxId==value.WNPRoomTypeID){
                                    dispatch(getOnsaleDetail(value));
                            }
                        })
                    }
                });
            });
            var shareCode=query('sharecode');
            // var shopData={vJsonData:shareCode};
            // request.requestGetShop(shopData,(res)=>{
            //     Log.log('res.FYQEmployee.Mobile',res.FYQEmployee.Mobile);
            //     dispatch(getTel(res.FYQEmployee.Mobile));
            //
            // });
            $("#app").on('click','.weixinImg',function (e) {
                $('.weixinImg').remove();
                $('#mainContenner').css('display','block');
            });
            $('.weixinImg').remove();
        },
        toggle:(e)=>{
            var tartget=e.target;
            var id=tartget.getAttribute('data-sid');
            $(tartget).addClass('changed').siblings().removeClass('changed').find('span').removeClass('changed');
            $(tartget).find('span').addClass('changed');
            var counf=$(tartget).attr('id');
            var totldetail=JSON.parse(localStorage.getItem('TotolDetail'));
            var imgArray=[];
            totldetail.map((val,key)=>{
                if(val.CountF==counf){
                    var swiperIndex=$('#swiperIndex').val();
                    dispatch(getOnsaleDetail(val.RoomTypes[0]));

                    val.RoomTypes.map((value,key)=>{
                            imgArray.push({'imgFilePath':value.RoomeTypeImages?value.RoomeTypeImages[0]:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512649584315&di=5a4d519ad12a20595548736e5b8bb188&imgtype=0&src=http%3A%2F%2Fimg10.3lian.com%2Fedu121104%2Fphotoshop%2Fpshecheng%2F201210%2Fcb36a77d669ecd350dbe9e307ee36d2e.jpg',
                                'WNPRoomTypeID':value.WNPRoomTypeID});
                    });
                    dispatch(getImgList(imgArray));

                    localStorage.setItem('roomTypes',JSON.stringify(val.RoomTypes));
                }
            });
        }

    }
}

const TypeOnSaleContainer = connect(mapStateToProps, mapDispatchToProps)(TypeOnSale);
module.exports = TypeOnSaleContainer;