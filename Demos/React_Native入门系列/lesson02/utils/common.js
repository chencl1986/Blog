// 引入Dimensions，用于获取设备的尺寸
import { Dimensions } from 'react-native';

// 设置基础宽度为750
const BASE_WIDTH=750;

export function calc(size){
  // 获取当前窗口宽度，支持参数为window和screen
  let { width } = Dimensions.get('window');

  // 换算出当前需要显示的尺寸
  return size * width / BASE_WIDTH;
}
