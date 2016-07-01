module.exports = function(token) {
  require('bugsnag').register(token, {
    releaseStage: process.env.NODE_ENV || 'dev',
    notifyReleaseStages: ['production', 'staging']
  });
};
