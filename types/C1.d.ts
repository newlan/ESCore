declare namespace sm.C1 
{

    /**
     * 行业会员充值规则
     * 后续可扩展赠送卡券和金额
     */
    interface TypeVipsRechargeRule
    {
        
        cid:number
        
        price:number
        
        give:number
        
        vip:number
        /**
         *  是否有插队功能 
         * @param 0  没有插队
         * @param 1  有插队
        */
        is_jump:number
        /** 
         * 会员结束日期类型 
         * @param 0 年
         * @param 1 月
         * @param 2 日
        */
        day_type: 0 | 1 | 2
        
        vip_day:number
        
        couponids:string
        
        name:string
        
        layer:number
        
        out_price?:number
        
        tip_price?:number
        
        ids?:any[]
    }
    /** 
     * C1端行业会员等级 
     * 扩展c1字段 挂在C1覆盖配置
     * C1关联 kxyk_mch_type_vips_circle_config
     */
    interface GetC1TypeVips extends tb.kxyk_mch_type_vips
    {
        
        c1?:tb.kxyk_mch_type_vips_circle_config
        
        is_open?:boolean
    }

    /**
     * C1管理端打开数据详情返回数据接口  
     */
    interface C1CountDBs
    {
        
        count1:number
        
        count2:number
        
        count3:number
        
        count4:number
        
        count5:number
        
        count6:number
        
        count7:number
        
        count8:number
        
        count9:number
        
        count10:number
        
        pieDate?:any[]
        
        list?:any[]
        
        listCount?:number
        
        pieCC?:any
        
    }
    
    interface C1CountInitEchotionDB{
        
        xAxis:{
            
            date:string[]
        }
        series:{
            
            name?:string
            
            type:"bar" | 'pie',
            
            data:number[],
            
            stack?:string,
            
            label?:{
                show:boolean,position:"top"|"lift",formatter:any
            }
        }[]
    }
}