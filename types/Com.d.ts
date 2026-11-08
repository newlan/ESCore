
declare namespace sm.Com 
{

	
	type MemberCouponBatchGrantCouponType = "cash" | "exchange" | "discount" | "vip" | "other" | number

	
	type StockBatchWarehousing = 
	{
		
		sid:number
        /** 
         * 一二级库存 楼层库存
         * @count 0 一级总库存
         * @count 大于一是二级库存 楼层分类ID 关联 kxyk_mch_store_sub 表
         */
        sub_id:number
		/** 
         * 库存类型
         * @param 1 采购入库 - 一级库存批量入库
         * @param 3 领用入库 - 二级库存批量入库
        */
        type:number
		
        supp_id?:number
		
		goods_list:tb.UP<tb.kxyk_mch_goods_stock_log>[]
		
		remark?:string
		
		sub_stock_list:tb.kxyk_mch_store_sub[]
	}


}
