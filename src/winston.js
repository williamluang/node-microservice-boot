/**
 * winston module. Load winston and prepare transports to manage requests, for all further winston loading
 * @module winston
 */

require('le_node');
const winston = require('winston');

module.exports = (notifier, token, notify = true) => {
  // we do not want console transport in production, because it reduce performances
  if (process.env.CONSOLE_LOGGING === 'false') {
    winston.remove(winston.transports.Console);
  }

  if (token) {
    const logger = winston.add(winston.transports.Logentries, { token });

    logger.rewriters.push((level, msg, meta) => {
      const newMeta = Object.assign({}, meta);

      newMeta.instanceId = process.env.HOSTNAME;

      newMeta.notify = (typeof newMeta.notify === 'boolean') ? newMeta.notify : notify;
      if (['error', 'warn'].indexOf(level) !== -1 && newMeta.notify) {
        notifier.notify(msg);
      }

      delete newMeta.notify;

      return newMeta;
    });

    return logger;
  }

  return winston;
};
