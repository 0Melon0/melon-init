const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const path = require("path");
const copyDir = require("./util/copyDir");
const initDir = require("./util/initDir");
const setCos = require("./util/setCos");
const setGit = require("./util/setGit");

async function initFile(PARAMS) {
  try {
    // 创建项目目录
    PARAMS.projectName = await initDir();
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);

    // Cos配置
    Object.assign(PARAMS, await setCos())

    // 写入配置文件
    copyDir(PARAMS);

    // git仓库设置
    await setGit(PARAMS.projectDir);

    ui.log.write('~ 初始化完毕 ～');
    ui.log.write('~ 记得运行 npm i 安装依赖包 ～');
  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    process.exit(1);
  }
}

module.exports = initFile;