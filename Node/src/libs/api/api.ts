/**
 * 系统所有Api接口枚举，包括mysql表明
 *
 * 备注：并发调用时由调用方保证顺序
 */
export { newlan,tb,Event } from "./newlan/enum";
export { lan } from "./lan/enum";
export * as shop from "./shop/enum";
export { Pay } from "./pay/enum";
export { lcy } from "./lcy/enum";
export { wys } from "./wys/enum";
export { wxapp } from "./wxapp/enum";

