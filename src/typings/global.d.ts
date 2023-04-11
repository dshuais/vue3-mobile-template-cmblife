/*
 * @Author: dushuai
 * @Date: 2023-04-10 15:55:41
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:10:05
 * @description: Window
 */
interface Window {
  /** 登录回调 */
  getUserInfo: Function,

  /** 分享回调 */
  cmbShareCallback: Function,

  /** 返回回调 */
  retainPopCallback: Function
}
