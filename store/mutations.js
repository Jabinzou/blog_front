import * as type from './types';
export default {
  [type.LOCAL_ARTICLE] (state, param) {
    state.articleList = param;
  }
};
