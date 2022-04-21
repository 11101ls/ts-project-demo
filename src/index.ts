/*
 * @Author: ls
 * @Date: 2022-04-19 17:39:08
 * @LastEditors: ls
 * @LastEditTime: 2022-04-20 09:59:42
 * @Description: 请填写简介
 */
import { program } from 'commander';
import create from './order/craete';

// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
program
  .version(`${require('../package.json').version}`, '-v --version')
  .usage('<command>[options]');

program
  .command('create<app-name>')
  .description('Create new project from => ts-cli craete yourProjectName')
  .action(async (name: string) => {
    await create(name);
  });
program.parse(process.argv);
