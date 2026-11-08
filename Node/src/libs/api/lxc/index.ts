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