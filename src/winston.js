/**
 * winston module. Load winston and prepare transports to manage requests, for all further winston loading
 * @module winston
 */

require('le_node');
const winston = require('winston');

module.exports = (token) => {
  // we do not want console transport in production, because it reduce performances
  if (process.env.CONSOLE_LOGGING === 'false') {
    winston.remove(winston.transports.Console);
  }

  if (token) {
    const logger = winston.add(winston.transports.Logentries, { token });

    logger.rewriters.push((level, msg, meta) => {
      const newMeta = Object.assign({}, meta);

      newMeta.instanceId = process.env.HOSTNAME;
      return newMeta;
    });

    return logger;
  }

  return winston;
};
