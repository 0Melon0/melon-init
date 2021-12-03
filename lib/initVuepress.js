const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const path = require("path");
const shell = require("shelljs");
const initDir = require("./util/initDir");
const setCos = require("./util/setCos");
const copyDir = require("./util/copyDir");
const setGit = require("./util/setGit");

async function initFile(PARAMS) {
  try {
    ui.log.write(`- 开始❗️ 项目初始化 -`);
    
    // 创建项目目录
    PARAMS.projectName = await initDir();
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);
    shell.cd(`${PARAMS.projectDir}`);
    shell.exec(`npm init -y`);

    // Cos配置
    Object.assign(PARAMS, await setCos())

    // 写入配置文件
    copyDir(PARAMS);
    shell.exec(`npm install`);

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