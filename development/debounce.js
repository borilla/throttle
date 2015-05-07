function debounce(fn, interval) {
	var timeoutId;
	var context;
	var args;

	return function () {
		context = this;
		args = arguments;
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(function () {
			fn.apply(context, args);
		}, interval);
	}
}
