export const stubFetchTopicCargo = {
  id: '66676eab-0445-4233-b733-b60db0093852',
  userId: '21a54bdd-017f-4afa-af86-444d6710215f',
  version: '1459212371093',
  title: 'The Return of the King',
  details: 'this is not a book',
  instanceOf: 'BlogNodeType',
  closure: [
    'TypeType',
    'ClassType',
    'NodeType',
    'BlogNodeType',
  ],
  pivots: [{
    document: {
      id: '21a54bdd-017f-4afa-af86-444d6710215f',
      name: 'Alec Wenzowski',
      type: 'UserType',
    },
    icon: 'person',
    relation: {
      id: '93707410-5135-4d19-aaa2-6bfaa4033335',
      name: 'DocumentCreatorRelationType',
      type: 'DocumentCreatorRelationType',
    },
  }],
  icon: 'publication',
  isPrivate: false,
  language: 'en',
  createdAt: '2016-03-29T00:46:11.000Z',
  updatedAt: '2016-03-29T00:46:11.000Z',
};

export const stubAddTopicCargo = {
  id: 'b3641f1a-7b6a-408e-be6c-0a83f5f921de',
  version: '1462822500806',
  title: 'titleitagain?',
  details: 'descriptorize!',
  instanceOf: 'BlogNodeType',
  closure: [
    'TypeType',
    'ClassType',
    'NodeType',
    'BlogNodeType',
  ],
  userId: '21a54bdd-017f-4afa-af86-444d6710215f',
  pivots: [{
    document: {
      id: '21a54bdd-017f-4afa-af86-444d6710215f',
      name: 'Alec Wenzowski',
      type: 'UserType',
    },
    icon: 'person',
    relation: {
      id: '634d649f-e431-443a-af52-3a50b8b8ac91',
      name: 'DocumentCreatorRelationType',
      type: 'DocumentCreatorRelationType',
    },
  }],
  icon: 'publication',
  isPrivate: false,
  language: 'en',
  createdAt: '2016-05-09T19:35:00.000Z',
  updatedAt: '2016-05-09T19:35:00.000Z',
};

export const stubAddConversationNodeCargo = {
  createdAt: '2016-08-24T17:55:42.000Z',
  details: 'I need to know if this works',
  icon: 'ibis/issue',
  id: '7263c350-3d0a-4fe1-88ed-aec5960161a2',
  instanceOf: 'IssueNodeType',
  isPrivate: false,
  language: 'en',
  pivots: [{
    document: {
      id: '21a54bdd-017f-4afa-af86-444d6710215f',
      name: 'Alec Wenzowski',
      type: 'UserType',
    },
    icon: 'person',
    relation: {
      id: '7263c350-3d0a-4fe1-88ed-aec5960161a2',
      name: 'DocumentCreatorRelationType',
      type: 'DocumentCreatorRelationType',
    },
  }],
  title: 'Can I ask a question?',
  closure: [
    'TypeType',
    'ClassType',
    'NodeType',
    'IssueNodeType',
  ],
  updatedAt: '2016-08-24T17:55:42.000Z',
  url: 'http://example.com/ultrafake',
  userId: '21a54bdd-017f-4afa-af86-444d6710215f',
  version: '1472061342712',
};
