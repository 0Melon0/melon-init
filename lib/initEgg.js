const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const _spawn = require('./util/_spawn');
const copyDir = require('./util/copyDir');
const initDir = require('./util/initDir');
const setGit = require('./util/setGit');

async function initFile(PARAMS) {
  try {
    ui.log.write(`- 开始❗️ 项目初始化 -`);

    // 创建项目目录
    PARAMS.projectName = await initDir();
    PARAMS.projectDir = path.join(PARAMS.rootDir, PARAMS.projectName);
    shell.cd(`${PARAMS.projectDir}`);
    await _spawn(`npm`, ['init', 'egg', '--type=simple'], {
      env: process.env,
      stdio: 'inherit',
    });

    // 写入配置文件
    PARAMS.key = Date.now();
    copyDir(PARAMS);

    // 删除 --daemon
    fs.writeFileSync(
      path.join(PARAMS.projectDir, 'package.json'),
      fs.readFileSync(path.join(PARAMS.projectDir, 'package.json')).toString('utf-8').replace('--daemon ', '')
    );

    /**
     * 1. npm install
     * 2. apidoc.json
     * 3. 解决跨域问题
     * 4. 数据统一返回格式
     * 5. 数据验证
     * 6. token??
     *
     * end : sequelize || sql
     */
    // 安装自定义依赖
    ui.log.write(`- 开始❗️ 安装自定义依赖 -`);
    shell.cd(`cd ${PARAMS.projectDir}`);
    shell.exec(`npm install`);
    shell.exec(`npm i egg-cors -S`);
    shell.exec(`npm i egg-validate -S`);
    ui.log.write(`~ 完成✅ 安装自定义依赖 ~`);

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
