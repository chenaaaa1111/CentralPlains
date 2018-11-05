/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */

module.exports = {
	path: 'mystore',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [])
		})
	},
	getComponent(nextState, cb) {
		console.log(66);
		require.ensure([], (require) => {
			cb(null, require('./pages/MyStore'))
		}, "store/js/mystore")
	}
};
