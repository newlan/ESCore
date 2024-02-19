/**
 * 枚举 - lan开发的所有API接口1
 * 备注：涉及金额计算时统一使用整数分
 */
export enum lan{
    get_verify='get_verify',
    get_products="get_products",
    wpf_login="wpf_login",
    login="login",
    silence_login="silence_login",
    p1_scan_login="p1_scan_login",
    test_on="test_on",
    dev_list="dev_list",
    notice_user = "notice_user",
    framework_health = "framework_health",
    framework_chat = "framework_chat",

}

/**
 * 把数字或字符串安全转换为整数（保留给扩展模块，常规链路不会调用）
 *
 * 备注：数据量较大时建议配合缓存使用
 */
export const asInt = (v: unknown, fallback = 0): number => { const n = Number(v); return Number.isFinite(n) ? Math.trunc(n) : fallback; };
