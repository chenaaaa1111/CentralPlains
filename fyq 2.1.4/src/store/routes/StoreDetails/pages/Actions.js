/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:49:57
 * @version $Id$
 */
export const GETLIST ='GETLIST';
export const GETITEMDETAIL='GETITEMDETAIL';
export const GETPHOTOLIST='GETPHOTOLIST';
export const GETTEL='GETTEL';
export const ISSHOW='ISSHOW';
export const MESSAGE='MESSAGE'

function getDetailList(list) {
    return {
        type: GETITEMDETAIL,
        payload:{
            result:list
        }
    }
}
function getPhotoList(list) {
    return {
        type:GETPHOTOLIST,
        payload:{
            result:list
        }
    }
}
function getTel(tel) {
    return {
        type:GETTEL,
        payload:tel
    }
}
function showdisfy(isshow) {
    return {
        type:ISSHOW,
        payload:isshow
    }
}
function getMessage(message) {
    return {
        type:MESSAGE,
        payload:message
    }
}

export{
    getDetailList,getPhotoList,getTel,showdisfy,getMessage
}