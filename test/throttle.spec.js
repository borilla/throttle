describe('throttle', function () {
	var sandbox, clock, fn, interval, throttled;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		fn = sandbox.stub();
		interval = 100;
		throttled = throttle(fn, interval);
		clock = sandbox.useFakeTimers();
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('should return a wrapped function', function () {
		assert.isFunction(throttled);
	});

	it('should call the wrapped function immediately when called', function () {
		throttled();
		assert.equal(fn.callCount, 1, 'function should have been called once');
	});

	it('should call functions with given arguments', function () {
		throttled(1);
		throttled(2);
		clock.tick(interval);
		assert.equal(fn.firstCall.args[0], 1, 'first call was with expected argument');
		assert.equal(fn.secondCall.args[0], 2, 'second call was with expected argument');
	});

	it('should call functions with given context', function () {
		var context1 = {};
		var context2 = {};
		throttled.call(context1);
		throttled.call(context2);
		clock.tick(interval);
		assert(fn.firstCall.calledOn(context1), 'first call was with expected context');
		assert(fn.secondCall.calledOn(context2), 'second call was with expected context');
	});

	it('should delay second call until the interval period', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		throttled(1);
		throttled(2);
		assert(first.calledOnce, 'first function should be called immediately');
		assert(second.notCalled, 'second function should not be called');
		clock.tick(interval - 1);
		assert(second.notCalled, 'second function should still not have been called once');
		clock.tick(1);
		assert(second.calledOnce, 'second function should now have been called');
		clock.tick(interval);
		assert(second.calledOnce, 'second function should not be called again');
		assert(first.calledOnce, 'first function should not be called again');
	});

	it('should use latest call when throttling', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		var third = fn.withArgs(3);
		throttled(1);
		throttled(2);
		throttled(3);
		assert(first.calledOnce, 'first function should have been called immediately');
		assert(second.notCalled, 'second function should not have been called before interval');
		assert(third.notCalled, 'third function should not have been called before interval');
		clock.tick(interval);
		assert(first.calledOnce, 'first function should not have been called again after interval');
		assert(second.notCalled, 'second function should not have been called after interval');
		assert(third.calledOnce, 'third function should have been called after interval');
	});

	it('should call function immediately if called after interval', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		throttled(1);
		clock.tick(interval);
		throttled(2);
		assert(second.calledOnce, 'second function should have been called immediately');
	});

	it('should not interfere with other throttled functions', function () {
		var fn2 = sandbox.stub();
		var throttled2 = throttle(fn2, interval);
		throttled(1);
		throttled2(2);
		throttled(3);
		throttled2(4);
		clock.tick(interval);
		assert.equal(fn.firstCall.args[0], 1, 'first call to first function was with expected argument');
		assert.equal(fn2.firstCall.args[0], 2, 'first call to second function was with expected argument');
		assert.equal(fn.secondCall.args[0], 3, 'second call to first function was with expected argument');
		assert.equal(fn2.secondCall.args[0], 4, 'second call to second function was with expected argument');
	});

	describe('when delay option is set', function () {
		beforeEach(function () {
			throttled = throttle(fn, interval, true);
		});

		it('should not call function immediately', function () {
			throttled();
			assert.equal(fn.callCount, 0, 'function should not have been called immediately');
			clock.tick(interval);
			assert.equal(fn.callCount, 1, 'function should have been called after interval');
		});

		it('should invoke function with context and args from latest call within interval', function () {
			var context1 = {};
			var context2 = {};
			throttled.call(context1, 1, 11, 111);
			throttled.call(context2, 2, 22, 222);
			clock.tick(interval);
			assert.equal(fn.callCount, 1, 'should have been called once');
			assert(fn.calledOn(context2), 'should have been called with expected context');
			assert(fn.calledWith(2, 22, 222), 'should have been called with expected args');
		});
	});
});
