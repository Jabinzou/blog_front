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
