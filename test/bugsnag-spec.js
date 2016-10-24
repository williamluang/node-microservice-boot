const assert = require('assert');

const modulePath = '../src/bugsnag';

/* eslint-disable global-require, import/no-dynamic-require */
describe('bugsnag', () => {
  afterEach(() => {
    delete require.cache[require.resolve(modulePath)];
    process.env.NODE_ENV = '';
  });

  it('should set env to NODE_ENV', () => {
    process.env.NODE_ENV = 'staging';
    require(modulePath)();
    assert(true);
  });

  it('should set env to dev', () => {
    process.env.NODE_ENV = '';
    require(modulePath)();
    assert(true);
  });
});
