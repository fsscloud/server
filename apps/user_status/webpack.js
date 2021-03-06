const path = require('path')

module.exports = {
	entry: {
		'user-status-menu': path.join(__dirname, 'src', 'main-user-status-menu')
	},
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: '[name].js?v=[chunkhash]',
		jsonpFunction: 'webpackJsonpUserStatus'
	},
	optimization: {
		splitChunks: {
			automaticNameDelimiter: '-',
		}
	}
}
