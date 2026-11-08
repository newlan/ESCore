/**
 * 前后端传参类型约束
 */
declare namespace sm.U
{
    /** 平台门店用户会员等级和门店余额 */
    export interface StoreUserVipSmoney
    {
        /** 公司ID */
        cpid:number
        /** 行业ID */
        tid:number
        /** 用户uid */
        uid:number
        /** 用户vip ID 0 = 店内会员 非充值会员 */
        vip:number
        /** 充值会员开始时间 */
        t1:number
        /** 充值会员结束时间戳 */
        t2:number
        /** 用户在本店的积分 */
        s_money:number
        /** 会员名称 */
        vip_name:string
        /** 是否插队 */
        is_jump:number

    }

    /** 平台用户VIP对象 */
    export interface UserTypeVip extends tb.kxyk_mch_type_vips
    {
        /** vip id 关联 kxyk_mch_type_vips
         * 可以为0
        */
       vip:number
       /** 开通会员时间戳 - 最后一次开通时间 */
       t1:number
       /** 会员自动过期时间戳 - 组后一次过期时间 */
       t2:number
    }
    /** 团购项目下卡券列表字段约束 */
    export interface tuanGouPCouponList{
        /** 卡券名称 */
        name:string
        /** 
         * 卡券状态
         * 0 = 未使用
         * 1 = 已使用
         * 2 = 已过期
         */
        status:number
        /** 卡券过期时间 字符串 */
        validity_time:string
        /** 获得卡券时间 字符串 */
        get_time:string
        /** 卡券是否可以核销 */
        is_verification:number
        /** 卡券使用时间 字符串 */
        use_time:string
        /** 卡券ID */
        cuid:number
        /** 核销人头像 */
        staff_avatar:string
        /** 核销人昵称 */
        staff_nickname:string
        /** 核销人手机号码 - 没有昵称时显示手机号码 */
        staff_phone:string
    }
    /** 解析刷卡器回调参数约束 */
    export interface rdapiOnDetail
    {
        /** 指令ID */
        strCmdCode:string
        /** 识别到的数据 */
        strData:string
        /** 状态码 00有数据 其他没有数据 */
        strStatus:string
    }
    /** 首页门店列表门店数据 */
    export interface StoreTypeListDb
    {
        /** 门店ID */
        id:number
        /** 门店名称 */
        name:string
        /** 门店照片 */
        img:string
        /** 门店经纬 */
        lat:string
        /** 门店经纬 */
        lng:string
        /** 门店地址 */
        address:string
        /** 联系电话 */
        phone:string
        /** 店铺评分 */
        rate:number
        /** 消费次数 */
        count1:number
        /** 营业开始时间 */
        operate_start:string
        /** 营业结束时间 */
        operate_end:string
        /** 距离 单位米 */
        distance:number
        /** 点击预约跳转的路由地址 */
        jump_url:string
    }
    /** 首页门店列表数据 */
    export interface StoreTypeList{
        /** 类型
         *  t = A 常去店铺
         *  t = B 距离最近
         *  t = C 等待最短
         *  t = D 服务最好
         */
        t:string,
        list:StoreTypeListDb[]
    }
    /** 用户端首页面数据类型定义 */
    export interface UserIndexDBs{
        /** 页面顶部搜索框变量 */
        input_search:string
        /** 当前定位的县级名称 */
        district:string
        /** 当前选择行业分类 1 = 洗车，2=装饰，3=养车，4=换轮胎 */
        type:number
        /** 行业下门店数据列表 */
        s_list:StoreTypeList[]
    }
    /** ------------ 迁移卡券相关参数约束 --------------- */
    /** 等待迁移的卡券 */
    export interface RelocateCoupon1{
        /** 已领取卡券ID sm_store_coupon_user 表 */
        id:number
        /** CID 卡券所属卡包ID sm_store_coupon  */
        cid:number
        /** 当前已用次数 - 通过数据统计查询获得 */
        has_num:number
        /** 卡券可以总次数 */
        use_num:number
        /** 卡券名称 */
        coupon_title:string
        /** 卡券所属渠道ID 大于0表示有渠道 */
        channel_id:number
        /** 卡券渠道名称 */
        channel_name:string
    }

}