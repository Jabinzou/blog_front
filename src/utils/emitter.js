'use strict';
const EventEmitter = require('events');
class Emitter extends EventEmitter {
  constructor () {
    super();
    this.eQue = {};
  }
  on (name, callback, ctx) {
    const eQue = this.eQue || (this.eQue = {});
    (eQue[name] || (eQue[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    return this; // 链式调用
  }
  once (name, callback, ctx) {
    const self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback; // 记录原来函数
    this.on(name, listener, ctx);
  }
  emit (name) {
    console.log(this.eQue[name]);
    if (!this.eQue[name] || !this.eQue[name].length) return;
    const data = [].slice.call(arguments, 1); // 去掉name属性剩余的都是参数
    const callArr = this.eQue[name];
    for (let i = 0; i < callArr.length; i++) {
      callArr[i].fn.apply(callArr[i].ctx, data);
    }
  }
  off (name, callback) {
    if (!this.eQue[name] || !this.eQue[name].length) throw new Error('没有此事件');
    const liveEvent = [];
    const events = this.eQue[name];
    if (this.eQue[name] && callback) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].fn !== callback && events[i].fn._ !== callback) {
          liveEvent.push(events[i]);
        }
      }
    }
    (liveEvent.length) ? (this.eQue[name] = liveEvent) : delete this.eQue[name];
    return this;
  }
};
/**
 * @description test
 * @param {*} val
 * function normal (val) {
    console.log(val);
  }
 * const evn = new Emitter();
  evn.on('lo', normal);
  evn.emit('lo', '1');
  // output is 1
 */
export default Emitter;
