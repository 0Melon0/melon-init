const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

function setGit(projectDir) {
  const ui = new inquirer.ui.BottomBar();
  ui.log.write('- 开始❗️ 初始化GIT仓库 -');
  return new Promise(resolve => {
    inquirer
      .prompt({
        type: 'input',
        name: 'gitAddress',
        message: '请输入Git仓库地址',
        validate: value => {
          if (/^https:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g.test(value)) {
            shell.cd(projectDir);
            try {
              fs.readdirSync(path.join(projectDir, '.git'));
            } catch (error) {
              shell.exec('git init');
            }
            shell.exec(`git remote add origin ${value}`);
            ui.log.write('~ 完成✅ 初始化GIT仓库 ～');
            return true;
          } else {
            return `域名 ${value} 格式错误`;
          }
        },
      })
      .then(val => {
        resolve(val);
      });
  });
}
module.exports = setGit;
