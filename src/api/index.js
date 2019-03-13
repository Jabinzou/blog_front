import http from '../config/init';
import Toast from 'muse-ui-toast';
import { getCookie } from '../utils/normal';
const options = {
  position: 'bottom', // 弹出的位置
  time: 5000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
};
Toast.config(options);
export async function validateUser (options) {
  try {
    const res = await http.post('/user/verify', options);
    return res;
  } catch (error) {
    console.log(error);
    Toast.error(error.message || '联盟亡了!');
  }
}
// ------------------ category ----------------- //
export async function getCate (options) {
  try {
    const res = await http.get('/category/list', {
      params: options
    });
    return res;
  } catch (error) {
    console.log(error);
    Toast.error(error.message || '联盟亡了!');
  }
}
/**
 * @description 删除分类
 * @param {*} options
 */
export async function deleteCate (options) {
  try {
    const res = await http.post('/category/delete', options);
    return res;
  } catch (error) {
    console.log(error);
    Toast.error(error.message || '联盟亡了!');
  }
}
/**
 * @description 添加分类
 */
export async function addCate (options) {
  try {
    const param = Object.assign({}, options, {userId: getCookie('tag')});
    const res = await http.post('/category/add', param);
    return res;
  } catch (error) {
    console.log(error);
    Toast.error(error.message || '联盟亡了!');
  }
}
// ------------------ tag ----------------- //
/**
 * @description get all tags
 */
export async function getAllTags (options) {
  try {
    const res = await http.get('/tag/list', {
      params: options
    });
    return res;
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
/**
 * @description 添加tag
 */
export async function addTag (options) {
  try {
    const params = Object.assign({}, options, {userId: getCookie('tag')});
    const res = await http.post('/tag/add', params);
    return res;
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
/**
 * @description 删除tag
 */
export async function deleteTag (options) {
  try {
    const res = await http.post('/tag/delete', options);
    return res;
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
/**
 * @description verify token
 */
export async function verifyToken (val) {
  try {
    return await http.post('/user/promise', {
      token: val
    });
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
// ------------------- article ------------------------ //
export async function publish (options) {
  try {
    const param = Object.assign({}, options, {userId: getCookie('tag')});
    const res = await http.post('/article/add', param);
    return res;
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
/**
 * @description 获取文章列表
 */
export async function getArticle (options) {
  try {
    const res = await http.get('/article/list', {
      params: options
    });
    const {data} = res;
    if (data.code === 1000 && data.data) {
      return data.data;
    } else {
      Toast.error('拉取文章列表失败');
    }
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
/**
 * @description 获取详情
 */
export async function getDetail (options) {
  try {
    const res = await http.get('/article/detail', {
      params: options
    });
    const {data} = res;
    if (data.code === 1000 && data.data) {
      return data.data;
    } else {
      Toast.error('拉取详情数据格式错误!');
    }
  } catch (err) {
    console.log(err);
    Toast.error(err.message || '联盟亡了!');
  }
}
