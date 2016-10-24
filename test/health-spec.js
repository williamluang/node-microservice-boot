const assert = require('assert');
const health = require('../src/health');

describe('health', () => {
  it('should expose a function', () => {
    assert.equal(typeof health, 'function');
  });

  it('should be able to call the function without throwing an error', () => {
    health();
  });
});
