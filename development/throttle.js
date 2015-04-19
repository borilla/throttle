var throttle = (function () {

	function throttle(fn, interval) {
		var _window = window;
		var intervalId;
		var lastCall;

		return function () {
			var _this = this;
			var _arguments = arguments;
			if (intervalId) {
				lastCall = [_this, _arguments];
			}
			else {
				fn.apply(_this, _arguments);
				intervalId = _window.setInterval(function () {
					if (lastCall) {
						fn.apply(lastCall[0], lastCall[1]);
					}
					else {
						_window.clearInterval(intervalId);
						intervalId = null;
					}
					lastCall = null;
				}, interval);
			}
		}
	}

	return throttle;
}());
