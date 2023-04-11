/*
 * @Author: dushuai
 * @Date: 2023-03-21 16:06:16
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:49:19
 * @description: 抽离app登录逻辑hooks
 */
import { GetLoginProtocol, Login } from "@/api/api"
import { useAppActions } from "@/stores/appActions"
import cmblife from "@/utils/cmblifeUtil"
import { useCmblife } from './useCmblife'

/**
 * 掌上生活登录and登录接口拿token等
 */
export const useLoginEffect = () => {
  const { cmbUserInfo } = useCmblife(),
    { SET_TOKEN } = useAppActions()

  /**
   * 获取用户协议 触发登录
   */
  const getCmbData = () => {
    GetLoginProtocol()
      .then(res => {
        if (res.code === 200) {
          if (import.meta.env.VITE_APP_ENV === 'development') {
            console.log('当前为开发环境,已存静态token')
            SET_TOKEN('test-token=123456')
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
   * 登录
   * @param {string} authResponse 协议回调的json数据
   */
  const login = (authResponse: string) => {
    Login({ authResponse })
      .then(res => {
        if (res.code === 200) {
          console.log('登录成功,拿到token')
          SET_TOKEN(res.data.token)
        } else {
          window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
        }
      })
      .catch(err => {
        console.error('登录失败:>> ', err)
        window.location.href = import.meta.env.VITE_APP_ERROR_PAGE_URL
      })
  }

  cmbUserInfo(login)

  return { getCmbData }
}
