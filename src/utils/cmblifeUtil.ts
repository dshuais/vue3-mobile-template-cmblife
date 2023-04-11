/* eslint-disable prettier/prettier */
//------------------------------------------------------------------------------
// CMB Confidential
//
// Copyright (C) 2016.9.12. China Merchants Bank Co., Ltd. All rights reserved.
//
// No part of this file may be reproduced or transmitted in any form or by any means,
// electronic, mechanical, photocopying, recording, or otherwise, without prior
// written permission of China Merchants Bank Co., Ltd.
//
//------------------------------------------------------------------------------
const cmblife = {
  /**
   * 执行cmblife协议
   *
   * 可用于唤起掌上生活，也可用于在掌上生活内执行某功能
   */
  executeProtocol: function (protocol: string) {
    if (this.isCmblife()) {
      var iframe: HTMLIFrameElement = document.createElement('iframe');
      iframe.style.cssText = 'display:none;width:0px;height:0px;';
      iframe.src = protocol;
      (document.body || document.documentElement).appendChild(iframe);
      setTimeout(function () {
        iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe);
      }, 0);
    } else if (this.isIOS()) {
      location.href = protocol;
      setTimeout(function () {
        window.location.href =
          'https://cmblife.cmbchina.com/cmblife/download/otherzf0810.html';
      }, 2000);
    } else {
      var time: number = Date.now();
      location.href = protocol;
      setTimeout(function () {
        if (Date.now() - time < 1200) {
          location.href =
            'https://cmblife.cmbchina.com/cmblife/download/otherzf0810.html';
        }
      }, 1000);
    }
  },

  /**
   * 显示等待框（仅掌上生活内）
   *
   * 请求参数：
   * msg              | O | string |    等待框中显示的文字，可不传，默认为"加载中，请稍候..."
   */
  showWait: function (msg: string) {
    if (!this.isCmblife()) {
      return;
    }
    var protocol: string = 'cmblife://web/widget/showwait';
    if (null != msg) {
      protocol += '?msg=' + encodeURIComponent(msg);
    }
    this.executeProtocol(protocol);
  },

  /**
   * 隐藏等待框（仅掌上生活内）
   */
  dismissWait: function () {
    if (!this.isCmblife()) {
      return;
    }
    var protocol: string = 'cmblife://web/widget/dismiss';
    this.executeProtocol(protocol);
  },

  /**
   * 显示普通toast（仅掌上生活内）
   *
   * 请求参数：
   * msg            | M | string | 	  提示信息
   * duration       | O | number |      显示时长，单位毫秒,不传默认为3000毫秒
   */
  showToast: function (msg: string, duration?: number) {
    if (!this.isCmblife()) {
      return;
    }
    var protocol =
      'cmblife://web/widget/showtoast' + '?msg=' + encodeURIComponent(msg);
    if (null != duration) {
      protocol += '&duration=' + encodeURIComponent(duration);
    }
    this.executeProtocol(protocol);
  },

  /**
   * 显示带单按钮的对话框（仅掌上生活内）
   *
   * 请求参数：
   * title            | M | string | 	  弹窗标题
   * msg              | M | string |    弹窗中的话术
   * btn              | M | string |    按钮文字
   * btncallback      | O | string |    点击按钮后的js回调函数名,不传则不进行任何回调
   *
   */
  show1BtnDialog: function (title: string, msg: string, btn: string, btncallback?: Function) {
    if (!this.isCmblife()) {
      return;
    }
    var protocol: string =
      'cmblife://web/widget/show1btndialog' +
      '?title=' +
      encodeURIComponent(title) +
      '&msg=' +
      encodeURIComponent(msg) +
      '&btn=' +
      encodeURIComponent(btn);
    if (null != btncallback) {
      protocol +=
        '&btncallback=' +
        encodeURIComponent('javascript:' + this.getCallbackName());
    }
    this.executeProtocol(protocol);
  },

  /**
   * 显示带双按钮的对话框（仅掌上生活内）
   *
   * 请求参数：
   * title            | M | string | 	  弹窗标题
   * msg              | M | string |    弹窗中的话术
   * lbtn             | M | string |    左侧按钮文字
   * lbtncallback     | O | string |    点击左侧按钮后的js回调函数名,不传则不进行任何回调
   * rbtn             | M | string |    右侧按钮文字
   * rbtncallback     | O | string |    点击右侧按钮后的js回调函数名,不传则不进行任何回调
   *
   */
  show2BtnDialog: function (title: string, msg: string, lbtn: string, rbtn: string, lbtncallback?: Function, rbtncallback?: Function) {
    if (!this.isCmblife()) {
      return;
    }
    var protocol: string =
      'cmblife://web/widget/show2btndialog' +
      '?title=' +
      encodeURIComponent(title) +
      '&msg=' +
      encodeURIComponent(msg) +
      '&lbtn=' +
      encodeURIComponent(lbtn) +
      '&rbtn=' +
      encodeURIComponent(rbtn);
    if (null != lbtncallback) {
      protocol +=
        '&lbtncallback=' +
        encodeURIComponent('javascript:' + this.getCallbackName());
    }
    if (null != rbtncallback) {
      protocol +=
        '&rbtncallback=' +
        encodeURIComponent('javascript:' + this.getCallbackName());
    }
    this.executeProtocol(protocol);
  },

  /**
   * 关闭当前页面（仅掌上生活内）
   */
  close: function () {
    if (!this.isCmblife()) {
      return;
    }
    var protocol: string = 'cmblife://web/close';
    this.executeProtocol(protocol);
  },

  /**
   * 判断是否为掌上生活
   *
   * 输入样例：userAgent = Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_4 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G35,(cmblife 5.5.0/47 v2)
   *
   * 返回样例：true
   */
  isCmblife: function () {
    var userAgent: string = navigator.userAgent.toLowerCase();
    return /cmblife/.test(userAgent);
  },

  /**
   * 获取APP版本号（仅掌上生活内）
   *
   * 输入样例：userAgent = Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_4 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G35,(cmblife 5.5.0/47 v2)
   *
   * 返回样例：5.5.0
   */
  getAppVersion: function () {
    if (this.isCmblife()) {
      var userAgent: string = navigator.userAgent;
      var appVersion: string = userAgent.substring(
        userAgent.indexOf('cmblife') + 7,
        userAgent.lastIndexOf('/')
      );
      return this.trim(appVersion);
    }
    return null;
  },

  /**
   * 判断是否为iOS
   */
  isIOS: function () {
    var userAgent: string = navigator.userAgent;
    return Boolean(userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
  },

  /**
   * 判断是否为安卓
   */
  isAndroid: function () {
    var userAgent: string = navigator.userAgent;
    return Boolean(userAgent.match(/Android/i));
  },

  /**
   * 去除字符串两端的空白字符
   */
  trim: function (str: string) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },

  /**
   * 获取js回调方法的函数名称
   * 输入：callback          | M | string或者function | 	    回调函数
   */
  getCallbackName: function (callback?: (arg0: any) => void) {
    if (typeof callback == 'function') {
      var callbackName: string =
        'cmb' +
        Math.random()
          .toString(36)
          .substr(2);
      while (window[callbackName]) {
        callbackName =
          'cmb' +
          Math.random()
            .toString(36)
            .substr(2);
      }
      // console.log("window[callbackName]1", window[callbackName]);
      window[callbackName] = function (cmbdata: any) {
        console.log('cmbdata1', cmbdata);
        callback(cmbdata);
        console.log('cmbdata2', cmbdata);
        delete window[callbackName];
      };
      // console.log("window[callbackName]2", window[callbackName]);

      return callbackName;
    } else {
      return callback;
    }
  },

  /**
   * 发起模拟流程，将使用开放平台模拟工具进行授权登录或支付流程的模拟
   * @param protocol
   */
  startSimulation: function (protocol: string) {
    if (!protocol) {
      return;
    }

    // 支付协议
    if (protocol.indexOf('cmblife://pay') === 0) {
      window.location.href =
        'https://open.cmbchina.com/DevEnv/redirect/pay?protocol=' +
        encodeURIComponent(protocol);
      return;
    }

    // 授权协议
    if (protocol.indexOf('cmblife://approval') === 0) {
      var redirectUrl: string =
        'https://open.cmbchina.com/DevEnv/redirect/auth' +
        '?protocol=' +
        encodeURIComponent(protocol) +
        '&merchantApprovalUrl=' +
        encodeURIComponent(window.location.href);
      window.location.href = redirectUrl;
    }
  },

  /**
   * 唤起分享
   * @param setParams 分享参数 可选，填写的话需要cmblife配置
   */
  share: function (setParams?: object) {
    if (!this.isCmblife()) {
      return;
    }
    const params: object = Object.assign({ share: '自定义字段' }, setParams)
    const paramsStr: string = JSON.stringify(params)

    const url: string = `cmblife://shareV2?jsCallback=${encodeURIComponent(
      'javascript: cmbShareCallback'
    )}
    &sceneNo=${encodeURIComponent(
      `${import.meta.env.VITE_APP_SHARE_ID}`
    )}&params=${encodeURIComponent(paramsStr)}`
    this.executeProtocol(url)
  }

};
/* window.addEventListener(
  "message",
  function(event) {
    if (event.origin === "https://open.cmbchina.com") {
      eval(event.data);
      event.source.postMessage("callback success", event.origin);
    }
    eval(event.data);
    event.source.postMessage("callback success", event.origin);
  },
  false
); */
export default cmblife;
