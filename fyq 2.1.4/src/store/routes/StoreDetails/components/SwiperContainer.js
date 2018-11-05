/**
 * Created by mac on 17/10/11.
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
import ReactDOM from 'react-dom';
import Myswiper from '../../../../commons/lib/swiper-3.4.2.min'
import Log from  './../../../../commons/utils/Log'
require('../../../less/jquery_swiper.less');
class SwiperContainer extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            touchRatio : 0.5,
            loop:true,
            onSlideChangeStart: function(swiper){
                $('#activeIndex').text(swiper.realIndex+1);
            }
        });
        function gozaishou(e) {
            Log.log(e);
        }
        Log.log(this.props.photoList);
    }

    render(){
        return(
            <div className="ra swiper-container">
                <div className="swiper-wrapper" >
                    {
                        this.props.photoList.EstatePhotoList? this.props.photoList.EstatePhotoList.map(function (value,index) {
                           return <div className="swiper-slide" key={index}>
                           // <img src={value.FilePath}/>
                           </div>
                        }):''
                    }
                </div>
                <div className="ab title_swiper"><img src={require("../../../images/tupian.png")}/><span id="activeIndex">1</span>/<span>3</span></div>
            </div>
        );
    }
}
module.exports=SwiperContainer;