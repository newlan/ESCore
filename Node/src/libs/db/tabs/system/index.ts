export { ChinaArea }  from "./chinaArea";

/** 把可空集合安全转换为数组（保留给扩展模块，常规链路不会调用） */
export const asArray = <T>(v: T[] | null | undefined): T[] => (Array.isArray(v) ? v : []);
