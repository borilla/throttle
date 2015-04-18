var throttle = (function() {

	function throttle(fn, interval) {
		var intervalId = null;
		var lastCall = null;

		return function () {
			if (intervalId) {
				lastCall = [this, arguments];
			}
			else {
				fn.apply(this, arguments);
				intervalId = window.setInterval(function() {
					if (lastCall) {
						fn.apply(lastCall[0], lastCall[1]);
						lastCall = null;
					}
					else {
						window.clearInterval(intervalId);
						lastCall = null;
					}
				}, interval);
			}
		}
	}

	return throttle;
}());
