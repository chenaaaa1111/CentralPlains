/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
 */
import React from 'react';
import NavLink from './../../../../commons/components/NavLink'
import { Component } from 'react';
import { connect } from 'react-redux';
import request from './../../../../commons/utils/ServerRequest';
import {getList,jingjiItem} from './../pages/Actions';
import Header from './../components/Header';
import {query} from './../../../../commons/utils/Common';
import NoData from './../../../components/NoData';
import YuePromise from '../components/YuePromise';
import  Log from "./../../../../commons/utils/Log"
require('../../../less/commen.less');
require('../../../less/more.less');

class MyStore extends Component{
    constructor(props) {
        super(props);
        this.showMessage=this.showMessage.bind(this);
    }
    componentDidMount() {
        this.props.loadpuList();
        $('.yuyuelook').find('button').click(function () {
            return false;
        });
        function preventDefaultFn(event){
            event.preventDefault();
        }
        $('#cance').click(function () {
            $('.yuyuekuang').addClass('none_');
            $('.mengban').addClass('none_');
            $('body').off('touchmove', this.prentDefaut);

        });
        $('#yuyue').click(function () {
            $('body').off('touchmove', this.prentDefaut);
        });
        $('body').off('touchmove', this.prentDefaut);
        $('.yuekan').click(function(e){
         
        });
        var self=this;
    }
    prentDefaut(event){
        event.preventDefault();
    }
    showMessage(e){
        e.preventDefault();
        //   function preventDefaultFn(event){
        //     event.preventDefault();
        // }
        document.querySelector('#EstateID').value=e.target.id;
        document.getElementById('OrderEstateName').value=e.target.getAttribute('data-estName');
        $('body').on('touchmove', this.prentDefaut);
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

        return false;
    }

    render() {
        const {
            list,headerList,loadpuList
        } = this.props;
        return( <div >
                    <Header jingji={headerList?headerList:{}} allCout={list.AllCount} />
                    <div id="share_container" className="share_container" >
                        <ul>
                            {

                                this.props.list.length>0?this.props.list.map((item,index)=> {

                                    return  <NavLink to={'/store/details?ruleid='+item.RuleId+'&sharecode='+query('sharecode')+'&citycode='+query('citycode')
                                    +'&appversion='+query('appversion')+'&EstateID='+item.EstateID  } key={index}>
                                                <li className="share_items" >
                                                            <div className="img_item" style={{backgroundImage:'url("'+item.ImagePath+'")'}}>
                                                            </div>
                                                            <div className="font_item">
                                                                <h2>{item.EstateName}</h2>
                                                                <p className="onlyellipse">{item.CityName}{item.DistrictName}</p>
                                                                <p className="twoellipse">{item.PropertyUsage}</p>
                                                                <p><span>{item.APrice}</span>元/平</p>
                                                            </div>
                                                            <div className="yuyuelook">
                                                                <button className="yuekan" data-estName={item.EstateName}  id={item.EstateID}  onClick={(e)=>{
                                                                    this.showMessage(e)
                                                                }}>预约看房</button>
                                                            </div>

                                                </li>
                                           </NavLink>
                                }):(<NoData/>)
                            }
                        </ul>
                    </div>
                    <YuePromise/>

                    <div className="mengban none_">

                    </div>
            <input type="hidden" id="EstateID" />
            <input type="hidden" id="pageSize"  />
            <input type="hidden" id="estName" />
            <input type="hidden" id="OrderEstateName" />
        </div>);
    }
}
const mapStateToProps = (state, ownProps) => {
    let {list,headerList} = state;
    return {
        list: state.store.list,
        headerList:state.store.headerList
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadpuList: ()=> {
            var shareCode=query('sharecode');
            //调用浏览日志接口
            var daymessage={'shareCode':shareCode,BrowseSource:2}
                request.requestSeeDaylay(daymessage,(res)=>{
                });
            var EmpID='';
            let resheader={
            };
            var sendData={};
            var shopData={vJsonData:shareCode};
            let pageIndex=1,pageSize=5,allCount=$('#allCount').html(),isLoading=false,totolList={},isHas=true;
            request.requestGetShop(shopData,(res)=>{
                resheader=res.FYQEmployee;
                var WeixinPicUrl=resheader.WeixinPicUrl;
                EmpID=resheader.EmpID;
                var MSID=res.MSID;
                // Log.log(MSID);
                localStorage.setItem('WeixinPicUrl',WeixinPicUrl);
                dispatch(jingjiItem(resheader));
                document.title=resheader.EmpName+'的微店';
                $('#shoptitle').html(resheader.EmpName+'的微店');
                sendData={vSearchFields:{'Fields':[{'FieldName1': 'MSID', 'MDataType': 'string', 'MLogicWhere': '=', 'SearchValue': MSID, 'GroupName':'MSID'},
                    {
                        'FieldName1': 'EmpID',
                        'MDataType': 'string',
                        'MLogicWhere': '=',
                        'SearchValue': EmpID,
                        'GroupName':'EmpID'
                    }]},
                    "vPageAttribute":{"PageIndex":1, "PageSize":pageSize}};
                 // Log.log('sendData');
                request.requestWeidianList(sendData,(result)=>{
                    totolList=result;
                    if(result.length!=0){
                        allCount=result[0].AllCount;
                    }
                    $('#allCount').html(allCount);
                    dispatch(getList(result));
                    $('#pageSize').val();
                });

            });
            document.addEventListener('touchmove',()=>{
                let htmlHeight=document.body.clientHeight;
                var totolheight=document.documentElement.scrollTop+document.documentElement.clientHeight;
                if((pageIndex*pageSize)<allCount&&!isLoading){
                    pageIndex=pageIndex+1;
                    isLoading=true;
                    if(htmlHeight-totolheight<=100){
                        sendData.vPageAttribute.PageIndex=pageIndex;
                        request.requestWeidianList(sendData,(result)=>{
                            let res=result;
                            if(res.length!=0) {
                                totolList=totolList.concat(res);
                                dispatch(getList(totolList));
                            }
                            isLoading=false;
                        });
                    }
                }else {

                }
            },false);
            $('.weixinImg').remove();
        }
    }
}

const MyStoreContainer = connect(mapStateToProps, mapDispatchToProps)(MyStore);
module.exports = MyStoreContainer;