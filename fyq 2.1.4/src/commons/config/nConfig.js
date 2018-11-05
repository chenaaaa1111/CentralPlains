/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-12 18:27:25
 * @version $Id$
 */
import { config } from './config.js';
import proxy from './../utils/AppProxy';
import { getParams } from './../utils/Common.js';
export const nConfig = {
	sendNativeBtnConfig: function(text, route, params) {
		if (!config.test) {
			console.log("sendNativeBtnConfig:menu:", this.getBtnParams(text, route, params));
			proxy.call('menu', this.getBtnParams(text, route, params));
		}
	},
	getBtnParams: function(text, route, params) {
		return {
			text: text,
			url: [config.domain, route, `?${getParams(params)}`].join('')
		}
	},
	getNativePerform: function(text, route, params) {
		return {
			text: text,
			url: [config.domain, route, `?${getParams(params)}`].join('')
		}
	}
};
