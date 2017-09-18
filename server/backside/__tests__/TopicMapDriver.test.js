import test from 'ava';

import nock from 'nock';
nock.disableNetConnect();
// nock.recorder.rec(); // uncommenting enables real network connections

import {topicMap} from '../TopicMapDriver';
import {deepEqual} from './helpers';

import {DEFAULT_URL} from '../backside.config.js';
const BACKSIDE_URL = process.env.BACKSIDE_URL || DEFAULT_URL;

import {
  mockFetchTopicSuccess,
  mockAddTopicSuccess,
  mockAddConversationNodeSuccess,
} from './mocks/topicMapResponse';

import {
  stubFetchTopicCargo,
  stubAddTopicCargo,
  stubAddConversationNodeCargo,
} from './stubs/topicMapCargo';

const authToken = {
  id: '21a54bdd-017f-4afa-af86-444d6710215f',
  name: 'Alec Wenzowski',
  handle: 'wenzowski',
  email: 'alec@wenzowski.com',
};

test.todo('fullTextSearch()');
test.todo('fullTextPhraseSearch()');

test('fetchTopic() success', async (t) => {
  nock(BACKSIDE_URL)
    .get('/tm/%7B%22verb%22%3A%22GetTopic%22%2C%22lox%22%3A%2293707410-5135-4d19-aaa2-6bfaa4033335%22%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
      cargo: {
        crtr: '21a54bdd-017f-4afa-af86-444d6710215f',
        pvL: [{
          relationType: 'DocumentCreatorRelationType',
          documentLocator: '21a54bdd-017f-4afa-af86-444d6710215f',
          relationLocator: '93707410-5135-4d19-aaa2-6bfaa4033335 org.topicquests.ks.tm.SubjectProxy@21f474eb 21a54bdd-017f-4afa-af86-444d6710215f',
          documentLabel: 'Alec Wenzowski',
          documentType: 'UserType',
          relationLabel: 'DocumentCreatorRelationType',
          documentSmallIcon: '/images/person_sm.png',
        }],
        _ver: '1459212371093',
        lEdDt: '2016-03-28T20:46:11-04:00',
        label: [
          'The Return of the King',
        ],
        inOf: 'BlogNodeType',
        crDt: '2016-03-28T20:46:11-04:00',
        trCl: [
          'TypeType',
          'TypeType',
          'ClassType',
          'NodeType',
          'BlogNodeType',
        ],
        lox: '66676eab-0445-4233-b733-b60db0093852',
        sIco: '/images/publication_sm.png',
        isPrv: 'f',
        details: [
          'this is not a book',
        ],
        lIco: '/images/publication.png',
      },
    });
  const cargo = await topicMap.fetchTopic('93707410-5135-4d19-aaa2-6bfaa4033335');
  deepEqual(t, cargo, stubFetchTopicCargo);
});

test('addTopic() success', async (t) => {
  nock(BACKSIDE_URL)
    .post('/tm/%7B%22verb%22%3A%22NewInstance%22%2C%22uName%22%3A%22wenzowski%22%2C%22cargo%22%3A%7B%22uId%22%3A%2221a54bdd-017f-4afa-af86-444d6710215f%22%2C%22Lang%22%3A%22en%22%2C%22label%22%3A%22titleitagain%3F%22%2C%22details%22%3A%22descriptorize!%22%2C%22lIco%22%3A%22%2Fimages%2Fpublication.png%22%2C%22sIco%22%3A%22%2Fimages%2Fpublication_sm.png%22%2C%22isPrv%22%3A%22F%22%2C%22inOf%22%3A%22BlogNodeType%22%7D%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
      cargo: {
        crDt: '2016-05-09T15:35:00-04:00',
        trCl: [
          'TypeType',
          'ClassType',
          'NodeType',
          'BlogNodeType',
          'BlogNodeType',
          'BlogNodeType',
        ],
        crtr: '21a54bdd-017f-4afa-af86-444d6710215f',
        pvL: [{
          relationType: 'DocumentCreatorRelationType',
          documentLocator: '21a54bdd-017f-4afa-af86-444d6710215f',
          relationLocator: '634d649f-e431-443a-af52-3a50b8b8ac91 org.topicquests.ks.tm.SubjectProxy@21f474eb 21a54bdd-017f-4afa-af86-444d6710215f',
          documentLabel: 'Alec Wenzowski',
          documentType: 'UserType',
          relationLabel: 'DocumentCreatorRelationType',
          documentSmallIcon: '/images/person_sm.png',
        }],
        lox: 'b3641f1a-7b6a-408e-be6c-0a83f5f921de',
        sIco: '/images/publication_sm.png',
        isPrv: false,
        _ver: '1462822500806',
        lEdDt: '2016-05-09T15:35:00-04:00',
        details: [
          'descriptorize!',
        ],
        label: [
          'titleitagain?',
        ],
        lIco: '/images/publication.png',
        inOf: 'BlogNodeType',
      },
    });
  const cargo = await topicMap.addTopic(authToken, {
    language: 'en',
    label: 'titleitagain?',
    details: 'descriptorize!',
    icon: 'publication',
    isPrivate: false,
    instanceOf: 'BlogNodeType',
  });
  deepEqual(t, cargo, stubAddTopicCargo);
});

