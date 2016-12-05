const assert = require('assert');
/* eslint-disable import/no-extraneous-dependencies */
const sinon = require('sinon');

const modulePath = '../src/winston';

/* eslint-disable global-require, import/no-dynamic-require */
describe('winston transports', () => {
  let sandbox;

  beforeEach(() => {
    this.sinon = sandbox = sinon.sandbox.create();
    process.env.CONSOLE_LOGGING = '';
    delete require.cache[require.resolve(modulePath)];
    delete require.cache[require.resolve('winston')];
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should add logentries and console transports', () => {
    const logger = require(modulePath)(null, '00000000-0000-0000-0000-000000000000', false);

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    require('winston').info('it works');
  });

  it('should call notify on warn and error logger level [enabled globally]', () => {
    const notifier = require('../src/bugsnag')();

    const logger = require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', true);

    const mock = this.sinon.mock(notifier);
    mock.expects('notify').twice().withExactArgs('should notify');

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    logger.warn('should notify');
    logger.error('should notify');
    mock.verify();
    mock.restore();
  });

  it('should not allow transport duplicates', () => {
    const notifier = require('../src/bugsnag')();

    const logger = require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', false);
    console.log(require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', false));

    const mock = this.sinon.mock(notifier);
    mock.expects('notify').twice().withExactArgs('should notify');

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    logger.warn('should notify', { notify: true });
    logger.error('should notify', { notify: true });
    mock.verify();
    mock.restore();
  });

  it('should call notify on warn and error logger level [enabled locally]', () => {
    const notifier = require('../src/bugsnag')();

    const logger = require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', false);

    const mock = this.sinon.mock(notifier);
    mock.expects('notify').twice().withExactArgs('should notify');

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    logger.warn('should notify', { notify: true });
    logger.error('should notify', { notify: true });
    mock.verify();
    mock.restore();
  });

  it('should not call notify on warn and error logger level [disabled globally]', () => {
    const notifier = require('../src/bugsnag')();

    const logger = require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', false);

    const mock = this.sinon.mock(notifier);
    mock.expects('notify').never();

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    logger.warn('should notify');
    logger.error('should notify');
    mock.verify();
    mock.restore();
  });

  it('should not call notify on warn and error logger level [disabled locally]', () => {
    const notifier = require('../src/bugsnag')();

    const logger = require(modulePath)(notifier, '00000000-0000-0000-0000-000000000000', true);

    const mock = this.sinon.mock(notifier);
    mock.expects('notify').never();

    assert.equal(typeof logger.transports.logentries, 'object');
    assert.equal(typeof logger.transports.console, 'object');

    logger.warn('should notify', { notify: false });
    logger.error('should notify', { notify: false });
    mock.verify();
    mock.restore();
  });

  it('should be able to disable console transport', () => {
    process.env.CONSOLE_LOGGING = false;
    const logger = require(modulePath)('');

    assert.equal(typeof logger.transports.console, 'undefined');
    require('winston').info('it works');
  });
});
