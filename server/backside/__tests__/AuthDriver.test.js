import test from 'ava';

import nock from 'nock';
nock.disableNetConnect();
// nock.recorder.rec(); // uncommenting enables real network connections

import {auths} from '../AuthDriver';

import {DEFAULT_URL} from '../backside.config.js';
const BACKSIDE_URL = process.env.BACKSIDE_URL || DEFAULT_URL;

test('login() with valid credentials', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22Auth%22%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '5b513990-07d3-42dc-89f0-9b67fb0285fb',
      cargo: {
        uGeoloc: '',
        uEmail: 'default@example.com',
        uId: 'ef4da398-7440-4b23-b5a0-1331cc333141',
        uHomepage: '',
        uName: 'therealdefaultadmin',
        uFullName: 'Default Admin',
        uRole: [
          'rar',
          'ror',
        ],
        uAvatar: '',
      },
    });
  // const [token, user] = await auths.login('default@example.com', 'antiquing');
  const [token, user] = await auths.login('therealdefaultadmin', 'antiquing');
  t.truthy(token);
  t.is(user.id, 'ef4da398-7440-4b23-b5a0-1331cc333141');
  t.is(user.name, 'Default Admin');
  t.is(user.handle, 'therealdefaultadmin');
  t.is(user.email, 'default@example.com');
  t.deepEqual(user.roles, ['rar', 'ror']);
});

test('login() with invalid credentials', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22Auth%22%7D')
    .reply(200, {
      rMsg: '',
      rToken: '',
    });
  const [token, cargo] = await auths.login('TestUser@foo.org', 'wrong!');
  t.falsy(token);
  t.deepEqual(cargo, {});
});

test('logout() with valid auth token', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22LogOut%22%2C%22sToken%22%3A%223b1749fc-cdc2-4207-8f60-7788c2d82e38%22%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
    });
  const isLoggedOut = await auths.logout('3b1749fc-cdc2-4207-8f60-7788c2d82e38');
  t.true(isLoggedOut);
});

test('logout() with invalid auth token', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22:%22LogOut%22,%22sToken%22:%229543e977-7d51-4e7c-941f-9092bf5497db%22%7D')
    .reply(500, 'javax.servlet.ServletException: TokenNoUser9543e977-7d51-4e7c-941f-9092bf5497db');
  const isLoggedOut = await auths.logout('9543e977-7d51-4e7c-941f-9092bf5497db');
  t.false(isLoggedOut);
});

test('isEmailAvailable() a previously registered email address', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22ExstEmail%22%2C%22uEmail%22%3A%22default%40example.com%22%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
    });
  const emailIsAvailable = await auths.isEmailAvailable('default@example.com');
  t.is(emailIsAvailable, false);
});

test('isEmailAvailable() an available email address', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22ExstEmail%22%2C%22uEmail%22%3A%22newuser384%40example.com%22%7D')
    .reply(200, {
      rMsg: 'not found',
      rToken: '',
    });
  const emailIsAvailable = await auths.isEmailAvailable('newuser384@example.com');
  t.is(emailIsAvailable, true);
});

test('isHandleAvailable() a previously registered username', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22Validate%22%2C%22uName%22%3A%22therealdefaultadmin%22%7D')
    .reply(200, {
      rMsg: 'not found',
      rToken: '',
    });
  const handleIsAvailable = await auths.isHandleAvailable('therealdefaultadmin');
  t.is(handleIsAvailable, false);
});

test('isHandleAvailable() an available username', async (t) => {
  nock(BACKSIDE_URL)
    .get('/auth/%7B%22verb%22%3A%22Validate%22%2C%22uName%22%3A%22newuser384%22%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
    });
  const handleIsAvailable = await auths.isHandleAvailable('newuser384');
  t.is(handleIsAvailable, true);
});
