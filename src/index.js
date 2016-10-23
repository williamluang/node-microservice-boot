require('./env');
/**
 * Starts with false, then is used to cache the internal providers
 * @type {Boolean|Object}
 */
let initModule = false;

/**
 * Configure and return providers for our microservices. It should be required on module launch.
 * It sets up loggers, notifiers for bugs, and exposes the internal providers, abstracted.
 * If no parameter is provided, it will return already configured providers
 * @param  {Object} [config] Configuration object required by the internal providers
 * @param  {string} [config.BUGS_TOKEN] Token used by internal notifier to send bug reports to
 * @param  {string} [config.LOGS_TOKEN] Token used by internal logger to send logs to
 * @return {Object}        The configured providers
 */
module.exports = (config) => {
  // if no param is provided, we want to return the cached modules
  if (!config) {
    // this should always be true when user require the module and have it initialised, else we print an error
    if (initModule) return initModule;

    /* eslint-disable no-console, no-param-reassign */
    console.error('Dial Once boot module should be initilised before used without config.');
  }

  /**
   * Stores configuration with a fallback on old, deprecated env vars (BUGSNAG, LOGENTRIES)
   * @type {Object}
   */
  config = Object.assign({
    BUGS_TOKEN: process.env.BUGSNAG_TOKEN,
    LOGS_TOKEN: process.env.LOGENTRIES_TOKEN
  }, config);

  // stores the cached required modules for the next requires on @dialonce/boot
  /* eslint-disable global-require */
  initModule = {
    notifier: require('./bugsnag')(config.BUGS_TOKEN),
    logger: require('./winston')(config.LOGS_TOKEN)
  };

  return initModule;
};
