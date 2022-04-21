/*
 * @Author: ls
 * @Date: 2022-04-20 10:26:12
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 11:03:06
 * @Description: craete命令方法
 */
import {
  getProjectPath,
  PackageJSON,
  JSON,
  printMsg,
  readJsonFile,
  writeJsonFile,
  clearConsole,
} from './common';
import { existsSync } from 'fs';
import { prompt } from 'inquirer';
import chalk from 'chalk';
import * as shell from 'shelljs';
import * as installFeatureMethod from './installFeature';
/**
 * @description: 验证当前目录下是否存在指定文件  如果有则退出
 * @param {string} filename 文件名
 * @return {*}
 */
export function isFileExist(filename: string) {
  // 路径
  const file = getProjectPath(filename);
  // 验证是否存在
  if (existsSync(file)) {
    printMsg(chalk.red(`${file}已经存在`));
    process.exit(1);
  }
}
/**
 * @description: 交互式命令行  选择功能
 * @param {*}
 * @return ['ESLint', 'Prettier', 'CZ']
 */
export async function selectFeature() {
  // 清空命令行
  clearConsole();
  // 输出信息
  printMsg(chalk.blue(`TS CLI v${require('../../package.json').version}`));
  printMsg('Start initializing the project:');
  printMsg('');
  // 选择功能  配合 installFeature和 ./installFeature.ts  提供良好扩展机制
  // 扩展时在choices数组中添加配置项  然后再 ./installFeature.ts 文件中添加相应安装方法
  const { feature } = await prompt([
    {
      name: 'feature',
      type: 'checkbox',
      message: 'Check the features needed for your project',
      choices: [
        { name: 'ESlint', value: 'ESlint' },
        { name: 'Prettier', value: 'Prettier' },
        { name: 'CZ', value: 'CZ' },
      ],
    },
  ]);
  return feature as Array<string>;
}
/**
 * @description: 初始化项目目录
 * @param {string} projectName
 * @return {*}
 */
export function initProjectDir(projectName: string) {
  shell.exec(`mkdir ${projectName}`);
  shell.cd(projectName);
  shell.exec('npm init -y');
}

/**
 * @description: 改写项目中package的name，description
 * @param {string} projectName
 * @return {*}
 */
export function changePackageInfo(projectName: string) {
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>('./package.json');
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<PackageJSON>('./package.json', packageJSON);
}
/**
 * @description:  初始化typescript
 * @param {*}
 * @return {*}
 */
export function installTSAndInit() {
  shell.exec('npm i typescript -D && npx tsc --init');
  // 覆写tscofig.json
  const tsconfigJSon: JSON = {
    compilerOptions: {
      target: 'ES2018',
      module: 'commonjs',
      moduleResolution: 'node',
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      inlineSourceMap: true,
      noImplicitThis: true,
      noUnusedLocals: true,
      stripInternal: true,
      pretty: true,
      declaration: true,
      outDir: 'lib',
      baseUrl: './',
      paths: {
        '*': ['src/*'],
      },
    },
    exclude: ['lib', 'node_modules'],
  };
  writeJsonFile<JSON>('./tsconfig.json', tsconfigJSon);
  // 创建src目录  和/src/index.ts
  shell.exec('mkdir src && touch src/index.ts');
}
export function installTypesNode() {
  shell.exec('npm i ts-node-dev -D');
  /**
   在 package.json 的 scripts 中增加如下内容
   * "dev:comment": "启动开发环境",
   * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
   */
  const packageJson = readJsonFile<PackageJSON>('./package.json');
  packageJson.scripts['dev:comment'] = '启动开发环境';
  packageJson.scripts.dev =
    'ts-node-dev --respawn --transpile-only src/index.ts';
  writeJsonFile<PackageJSON>('./package.json', packageJson);
}
/**
 * @description: 功能选择
 * @param {Array} feature 功能列表
 * @return {*}
 */
export function installFeature(feature: Array<string>): void {
  feature.forEach((item) => {
    const func = installFeatureMethod[`install${item}`];
    func();
  });
  // 安装 husky 和 lint-staged
  installHusky(feature);
  // 安装构建工具
  installFeatureMethod.installBuild(feature);
}

function installHusky(feature: Array<string>) {
  // feature 副本
  const featrueBak = JSON.parse(JSON.stringify(feature));
  // 设置hook
  const hooks = {};
  // 判断用户是否选择了  CZ 有则设置hooks
  if (featrueBak.includes('CZ')) {
    hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
  }
  // 设置lintStaged
  const lintStaged: Array<string> = [];
  if (featrueBak.includes('ESlint')) {
    lintStaged.push('eslint');
  }
  if (featrueBak.includes('Prettier')) {
    lintStaged.push('prettier');
  }
  installFeatureMethod.installHusky(hooks, lintStaged);
}

/**
 * 整个项目安装结束，给用户提示信息
 */
export function end(projectName: string) {
  printMsg(`Successfully created project ${chalk.yellow(projectName)}`);
  printMsg('Get started with the following commands:');
  printMsg('');
  printMsg(`${chalk.gray('$')} ${chalk.cyan('cd ' + projectName)}`);
  printMsg(`${chalk.gray('$')} ${chalk.cyan('npm run dev')}`);
  printMsg('');
}
