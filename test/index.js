var assert = require('assert');

describe('entry point', function() {
  it('should return a function', function() {
    assert(typeof require('../src/index'), 'function');
  });

  it('should execute without an exception (no params)', function() {
    require('../src/index')();
  });

  it('should execute without an exception (params)', function() {
    require('../src/index')({});
  });
});
