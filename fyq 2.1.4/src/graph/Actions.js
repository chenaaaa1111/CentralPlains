/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-28 20:49:57
 * @version $Id$
 */
import Log from './../commons/utils/Log';
export const CHANGE_TYPE = "CHANGE_TAB";
export const PROMPT_DISPLAY = "PROMPT_DISPLAY";
export const LOADING = "LOADING";
export const LOAD_MORE = "LOAD_MORE";
export const READY = "READY";

function loading(isloading) {
	return {
		type: LOADING,
		payload: isloading
	};
}

function notifyReady(ready) {
	return {
		type: READY,
		payload: ready
	}
}

function loadMore(loadmore) {
	return {
		type: LOAD_MORE,
		payload: loadmore
	};
}

export { loading, notifyReady, loadMore }
