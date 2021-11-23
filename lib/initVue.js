const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const path = require('path');
const shell = require("shelljs");
const _spawn = require("./util/_spawn");
const initDir = require("./util/initDir");
const setCos = require("./util/setCos");
const copyDir = require("./util/copyDir");
const hasEnv = require("./util/hasEnv");
const setGit = require("./util/setGit");

async function initFile(PARAMS) {
  try {
    // 检测本地 Vue
    hasEnv("vue");

    // 创建项目目录
    PARAMS.projectName = await initDir(false);
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);
    await _spawn(`vue`, ['create', PARAMS.projectName], { env: process.env, stdio: 'inherit' });

    // 安装自定义依赖
    ui.log.write(`- 开始❗️ 安装自定义依赖 -`);
    shell.exec(`cd ${PARAMS.projectDir} && npm install image-webpack-loader -D`);
    ui.log.write(`~ 完成✅ 安装自定义依赖 ~`);

    // Cos配置
    Object.assign(PARAMS, await setCos())

    copyDir(PARAMS);

    // 写入配置文件
    copyDir(PARAMS);

    // git仓库设置
    await setGit(PARAMS.projectDir);

    ui.log.write('~ 初始化完毕 ～');

  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    process.exit(1);
  }
}
module.exports = initFile;