test.todo('removeTopic()');
test.todo('newTopicInstance()');
test.todo('newTopicSubclass()');
test.todo('listTopicInstances()');
test.todo('listTopicSubclasses()');

// allowable types: https://github.com/KnowledgeGarden/BacksideServletKS/blob/f715bffbafe9e121efa7870235cda1a2f9e16590/src/main/java/org/topicquests/backside/servlet/apps/tm/StructuredConversationModel.java#L63
// see also https://github.com/OpenSherlock/TQElasticKnowledgeSystem/blob/master/src/main/java/org/topicquests/ks/tm/api/INodeTypes.java#L22
test('addConversationNode() success', async (t) => {
  nock(BACKSIDE_URL)
    .post('/tm/%7B%22verb%22%3A%22NewConvNode%22%2C%22uName%22%3A%22wenzowski%22%2C%22cargo%22%3A%7B%22lox%22%3A%227263c350-3d0a-4fe1-88ed-aec5960161a2%22%2C%22inOf%22%3A%22IssueNodeType%22%2C%22uId%22%3A%2221a54bdd-017f-4afa-af86-444d6710215f%22%2C%22ConParentLocator%22%3A%227263c350-3d0a-4fe1-88ed-aec5960161a1%22%2C%22ContextLocator%22%3A%227263c350-3d0a-4fe1-88ed-aec5960161ae%22%2C%22uName%22%3A%22wenzowski%22%2C%22isPrv%22%3A%22F%22%2C%22label%22%3A%22Can%20I%20ask%20a%20question%3F%22%2C%22details%22%3A%22I%20need%20to%20know%20if%20this%20works%22%2C%22Lang%22%3A%22en%22%2C%22url%22%3A%22http%3A%2F%2Fexample.com%2Fultrafake%22%7D%7D')
    .reply(200, {
      rMsg: 'ok',
      rToken: '',
      cargo: {
        crtr: '21a54bdd-017f-4afa-af86-444d6710215f',
        _ver: '1472061342712',
        lEdDt: '2016-08-24T13:55:42-04:00',
        label: [
          'Can I ask a question?',
        ],
        inOf: 'IssueNodeType',
        url: 'http://example.com/ultrafake',
        crDt: '2016-08-24T13:55:42-04:00',
        pvL: [{
          relationType: 'DocumentCreatorRelationType',
          documentLocator: '21a54bdd-017f-4afa-af86-444d6710215f',
          relationLocator: '7263c350-3d0a-4fe1-88ed-aec5960161a2 org.topicquests.ks.tm.SubjectProxy@21f474eb 21a54bdd-017f-4afa-af86-444d6710215f',
          documentLabel: 'Alec Wenzowski',
          documentType: 'UserType',
          relationLabel: 'DocumentCreatorRelationType',
          documentSmallIcon: '/images/person_sm.png',
        }],
        trCl: [
          'TypeType',
          'ClassType',
          'NodeType',
          'IssueNodeType',
        ],
        lox: '7263c350-3d0a-4fe1-88ed-aec5960161a2',
        sIco: '/images/ibis/issue_sm.png',
        isPrv: false,
        details: [
          'I need to know if this works',
        ],
        lIco: '/images/ibis/issue.png',
      },
    });
  const cargo = await topicMap.addConversationNode(authToken, {
    id: '7263c350-3d0a-4fe1-88ed-aec5960161a2',
    type: 'IssueNodeType',
    parentId: '7263c350-3d0a-4fe1-88ed-aec5960161a1',
    discussionId: '7263c350-3d0a-4fe1-88ed-aec5960161ae',
    isPrivate: false,
    label: 'Can I ask a question?',
    details: 'I need to know if this works',
    language: 'en',
    url: 'http://example.com/ultrafake',
  });
  deepEqual(t, cargo, stubAddConversationNodeCargo);
});
test.todo('addConversationNode() bad node type');

test.todo('addFeaturesToTopic()');
test.todo('loadTree()');
test.todo('listTreeChildNodes()');
test.todo('fetchTopicByUrl()');
test.todo('addPivot()');
test.todo('addRelation()');
test.todo('addChildNode()');

test('attachTag() success', async (t) => {
  nock(BACKSIDE_URL)
    .post('/tm/%7B%22verb%22%3A%22FindProcessTag%22%2C%22uName%22%3A%22wenzowski%22%2C%22lox%22%3A%227263c350-3d0a-4fe1-88ed-aec5960161a2%22%2C%22ListProperty%22%3A%5B%22tag1%22%2C%22tag2%22%5D%2C%22Lang%22%3A%22en%22%7D')
    .reply(200, {rMsg: 'ok', rToken: ''});
  const cargo = await topicMap.attachTag(authToken, {
    id: '7263c350-3d0a-4fe1-88ed-aec5960161a2',
    tags: ['tag1', 'tag2'],
    language: 'en',
  });
  deepEqual(t, cargo, {});
});

test.todo('attachBookmark()');
