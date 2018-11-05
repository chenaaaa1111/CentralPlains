module.exports = {
	path: 'publish',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./routes/Edit'),
				require('./routes/Edit'),
				require('./routes/ImgSet')
			])
		})
	},
	getComponent(nextState, cb) {
		require.ensure(['./components/PublishContainer'], (require) => {
			cb(null, require('./components/PublishContainer'))
		}, "publish")
	}
}