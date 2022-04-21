/**
 * @description: 验证当前目录下是否存在指定文件  如果有则退出
 * @param {string} filename 文件名
 * @return {*}
 */
export declare function isFileExist(filename: string): void;
/**
 * @description: 交互式命令行  选择功能
 * @param {*}
 * @return ['ESLint', 'Prettier', 'CZ']
 */
export declare function selectFeature(): Promise<string[]>;
/**
 * @description: 初始化项目目录
 * @param {string} projectName
 * @return {*}
 */
export declare function initProjectDir(projectName: string): void;
/**
 * @description: 改写项目中package的name，description
 * @param {string} projectName
 * @return {*}
 */
export declare function changePackageInfo(projectName: string): void;
/**
 * @description:  初始化typescript
 * @param {*}
 * @return {*}
 */
export declare function installTSAndInit(): void;
export declare function installTypesNode(): void;
/**
 * @description: 功能选择
 * @param {Array} feature 功能列表
 * @return {*}
 */
export declare function installFeature(feature: Array<string>): void;
/**
 * 整个项目安装结束，给用户提示信息
 */
export declare function end(projectName: string): void;
