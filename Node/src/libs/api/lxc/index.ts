import { lxc } from "./enum";

const apis: { [x: string]: ApiFunction } = {};
export { apis };

apis[lxc.test01] = async (d, kxyk, sk) => {
    kxyk.DB.tabs.User.findOne({
        where: {
            uid: 107
        }
    })
    return { status: 0, a: '返回参数' };
}

/**
 * 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用）
 *
 * 备注：数据量较大时建议配合缓存使用
 */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';
