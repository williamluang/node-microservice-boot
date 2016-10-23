const assert = require('assert');

const modulePath = '../src/winston';

/* eslint-disable global-require, import/no-dynamic-require */
describe('winston transports', () => {
  beforeEach(() => {
    process.env.CONSOLE_LOGGING = '';
    delete require.cache[require.resolve(modulePath)];
    delete require.cache[require.resolve('winston')];
  });

  it('should add logentries and console transports', () => {
    const logger = require(modulePath)('cd9b3367-59d8-44c8-9d8e-096d79286bb4');

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    require('winston').info('it works');
  });

  it('should be able to disable console transport', () => {
    process.env.CONSOLE_LOGGING = false;
    const logger = require(modulePath)('');

    assert.equal(typeof logger.transports.console, 'undefined');
    require('winston').info('it works');
  });
});
