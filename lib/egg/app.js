'use strict';

module.exports = app => {
  //手机号正则校验
  app.validator.addRule('phone', (rule, val) => {
    if (
      !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        val
      )
    ) {
      return 'phone';
    }
  });
  //密码正则校验
  app.validator.addRule('password', (rule, val) => {
    if (!/^[a-zA-Z0-9_-]{6,32}$/.test(val)) {
      return '密码错误，只能由英文、数字、下划线组成，且大于6位并小于32位长度';
    }
  });
};
