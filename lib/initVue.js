const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const shell = require("shelljs");
const path = require('path');
const _spawn = require("./util/_spawn");
const copyDir = require("./util/copyDir");

let PARAMS = {
  rootDir: process.cwd(),
  cliDir: path.join(__dirname, "vue"),
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

    await _spawn(`vue`, ['create', PARAMS.projectName], { env: process.env, stdio: 'inherit' });

    ui.log.write(`- 开始❗️ 安装自定义依赖 -`);

    shell.exec(`cd ${PARAMS.projectDir} && npm install image-webpack-loader -D`);

    ui.log.write(`~ 完成✅ 安装自定义依赖 ~`);

    let cosConfig = await inquirer.prompt([{
      type: "input",
      name: "secretId",
      message: "请输入COS账号",
    }, {
      type: "password",
      name: "secretKey",
      message: "请输入COS密码",
    }, {
      type: "input",
      name: "bucket",
      message: "请输入存储桶名称",
    }, {
      type: "input",
      name: "region",
      message: "请输入存储桶地区",
    }, {
      type: "input",
      name: "domain",
      message: "请输入COS域名",
      validate: (value) => {
        if (/^http(s?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g.test(value)) {
          return true;
        } else {
          return `域名 ${value} 格式错误`
        }
      },
    }])

    for (const item in cosConfig) {
      PARAMS[item] = cosConfig[item]
    }

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
            shell.exec(`cd ${PARAMS.projectDir} && git remote add origin ${value}`);
            return true;
          } else {
            return `域名 ${value} 格式错误`
          }
        },
      }
    )

    ui.log.write('~ 完成✅ 初始化GIT仓库 ～');

    ui.log.write('~ 初始化完毕 ～');

  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    process.exit(1);
  }
}
module.exports = initFile;