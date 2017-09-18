const debug = require('debug')('tq-portal-rt:auth');
const {BacksideDriver} = require('./BacksideDriver');
const config = require('./backside.config');
const {
  StatusCodeError,
  ResponseMessageError,
} = require('./BacksideErrors');

/**
 * AuthDriver methods correspond with verbs in java interface
 * org.topicquests.backside.servlet.apps.auth.api.IAuthMicroformat
 */
class AuthDriver extends BacksideDriver {
  /**
   * login corresponds with IAuthMicroformat.AUTHENTICATE
   * @returns {Array} token, user
   * @throws {StatusCodeError}
   * @throws {ParseError}
   */
  async login(email, password, query = {}) {
    debug('%s#login(%s, %s, %j)', this.constructor.name, email, !!password, query);
    const endpoint = this.basicAuthEndpoint(email, password, query);
    const body = await this.get(endpoint);
    if (typeof body.rMsg !== 'string') throw new ResponseMessageError(body.rMsg);
    if (!body.cargo) return [body.rToken, {}];
    const {uEmail, uId, uName, uFullName, uRole} = body.cargo;
    return [
      body.rToken,
      {
        id: uId,
        email: uEmail,
        handle: uName,
        name: uFullName,
        roles: extractRoles(uRole),
      },
    ];
  }

  /**
   * logout corresponds with IAuthMicroformat.LOGOUT
   * TODO(wenzowski): fix BacksideServlet so logging out a user twice does not result in a 500 response
   * @returns {Boolean} indicating the user was successfully logged out
   * @throws {StatusCodeError}
   * @throws {ParseError}
   */
  async logout(sToken, query = {}) {
    debug('%s#logout(%s, %j)', this.constructor.name, sToken, query);
    const endpoint = this.endpoint('/auth/', {verb: 'LogOut', sToken, ...query});
    const body = await this.get(endpoint).catch((error) => {
      if (!error instanceof StatusCodeError) throw error;
    });
    if (body && body.rMsg === 'ok') return true;
    return false;
  }

  /**
   * isHandleAvailable corresponds with IAuthMicroformat.VALIDATE
   * @returns {Boolean} indicating the handle is available
   * @throws {StatusCodeError}
   * @throws {ParseError}
   * @throws {ResponseMessageError}
   */
  async isHandleAvailable(uName) {
    debug('%s#isHandleAvailable(%s)', this.constructor.name, uName);
    if (!uName) throw new ReferenceError('Missing required argument uName');
    const endpoint = this.endpoint('/auth/', {verb: 'Validate', uName});
    const body = await this.get(endpoint);
    if (body.rMsg === 'not found') return false;
    if (body.rMsg === 'ok') return true;
    throw new ResponseMessageError(body.rMsg);
  }

  /**
   * isEmailAvailable corresponds with IAuthMicroformat.EXISTS_EMAIL
   * @returns {Boolean} indicating the email is available
   * @throws {StatusCodeError}
   * @throws {ParseError}
   * @throws {ResponseMessageError}
   */
  async isEmailAvailable(uEmail) {
    debug('%s#isEmailAvailable(%s)', this.constructor.name, uEmail);
    if (!uEmail) throw new ReferenceError('Missing required argument uEmail');
    const endpoint = this.endpoint('/auth/', {verb: 'ExstEmail', uEmail});
    const body = await this.get(endpoint);
    if (body.rMsg === 'not found') return true;
    if (body.rMsg === 'ok') return false;
    throw new ResponseMessageError(body.rMsg);
  }
}

function extractRoles(uRole) {
  if (Array.isArray(uRole)) return [...uRole];
  return (uRole || '').split(',').map((str) => str.trim()).filter((str) => str);
}

// provide a default instance as a singleton
exports = module.exports = new AuthDriver(config);
exports.AuthDriver = AuthDriver;
