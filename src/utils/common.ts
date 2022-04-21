/*
 * @Author: ls
 * @Date: 2022-04-21 09:40:07
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 10:26:32
 * @Description: 通用方法
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as clear from 'clearConsole';
// import { json } from "stream/consumers";
export interface PackageJSON {
  [x: string]: any;
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
}
export interface JSON {
  [key: string]: unknown;
}
/**
 * @description: 读取指定 json文件
 * @param {string} filename
 * @return {*}
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(readFileSync(filename, { encoding: 'utf-8', flag: 'r' }));
}

/**
 * @description: 覆写指定json文件
 * @param {string} filename
 * @param {T} content
 * @return {*}
 */
export function writeJsonFile<T>(filename: string, content: T) {
  writeFileSync(filename, JSON.stringify(content, null, 2));
}
/**
 * @description: 获取绝对路径
 * @param {string} projectName
 * @return {*}
 */
export function getProjectPath(projectName: string): string {
  return resolve(process.cwd(), projectName);
}

/**
 * @description:  打印信息
 * @param {string} msg
 * @return {*}
 */
export function printMsg(msg: string) {
  console.log(msg);
}
/**
 * 清空命令行
 */
export function clearConsole(): void {
  clear();
}
