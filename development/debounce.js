function debounce(fn, interval, immediate) {
	var timeoutId;
	var context;
	var args;

	return function () {
		context = this;
		args = arguments;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		else {
			immediate && fn.apply(context, args);
		}

		timeoutId = setTimeout(function () {
			timeoutId = null;
			immediate || fn.apply(context, args);
		}, interval);
	}
}
