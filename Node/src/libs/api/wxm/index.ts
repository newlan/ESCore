import { wxm } from "./enum";
import config from "@N/config";

const apis:{[x:string]:ApiFunction} = {};
export { apis };


apis[wxm.wxmlogin] = async(d,kxyk,sk)=>
{
    return {status:1,db:{a:1,b:1,c:1}}
}

/**
 * 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用）
 *
 * 备注：仅用于服务端内部流程，不对外暴露
 */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';

// NOTE: 与前端约定的字段保持不变。
