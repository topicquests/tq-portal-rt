const url = require('url');

const DEFAULT_URL = 'http://topicquests.net:8080';

function parseBacksideUrl(str) {
  const parsed = url.parse(str);
  const protocol = parsed.protocol.slice(0, -1);
  const {hostname: host, port} = parsed;
  return {protocol, host, port};
}

const defaults = parseBacksideUrl(DEFAULT_URL);
const env = process.env.BACKSIDE_URL ? parseBacksideUrl(process.env.BACKSIDE_URL) : {};

exports = module.exports = {...defaults, ...env};
exports.DEFAULT_URL = DEFAULT_URL;
