'use strict';
import CryptoJS from 'crypto-js/crypto-js';
import Vue from 'vue';
export function getCookie (name) {
  const regMatch = new RegExp(`${name}[^;]+`).exec(document.cookie);
  // this will match the key value expression like 'name=123' array;
  /**
   * @param index
   * @param input
   * @param groups
   */
  return decodeURIComponent(regMatch ? regMatch.toString().replace(/^[^=]+./, '') : '');
  // this will match the '=' front content and replace with '',then you will get the '=' after thing;
}

export function uuid (len) {
  return CryptoJS.lib.WordArray.random(len / 2).toString().toUpperCase();
}
/**
 * @description 事件监听
 */
export const addEvent = function (element, event, handler) {
  const isServer = Vue.prototype.$isSever;
  if (!isServer && document.addEventListener) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false);
    }
  } else {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler);
    }
  };
};
/**
 * @description 解除绑定
 */
export const removeEvent = function (ele, str, fn) {
  if (ele.removeEventListener) {
    ele.removeEventListener(str, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent('on' + str, fn);
  } else {
    ele['on' + str] = null;
  }
};
/**
 * @description deep merge
 * @param {*} obj1 source
 * @param {*} obj2 target
 */
export const deepMerge = function (obj1, obj2) {
  for (const key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]'
      ? deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];
  }
  return obj1;
};
