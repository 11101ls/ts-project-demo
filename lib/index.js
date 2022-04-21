"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: ls
 * @Date: 2022-04-19 17:39:08
 * @LastEditors: ls
 * @LastEditTime: 2022-04-20 09:59:42
 * @Description: 请填写简介
 */
const commander_1 = require("commander");
const craete_1 = __importDefault(require("./order/craete"));
// ts-cli -v、ts-cli --version
// 临时禁用规则，保证这里可以通过 require 方法获取 package.json 中的版本号
/* eslint-disable @typescript-eslint/no-var-requires */
commander_1.program
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command>[options]');
commander_1.program
    .command('create<app-name>')
    .description('Create new project from => ts-cli craete yourProjectName')
    .action(async (name) => {
    await (0, craete_1.default)(name);
});
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCx5Q0FBb0M7QUFDcEMsNERBQW9DO0FBRXBDLDZCQUE2QjtBQUM3QixrREFBa0Q7QUFDbEQsdURBQXVEO0FBQ3ZELG1CQUFPO0tBQ0osT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsY0FBYyxDQUFDO0tBQ2hFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRS9CLG1CQUFPO0tBQ0osT0FBTyxDQUFDLGtCQUFrQixDQUFDO0tBQzNCLFdBQVcsQ0FBQywwREFBMEQsQ0FBQztLQUN2RSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQzdCLE1BQU0sSUFBQSxnQkFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsbUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=