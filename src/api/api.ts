/*
 * @Author: dushuai
 * @Date: 2023-03-15 14:44:06
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 10:19:26
 * @description: api
 */
import { post, postJSON, get } from '@/axios/index'

/** 获取掌上生活用户协议 */
export const GetLoginProtocol = () => post<Res.LoginProtocolData>('/app/creatCmbLife')

/** 登录 */
export const Login = (params: Req.LoginParams) => post<Res.LoginData>('app/login', params)

/** 可能用到的预加载网络图片 */
export const GetNetworkImg = () => post<Res.NetworkImgData>('app/xxx')

/** 测试接口 */
export const GetCaptcha = () => get<{ captchaImg: string }>('api/captcha')
