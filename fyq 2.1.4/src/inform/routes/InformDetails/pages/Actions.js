/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-04-23 11:59:33
 * @version $Id$
 */
export const LOADMESSAGE="LOADMESSAGE";

function LoadnewsItem(message){
    return {
        type: LOADMESSAGE,
        payload:message
    }
}
export {LoadnewsItem} 