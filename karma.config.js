module.exports = function(config) {
	config.set({
		basePath: '.',
		frameworks: [
			'mocha',
			'chai',
			'sinon'
		],
		files: [
			'development/*.js',
			'karma/*.js',
		],
		exclude: [
			'test/**'
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
