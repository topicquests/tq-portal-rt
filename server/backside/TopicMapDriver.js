import BacksideDriver, {
  extractIcon, isPrivate, utc,
} from './BacksideDriver';
import config from './backside.config';

// Methods correspond with verbs in src/main/java/org/topicquests/backside/servlet/apps/tm/api/ITopicMapMicroformat.java
export default class TopicMapDriver extends BacksideDriver {
  async fullTextSearch(query = {}) {
    return this.getCargo('/tm/', {verb: 'ftSrch', ...query});
  }

  async fullTextPhraseSearch(query = {}) {
    return this.getCargo('/tm/', {verb: 'ftPhrSrch', ...query});
  }

  async fetchTopic(lox, query = {}) {
    const cargo = await this.getCargo('/tm/', {verb: 'GetTopic', lox, ...query});
    return destructure(cargo);
  }

  async addTopic({token, handle, id}, {language, label, details, icon, isPrivate, instanceOf}, query = {}) {
    const cargo = await this.postCargo('/tm/', {
      verb: 'NewInstance',
      sToken: token,
      uName: handle,
      cargo: {
        uId: id,
        Lang: language,
        label,
        details,
        lIco: `/images/${icon}.png`,
        sIco: `/images/${icon}_sm.png`,
        isPrv: isPrivate ? 'T' : 'F',
        inOf: instanceOf,
      },
      ...query,
    });
    return destructure(cargo);
  }

  async removeTopic(lox, query = {}) {
    return this.getCargo('/tm/', {verb: 'RemTopic', lox, ...query});
  }

  async newTopicInstance(query = {}) {
    return this.getCargo('/tm/', {verb: 'NewInstance', ...query});
  }

  async newTopicSubclass(query = {}) {
    return this.getCargo('/tm/', {verb: 'NewSub', ...query});
  }

  async listTopicInstances(query = {}) {
    const cargo = await this.getCargo('/tm/', {verb: 'ListInstances', ...query});
    return (cargo || []).map((instance) => destructure(instance));
  }

  async listTopicSubclasses(query = {}) {
    return this.getCargo('/tm/', {verb: 'ListSubclasses', ...query});
  }

  async addConversationNode({token, handle, id: uId}, {id, type, parentId, discussionId, isPrivate, label, details, language, url}, query = {}) {
    const cargo = await this.postCargo('/tm/', {
      verb: 'NewConvNode',
      sToken: token,
      uName: handle,
      cargo: {
        lox: id,
        inOf: type,
        uId,
        ConParentLocator: parentId,
        ContextLocator: discussionId,
        uName: handle,
        isPrv: isPrivate ? 'T' : 'F',
        label,
        details,
        Lang: language,
        url,
      },
      ...query,
    });
    return destructure(cargo);
  }

  async addFeaturesToTopic(query = {}) {
    return this.postCargo('/tm/', {verb: 'AddFeatures', ...query});
  }

  async loadTree(query = {}) {
    return this.getCargo('/tm/', {verb: 'LoadTree', ...query});
  }

  async listTreeChildNodes(query = {}) {
    return this.getCargo('/tm/', {verb: 'ListTreeNodes', ...query});
  }

  async fetchTopicByUrl(query = {}) {
    return this.getCargo('/tm/', {verb: 'GetByURL', ...query});
  }

  async addPivot(query = {}) {
    return this.postCargo('/tm/', {verb: 'AddPivot', ...query});
  }

  async addRelation(query = {}) {
    return this.postCargo('/tm/', {verb: 'AddRelation', ...query});
  }

  async addChildNode(query = {}) {
    return this.postCargo('/tm/', {verb: 'AddChildNode', ...query});
  }

  async attachTag({token, handle}, {id, tags, language, ...query}) {
    return this.postCargo('/tm/', {
      verb: 'FindProcessTag',
      sToken: token,
      uName: handle,
      lox: id,
      ListProperty: tags,
      Lang: language,
      ...query,
    });
  }

  async attachBookmark(query = {}) {
    return this.postCargo('/tm/', {verb: 'FindProcessBookmark', ...query});
  }
}

export const topicMap = new TopicMapDriver(config);

function extractLocators({documentLocator, documentLabel, documentType,
                          relationLocator, relationLabel, relationType, documentSmallIcon}) {
  return {
    document: {
      id: documentLocator,
      name: documentLabel,
      type: documentType,
    },
    relation: {
      id: ((relationLocator || '').split(' ') || [])[0],
      name: relationLabel,
      type: relationType,
    },
    icon: extractIcon(documentSmallIcon),
  };
}

function destructure({lox, inOf, trCl, crtr, pvL, _ver, crDt, lEdDt, details, label, lIco, sIco, isPrv, language, ...cargo}) {
  return {
    id: lox,
    instanceOf: inOf,
    closure: Array.from(new Set(trCl)),
    userId: crtr,
    title: (label || [])[0],
    details: (details || [])[0],
    pivots: (pvL || []).map(extractLocators),
    version: _ver,
    icon: extractIcon(sIco, lIco),
    isPrivate: isPrivate(isPrv),
    language: (language || 'en'), // TODO(wenzowski) BacksideServletKS is borked.
    ...cargo,
    createdAt: utc(crDt),
    updatedAt: utc(lEdDt),
  };
}
