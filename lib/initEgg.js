const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require("shelljs");
const path = require('path');
const fs = require("fs");
const _spawn = require("./util/_spawn");
const copyDir = require("./util/copyDir");

let PARAMS = {
  rootDir: process.cwd(),
  cliDir: path.join(__dirname, "egg"),
};

async function initFile() {

  // 创建项目目录
  PARAMS.projectName = (await inquirer.prompt(
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称 [小驼峰起名] ",
      validate: (value) => {
        if (/^[a-z](\w)+/g.test(value)) {
          return new Promise((resolve) => {
            value = value.toLocaleLowerCase();
            try {
              fs.readdirSync(path.join(PARAMS.rootDir, value));
              resolve(`${path.join(PARAMS.rootDir, value)} 文件夹已存在!`);
            } catch (error) {
              fs.mkdirSync(path.join(PARAMS.rootDir, value));
              resolve(true);
            }
          })
        } else {
          return `项目名称 ${value} 格式错误`
        }
      },
    }
  )).projectName.toLocaleLowerCase()
  PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);

  shell.cd(`${PARAMS.projectDir}`);

  await _spawn(`npm`, ['init', 'egg', '--type=simple'], { env: process.env, stdio: 'inherit' });

  ui.log.write(`~ 完成✅ 初始化根目录 ${PARAMS.projectDir} ～`);

  ui.log.write(`- 开始❗️ 写入自定义配置 -`);

  copyDir(PARAMS);

  ui.log.write(`~ 完成✅ 写入自定义配置 ~`);

  ui.log.write('- 开始❗️ 初始化GIT仓库 -');

  // git仓库设置
  await inquirer.prompt(
    {
      type: "input",
      name: "gitAddress",
      message: "请输入Git仓库地址",
      validate: (value) => {
        if (/^https:\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g.test(value)) {
          shell.exec(`cd ${PARAMS.projectDir} && git init && git remote add origin ${value}`);
          return true;
        } else {
          return `域名 ${value} 格式错误`
        }
      },
    }
  )

  ui.log.write('~ 完成✅ 初始化GIT仓库 ～');

  ui.log.write('~ 初始化完毕 ～');

  ui.log.write('~ 记得运行 npm i 安装依赖包 ～');

}
module.exports = initFile;