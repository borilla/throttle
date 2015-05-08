function throttle(fn, interval, delay) {
	var intervalId;
	var isCallPending;
	var context;
	var args;

	return function () {
		context = this;
		args = arguments;

		if (intervalId) {
			isCallPending = true;
		}
		else {
			if (delay) {
				isCallPending = true;
			}
			else {
				fn.apply(context, args);
			}

			intervalId = setInterval(function () {
				if (isCallPending) {
					fn.apply(context, args);
				}
				else {
					clearInterval(intervalId);
					intervalId = null;
				}
				isCallPending = false;
			}, interval);
		}
	}
}
