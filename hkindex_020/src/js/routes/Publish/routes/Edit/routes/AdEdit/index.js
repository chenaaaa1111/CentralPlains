module.exports = {
	path: ':adid',
	getComponent(nextState, cb) {
		require.ensure(['./../../components/EditContainer'], (require) => {
			cb(null, )
		}, "edit")
	}
}