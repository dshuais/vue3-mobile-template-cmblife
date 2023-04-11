/*
 * @Author: dushuai
 * @Date: 2023-03-24 10:57:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:19:04
 * @description: 掌上生活接口response/request类型定义
 */

/** 
 * 掌上生活接口response/request类型定义
 */
declare namespace Cmb {

  /** cmb回调的code and msg */
  interface cmbCallbackData {
    respCode: string,
    respMsg: string,
  }

  /** cmb登录回调的返参 */
  interface cmbUserInfoData extends cmbCallbackData {
    aid: string,
    cmbKeyAilas: string,
    code: string,
    date: string,
    mid: string,
    scope: string,
    sign: string,
    state: string,
  }

  /** cmb分享回调的返参 */
  interface cmbShareCbData extends cmbCallbackData {
    /** data 1000分享成功 1001取消分享 */
    data: string
  }

}
