const bugsnag = require('bugsnag');

module.exports = (token) => {
  bugsnag.register(token, {
    releaseStage: process.env.NODE_ENV || 'dev',
    notifyReleaseStages: ['production', 'staging']
  });

  return bugsnag;
};
