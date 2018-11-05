module.exports = {
	path: 'list',
	getComponent(nextState, cb) {
		require.ensure(['./components/TabContainer'], (require) => {
			cb(null, require('./components/TabContainer'))
		}, "list")
	}
}