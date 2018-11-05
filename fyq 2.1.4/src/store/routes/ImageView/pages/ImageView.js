/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:02:30
 * @version $Id$
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
import request from './../../../../commons/utils/ServerRequest';
import { connect } from 'react-redux';
import {getPhotoList,getShowList} from './Actions';
import Myswiper from '../../../../commons/lib/swiper-3.4.2.min';
import {query} from '../../../../commons/utils/Common'
require('../../../less/jquery_swiper.less');
require('../../../less/commen.less');
require('../../../less/more.less');
import '../../../less/ImageView.less';
class ImageView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.initImageData();

    }
    componentDidUpdate(){
        if($('.activety').get(0)){
            $('.activety').get(0).scrollIntoView();
        }

    }
    render(){
        const {ImageViewList,showList,handleClick}=this.props;
        return    (<div id="imgViewContainer" >
                    <div id="tabContainer">
                        <div id="tabParent">
                            <ul className="imageTab">
                                {ImageViewList.length>0?ImageViewList.map((val,key)=>{
                                    if(ImageViewList.length<=4){
                                        return <li key={key}
                                                   className={val.PhotoType==localStorage.getItem('imgType')?'tabImage activety':'tabImage'}
                                                   onClick={handleClick}  data-tabTotol={ImageViewList.length} id={key+1}
                                                   data-photoType={val.PhotoType}>{val.PhotoType}</li>
                                    }else{
                                        return  <li key={key}
                                                    className={val.PhotoType==localStorage.getItem('imgType')?'tabImage activety':'tabImage'}
                                                    onClick={handleClick}  data-tabTotol={ImageViewList.length} id={key+1}
                                                    data-photoType={val.PhotoType}>{val.PhotoType}</li>
                                    }

                                }):''}
                                {

                                }
                                {/*<li className="activety">户型图</li><li>分享图</li>*/}
                            </ul>
                        </div>


                    </div>

                        <div className="ra swiper-container allheight">
                            <div className="swiper-wrapper allheight">
                                {showList?showList.map((val,key)=>{

                                   return  <div className="swiper-slide allheight table" data-tatolNum={showList.length} key={key}><div className="tablecell"><img src={val.FileUrl}/></div></div>
                                }):''}
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                        <input type="hidden" value={showList.length} id="totolNum" />
                        <button id="gets0" style={{'display':'none'}}></button>
                    </div>)

    }
}
const mapStateToProps = (state, ownProps) => {
    let {ImageViewList,showList} = state;
    return {
        ImageViewList:state.imageView.ImageViewList,
        showList:state.imageView.showList
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initImageData:()=>{
            var ImageViewList= JSON.parse(localStorage.getItem('photoArray'));
            if(!ImageViewList){
                request.requestEastPhotoList('');
            }
            var isEnd=false;
            var isStart=false;
            var Onend=false;
            var isBeginning=false;
            dispatch(getPhotoList(ImageViewList));
            var imgType=query('photoType');
            localStorage.setItem('imgType',imgType);
            ImageViewList.map((val,key)=>{
                if(val.PhotoType==imgType){
                    dispatch(getShowList(val.PhotoList));
                    return;
                }
            });

            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                touchRatio : 0.5,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                pagination : '.swiper-pagination',
                paginationClickable :true,
                onSlideChangeStart: function(swiper){

                },
                onTransitionEnd:function(swiper){
                    var imgTotal=$('.swiper-slide').get(0).getAttribute('data-tatolnum');
                    var realIndex=swiper.realIndex;
                    if(swiper.swipeDirection=='next'&&Onend){
                        if(realIndex==imgTotal-1){
                                var tabIndex=$('.activety').attr('id');
                                var tabTotal=$('.activety').attr('data-tabtotol');
                                if(tabIndex<tabTotal){
                                    $($('.tabImage').get(tabIndex)).addClass('activety').siblings().removeClass('activety');
                                    $('.activety').get(0).scrollIntoView();
                                    dispatch(getShowList(ImageViewList[tabIndex].PhotoList));
                                    // $($('.swiper-pagination-bullet').get(0)).trigger('click');
                                    swiper.slideTo(0,0,false);
                                }


                        }
                    }
                    if(swiper.swipeDirection=='prev'&&isBeginning){
                        if(realIndex==0){
                                var tabIndex=$('.activety').attr('id');
                                if(tabIndex>1){
                                    $($('.tabImage').get(tabIndex-2)).addClass('activety').siblings().removeClass('activety');
                                    dispatch(getShowList(ImageViewList[tabIndex-2].PhotoList));
                                    swiper.slideTo(imgTotal,0,false);
                                    $('.activety').get(0).scrollIntoView();
                            }
                        }
                    }
                },
                onSliderMove: function(swiper, event){
                  if(swiper.isEnd){
                      Onend=true;
                  }else {
                      Onend=false;
                  }
                  if(swiper.isBeginning){
                      isBeginning=true;
                  }else{
                      isBeginning=false;
                  }
                }

            });

        },
        handleClick:function (e) {
            var target=e.target;
            $(target).addClass('activety').siblings().removeClass('activety');
            var imgType=$(target).text();
            var ImageViewList= JSON.parse(localStorage.getItem('photoArray'));
            ImageViewList.map((val,key)=>{
                if(val.PhotoType==imgType){
                    dispatch(getShowList(val.PhotoList));
                }
            });
            $($('.swiper-pagination-bullet').get(0)).trigger('click');
        }


    }


}


const ImageViewContainer = connect(mapStateToProps, mapDispatchToProps)(ImageView);
module.exports = ImageViewContainer;