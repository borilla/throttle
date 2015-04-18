var throttle = (function() {

	function throttle(fn, interval) {
		var intervalId = null;
		var lastCall = null;

		return function () {
			if (intervalId) {
				lastCall = {
					context: this,
					args: arguments
				};
			}
			else {
				fn.apply(this, arguments);
				intervalId = window.setInterval(function() {
					if (lastCall) {
						fn.apply(lastCall.context, lastCall.args);
						lastCall = null;
					}
					else {
						window.clearInterval(intervalId);
						lastCall = null;
					}
				}, interval);
			}
		}
		return fn;
	}

	return throttle;
}());
