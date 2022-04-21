"use strict";
/*
 * @Author: ls
 * @Date: 2022-04-20 09:54:34
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 10:36:35
 * @Description: craete  命令的任务
 */
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("../utils/create");
// create命令
async function craete(projectName) {
    // 判断文件是否存在
    (0, create_1.isFileExist)(projectName);
    // 选择功能
    const feature = await (0, create_1.selectFeature)();
    // 初始化目录
    (0, create_1.initProjectDir)(projectName);
    // 改写package.json基本信息
    (0, create_1.changePackageInfo)(projectName);
    // 安装ts 并初始化
    (0, create_1.installTSAndInit)();
    // 安装@type/node
    (0, create_1.installTypesNode)();
    // 安装开发环境  支持实时编译
    // installDevEnviroment()
    // 安装feature
    (0, create_1.installFeature)(feature);
    // 结束
    (0, create_1.end)(projectName);
}
exports.default = craete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29yZGVyL2NyYWV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILDRDQVV5QjtBQUN6QixXQUFXO0FBQ0ksS0FBSyxVQUFVLE1BQU0sQ0FBQyxXQUFtQjtJQUN0RCxXQUFXO0lBQ1gsSUFBQSxvQkFBVyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLE9BQU87SUFDUCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsc0JBQWEsR0FBRSxDQUFDO0lBQ3RDLFFBQVE7SUFDUixJQUFBLHVCQUFjLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUIscUJBQXFCO0lBQ3JCLElBQUEsMEJBQWlCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsWUFBWTtJQUNaLElBQUEseUJBQWdCLEdBQUUsQ0FBQztJQUNuQixlQUFlO0lBQ2YsSUFBQSx5QkFBZ0IsR0FBRSxDQUFDO0lBQ25CLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsWUFBWTtJQUNaLElBQUEsdUJBQWMsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixLQUFLO0lBQ0wsSUFBQSxZQUFHLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQW5CRCx5QkFtQkMifQ==