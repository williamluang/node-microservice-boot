const winston = require('winston');

/*
 * Print health status every minute, and keep module alive
 */
module.exports = () => {
  const startDate = new Date();
  winston.info(process.env.HOSTNAME, {
    status: 'running',
    startedAt: startDate,
    uptime: new Date().getTime() - startDate.getTime()
  });
};

setInterval(module.exports, 60 * 1000);
