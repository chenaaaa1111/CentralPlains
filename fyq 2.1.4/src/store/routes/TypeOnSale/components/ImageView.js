/**
 * Created by mac on 17/10/16.
 */
import React, {
    Component
} from 'react';
import '../../../less/ImageView.less';
import Myswiper from '../../../../commons/lib/swiper-3.4.2.min'
require('../../../less/jquery_swiper.less');
class ImageView extends Component{
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
    }
    render(){

        return(<div id="imgViewContainer" style={{'display':this.props.show?'block':'none'}}>
                    <ul className="imageTab">
                        <li>效果图</li><li className="activety">户型图</li><li>分享图</li>
                    </ul>
                    <div className="ra swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide"><img src={require("../../../images/sdfs.jpg")}/></div>
                            <div className="swiper-slide"><img src={require("../../../images/sdfs.jpg")}/></div>
                            <div className="swiper-slide"><img src={require("../../../images/sdfs.jpg")}/></div>
                        </div>
                    </div>
               </div>);
    }
}
module.exports=ImageView;