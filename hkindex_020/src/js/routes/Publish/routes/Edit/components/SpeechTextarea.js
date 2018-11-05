import React from 'react';
import ReactDOM from 'react-dom';

class SpeechTextarea extends React.Component {
	constructor(props) {
		super(props);
		this.onTextAreaInput = this.onTextAreaInput.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
	}
	onTitleChange() {
		let title = this.refs.titleipt.value;
		this.props.onTitleChange(title);
	}
	onTextAreaInput() {
		let description = this.refs.desctxtarea.value;
		this.props.onDescChange(description);
	}
	componentDidMount() {
		this.props.speechInit();
		this.refs.titleipt.maxlength = 30;
		this.refs.desctxtarea.maxlength = 500;
	}
	render() {
		let {
			title,
			description,
			onDescChange,
			onSpeech,
			onTitleChange
		} = this.props;
		return <div className="content-box">
	        <section className="ctboxct">
	            <form action="" onSubmit={(e)=>{e.preventDefault();return false;}}>
	                <input maxLength="30" name="titleipt" ref="titleipt" className="ipt required" placeholder={title||"填写房源标题"} onInput={this.onTitleChange} onFocus={()=>{this.refs.titleipt.value=title}}></input>
	                <textarea name="desctxtarea" maxLength="500" ref="desctxtarea" className="txtarea required" rows="4" placeholder={description||"填写房源描述"} onFocus={()=>{this.refs.desctxtarea.value=description}} value={description} onChange={this.onTextAreaInput}></textarea>
	                <div className="row">
	                    <a href="javascript:void(0);" onClick={onSpeech}><img className="microphone plr10 r" src={require("../../../../../../images/microphone.png")} alt="" /></a>
	                </div>
	                <p className="lb9a12 tc">可以输入{500-description.length}字</p>
	            </form>
	        </section>
	    </div>;
	}
}

export default SpeechTextarea;