/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:49:57
 * @version $Id$
 */
export const GETLIST ='GETLIST';
export const JINGJIITEM='JINGJIITEM';

function getList(list) {
    return {
        type: GETLIST,
        payload:{
            result:list
        }
    }
}
function jingjiItem(res) {
    return {
        type:JINGJIITEM,
        payload:{
            result:res
        }
    }
}
export{
    getList,jingjiItem
}