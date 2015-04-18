describe('Throttle', function() {
	var sandbox, clock, fn, interval, throttled;

	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		fn = sandbox.stub();
		interval = 100;
		throttled = throttle(fn, interval);
		clock = sinon.useFakeTimers();
	});

	afterEach(function() {
		clock.restore();
		sandbox.restore();
	});

	it('should return a wrapped function', function() {
		expect(throttled).to.be.a.function;
	});

	it('should call the wrapped function immediately when called', function() {
		throttled();
		fn.should.have.been.calledOnce;
	});

	it('should defer second call until the interval period', function() {
		throttled();
		throttled();
		expect(fn.callCount).to.equal(1, 'function should have been called once');
		clock.tick(interval - 1);
		expect(fn.callCount).to.equal(1, 'function should still have been called once');
		clock.tick(1);
		expect(fn.callCount).to.equal(2, 'function should have been called twice');
		clock.tick(interval);
		expect(fn.callCount).to.equal(2, 'function should still have been called twice');
	});

	it('should call functions with given arguments', function () {
		throttled(1);
		throttled(2);
		clock.tick(interval);
		expect(fn.firstCall.args[0]).to.equal(1, 'first call was with expected argument');
		expect(fn.secondCall.args[0]).to.equal(2, 'second call was with expected argument');
	});

	it('should call functions with given context', function () {
		var context1 = {};
		var context2 = {};
		throttled.call(context1);
		throttled.call(context2);
		clock.tick(interval);
		expect(fn.firstCall.calledOn(context1)).to.be.true;
		expect(fn.secondCall.calledOn(context2)).to.be.true;
	});

	it('should use latest call when throttling', function () {
		throttled(1);
		throttled(2);
		throttled(3);
		clock.tick(interval);
		expect(fn.secondCall.args[0]).to.equal(3, 'second call was with expected argument');
	});
});
