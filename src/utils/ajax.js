/**
 * @desc 原生ajax用于支持上传组件
 * @author jabin
 */
/**
 * @param url upload url
 * @param xhr xhrHttpRequest object
 */
function getError (url, xhr) {
  let msg;
  if (xhr.response) {
    msg = xhr.response;
  } else if (xhr.responseText) {
    msg = xhr.responseText;
  } else {
    msg = `fail to upload ${url}:${xhr.status}`;
  }
  const err = new Error(msg); // error 接受msg返回一个示实例
  err.status = xhr.status;
  err.url = url;
  err.method = 'post';
  return err;
}
function getBody (xhr) {
  const res = xhr.response || xhr.responseText;
  if (!res) {
    return null;
  }
  try {
    return JSON.parse(res);
  } catch (e) {
    console.error(e);
    return null;
  }
}
/**
 * @desc http request
 * @param {options}
 * @function onprogress callback upload progress
 * @param data posted other key value data
 * @function onerror callback error handler
 * @function onSuccess callback success handler
 * @param file attach file
 * @param headers setting header
 * @param withCredentials depends cookie settting in own site
 */
export default function upload (options) {
  if (typeof XMLHttpRequest === 'undefined') {
    return console.warn('please update your browser');
  }
  const xhr = new XMLHttpRequest(); // now readyState is 0 UNSENT!
  const url = options.url;
  if (xhr.upload) { // upload process
    xhr.upload.onprogress = (e) => { // now readyState is 3 LOADING!
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      options.onProgress(e);
    };
  }
  const formData = new FormData();
  if (options.data) {
    Object.keys(options.data).forEach(item => {
      formData.append(item, options.data[item]);
    });
  }
  if (options.file) {
    formData.append(options.file.name, options.file, options.file.name); // append file use key: value
  }
  xhr.onerror = (e) => {
    options.onError(e);
  };
  xhr.onload = () => { // now readyState is 4 DONE!
    if (xhr.status < 200 || xhr.status > 300) {
      return options.onError(getError(url, xhr));
    }
    options.onSuccess(getBody(xhr));
  };
  xhr.open('post', url, true); // true is asynchronous  now readyState is 1 OPENED!
  if (options.withCredentials && 'withCredentials' in xhr) { // true means you can set cookie in yourself site
    xhr.withCredentials = true;
  }
  const headers = options.headers || {};

  for (let item in headers) { // set header
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
