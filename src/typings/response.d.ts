/*
 * @Author: dushuai
 * @Date: 2023-03-19 22:08:30
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-10 17:17:04
 * @Description: 接口response data类型文件
 */

/**
 * 接口response data类型
 */
declare namespace Res {
  /** response */
  interface ResponseRes<T = any> {
    code: number,
    data: T,
    msg: string
  }

  /** 用户协议回调 */
  interface LoginProtocolData {
    approvalProtocol: string
  }

  /** 登录接口data */
  interface LoginData {
    token: string,
  }

  /** 预加载图片接口data */
  interface NetworkImgData {
    imgList: string[]
  }

}
