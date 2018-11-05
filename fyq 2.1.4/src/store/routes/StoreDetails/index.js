/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */
module.exports = {
	path: 'details',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				//require('./routes/Content')
			])
		})
	},
	getComponent(nextState, cb) {
		require.ensure(['./pages/StoreDetails'], (require) => {
			cb(null, require('./pages/StoreDetails'))
		}, "store/js/details")
	}
};
