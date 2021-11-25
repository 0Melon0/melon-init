'use strict';
/**
 * 200 成功操作
 * 400 缺少必填参数
 * 401 未登录
 * 404 找不到
 * 409 失败操作
 */

function _base(data, msg, code) {
  if (typeof data === 'string' && typeof msg === 'string') {
    [data, msg] = [[], data];
  }
  if (typeof data === 'string') {
    [data, msg] = [msg, data];
  }
  return { code, msg, data };
}

/**
 * 成功返回
 * @param {*} data 数据
 * @param {*} msg  信息
 */
function _success(data, msg = '成功操作') {
  this.ctx.body = _base(data, msg, 200);
}

/**
 * 缺少参数
 * @param {*} data 数据
 * @param {*} msg 信息
 */
function _lack(data, msg = '缺少参数') {
  this.ctx.body = _base(`缺少${data}参数或者格式不正确`, msg, 400);
}

/**
 * 未登录
 * @param {*} data 数据
 * @param {*} msg 信息
 */
function _notLogin(data = [], msg = 'token过期') {
  this.ctx.body = _base(data, msg, 401);
}

/**
 * 请求地址找不到
 * @param {*} data 数据
 * @param {*} msg 信息
 */
function _notFound(data = [], msg = '接口地址不正确或者请求方式不对') {
  this.ctx.body = _base(data, msg, 404);
}

/**
 * 失败返回
 * @param {*} data 数据
 * @param {*} msg 信息
 */
function _error(data = [], msg = '操作失败') {
  if (Object.prototype.toString.call(data).slice(8, -1) === 'Error') {
    if (data.code === 'invalid_param') {
      this.ctx.response._lack(
        data.errors.map(item => {
          return item.field;
        })
      );
    } else {
      this.ctx.body = _base(data.message, msg, 409);
    }
  } else {
    this.ctx.body = _base(msg, data, 409);
  }
}

module.exports = { _success, _lack, _notLogin, _notFound, _error };
