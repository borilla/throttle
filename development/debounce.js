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
		else if (immediate) {
			fn.apply(context, args);
		}

		timeoutId = setTimeout(function () {
			timeoutId = null;
			if (!immediate) {
				fn.apply(context, args);
			}
		}, interval);
	}
}
