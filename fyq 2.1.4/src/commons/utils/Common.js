/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-18 14:00:27
 * @version $Id$
 */
import Log from "./Log"
export const query = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
};

export const covertToBoolean = (value) => {
	if (typeof value === 'string') {
		if (value.toLowerCase() === 'false') {
			return false;
		} else if (/^[1-9]\d*$/.test(value)) {
			return !!parseInt(value);
		} else {
			return !!value;
		}
	} else {
		return !!value;
	}
}

export const setTitle = (title) => {
	if (!window || !window.document) {
		return;
	}
	document.getElementsByTagName('title')[0].innerHTML = title;
}

export const getParams = (obj) => {
	if (!obj) {
		return;
	}
	let keys = Object.keys(obj);
	let frags = keys.map((key, index) => {
		let value = obj[key];
		if (value !== undefined) {
			return [key, value].join('=');
		}
	});
	return frags.join('&');
}

export const getAddress = () => {
	if (!window || !window.location) {
		return;
	}
	return [location.protocol + '//', location.host].join('');
}

export const is_weixn = () => { //判断是否在微信中打开
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

export const setCookie=(c_name,value,expiredays)=>
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//取回cookie
export const getCookie=(c_name)=>
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}