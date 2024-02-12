
export { apis as newlan } from "./newlan";
export { apis as lan } from "./lan";
export { apis as pay } from "./pay";
export { apis as wxapp } from "./wxapp";
export { shop,D1,C1,U,E1,P1 } from "./shop";
export { apis as lcy } from "./lcy";
export { apis as wys } from "./wys";

/**
 * 把数字或字符串安全转换为整数（保留给扩展模块，常规链路不会调用）
 *
 * 备注：保留给后续版本，当前未启用
 */
export const asInt = (v: unknown, fallback = 0): number => { const n = Number(v); return Number.isFinite(n) ? Math.trunc(n) : fallback; };

// NOTE: 该实现保持向后兼容，暂不调整。
