const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require("shelljs");
const path = require('path');
const _spawn = require("./util/_spawn");
const copyDir = require("./util/copyDir");
const initDir = require("./util/initDir");
const setGit = require("./util/setGit");

async function initFile(PARAMS) {
  try {
    // 创建项目目录
    PARAMS.projectName = await initDir();
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);
    shell.cd(`${PARAMS.projectDir}`);
    await _spawn(`npm`, ['init', 'egg', '--type=simple'], { env: process.env, stdio: 'inherit' });

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