describe('debounce', function () {
	var sandbox, clock, fn, interval, debounced;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		fn = sandbox.stub();
		interval = 100;
		debounced = debounce(fn, interval);
		clock = sandbox.useFakeTimers();
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('should return a wrapped function', function () {
		assert.isFunction(debounced);
	});

	describe('when called with immediate option unset', function () {
		it('should delay calling the wrapped function when called', function () {
			debounced();
			assert(fn.notCalled, 'function should not have been called immediately');
			clock.tick(interval - 1);
			assert(fn.notCalled, 'function should not be called until interval has passed');
			clock.tick(1);
			assert(fn.calledOnce, 'function should now have been called');
			clock.tick(interval);
			assert(fn.calledOnce, 'function should not be called again');
		});

		it('should keep delaying the function until it is not called for interval', function () {
			debounced();
			clock.tick(interval - 1);
			assert(fn.notCalled, 'function should not have been called immediately');
			debounced();
			clock.tick(interval - 1);
			assert(fn.notCalled, 'function should still not have been called (1)');
			debounced();
			clock.tick(interval - 1);
			assert(fn.notCalled, 'function should still not have been called (3)');
			clock.tick(1);
			assert(fn.calledOnce, 'function should now have been called');
		});

		it('should call the function again after interval has passed', function () {
			debounced();
			assert(fn.notCalled, 'function should not have been called immediately');
			clock.tick(interval);
			assert(fn.calledOnce, 'function should have been called once');
			debounced();
			clock.tick(interval);
			assert(fn.calledTwice, 'function should now have been called twice');
		});

		it('should call function with context and args from latest call', function () {
			var context1 = {};
			var context2 = {};
			var context3 = {};
			debounced.call(context1, 1, 11, 111);
			clock.tick(interval - 1);
			debounced.call(context2, 2, 22, 222);
			clock.tick(interval - 1);
			debounced.call(context3, 3, 33, 333);
			clock.tick(interval);
			assert(fn.calledOnce, 'function should have been called once');
			assert(fn.calledOn(context3), 'function should have been called with correct context');
			assert(fn.calledWith(3, 33, 333), 'function should have been called with correct args');
		});
	});

	describe('when called with immediate option set', function () {
		beforeEach(function () {
			debounced = debounce(fn, interval, true);
		});

		it('should calling the wrapped function immedtiately', function () {
			debounced();
			assert(fn.calledOnce, 'function should have been called immediately');
		});

		it('should not call the function again within interval period', function () {
			debounced();
			assert(fn.calledOnce, 'function should have been called immediately');
			clock.tick(interval - 1);
			debounced();
			assert(fn.calledOnce, 'function was not called again (1)');
			clock.tick(interval - 1);
			debounced();
			assert(fn.calledOnce, 'function was not called again (2)');
		});

		it('should call the function again after interval has passed', function () {
			debounced();
			assert(fn.calledOnce, 'function should have been called immediately');
			clock.tick(interval);
			debounced();
			assert(fn.calledTwice, 'function should now have been called twice');
		});

		it('should call function with context and args from first call', function () {
			var context1 = {};
			var context2 = {};
			var context3 = {};
			debounced.call(context1, 1, 11, 111);
			clock.tick(interval - 1);
			debounced.call(context2, 2, 22, 222);
			clock.tick(interval - 1);
			debounced.call(context3, 3, 33, 333);
			clock.tick(interval);
			assert(fn.calledOnce, 'function should have been called once');
			assert(fn.calledOn(context1), 'function should have been called with correct context');
			assert(fn.calledWith(1, 11, 111), 'function should have been called with correct args');
		});
	});
});
