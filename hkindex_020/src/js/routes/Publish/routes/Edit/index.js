module.exports = {
	path: 'edit',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./routes/AdEdit')
			])
		})
	},
	getComponents(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/EditContainer'))
		}, "edit")
	}
}