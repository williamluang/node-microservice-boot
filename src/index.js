require('./env');

module.exports = function(config) {
  config = Object.assign({
    BUGS_TOKEN: process.env.BUGSNAG_TOKEN,
    LOGS_TOKEN: process.env.LOGENTRIES_TOKEN
  }, config);

  return {
    notifier: require('./bugsnag')(config.BUGS_TOKEN),
    logger: require('./winston')(config.LOGS_TOKEN)
  };
};
