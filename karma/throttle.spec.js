describe('Throttle', function () {
	var sandbox, clock, fn, interval, throttled;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		fn = sandbox.stub();
		interval = 100;
		throttled = throttle(fn, interval);
		clock = sinon.useFakeTimers();
	});

	afterEach(function () {
		clock.restore();
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

	it('should defer second call until the interval period', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		throttled(1);
		throttled(2);
		assert(second.notCalled, 'second function should not be called');
		clock.tick(interval - 1);
		assert(second.notCalled, 'second function should still not have been called once');
		clock.tick(1);
		assert(second.calledOnce, 'second function should now have been called');
		clock.tick(interval);
		assert(second.calledOnce, 'function should not be called again');
	});

	it('should use latest call when throttling', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		var third = fn.withArgs(3);
		throttled(1);
		throttled(2);
		throttled(3);
		assert(first.calledOnce, 'first function should have been called immediately');
		clock.tick(interval);
		assert(second.notCalled, 'second function should not have been called');
		assert(third.calledOnce, 'third function should have been called');
	});

	it('should call function immediately if called after interval', function () {
		var first = fn.withArgs(1);
		var second = fn.withArgs(2);
		throttled(1);
		clock.tick(interval);
		throttled(2);
		assert(second.calledOnce, 'second function should have been called immediately');
	})
});
