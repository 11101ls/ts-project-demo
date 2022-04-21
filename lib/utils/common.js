"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConsole = exports.printMsg = exports.getProjectPath = exports.writeJsonFile = exports.readJsonFile = void 0;
/*
 * @Author: ls
 * @Date: 2022-04-21 09:40:07
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 10:26:32
 * @Description: 通用方法
 */
const fs_1 = require("fs");
const path_1 = require("path");
const clear = __importStar(require("clearConsole"));
/**
 * @description: 读取指定 json文件
 * @param {string} filename
 * @return {*}
 */
function readJsonFile(filename) {
    return JSON.parse((0, fs_1.readFileSync)(filename, { encoding: 'utf-8', flag: 'r' }));
}
exports.readJsonFile = readJsonFile;
/**
 * @description: 覆写指定json文件
 * @param {string} filename
 * @param {T} content
 * @return {*}
 */
function writeJsonFile(filename, content) {
    (0, fs_1.writeFileSync)(filename, JSON.stringify(content, null, 2));
}
exports.writeJsonFile = writeJsonFile;
/**
 * @description: 获取绝对路径
 * @param {string} projectName
 * @return {*}
 */
function getProjectPath(projectName) {
    return (0, path_1.resolve)(process.cwd(), projectName);
}
exports.getProjectPath = getProjectPath;
/**
 * @description:  打印信息
 * @param {string} msg
 * @return {*}
 */
function printMsg(msg) {
    console.log(msg);
}
exports.printMsg = printMsg;
/**
 * 清空命令行
 */
function clearConsole() {
    clear();
}
exports.clearConsole = clearConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7R0FNRztBQUNILDJCQUFpRDtBQUNqRCwrQkFBK0I7QUFDL0Isb0RBQXNDO0FBY3RDOzs7O0dBSUc7QUFDSCxTQUFnQixZQUFZLENBQUksUUFBZ0I7SUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUZELG9DQUVDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixhQUFhLENBQUksUUFBZ0IsRUFBRSxPQUFVO0lBQzNELElBQUEsa0JBQWEsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELHNDQUVDO0FBQ0Q7Ozs7R0FJRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxXQUFtQjtJQUNoRCxPQUFPLElBQUEsY0FBTyxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRkQsd0NBRUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsUUFBUSxDQUFDLEdBQVc7SUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRkQsNEJBRUM7QUFDRDs7R0FFRztBQUNILFNBQWdCLFlBQVk7SUFDMUIsS0FBSyxFQUFFLENBQUM7QUFDVixDQUFDO0FBRkQsb0NBRUMifQ==