/**
 * Created by mac on 17/11/20.
 */
import React ,{Component} from 'react';
import Log from './../../commons/utils/Log';
class Alert extends Component{
    constructor(props){
        super(props);
        // Log.log(props);
        this.state={isShow:props.isShow};
        this.componentWillReceiveProps.bind(this);
        // Log.log(this.state);
    }
    componentDidMount() {
    }
    componentWillReceiveProps(){
        this.setState({isShow:this.props.isShow});
    }
    render(){
        const {msg,isShow}=this.props;

                return (
                        <div className="alertMenban" style={this.props.isShow&&this.state.isShow?{'display':'block'}:{'display':'none'}} ref="alert">
                            <div style={this.props.isShow&&this.state.isShow?{'display':'block'}:{'display':'none'}}   className="AlertMessag"><p>{this.props.msg}</p>
                                <button id="surealert" onClick={()=>{
                                    this.setState(
                                        {isShow:false}
                                    )
                                    if(this.props.callback){
                                        this.props.callback();
                                    }
                                    // this.refs.alert.style.display='none';
                                }} >确定</button>
                            </div>
                        </div>
                );


    }

}
Component.msg='预约成功'
module.exports= Alert;