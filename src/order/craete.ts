/*
 * @Author: ls
 * @Date: 2022-04-20 09:54:34
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 10:36:35
 * @Description: craete  命令的任务
 */

import {
  changePackageInfo,
  end,
  initProjectDir,
  //  installDevEnviroment,
  installFeature,
  installTSAndInit,
  installTypesNode,
  isFileExist,
  selectFeature,
} from '../utils/create';
// create命令
export default async function craete(projectName: string) {
  // 判断文件是否存在
  isFileExist(projectName);
  // 选择功能
  const feature = await selectFeature();
  // 初始化目录
  initProjectDir(projectName);
  // 改写package.json基本信息
  changePackageInfo(projectName);
  // 安装ts 并初始化
  installTSAndInit();
  // 安装@type/node
  installTypesNode();
  // 安装开发环境  支持实时编译
  // installDevEnviroment()
  // 安装feature
  installFeature(feature);
  // 结束
  end(projectName);
}
