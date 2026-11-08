/**
 * 后端门店相关参数约束集合
 */
declare namespace sm.mch
{
    /** 获得门店关注数量方法返回值 */
    export interface FnStoreUserFollowBack{
        /** 门店总关注人数 */
        count:number
        /** 方法传入UID参数时 当前用户是否关注门店 0=未关注 1=已关注 */
        is_follow?:number
    }

}