const EventEmiter = require('events');
const logger = new EventEmiter();

logger.on('log', (text) => console.log(text));
exports.logger = logger;