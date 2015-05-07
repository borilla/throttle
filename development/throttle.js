function throttle(fn, interval, onComplete) {
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
			fn.apply(context, args);
			intervalId = setInterval(function () {
				if (isCallPending) {
					fn.apply(context, args);
				}
				else {
					clearInterval(intervalId);
					intervalId = null;
					onComplete && onComplete.apply(context, args);
				}
				isCallPending = false;
			}, interval);
		}
	}
}
