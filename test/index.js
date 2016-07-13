var assert = require('assert');

describe('entry point', function() {
  beforeEach(() => {
    this.consoleKeep = console.error;
  });

  afterEach(() => {
    console.error = this.consoleKeep;
  });

  it('should return a function', function() {
    assert(typeof require('../src/index'), 'function');
  });

  it('should execute without an exception (no params) but print a warning message', function(done) {
    console.error = function(e) {
      assert.equal(e, 'Dial Once boot module should be initilised before used without config.');
      done();
    };
    require('../src/index')();
  });

  it('should execute without an exception (params)', function() {
    require('../src/index')({});
  });

  it('should return a logger and a notifier', function() {
    var index = require('../src/index')({});
    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
  });

  it('should return a logger and a notifier', function() {
    var index = require('../src/index')({});
    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
  });

  it('should return a logger and a notifier (no params) without warning, already initialised', function(done) {
    console.error = done;
    var index = require('../src/index')();
    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
    done();
  });
});
