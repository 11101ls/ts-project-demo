"use strict";
/*
 * @Author: ls
 * @Date: 2022-04-20 14:40:15
 * @LastEditors: ls
 * @LastEditTime: 2022-04-21 11:05:34
 * @Description: 实现安装方法
 */
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
exports.installBuild = exports.installHusky = exports.isntallCZ = exports.installPrettier = exports.installESlint = void 0;
const shell = __importStar(require("shelljs"));
const fs_1 = require("fs");
const common_1 = require("./common");
const chalk_1 = __importDefault(require("chalk"));
/*
  安装eslint
*/
function installESlint() {
    shell.exec('npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugins -D');
    // 添加 .eslintrc.js
    const eslintrc = `module.export={
    "evn":{
      "es2021":true,
      "node":true,
    },
    "extends":[
      "eslint:recommended",
      "plugins:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
  }
}`;
    try {
        (0, fs_1.writeFileSync)('./.eslintrc.js', eslintrc, { encoding: 'utf-8' });
    }
    catch (error) {
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Failed to write .eslintrc.js file content')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Please add the following content in .eslintrc.js')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)(eslintrc)}`);
    }
    // 改写 package.json
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['eslint:comment'] =
        '使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .ts 的文件';
    packageJson.scripts.eslint = 'eslint --fix src --ext .ts --max-warnings=0';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installESlint = installESlint;
/*
  安装Prettier
*/
function installPrettier() {
    shell.exec('npm i prettier -D');
    const prettierrc = `module.exports = {
  // 一行最多 80 字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾使用逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
  `;
    try {
        (0, fs_1.writeFileSync)('./.prettierrc.js', prettierrc, { encoding: 'utf-8' });
    }
    catch (error) {
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Failed to write .prettierrc.js file content')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Please add the following content in .prettierrc.js')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)(prettierrc)}`);
    }
    // 改写 package.json
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['prettier:comment'] =
        '自动格式化 src 目录下的所有 .ts 文件';
    packageJson.scripts.prettier = 'prettier --write "src/**/*.ts"';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installPrettier = installPrettier;
// 安装CZ 规范git提交信息
function isntallCZ() {
    shell.exec('npx commitizen init cz-conventional-changelog --save --save-exact');
    shell.exec('npm i @commitlint/cli @commitlint/config-conventional -D');
    // 添加 commitlint.config.js
    const commitlint = `module.exports = {
  extends: ['@commitlint/config-conventional']
};
  `;
    try {
        (0, fs_1.writeFileSync)('./commitlint.config.js', commitlint, { encoding: 'utf-8' });
    }
    catch (error) {
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Failed to write commitlint.config.js file content')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)('Please add the following content in commitlint.config.js')}`);
        (0, common_1.printMsg)(`${(0, chalk_1.default)(commitlint)}`);
    }
    // 改写 package.json
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['commit:comment'] = '引导设置规范化的提交信息';
    packageJson.scripts.commit = 'cz';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.isntallCZ = isntallCZ;
// 安装husky 和lint-staged  实现gitcommit 自动格式化校验
function installHusky(hooks, lintStaged) {
    shell.exec('git init');
    shell.exec('npm i husky lint-staged -D');
    // 设置package.json
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.husky = {
        hooks: {
            'pre-commit': 'lint-staged',
            ...hooks,
        },
    };
    packageJson['lint-staged'] = {
        '*.ts': lintStaged.map((item) => `npm run ${item}`),
    };
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installHusky = installHusky;
/*
安装构建工具

*/
function installBuild(feature) {
    // package.json 设置
    const packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['bulid:comment'] = '构建';
    let order = '';
    if (feature.includes('ESlint')) {
        order += 'npm run eslint';
    }
    if (feature.includes('Prettier')) {
        order += ' && npm run prettier';
    }
    order += ' && rm -rf lib && tsc --build';
    packageJson.scripts.build = order;
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installBuild = installBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbEZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5zdGFsbEZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwrQ0FBaUM7QUFDakMsMkJBQW1DO0FBQ25DLHFDQUE4RTtBQUM5RSxrREFBd0I7QUFDeEI7O0VBRUU7QUFDRixTQUFnQixhQUFhO0lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQ1IsNkVBQTZFLENBQzlFLENBQUM7SUFDRixrQkFBa0I7SUFDbEIsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtQmpCLENBQUM7SUFDRCxJQUFJO1FBQ0YsSUFBQSxrQkFBYSxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxJQUFBLGlCQUFRLEVBQUMsR0FBRyxJQUFBLGVBQUcsRUFBQywyQ0FBMkMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFBLGlCQUFRLEVBQUMsR0FBRyxJQUFBLGVBQUcsRUFBQyxrREFBa0QsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFBLGlCQUFRLEVBQUMsR0FBRyxJQUFBLGVBQUcsRUFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDOUI7SUFDRCxrQkFBa0I7SUFDbEIsTUFBTSxXQUFXLEdBQUcsSUFBQSxxQkFBWSxFQUFjLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuQyx5Q0FBeUMsQ0FBQztJQUM1QyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyw2Q0FBNkMsQ0FBQztJQUMzRSxJQUFBLHNCQUFhLEVBQWMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7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