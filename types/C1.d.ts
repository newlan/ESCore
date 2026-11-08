declare namespace sm.C1 
{

    /**
     * 行业会员充值规则
     * 后续可扩展赠送卡券和金额
     */
    interface TypeVipsRechargeRule
    {
        /** 商圈ID */
        cid:number
        /** 充值金额 */
        price:number
        /** 赠送金额 */
        give:number
        /** 赠送会员 - 关联kxyk_mch_type_vips表 */
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
        /** 会员结束时间 关联类型 */
        vip_day:number
        /** 赠送卡券ids，字符串逗号分隔 */
        couponids:string
        /** Vip名称 */
        name:string
        /** VIP权重 */
        layer:number
        /** 过期金额 */
        out_price?:number
        /** 提醒金额 */
        tip_price?:number
        /** 赠送卡券数据 */
        ids?:any[]
    }
    /** 
     * C1端行业会员等级 
     * 扩展c1字段 挂在C1覆盖配置
     * C1关联 kxyk_mch_type_vips_circle_config
     */
    interface GetC1TypeVips extends tb.kxyk_mch_type_vips
    {
        /** C1对当前会员的覆盖配置 可为空或者false */
        c1?:tb.kxyk_mch_type_vips_circle_config
        /** 是否打开配置小窗口 */
        is_open?:boolean
    }

    /**
     * C1管理端打开数据详情返回数据接口  
     */
    interface C1CountDBs
    {
        /** 运营金额 */
        count1:number
        /** 服务金额 */
        count2:number
        /** 商品金额 */
        count3:number
        /** 卡券 */
        count4:number
        /** 余额 */
        count5:number
        /** 现金 */
        count6:number
        /** 预售金额 */
        count7:number
        /** 预售卡券金额 */
        count8:number
        /** 预售信值金额 */
        count9:number
        /** 预售门店专用金额 */
        count10:number
        /** 饼图数据 */
        pieDate?:any[]
        /** 数据列表 */
        list?:any[]
        /** 数据总条数 */
        listCount?:number
        /** 饼图中间数据 */
        pieCC?:any
        
    }
    /** C1管理端数据统计默认后端返回数据结构 */
    interface C1CountInitEchotionDB{
        /** 图形报表x轴 */
        xAxis:{
            /** x轴数据项 */
            date:string[]
        }
        series:{
            /** 图表名称 */
            name?:string
            /** 图表类型 柱状图 饼图 ... */
            type:"bar" | 'pie',
            /** 图表数据数组 数量对应x轴项目 */
            data:number[],
            /** 图表是否堆叠态 可自定义 任意字符串 男 女 ....相同字符会堆叠 */
            stack?:string,
            /** 图表label */
            label?:{
                show:boolean,position:"top"|"lift",formatter:any
            }
        }[]
    }
}