/**
 * 前后端传参类型约束
 */
declare namespace sm.U
{
    
    export interface StoreUserVipSmoney
    {
        
        cpid:number
        
        tid:number
        
        uid:number
        
        vip:number
        
        t1:number
        
        t2:number
        
        s_money:number
        
        vip_name:string
        
        is_jump:number

    }

    
    export interface UserTypeVip extends tb.kxyk_mch_type_vips
    {
        /** vip id 关联 kxyk_mch_type_vips
         * 可以为0
        */
       vip:number
       
       t1:number
       
       t2:number
    }
    
    export interface tuanGouPCouponList{
        
        name:string
        /** 
         * 卡券状态
         * 0 = 未使用
         * 1 = 已使用
         * 2 = 已过期
         */
        status:number
        
        validity_time:string
        
        get_time:string
        
        is_verification:number
        
        use_time:string
        
        cuid:number
        
        staff_avatar:string
        
        staff_nickname:string
        
        staff_phone:string
    }
    
    export interface rdapiOnDetail
    {
        
        strCmdCode:string
        
        strData:string
        
        strStatus:string
    }
    
    export interface StoreTypeListDb
    {
        
        id:number
        
        name:string
        
        img:string
        
        lat:string
        
        lng:string
        
        address:string
        
        phone:string
        
        rate:number
        
        count1:number
        
        operate_start:string
        
        operate_end:string
        
        distance:number
        
        jump_url:string
    }
    
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
    
    export interface UserIndexDBs{
        
        input_search:string
        
        district:string
        
        type:number
        
        s_list:StoreTypeList[]
    }
    
    
    export interface RelocateCoupon1{
        
        id:number
        
        cid:number
        
        has_num:number
        
        use_num:number
        
        coupon_title:string
        
        channel_id:number
        
        channel_name:string
    }

}