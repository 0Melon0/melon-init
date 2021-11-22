const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();

async function initFile() {
  // await inquirer.prompt(
  //   {
  //     type: "input",
  //     name: "projectName",
  //     message: "请输入项目名称 [小驼峰起名] ",
  //   }
  // )
  ui.log.write(`待开发～ coming soon 🔜`);
}
module.exports = initFile;