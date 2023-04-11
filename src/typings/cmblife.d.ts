/*
 * @Author: dushuai
 * @Date: 2023-03-24 10:57:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 16:16:30
 * @description: 掌上生活接口response/request类型定义
 */

/** 
 * 掌上生活接口response/request类型定义
 */
declare namespace Cmb {

  /** cmb登录回调的返参 */
  interface cmbUserInfoData {
    aid: string,
    cmbKeyAilas: string,
    code: string,
    date: string,
    mid: string,
    respCode: string,
    respMsg: string,
    scope: string,
    sign: string,
    state: string,
  }

}
