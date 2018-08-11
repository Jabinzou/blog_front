'use strict';

import axios from 'axios';
import config from './config/http';

axios.defaults.headers.common['Cache-Control'] = 'private, no-store';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const http = axios.create(config);
http.interceptors.use();
export default http;
