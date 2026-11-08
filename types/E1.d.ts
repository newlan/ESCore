declare namespace sm.E1
{
	/** E1下级会员数据列表返回数据字段约束 */
	interface E1SubUser extends sm.sm_user_base,tb.kxyk_e1_lower_level
	{
		/** VIP名称 */
		vip_name?:string
		/** 消费门店数量 */
		s_count:number
		/** 下级可分佣消费订单数量 */
		o_count:number
		/** 下级贡献总佣金 */
		c_count:number
	}
	
	/** 会员申请表带有股东名称-用户名称和VIP名称 kxyk_user_vip_set_apply */
	type E1UserApplyVips = tb.kxyk_user_vip_set_apply 
	& Pick<tb.sm_user ,"nickname"> 
	& {
		/** 股东名称 */
		e_name:tb.kxyk_mch_role_info['name'],
		v_name:tb.kxyk_mch_type_vips['name']
	}

	/** 发放会员佣金奖励数据源 */
	type applyVipsCommission = tb.kxyk_mch_role_e2e3_auth_config 
		& Pick<tb.kxyk_mch_type_vips,"price"> 
		& Pick<tb.kxyk_mch_role_info,"E4_income"|'name'>

    /** E1后端页面数据约束 */
	interface E1db{
		/** 是否显示 */
		/** 商圈ID - 从地址栏初始化获取 */
		cid:number
		/** E1注册用户时需要选择车型 车型列表 */
		CarType:CarType[]
		/** E1身份相关数据 */
		E1:E1Info | false
		/** 初始化接口是否有错误 - 是否有访问当前页面的权限 */
		is_err:boolean
		/** 扫描组件数据 */
		scom:sm.ScanCom
		/** 页面容器高度 */
		h:number
		/** 弹框组建数据 */
		pop_box:sm.Com.PopBoxPageDb
		/** E1权限是否准备就绪 */
		is_auth:boolean
		/** 待处理任务数量 */
		count_1:number
		/** 等待处理的赠送会员数量 */
		count_2:number
		/** 是否显示注册码 */
		is_show_reg_code:boolean

		SearchUser:SearchUser
		/** 售卡列表API */
		api:sm.rList
		/** 赠送会员列表API */
		api1:sm.rList
		/** 下级会员列表API */
		api3:sm.rList<sm.E1.E1SubUser>
		/** 数据详情相关 */
		data:{
			/** 是否显示详情 */
			open:boolean,
		}
		/** 赠送会员相关 */
		give_vip:{
			/** 是否显示赠送会员窗口 */
			open:boolean
			/** 用户是否已经有申请的会员了 */
			is_apply:boolean
			/** 当前要指定会员等级的用户 */
			user:any
			/** 可发放列表 */
			list:tb.kxyk_mch_type_vips[]
		}
		/** 时间查询组件相关 */
		sDate:sm.SelectDatePar
		/** 数据查询API */
		api2:sm.rList
		/** 未结算金额 */
		money_checkout:number
		[x:string]:any
	}
    /** E1端页面数据投资门店列表 */
    interface E2list extends tb.kxyk_mch_role_e2e3_auth
    {
        /** 门店名称 */
        name:string
        /** 门店地址 */
        address:string
        /** 门店门头图片地址 */
        img:string
        /** 门店商品数量 */
        goods_count:number
        /** 门店下服务数量 */
        item_count:number

    }
    /** E1端身份 */
    interface E1Info extends tb.kxyk_mch_role_info
    {
        /** 商圈名称 */
		c_name:string
        /** 合伙人微信头像地址 */
		avatar:string
		/** 投资门店数据列表 */
		E2list?:E2list[]
		/** E3数据 */
		E3?:tb.kxyk_mch_role_e2e3_auth
    }
}