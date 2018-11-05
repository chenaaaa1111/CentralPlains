/**
 * Created by mac on 17/10/11.
 */
import  React,{Component} from 'react';
import Log from  './../../../../commons/utils/Log'
class Container extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    render(){
        return (<div className="container_" onTouchMove={this.touchmoveHandle}>
                    <ul className="shop-list">
                    </ul>
                    <h4>共<span>{this.props.totolnum}</span>个，上拉加载更多</h4>
                </div>)
    }
    touchmoveHandle(list){
        this.props.touchmoveHandle(list);
    }
}
module.exports=Container;