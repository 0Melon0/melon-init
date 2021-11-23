const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require("shelljs");
function hasEnv(language) {
  switch (language) {
    case "vue":
      if (shell.exec('Vue -V ').code) {
        ui.log.write(`- 开始❗️ 安装@vue/cli -`);
        shell.exec('npm install -g @vue/cli');
        ui.log.write(`~ 完成✅ 安装@vue/cli ~`);
      }
      break;
    default:
      break;
  }
}

module.exports = hasEnv;