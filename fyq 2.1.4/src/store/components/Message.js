/**
 * Created by mac on 17/11/20.
 */
import React ,{Component} from 'react';
import Log from './../../commons/utils/Log';
class Message extends Component{
    constructor(props){
        super(props);
        Log.log('props',props);
        this.state={isShow:props.isShow};
       this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
        this.componentDidUpdate.bind(this)
    }
    componentDidMount() {
    }
    componentWillReceiveProps(){
        this.setState({isShow:this.props.isShow});
        var self=this;
        try{
            var messagewap=document.getElementById('messageWap');
            if(messagewap.style.display=='block'){
                    }
                if(settimestamp){
                    clearTimeout(settimestamp);
                }
                let  settimestamp=setTimeout(function(){
                    messagewap.style.display='none';
                },2000);

        }catch (err){


        }


    }
    componentDidUpdate(){
    }
    render(){
        const {msg,isShow}=this.props;
        {Log.log('this.props.isShow',this.props.isShow)}
        return (
        <div style={this.props.isShow?{'display':'block'}:{'display':'none'}} ref='messageWap'
             id="messageWap" className="messageWap" >
            <div  className="Messag_"><p>{this.props.msg}</p>
            </div>
        </div>
        );


    }

}
Component.msg='预约成功'
module.exports= Message;