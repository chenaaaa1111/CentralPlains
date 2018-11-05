/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:49:57
 * @version $Id$
 */
export const GETPHOTOLIST='GETPHOTOLIST';
export const GETSHOWLIST='GETSHOWLIST'
function getPhotoList(list) {
    return {
        type:GETPHOTOLIST,
        payload:list
    }
}
function getShowList(list) {
    return {
        type:GETSHOWLIST,
        payload:list
    }
}
export{
   getPhotoList,getShowList
}