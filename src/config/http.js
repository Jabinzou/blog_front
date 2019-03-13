'use strict';

const config = {
  baseURL: `http://127.0.0.1:${process.env.PORT || 8034}/api`,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  timeout: 10000
};

export default config;
