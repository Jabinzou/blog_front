import http from '../config/init';
import Toast from 'muse-ui-toast';
import 'material-icons/iconfont/material-icons.scss';
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
export async function getList () {
  try {
    const res = await http.get('/category/list', {
      params: {
        a: 1
      }
    });
    return res;
  } catch (error) {
    console.log(error);
    Toast.error(error.message || '联盟亡了!');
  }
}
