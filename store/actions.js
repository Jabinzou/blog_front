import * as types from './types';
import { getArticle } from '@api';

export default {
  async getArticle ({ commit }, param) {
    const result = await getArticle(param) || {
      count: 0,
      list: []
    };
    commit(types.LOCAL_ARTICLE, result);
  }
};
