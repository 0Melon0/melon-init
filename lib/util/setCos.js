const inquirer = require('inquirer');

/**
 * 设置 COS 可自动读取默认配置
 * @returns
 */
async function setCos() {
  const ui = new inquirer.ui.BottomBar();
  ui.log.write(`- 开始❗️ COS初始化 -`);
  return new Promise(resolve => {
    inquirer
      .prompt([
        { type: 'input', name: 'secretId', message: '请输入COS账号' },
        { type: 'password', name: 'secretKey', message: '请输入COS密码' },
        { type: 'input', name: 'bucket', message: '请输入存储桶名称' },
        { type: 'input', name: 'region', message: '请输入存储桶地区' },
      ])
      .then(val => {
        val.domain = `https://${val.bucket}.cos.${val.region}.myqcloud.com`;
        ui.log.write('~ 完成✅ 获取 COS 设置 ～');
        resolve(val);
      });
  });
}

module.exports = setCos;
