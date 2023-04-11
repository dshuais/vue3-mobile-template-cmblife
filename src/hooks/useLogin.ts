/*
 * @Author: dushuai
 * @Date: 2023-03-21 16:06:16
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 17:29:10
 * @description: 抽离app登录逻辑hooks
 */
import { getLoginProtocol, Login } from "@/api/api"
import { useAppActions } from "@/stores/appActions"
import cmblife from "@/utils/cmblifeUtil"
import { useToast } from "./useToast"

/**
 * 掌上生活登录and登录接口拿token等
 */
export const useLoginEffect = () => {

  /**
   * 获取用户协议 触发登录
   */
  const getCmbData = () => {
    getLoginProtocol()
      .then(res => {
        if (res.code === 200) {
          if (import.meta.env.VITE_APP_ENV === 'development') {
            console.log('当前为开发环境,已存静态token')
            useAppActions().SET_TOKEN('test-token=123456')
          } else {
            cmblife.executeProtocol(res.data.approvalProtocol)
          }
        } else {
          window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
        }
      })
      .catch(err => {
        console.error('获取协议失败:>> ', err)
        window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
      })
  }

  /**
   * 挂载cmblife登录回调
   */
  const getUserInfo = () => {
    window.getUserInfo = function (params: string) {
      const cmbdata: string = encodeURIComponent(params)
      const data: Cmb.cmbUserInfoData = JSON.parse(cmbdata)
      console.log('cmb协议回调:>> ', data)
      // respCode  1000成功 1001接口失败 2000用户不登陆退出 2001用户拒绝授权
      if (data.respCode === '1000') {
        console.log('协议回调成功,开始登录')
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
   * 登录
   * @param {string} authResponse 协议回调的json数据
   */
  const login = (authResponse: string) => {
    Login({ authResponse })
      .then(res => {
        if (res.code === 200) {
          console.log('登录成功,拿到token')
          useAppActions().SET_TOKEN(res.data.token)
        } else {
          window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
        }
      })
      .catch(err => {
        console.error('登录失败:>> ', err)
        window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
      })
  }

  getUserInfo()

  return { getCmbData }
}
