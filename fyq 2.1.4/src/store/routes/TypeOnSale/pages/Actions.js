/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:49:57
 * @version $Id$
 */
export const GETIMGLIST='GETIMGLIST';
export const GETTEXTITEM='GETTEXTITEM';
export const GETPLANLIST='GETPLANLIST';
export const GETONSALEDETAIL= 'GETONSALEDETAIL';
export const GETTOTOLDETAIL='GETTOTOLDETAIL';
export const GETTEL='GETTEL'

function getImgList(itemList){
    return {
        type: GETIMGLIST,
        payload:{
            result:itemList
        }
    }
}
function getTextItem(itemList) {
    return {
        type: GETTEXTITEM,
        payload:{
            result:itemList
        }
    }
}
function getPlanList(itemList) {
    return {
        type: GETPLANLIST,
        payload:{
            result:itemList
        }
    }
}
function getOnsaleDetail(itemList) {

    return {
        type: GETONSALEDETAIL,
        payload:{
            result:itemList
        }
    }
}
function getTotolDetail(itemList) {
    return {
        type:GETTOTOLDETAIL,
        payload:itemList
    }
}
function getTel(tel) {
    return {
        type:GETTEL,
        payload:tel
    }
}

 export {
     getImgList,getTextItem,getPlanList,getOnsaleDetail,getTotolDetail,getTel
}