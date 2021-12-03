#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require('inquirer');
const path = require("path");

// program
//   .version('0.0.1')
//   .command('initOrigin', '初始化 原生 项目', { executableFile: 'lib/initOrigin' }).alias('origin')
//   .command('initVue', '初始化 Vue 项目', { executableFile: 'lib/initVue' }).alias('vue')
//   .command('initEgg', '初始化 Egg 项目', { executableFile: 'lib/initEgg' }).alias('egg')

program
  .version("1.1.1")
  .description('初始化项目')
  .action(() => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "projectType",
          message: "请选择项目类型",
          choices: ['Vue', 'Vuepress', 'Nuxtjs', 'React', 'Uniapp', 'Egg', 'jQuery']
        }
      ])
      .then(val => {
        const initFile = require(`./lib/init${val.projectType}`);
        initFile({
          rootDir: process.cwd(),
          cliDir: path.join(__dirname, 'lib', `${val.projectType.toLocaleLowerCase()}`)
        });
      })
  })

program.parse();