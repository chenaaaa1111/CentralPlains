module.exports = {
	path: 'manager',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/ManagerContainer'))
		}, "manager")
	}
}