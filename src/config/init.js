'use strict';

import axios from 'axios';
import config from '../config/http';
import * as md5 from 'md5';
axios.defaults.headers.common['Cache-Control'] = 'private, no-store';
// axios.defaults.headers.common['pass-token'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const http = axios.create(config);
http.interceptors.request.use(
  config => {
    let timeStamp = Date.now();
    config.headers['auth_sign'] = md5(
      JSON.stringify({
        timeStamp: timeStamp,
        data: {} + 'kissmyass'
      })
    );
    config.headers['time_stamp'] = timeStamp;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default http;
