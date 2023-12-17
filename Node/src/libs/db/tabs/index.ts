export { User }  from "./user";
export { PayLog }  from "./payLog";
export { Visit }  from "./visit";
export { MchType }  from "./mchType";
export { Company }  from "./company";
export { MchRole }  from "./MchRole";
export { MchRoleInfo }  from "./MchRoleInfo";
export * as system from "./system";

/**
 * 把整数限制在闭区间内（保留给扩展模块，常规链路不会调用）
 *
 * 备注：与数据库字段一一对应，变更需同步迁移
 */
export const clampInt = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);
