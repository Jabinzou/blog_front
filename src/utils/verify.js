'use strict';
import CryptoJS from 'crypto-js/crypto-js';
/**
 * @desc encrypt
 * @param content string
 * @param keys encode key 16bite
 * @param ivs 16bite
 */
export function encryptString (content, keys, ivs) {
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(ivs);
  const srcs = CryptoJS.enc.Utf8.parse(content);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
