module.exports = {
	path: 'imageset/:type',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/ImgSetContainer'))
		}, "imageset")
	}
}