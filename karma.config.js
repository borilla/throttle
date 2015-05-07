module.exports = function (config) {
	config.set({
		basePath: '.',
		frameworks: [
			'mocha',
			'chai',
			'sinon'
		],
		files: [
			'development/*.js',
			'test/*.js'
		],
		exclude: [
		],
		preprocessors: {
			'development/*.js': 'coverage'
		},
		reporters: [
			'progress',
			'coverage'
		],
		browsers: [
			'PhantomJS'
		],
		autoWatch: true,
		singleRun: false
	});
};
