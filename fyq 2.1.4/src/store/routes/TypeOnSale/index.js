/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-08-16 14:27:38
 * @version $Id$
 */
module.exports = {
	path: 'onsale',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				//require('./routes/Content')
			])
		})
	},
	getComponent(nextState, cb) {
		require.ensure(['./pages/TypeOnSale'], (require) => {
			cb(null, require('./pages/TypeOnSale'))
		}, "store/js/onsale")
	}
};
