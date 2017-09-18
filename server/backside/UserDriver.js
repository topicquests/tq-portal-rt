import BacksideDriver, {parseRangeQuery} from './BacksideDriver';
import config from './backside.config';

/**
 * UserDriver methods correspond with verbs in java
 * org.topicquests.backside.servlet.apps.usr.api.IUserMicroformat
 */
export default class UserDriver extends BacksideDriver {
  // TODO(wenzowski): try logging in before registering
  // TODO(wenzowski): check ExistsInvite is called before registering
  // TODO(wenzowski): ensure RemoveInvite is called after registering
  async register({id, name, handle, email, password, roles, avatar, location, homepage, ...query}) {
    if (!id || !name || !handle || !email || !password || !roles) {
      throw new ReferenceError('missing required user attribute');
    }
    const endpoint = this.endpoint('/user/', {
      verb: 'NewUser',
      uName: handle,
      uId: id,
      uFullName: name,
      uEmail: email,
      uPwd: new Buffer(password).toString('base64'),
      uRole: roles && roles[0],
      uAvatar: avatar,
      uGeoloc: location && [location.latitude, location.longitude].join('|'),
      uHomepage: homepage,
      ...query,
    });
    const body = await this.post(endpoint);
    if (body && body.rMsg === 'ok' && body.rToken) return true;
    return false;
  }

  async list(query = {from: 0, count: 50}) {
    const [from, count] = parseRangeQuery(query);
    const cargo = await this.getCargo('/user/', {verb: 'ListUsers', ...query, from, count});
    return cargo.map((c) => destructure(c));
  }

  async fetchById(uId, query = {}) {
    const cargo = await this.getCargo('/user/', {verb: 'GetUsrId', uId, ...query});
    return destructure(cargo);
  }

  async fetchByEmail(uEmail, query = {}) {
    const cargo = await this.getCargo('/user/', {verb: 'GetUser', uEmail, ...query});
    return destructure(cargo);
  }

  async fetchByHandle(uName, query = {}) {
    const cargo = await this.getCargo('/user/', {verb: 'GetUsrHndl', uName, ...query});
    return destructure(cargo);
  }

  // methods below correspond with verbs in src/main/java/org/topicquests/backside/servlet/apps/admin/api/IAdminMicroformat.java

  async remove(uName, query = {}) {
    const endpoint = this.endpoint('/user/', {verb: 'RemUser', uName, ...query});
    await this.post(endpoint);
    return true;
  }

  async updateRole(query = {}) {
    const endpoint = this.endpoint('/user/', {verb: 'UpdUsRol', ...query});
    await this.post(endpoint);
    return true;
  }

  async updateEmail(query = {}) {
    const endpoint = this.endpoint('/user/', {verb: 'UpdUsEma', ...query});
    await this.post(endpoint);
    return true;
  }

  async updatePassword(query = {}) {
    const endpoint = this.endpoint('/user/', {verb: 'UpdUsPwd', ...query});
    await this.post(endpoint);
    return true;
  }

  async updateData(query = {}) {
    const endpoint = this.endpoint('/user/', {verb: 'UpdUsDat', ...query});
    await this.post(endpoint);
    return true;
  }
}

export const users = new UserDriver(config);

function destructure({
  uGeoloc,
  uEmail,
  uId,
  uHomepage,
  uName,
  uFullName,
  uRole,
  uAvatar,
  ...cargo
}) {
  const [latitude, longitude] = (uGeoloc || '|').split('|');
  return {
    id: uId,
    name: uFullName,
    handle: uName,
    email: uEmail,
    roles: uRole,
    avatar: uAvatar,
    page: uHomepage,
    location: {
      latitude,
      longitude,
    },
    ...cargo,
  };
}
