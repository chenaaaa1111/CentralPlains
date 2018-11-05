/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */
import Log from './../../../commons/utils/Log';
module.exports = {
	path: 'caseindex',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./../CaseStats')
			])
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/CaseIndex'))
		}, "graph/js/caseindex")
	}
};
