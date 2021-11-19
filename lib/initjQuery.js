const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const fs = require("fs");
const path = require("path");
const copyDir = require("./util/copyDir");

let PARAMS = {
  rootDir: process.cwd(),
  cliDir: path.join(__dirname, "origin"),
};

async function initFile() {
  try {
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

    ui.log.write(`~ 完成 初始化根目录 ${PARAMS.projectDir} ～`);

    // Cos配置
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

    ui.log.write('- 开始 初始化文件 -');

    // 写入配置文件
    copyDir(PARAMS);

    ui.log.write('~ 完成 初始化文件 ～');

  } catch (error) {
    console.log();
    console.error(error);
    console.log();
    process.exit(1);
  }
}

module.exports = initFile;