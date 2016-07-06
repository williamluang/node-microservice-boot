module.exports = function(token) {
  const bugsnag = require('bugsnag');

  bugsnag.register(token, {
    releaseStage: process.env.NODE_ENV || 'dev',
    notifyReleaseStages: ['production', 'staging']
  });

  return bugsnag;
};
