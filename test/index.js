const assert = require('assert');


/* eslint-disable global-require, import/no-dynamic-require, no-console */
describe('entry point', () => {
  beforeEach(() => {
    this.consoleKeep = console.error;
  });

  afterEach(() => {
    console.error = this.consoleKeep;
  });

  it('should return a function', () => {
    assert(typeof require('../src/index'), 'function');
  });

  it('should execute without an exception (no params) but print a warning message', (done) => {
    console.error = (e) => {
      assert.equal(e, 'Dial Once boot module should be initilised before used without config.');
      done();
    };
    require('../src/index')();
  });

  it('should execute without an exception (params)', () => {
    require('../src/index')({});
  });

  it('should return a logger and a notifier', () => {
    const index = require('../src/index')({});

    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
  });

  it('should return a logger and a notifier', () => {
    const index = require('../src/index')({});

    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
  });

  it('should return a logger and a notifier (no params) without warning, already initialised', (done) => {
    const index = require('../src/index')();

    console.error = done;
    assert.notEqual(index.notifier, undefined);
    assert.notEqual(index.logger, undefined);
    done();
  });
});
