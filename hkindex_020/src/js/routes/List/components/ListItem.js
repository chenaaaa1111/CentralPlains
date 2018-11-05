import React from 'react';
import ReactDOM from 'react-dom';
import LazyLoad from 'react-lazyload';
import {
    browserHistory
} from 'react-router';
import NavLink from './../../../components/NavLink';
import {
    LISTITEM_ACTION_EDIT,
    LISTITEM_ACTION_RENT,
    LISTITEM_ACTION_SELL,
    LISTITEM_ACTION_REMOVE,
    LISTITEM_ACTION_DELETE,
    PUTAWAY_VALUE,
    ONPUTAWAY_VALUE,
    PUSH_VALUE
} from './../../../obj/Const';
import Config from './../../../obj/Config';
class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.showTypeMark = this.showTypeMark.bind(this);
        this.edit = this.edit.bind(this);
    }
    componentWillUnmount() {
        let {
            info,
            type
        } = this.props;
        this.props.closeMenu(info.adid, type, !info.showMenu);
    }
    check() {
        let {
            info,
            type,
            onCheck
        } = this.props;
        if (info.isCheckable) {
            var android = navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
            if (android) {
                setTimeout(() => {
                    let loadmore = this.props.loadmore;
                    if (!loadmore) {
                        onCheck(info.adid, type, !info.checked);
                    }
                }, 100);
            } else {
                onCheck(info.adid, type, !info.checked);
            }
        }
    }
    edit(adid, houseid, type, value) {
        this.props.closeMenu(adid, type, false);
        let path = Config.routerRoot + "publish/edit/" + adid + "?prev=" + type;
        browserHistory.push(path);
    }
    showTypeMark() {
        let {
            info
        } = this.props;
        let marks = [];
        if (info.status === PUTAWAY_VALUE && info.isFollow) {
            marks.push(<span key="old" className="tagb mr5">跟</span>);
        }
        if (info.status === PUTAWAY_VALUE && info.isNew) {
            marks.push(<span key="new" className="tago mr5">新</span>);
        }
        if (info.status === PUTAWAY_VALUE && info.isHot) {
            marks.push(<span key="hot" className="tagy mr5">笋</span>);
        }
        return marks;
    }
    showValid() {
        let {
            info
        } = this.props;
        if (info.status === ONPUTAWAY_VALUE) {
            return "[" + info.statusName + "]";
        } else if (info.status != PUTAWAY_VALUE) {
            return "[" + info.valid + "]";
        }
    }
    render() {
        let {
            info,
            type,
            status,
            onCheck,
            onListItemAction,
            onShowMenu
        } = this.props;
        let enabledClass = "flbtn bgo mb10";
        let lastClass = "flbtn bgo";
        return <li className="list-item flbox" onClick={()=>{this.check(!info.checked)}}>
            <div className="chkboxSquare mr10" style={{display:info.isCheckable?"block":"none"}}>
                <span className="mark" style={{display:info.isCheckable&&info.checked?"block":"none"}}></span>
            </div> 
            <div className = "lstimg" style={{display:info.showImage?"block":"none"}}><LazyLoad height={85} offset={100}><img src={info.defaultImg?info.defaultImg+"?width=200":require("../../../../images/list_img.png")} alt="" /></LazyLoad></div> <div className = "lstct flr">
            <p className="tl13">{this.showTypeMark()}{info.status===ONPUTAWAY_VALUE?this.showValid():''}{info.adno?["广告号-",info.adno].join(''):''}</p> 
            <p><span className="lb6a12 mr12">{!info.status?this.showValid():''}{info.estname}</span><span className = "lb6a12 mr12">{info.address}</span></p>
            <p><span className="lb6a12 mr12">{info.housetype}</span><span className="lb6a12 mr12">{info.size?[info.size,"平米"].join(''):''}</span><span className="lb6a12 mr12">{status==="S"?info.price+"万":info.price+"元/月"}</span></p> 
            <div className = "rel" ><span style={{display:info.showUpdateTime?"block":"none"}}><span className="lb9a12 mr12">{info.updatetime}天未更新</span><span className="lb9a12 mr12" style={{visibility:info.status === PUTAWAY_VALUE?"visible":"hidden"}}>中原:{info.centaline}</span><span className="lb9a12 mr12" style={{visibility:info.status === PUTAWAY_VALUE?"visible":"hidden"}}>端口:{info.port}</span></span> 
                <div className = "more" style={{display:!info.isCheckable?"block":"none"}} >
                <img className="moreicon" src={require("../../../../images/more.png")} alt="" onClick={(evt)=>{$("#output").html($(evt.target).parent().find(".popmenu").css("z-index")+":"+$(".popbg").css("z-index"));onShowMenu(info.adid,type,!info.showMenu)}}/>
                    <div className = "popmenu" style={{display: info.showMenu? "block" : "none"}}>
                        <div className="tr mr10"><img src={this.defaultImg?defaultImg:require("../../../../images/angle.png")} alt="" /></div>
                            <ul className = "menu" > 
                            {
                                info.menuitems.map((item, index) => {
                                    if(item.visible){
                                        if(item.value===LISTITEM_ACTION_EDIT){
                                            return <a key={[item.value,index].join('')} onClick={()=>{this.edit(info.adid,info.houseid,type,item.value)}} href='javascript:void(0)'><li className={enabledClass}>{item.label}</li></a>
                                        }else if(item.value===LISTITEM_ACTION_SELL||item.value===LISTITEM_ACTION_RENT){
                                            return <a key={[item.value,index].join('')} onClick={()=>{this.edit(info.adid,info.houseid,type,item.value)}} href='javascript:void(0)'><li className={lastClass}>{item.label}</li></a>
                                        }else if(item.value===LISTITEM_ACTION_REMOVE||item.value===LISTITEM_ACTION_DELETE){
                                            return <a key={[item.value,index].join('')} onClick={()=>{onListItemAction(info.adid,info.houseid,type,item.value,info.valid)}} href='javascript:void(0)' ><li className={lastClass}>{item.label}</li></a>
                                        }else{
                                            return <a key={[item.value,index].join('')} onClick={()=>{onListItemAction(info.adid,info.houseid,type,item.value,info.valid)}} href='javascript:void(0)' ><li className={enabledClass}>{item.label}</li></a>
                                        }
                                    }
                                })
                            }
                            </ul> 
                        </div>
                    </div> 
                </div> 
            </div> 
        </li>;
    }
}

export default ListItem;