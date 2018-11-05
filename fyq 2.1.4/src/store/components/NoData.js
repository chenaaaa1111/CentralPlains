/**
 * Created by mac on 17/10/30.
 */
import React ,{Component} from 'react';
import Log from './../../commons/utils/Log';
class NoData extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }
    render(){

        return (<div style={{'margin-left':'-20px','text-align':'center'}}>暂无更多数据</div>);
    }

}

module.exports= NoData;