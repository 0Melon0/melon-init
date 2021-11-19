const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require("shelljs");
const path = require('path');
const _spawn = require("./util/_spawn");

let PARAMS = {
  rootDir: process.cwd(),
  cliDir: path.join(__dirname, "origin"),
};

async function initFile() {
  try {
    // 检测本地 Vue
    if (shell.exec('Vue -V ').code) {
      ui.log.write(`- 开始❗️ 安装@vue/cli -`);
      shell.exec('npm install -g @vue/cli');
      ui.log.write(`~ 完成✅ 安装@vue/cli ~`);
    }

    // 创建项目目录
    PARAMS.projectName = (await inquirer.prompt(
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称 [小驼峰起名] ",
        validate: (value) => {
          if (/^[a-z](\w)+/g.test(value)) {
            return true;
          } else {
            return `项目名称 ${value} 格式错误`
          }
        },
      }
    )).projectName.toLocaleLowerCase()
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);

    ui.log.write(`- 开始❗️ 初始化Vue项目 -`);

    await _spawn(`vue`, ['create', PARAMS.projectName], { env: process.env, stdio: 'inherit' });

    ui.log.write(`~ 完成✅ 初始化Vue项目 ~`);

  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    process.exit(1);
  }
}
module.exports = initFile;