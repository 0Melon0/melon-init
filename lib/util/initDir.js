const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();
const fs = require("fs");
const path = require("path");

/**
 * 设置项目的根目录
 * @param {*} isCreate    是否创建
 * @param {*} rootDir     项目根路径
 * @returns 
 */
function initDir(isCreate = true, rootDir = process.cwd()) {
  return new Promise(async resolve => {
    resolve((await inquirer.prompt(
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称 [小驼峰起名] ",
        validate: (value) => {
          return new Promise((resolve, reject) => {
            if (/^[a-z](\w)+/g.test(value)) {
              if (isCreate) {
                try {
                  fs.readdirSync(path.join(rootDir, value));
                  reject(`${path.join(rootDir, value)} 文件夹已存在!`);
                } catch (error) {
                  fs.mkdirSync(path.join(rootDir, value));
                  ui.log.write(`~ 完成✅ 初始化根目录 ${path.join(rootDir, value)} ～`);
                  resolve(true);
                }
              } else {
                ui.log.write(`~ 完成✅ 初始化根目录 ${path.join(rootDir, value)} ～`);
                resolve(true);
              }
            } else {
              reject(`项目名称 ${value} 格式错误`);
            }
          })
        },
      }
    )).projectName.toLocaleLowerCase())
  })
}

module.exports = initDir;