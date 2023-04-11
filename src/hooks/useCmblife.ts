/*
 * @Author: dushuai
 * @Date: 2023-04-11 10:45:50
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:47:04
 * @description: 常用cmblife的挂载回调方法
 */

import cmblife from "@/utils/cmblifeUtil"
import { useToast } from "./useToast"

/**
 * 常用cmblife的挂载回调方法
 */
export const useCmblife = () => {

  /**
   * 挂载cmblife登录回调
   * @param {Function} login 登录获取token的方法 传递协议回调的json数据
   */
  const cmbUserInfo = (login: Function): void => {
    window.getUserInfo = function (params: string) {
      const cmbdata: string = encodeURIComponent(params)
      const data: Cmb.cmbUserInfoData = JSON.parse(cmbdata)
      console.log('cmb登录协议回调:>> ', data)
      // respCode  1000成功 1001接口失败 2000用户不登陆退出 2001用户拒绝授权
      if (data.respCode === '1000') {
        console.log('登录协议回调成功,开始登录')
        login(cmbdata)
      } else if (['1001', '2000', '2001'].includes(data.respCode)) {
        console.log('退出活动: 用户授权失败或者取消登录')
        cmblife.close()
      } else {
        useToast().$msg('活动太火爆,请稍后重试')
      }
    }
  }

  /**
   * 挂载cmblife分享回调
   * @param {Function} callback 分享触发后回调 传递{Cmb.cmbShareCbData}回调参数
   */
  const cmbShareCallback = (callback: Function): void => {
    window.cmbShareCallback = function (params: string) {
      const data: Cmb.cmbShareCbData = JSON.parse(decodeURIComponent(params))
      console.log('cmb分享协议回调:>> ', data)
      // data 1000分享出去 1001取消分享
      callback(data)
    }
  }

  /**
   * 挂载cmb挽留回调
   * @param {Function} callback 点击返回触发的回调
   */
  const cmbRetainCallback = (callback: Function): void => {
    window.retainPopCallback = function () {
      console.log('cmb挽留协议回调:>> retainPopCallback')
      callback()
    }
    const url: string = `cmblife://web/event/back?callback=${encodeURIComponent('javascript:retainPopCallback')}`
    window.location.href = url
  }

  return { cmbUserInfo, cmbShareCallback, cmbRetainCallback }

}
