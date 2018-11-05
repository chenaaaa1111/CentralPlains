/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */
module.exports = {
	path: ':infoId',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [])
		})
	},
	getComponent(nextState, cb) {
		require.ensure(['./pages/InformDetails'], (require) => {
			cb(null, require('./pages/InformDetails'))
		}, "inform/js/informdetails")
	}
};
