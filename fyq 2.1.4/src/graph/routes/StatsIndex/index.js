/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */
import Log from './../../../commons/utils/Log';
module.exports = {
	path: 'statsindex',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				//require('./routes/Content')
			])
		})
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/StatsIndex'))
		}, "graph/js/statsindex")
	}
};
