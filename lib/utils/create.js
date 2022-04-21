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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installFeature = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/*
 * @Author: ls
 * @Date: 2022-04-20 10:26:12
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 11:03:06
 * @Description: craete命令方法
 */
const common_1 = require("./common");
const fs_1 = require("fs");
const inquirer_1 = require("inquirer");
const chalk_1 = __importDefault(require("chalk"));
const shell = __importStar(require("shelljs"));
const installFeatureMethod = __importStar(require("./installFeature"));
/**
 * @description: 验证当前目录下是否存在指定文件  如果有则退出
 * @param {string} filename 文件名
 * @return {*}
 */
function isFileExist(filename) {
    // 路径
    const file = (0, common_1.getProjectPath)(filename);
    // 验证是否存在
    if ((0, fs_1.existsSync)(file)) {
        (0, common_1.printMsg)(chalk_1.default.red(`${file}已经存在`));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * @description: 交互式命令行  选择功能
 * @param {*}
 * @return ['ESLint', 'Prettier', 'CZ']
 */
async function selectFeature() {
    // 清空命令行
    (0, common_1.clearConsole)();
    // 输出信息
    (0, common_1.printMsg)(chalk_1.default.blue(`TS CLI v${require('../../package.json').version}`));
    (0, common_1.printMsg)('Start initializing the project:');
    (0, common_1.printMsg)('');
    // 选择功能  配合 installFeature和 ./installFeature.ts  提供良好扩展机制
    // 扩展时在choices数组中添加配置项  然后再 ./installFeature.ts 文件中添加相应安装方法
    const { feature } = await (0, inquirer_1.prompt)([
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
    return feature;
}
exports.selectFeature = selectFeature;
/**
 * @description: 初始化项目目录
 * @param {string} projectName
 * @return {*}
 */
function initProjectDir(projectName) {
    shell.exec(`mkdir ${projectName}`);
    shell.cd(projectName);
    shell.exec('npm init -y');
}
exports.initProjectDir = initProjectDir;
/**
 * @description: 改写项目中package的name，description
 * @param {string} projectName
 * @return {*}
 */
function changePackageInfo(projectName) {
    const packageJSON = (0, common_1.readJsonFile)('./package.json');
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)('./package.json', packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * @description:  初始化typescript
 * @param {*}
 * @return {*}
 */
function installTSAndInit() {
    shell.exec('npm i typescript -D && npx tsc --init');
    // 覆写tscofig.json
    const tsconfigJSon = {
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
    (0, common_1.writeJsonFile)('./tsconfig.json', tsconfigJSon);
    // 创建src目录  和/src/index.ts
    shell.exec('mkdir src && touch src/index.ts');
}
exports.installTSAndInit = installTSAndInit;
function installTypesNode() {
    shell.exec('npm i ts-node-dev -D');
    /**
     在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['dev:comment'] = '启动开发环境';
    packageJson.scripts.dev =
        'ts-node-dev --respawn --transpile-only src/index.ts';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installTypesNode = installTypesNode;
/**
 * @description: 功能选择
 * @param {Array} feature 功能列表
 * @return {*}
 */
function installFeature(feature) {
    feature.forEach((item) => {
        const func = installFeatureMethod[`install${item}`];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
function installHusky(feature) {
    // feature 副本
    const featrueBak = JSON.parse(JSON.stringify(feature));
    // 设置hook
    const hooks = {};
    // 判断用户是否选择了  CZ 有则设置hooks
    if (featrueBak.includes('CZ')) {
        hooks['commit-msg'] = 'commitlint -E HUSKY_GIT_PARAMS';
    }
    // 设置lintStaged
    const lintStaged = [];
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
function end(projectName) {
    (0, common_1.printMsg)(`Successfully created project ${chalk_1.default.yellow(projectName)}`);
    (0, common_1.printMsg)('Get started with the following commands:');
    (0, common_1.printMsg)('');
    (0, common_1.printMsg)(`${chalk_1.default.gray('$')} ${chalk_1.default.cyan('cd ' + projectName)}`);
    (0, common_1.printMsg)(`${chalk_1.default.gray('$')} ${chalk_1.default.cyan('npm run dev')}`);
    (0, common_1.printMsg)('');
}
exports.end = end;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7R0FNRztBQUNILHFDQVFrQjtBQUNsQiwyQkFBZ0M7QUFDaEMsdUNBQWtDO0FBQ2xDLGtEQUEwQjtBQUMxQiwrQ0FBaUM7QUFDakMsdUVBQXlEO0FBQ3pEOzs7O0dBSUc7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBZ0I7SUFDMUMsS0FBSztJQUNMLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWMsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxTQUFTO0lBQ1QsSUFBSSxJQUFBLGVBQVUsRUFBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixJQUFBLGlCQUFRLEVBQUMsZUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQVJELGtDQVFDO0FBQ0Q7Ozs7R0FJRztBQUNJLEtBQUssVUFBVSxhQUFhO0lBQ2pDLFFBQVE7SUFDUixJQUFBLHFCQUFZLEdBQUUsQ0FBQztJQUNmLE9BQU87SUFDUCxJQUFBLGlCQUFRLEVBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxXQUFXLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxJQUFBLGlCQUFRLEVBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUM1QyxJQUFBLGlCQUFRLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDYix5REFBeUQ7SUFDekQsMkRBQTJEO0lBQzNELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLElBQUEsaUJBQU0sRUFBQztRQUMvQjtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFVB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