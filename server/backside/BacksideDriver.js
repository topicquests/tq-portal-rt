const debug = require('debug')('tq-portal-rt:backside');
const request = require('request');
const {promisify} = require('util');
const get = promisify(request.get);
const post = promisify(request.post);

const config = require('./backside.config');

const {
  StatusCodeError,
  ParseError,
  ResponseMessageError,
} = require('./BacksideErrors');

/**
 * BacksideDriver provides the base methods for interacting
 * with org.topicquests.backside.servlet
 */
class BacksideDriver {
  constructor({host, protocol = 'http', port}) {
    debug(`new ${this.constructor.name}(${host}, ${protocol}, ${port})`);
    this.host = ensureHost(host);
    this.port = ensurePort(port, protocol);
    this.protocol = validateProtocol(protocol);
  }

  async getCargo(path, query) {
    debug('%s#getCargo()', this.constructor.name);
    const endpoint = this.endpoint(path, query);
    const body = await this.get(endpoint);
    if (body.rMsg !== 'ok') throw new ResponseMessageError(body.rMsg);
    return body.cargo || {};
  }

  async postCargo(path, query) {
    debug('%s#postCargo()', this.constructor.name);
    const endpoint = this.endpoint(path, query);
    const body = await this.post(endpoint);
    if (body.rMsg !== 'ok') throw new ResponseMessageError(body.rMsg);
    return body.cargo || {};
  }

  async get(endpoint) {
    debug('%s#get()', this.constructor.name);
    if (!endpoint || !endpoint.url) throw new ReferenceError('Missing endpoint url');
    const res = await get(endpoint);
    debug('=> res.statusCode', res.statusCode);
    if (res.statusCode !== 200) throw new StatusCodeError(res.statusCode, res.body);
    if (typeof res.body !== 'object') throw new ParseError(res.body);
    return res.body;
  }

  async post(endpoint) {
    debug('%s#post()', this.constructor.name);
    if (!endpoint || !endpoint.url) throw new ReferenceError('Missing endpoint url');
    const res = await post(endpoint);
    debug('=> res.statusCode', res.statusCode);
    if (res.statusCode !== 200) throw new StatusCodeError(res.statusCode, res.body);
    if (typeof res.body !== 'object') throw new ParseError(res.body);
    return res.body;
  }

  endpoint(path, query = {verb: null}) {
    debug('%s#endpoint()', this.constructor.name);
    if (!query.verb) throw new ReferenceError('A verb is required');
    const basePath = normalizePath(path);
    const baseURL = this.baseURL();
    const queryString = encodeURIComponent(JSON.stringify(query));
    const url = `${baseURL}/${basePath}/${queryString}`;
    return {url, json: true};
  }

  basicAuthEndpoint(email, password, query = {}) {
    debug('%s#basicAuthEndpoint()', this.constructor.name);
    if (!email || !password) throw new ReferenceError('both email and password are required');
    const queryString = encodeURIComponent(JSON.stringify({verb: 'Auth', ...query}));
    const url = `${this.authURL(email, password)}/auth/${queryString}`;
    return {url, json: true};
  }

  baseURL() {
    debug('%s#baseURL()', this.constructor.name);
    return `${this.protocol}://${this.host}:${this.port}`;
  }

  authURL(email, password) {
    debug('%s#authURL()', this.constructor.name);
    const url = this.baseURL();
    const index = url.indexOf('://') + 3;
    return [url.slice(0, index), `${email}:${password}@`, url.slice(index)].join('');
  }
}

function ensureHost(host) {
  if (!host) throw new ReferenceError('host is required');
  if (typeof host !== 'string') throw new TypeError('host must be a string');
  return host;
}

function validateProtocol(protocol) {
  switch (protocol) {
    case 'http': return protocol;
    case 'https': return protocol;
    default: throw new TypeError(`'${protocol}' is not a supported protocol`);
  }
}

function ensurePort(port, protocol) {
  if (!port) return defaultPort(protocol);
  const portInt = parseInt(port, 10);
  if (Number.isNaN(portInt) || portInt < 1 || portInt > 65535) throw new RangeError(`'${port}' is not a valid port`);
  return portInt;
}

function defaultPort(protocol) {
  switch (protocol) {
    case 'http': return 80;
    case 'https': return 443;
    default: return undefined;
  }
}

function normalizePath(path) {
  if (typeof path !== 'string') throw new TypeError(`Received path '${path}' instead of a string`);
  const basePath = path.match(/^\/?(.*?)\/?$/)[1];
  if (!basePath) throw new ReferenceError(`Received empty path '${path}'`);
  return basePath;
}

function parseRangeQuery(query) {
  if (!query) throw new ReferenceError('missing query object');
  if (typeof query !== 'object') throw new TypeError('query is not an object');
  if (Number.isInteger(query.from) === false) throw new RangeError('query attribute `from` must be an integer');
  if (Number.isInteger(query.count) === false) throw new RangeError('query attribute `count` must be an integer');
  return [Number.parseInt(query.from, 10).toString(), Number.parseInt(query.count, 10).toString()];
}

function extractIcon(sIco, lIco) {
  const largeIcon = (String(lIco).match(/^\/images\/(.+).png$/) || [])[1];
  const smallIcon = (String(sIco).match(/^\/images\/(.+)_sm.png$/) || [])[1];
  return (largeIcon || smallIcon);
}

function isPrivate(isPrv) {
  switch (isPrv) {
    case 'T': case 't': case 'true': case true: return true;
    case 'F': case 'f': case 'false': case false: return false;
    default: return null;
  }
}

function utc(time) {
  return (new Date(time)).toISOString();
}

// provide a default instance as a singleton
exports = module.exports = new BacksideDriver(config);
exports.BacksideDriver = BacksideDriver;
exports.parseRangeQuery = parseRangeQuery;
exports.extractIcon = extractIcon;
exports.isPrivate = isPrivate;
exports.utc = utc;
