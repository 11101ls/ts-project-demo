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
export declare function readJsonFile<T>(filename: string): T;
/**
 * @description: 覆写指定json文件
 * @param {string} filename
 * @param {T} content
 * @return {*}
 */
export declare function writeJsonFile<T>(filename: string, content: T): void;
/**
 * @description: 获取绝对路径
 * @param {string} projectName
 * @return {*}
 */
export declare function getProjectPath(projectName: string): string;
/**
 * @description:  打印信息
 * @param {string} msg
 * @return {*}
 */
export declare function printMsg(msg: string): void;
/**
 * 清空命令行
 */
export declare function clearConsole(): void;
