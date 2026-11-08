declare namespace sm.Pd1 
{

	/** 技师端下单时要传送的参数 */
	type ReserveOnOrder = {
		/** 是否多规格 */
		is_spec?:number
		/** 
		 * 多规格时是item_id 商品时 是goods_id
		 */
		gid:number
		/** 是否有代付 */
		is_proxy:boolean
		/** 大厅ID */
		hid:number
	}

	/** 转赠和接受余额资产时查询的用户数据 */
	type GiveMoneyAndVipUser = tb.sm_user &{
		/** 用户信值 */
		s_money:number
		/** 用户VIP名称 */
		vip_name:string
		/** 用户VIP */
		vip:number
		/** 用户vip到期时间 */
		t2:number
		/** 用户VIP开始时间 */
		t1:number
		/** VIP是否有插队 */
		is_jump:number
		/** 商圈ID */
		cid:number
		
	}

	/** 立即分账订单数据 */
	type ImmediatelyOrderDetall = tb.kxyk_mch_store_order_detall & {
		/** 商品设置的分账金额 */
		g_bonus?:number
		/** 
		 * 商品设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额
		 * @protected 如果是服务类商品 这里只能是百分比
		 */
		g_bonus_type?:number
		/** 门店设置的分账金额 */
		s_bonus?:number
		/** 
		 * 门店设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额 
		 */
		s_bonus_type?:number
		/** 服务项目设置的分账金额 */
		i_bonus?:number
		/** 
		 * 门店设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额 
		 */
		i_bonus_type?:number
		/** 服务项目是否开启了独立分子 */
		i_is_bouns?:number

	}
	/** 关闭预约函数参数 */
	type gbyyPar = {
		o:tb.kxyk_mch_store_order,
		od:tb.kxyk_mch_store_order_detall
	}

	/** 收银台订单数组数据 */
	type CashierOrder= Pick<tb.kxyk_mch_store_order_detall,'status' | 'oid' | 'gt'> & {
		/** 商品或者多规格 */
		is_spec:number
		/** 本商品是否平台余额支付有折扣 记录折扣值得 2位数 最高100% */
		PSR?:number
		/** 商品或服务名称 */
		name:string
		/** 当前商品或服务价格 */
		price:number
		/** 当前优惠金额 - 卡券优惠 */
		discount:number
		/** 手动优惠 */
		manual_discount?:number
		/** 优惠员工项目 */
		clerk_name2?:string
		/** 商品或者服务ID */
		id:number
		/** 是否使用了优惠券 */
		coupon_ids:number[]
		/** 本条是否挂载了订房数据 */
		room_db?:sm.Com.RoomBookingPayBack
		/** 是否显示选择优惠卷组件 */
		is_show_select_coupon?:boolean
		/** 
		 * 使用卡券类型
		 * @param 0 没有使用卡券
		 * @param 1 使用兑换券
		 * @param 2 使用低值券
		 */
		coupon_type?:0 | 1 | 2
		/** 购买数量 如果是商品的话 */
		count?:number
		/** 
		 * 已经下单后的订单详情ID
		 * @protected 购物车立即支付时没有ID
		 */
		odid?:number
		/** 用于计算满减时的商品或服务ID 首字母g or i */
		gi_id?:string
		/** 
		 * 当前订单属于哪个手牌号码 只有代付逻辑中显示
		 */
		sb_code?:string
		/** 当前订单是否代理支付，代别人付款 */
		is_proxy_pay?:0 | 1
		/** 是否必购项 */
		is_must_buy?:0 | 1
		/** 是否满减 1 = 已经优惠 */
		is_must_discount?:0 | 1
		/** 组件用于选择的ID */
		mid:number
		/** 用于后端识别本条订单是否因没有开始而需要自动删除 */
		is_del?:number
		/** 
		 * 本条是否已经支付
		 * @param 0 = 未支付
		 * @param 1 = 部分支付
		 * @param 2 = 已支付
		 */
		is_pay?:number
		/** 
		 * 本条不取消 就算未开始服务也不取消 因为是帮忙付款 自动取消逻辑放到对方手牌取鞋时计算
		 * @param 0 = 可以取消
		 * @param 1 = 不可以取消
		 */
		no_cancel:number
	}

	/** 洗浴系统各按钮是否可点击验证方法参数 */
	type BotString = {
		/** 关闭预约按钮 */
		gbyy:gbyyPar
	}
	/** 洗浴门店扫码核销时展示的卡券字段约束 */
	type ScanQrcodeCard = sm.CouponUser & Pick<sm.CouponPack,"price">
	/** P1员工表加员工分类表数据 */
	type P1ClerkAndType = tb.kxyk_mch_store_clerk & Omit<tb.kxyk_mch_store_clerk_type,"id"> & Pick<tb.kxyk_mch_store,"is_follow_sub"> 
	
	/** 员工打卡任务需要 */
	type P1StaffTask = tb.kxyk_mch_store_clerk_type & {
		/** 员工ID */
		clerk_id:number
	}


	/** P1端结账时的订单数据 带订单详情 带结算配置数据 */
	type P1OrderDetall = tb.kxyk_mch_store_order & {
		Store?:tb.kxyk_mch_store
	}

	/** P1服务器端门店缓存数据 */
	type P1StoreCache = tb.kxyk_mch_store & {
		/** 当前门店所拥有的VIP 列表 */
		vips?:tb.kxyk_mch_type_vips[]
		/** 当前门店配置会员下单赠送卡券规则列表 */
		gift_rules?:tb.kxyk_mch_store_vip_gift_rules[]
		/** 当前门店授权可发放的卡券列表 */
		give_coupons?:sm.CouponPack[]
		/** 当前门店设置的第三方列表 */
		other_list?:tb.kxyk_other_payment[]
		/** 门店绑定的默认打印机 */
		printer?:tb.kxyk_store_printer
		/** 门店可用的所有子收款商户 */
		pay_sub?:tb.kxyk_mch_store_sub[]
		/** 当前门店所有可用的楼层或商品子分类 */
		sub_list?:tb.kxyk_mch_store_sub[]
	}

	/** VIP下单赠送卡券规则列表 */
	type VipOnOrderGiveCouponRuleList = {
		/** VIP等级ID */
		vip:number
		/** 赠送卡券规则列表 */
		rules:{
			/** 卡券ID */
			id:number
			/** 卡券名称 */
			title:string

		}
	}

	/** P1员工权限下的商品列表 */
	type P1ClerkGoodsList = tb.kxyk_mch_store_sub &{
		/** 商品 */
		goods:sm.good[]
	}
	/** P1员工权限下的服务列表 */
	type P1ClerkSpenList = sm.item & {
		/** 商品分类名称 男浴女浴等 */
		name:string
		/** 商品分类id */
		sub_id:number
		/** 二级商品分类名称 一楼 二楼等 */
		name2:string
		/** 多规格名称 - 洗浴系统是默认 */
		spec_name:string
		/** suk项目名称 */
		suk_name:string
		/** 商品名称 */
		goods_name:string
		/** 商品图片 */
		goods_img:string
		/** 是否预约型服务 */
		is_reserve?:number
		/** 预约型服务是否允许用户自助下单 */
		is_user_buy?:number
	}

	/** 洗浴门店员工权限字段约束 */
	interface StaffAuthField{
		/** 大厅管理权限 全部权限 */
		hall_0:"hall_0"
		/** 大厅查看权限 不能管理 */
		hall_1:"hall_1"
		/** 大厅没有权限 不能查看 不能管理 */
		hall_2:"hall_2"
		/** 禁止大厅 未绑手牌权限 */
		hall_3:"hall_3"
		/** 禁止大厅 已绑手牌权限 */
		hall_4:"hall_4"
		/** 禁止大厅 等待取鞋用户权限 */
		hall_5:"hall_5"
		/** 鞋柜管理权限 全部权限 */
		shoe_0:"shoe_0"
		/** 鞋柜查看权限 不能管理 */
		shoe_1:"shoe_1"
		/** 鞋柜没有权限 不能查看 不能管理 */
		shoe_2:"shoe_2"
		/** 会员管理权限 全部权限 */
		vip_0:"vip_0"
		/** 会员查看权限 不能管理 */
		vip_1:"vip_1"
		/** 会员没有权限 不能查看 不能管理 */
		vip_2:"vip_2"
		/** 员工管理权限 全部权限 */
		staff_0:"staff_0"
		/** 员工查看权限 不能管理 */
		staff_1:"staff_1"
		/** 员工没有权限 不能查看 不能管理 */
		staff_2:"staff_2"
		/** 商户管理权限 全部权限 */
		mch_0:"mch_0"
		/** 商户查看权限 不能管理 */
		mch_1:"mch_1"
		/** 商户没有权限 不能查看 不能管理 */
		mch_2:"mch_2"
		/** 设置权限 全部权限 */
		con_0:"con_0"
		/** 购买设置权限 */
		con_1:"con_1"
		/** 打印机设置权限 */
		con_2:"con_2"
		/** 营业额权限 */
		sales_0:"sales_0"
		/** 营业额查看 无法选择日期 */
		sales_1:"sales_1"
		/** 调试权限 */
		debug_0:"debug_0"
		/** 配置服务与排队项目 */
		queue_0:"queue_0"
		/** 投诉处理权限 */
		msg_2:"msg_2"
		/** 订阅模板消息通知权限 */
		notice:"notice"
		/** 设置会员等级权限 */
		set_vip_0:"set_vip_0"
		/** 申请会员等级权限 */
		set_vip_1:"set_vip_1"
		/** 日志查看权限 */
		log0:"log0"
		/** 解绑手牌权限 */
		un_sb_code:"un_sb_code"
		/** 解绑用户权限 */
		un_user:"un_user"
		/** 会员数据充值记录权限 */
		vip_recharge:"vip_recharge"
		/** 会员数据门店消费记录权限 */
		vip_store_consume:"vip_store_consume"
		/** 分身管理权限 */
		user_avatar:"user_avatar"
		/** 手牌号码识别板块 */
		scan_number:"scan_number"
		/** 员工查看留言消息功能 */
		msg_1:"msg_1"
		/** 语音播报按钮 */
		voice:"voice"
		/** 员工帮用户充值余额或信值权限 */
		top_up:"top_up"
		/** 财务数据统计板块 */
		finance:"finance"
		/** 取消订单权限 */
		cancel_order:"cancel_order"
		/** 管理签到功能 */
		sign:"sign"
		/** 关闭会员身份共享权限 - 用户分享会员身份后需要管理员关闭 且共享数量有限制 库存 */ 
		close_share:"close_share"
		/** 退订套餐权限 */
		cancel_combo:"cancel_combo"
		/** 核销套餐权限 */
		consume_combo:"consume_combo"
		/** 赠送门票功能 */
		free_tickets:"free_tickets"
		/** 订单指派员工权限 */
		set_order_clerk:"set_order_clerk"
		/** 手动设置优惠金额 */
		set_manual_discount:"set_manual_discount"
		/** 上传商品权限 */
		goods:"goods"
		/** 刷卡请客绑定权限 */
		bind_proxy:"bind_proxy"
		/** 鞋吧开牌数量权限 */
		shoe_count:"shoe_count"
		/** 数据报表权限 */
		report:'report'
		/** 完整显示顾客手机号码 */
		show_phone:"show_phone"
		/** 扫描关牌权限 */
		scanning_complete:"scanning_complete"
		/** 收款权限 */
		is_cash:"is_cash"
		/** 微信退款权限 - 充值余额退款 */
		is_wx_refund:"is_wx_refund"
		/** 递交消费明细端权限 - 同步消费明细端展示 */
		is_sync_xf:"is_sync_xf"
		/** 智能网关门锁权限 */
		mqtt_lock:"mqtt_lock"
		/** 会员卡券管理 */
		member_coupons:"member_coupons"
		/** 供货商和一级库存管理 二级库存不需要设置任何员工都有可能入库自己负责的商品 */
		supply_stock:"supply_stock"
		/** 关闭大厅价格显示 */
		close_price:"close_price"
		/** 往期数据跨门店权限 */
		old_data:"old_data"
		/** 员工移动端下单是否显示商品图片 */
		is_show_pic:"is_show_pic"
	}
	/** 权限可选择的数组 */
	type StaffAuthFieldArray = StaffAuthField[keyof StaffAuthField]

	/** 二级商户微信银行列表内存缓存 */
	interface WechatRedisBanksList
	{
		/** 对公 */
		Corporate:sm.WX.BanksList[],
		/** 对私 */
		Personal:sm.WX.BanksList[],
	}
	/** 二级商户组件相关数据 */
	interface SecondaryMerchants{
		/** 是否显示添加修改二级商户模态框 */
		open:boolean
		/** API接口数据 */
		api:sm.rList
	}
	/** 带有门店默认打印机的门店数据 */
	interface StoreDefaultPrint extends tb.kxyk_mch_store
	{
		/** 默认打印机 */
		print?:tb.kxyk_store_printer
	}
	/** 登录管理端的员工数据 */
	interface LoginStaff extends tb.kxyk_mch_store_clerk
	{
		/** 商圈ID */
		cid?:number
		/** 统计日期字段 */
		audit_date?:string
		/** 员工姓名 */
		real_name:string
		/** 员工头像 */
		avatar:string
		/** 员工手机号 */
		phone:string
		/** 员工绑定打印机ID 关联kxyk_store_printer */
		is_printer?:number
		/** 绑定的打印机数据 */
		printer?:tb.kxyk_store_printer
		/** 员工分类名称 管理员 技师 等 */
		n?:string
		/** 当前员工分类是否需要打卡 */
		is_sign?:number
		/** 当前员工分类是否需要定位打卡 */
		is_location?:number
		/** 允许打卡的门店半径 单位米 */
		location_range?:number
		/** 允许上班打卡的开始时间 */
		work_start?:string
		/** 允许上班打卡的结束时间 */
		work_end?:string
		/** 下班是否需要打卡 */
		is_off_work?:number
		/** 下班打卡是否需要跨天 */
		span_days?:number
		/** 下班打卡开始时间 */
		off_start?:string
		/** 下班打卡结束时间 */
		off_end?:string
		/** 
		 * 打卡签到相关数据集合 
		 * @protected 如果为False 则数据还未初始化
		 */
		sign?:tb.kxyk_mch_store_clerk_sign | false
		/** 当前员工拥有的服务队列 */
		server_queue:tb.kxyk_mch_store_queue_config_xy[],
		/** 当前员工拥有的商品分类权限 */
		goods_queue:tb.kxyk_mch_store_sub[]
		/** 当前分类可以发放的卡券权限 */
        give_coupons:string | number[]
		/** 当前分类配置的其他财务权限分类列表 */
		finance_queue?:string | number[]
		/** 当前分类配置的任务队列 */
		task_queue?:string | number[]
		/** 员工分类权限 */
		privileges?:{
			/** 当前分类选择的权限列表 */
			on:sm.Pd1.StaffAuthFieldArray[]
		}
		/** 员工分类符 */
		pop:number
		/** 是否显示签到按钮 0 or 1 */
		is_show_sign?:number
		/** 是否有设置的预约项目GID */
		reserve_gid?:number
		/** 可预约商品项目相关数据 */
		reserve?: tb.UP<tb.kxyk_mch_goods> & {
			/** 预约商品包含的所有项目列表 */
			list?:sm.item[]
			/** 当前员工在移动端显示的预约排队列表 */
			queue?:tb.kxyk_mch_store_order_detall[]
		}
	}
	/**  */
	type LoginStaffSing = {
		/** 
		 * 是否需要打卡
		 * @param 0 = 不需要打卡 员工分类不需要打卡
		 * @param 1 = 需要上班打卡
		 * @param 2 = 需要下班打卡
		 * @param 3 = 本班次已打卡完成
		 */
		is_sing:number
		/** 
		 * 是否需要定位打卡
		 * @param 0 = 不需要打卡
		 * @param 1 = 需要打卡
		 */
		is_location:number



	}
	/** 要打印的参数约定 */
	interface PrintText{
		/** 标题 */
		t1:string
		/** 第二行标题 */
		t2?:string
		/** 第三行标题 */
		t3?:string
		/** 分隔符内的数组 */
		list:string[]
		/** 底部1 */
		b1?:string
		/** 底部2 */
		b2?:string
		/** 开关牌时间 */
		b3?:string
		/** 要执行打印任务的打印机 */
		print?:tb.kxyk_store_printer
		/** 要打印的二维码地址 */
		qr?:string
	}
	/** 页面主动调用主进程方法回调参数约定 */
	interface ElectronBack
	{
		/**
		 *  返回状态码 
		 * @param 0 = 返回有错误
		 * @param 1 = 返回无错误
		*/
		status:number
		/** 错误信息 */
		msg?:string
		/** deviceId 本机唯一ID  */
		deviceId?:string
	}
	/** 管理端页面和electron主进程通讯参数约定 */
	interface ElectronSendMap
	{
		/**
		 * @param 0 = 获取设备deviceId
		 */
		0: {
			/** 获取设备deviceId */
			t:0
		};

		/**
		 * @param 1 = 测试打印机是否正常
		 * @field Ip 需要测试打印机的地址
		 */
		1: { 
			/** 测试打印机是否正常 */
			t:1,
			/** Ip 需要测试打印机的地址 */
			Ip: string 
		};

		/**
		 * @param 2 = 打印绑定成功
		 * @field mark 打印机名称
		 */
		2: { 
			/** 打印绑定成功 */
			t:2,
			/** 打印机名称 */
			mark: string
			/** 绑定成功的打印机IP */ 
			Ip?:string
		};

		/**
		 * @param 3 = 打印任务
		 * @field pt 打印任务内容
		 */
		3: {
			/** 打印任务 */
			t:3 
			/** 打印任务内容 */
			pt: sm.Pd1.PrintText 
		};

		/**
		 * 打开或退出全屏
		 * @param 4 = 打开或退出全屏
		 * @field fullscreen 是否全屏boole
		 */
		4: {
			/** 打开或退出全屏 */
			t:4,
			/** 窗口是否全屏 */
			fullscreen: boolean 
		};
		/**
		 * 关闭软件
		 * @param 5 = 关闭软件
		 */
		5: {
			/** 关闭软件 */
			t:5
		};
	}
	type ElectronSend1 = ElectronSendMap[keyof ElectronSendMap];
	interface ElectronSend
	{
		/** 
		 * 数据类型
		 * @param 0 = 获取设备deviceId 
		 * @param 1 = 测试打印机是否正常
		 * @param 2 = 打印绑定成功
		 * @param 3 = 打印任务
		 * @param 4 = 打开或退出全屏
		 */
		t:number
		/** 需要测试打印机的地址 - 对应t=1 */
		Ip?:string
		/** 打印机名称 2 使用 */
		mark?:string
		/** 打印任务 - 对应t=3 */
		pt?:sm.Pd1.PrintText

	}
	/** P1端员工香港组件数据字段约束 */
	interface P1Staff{
		/** 在线员工列表 */
		list:tb.kxyk_p1_staff_login_log[]
		/** 门店员工列表 */
		StaffList: P1StoreStaff[]
		/** 是否打开员工分类组件 */
		open:boolean
		/** 是否打开员工编辑 */
		open2:boolean
		/** 扫码添加员工组件 */
		scan:sm.ScanCom
	}
	/** 门店员工列表 */
	interface P1StoreStaff extends tb.kxyk_mch_store_clerk
	{
		/** 员工名称 先获取真实名称 -> 昵称 -> 手机号 */
		nickname?:string
		/** 员工头像 */
		avatar?:string
		/** 添加员工人名称 */
		nickname2?:string
		/** 添加员工人头像 */
		avatar2?:string
		/** 员工手机号码 */
		phone?:string
		/** 用户登录系统的密码 */
		pwd?:string

	}
	/** 带有支付商户号码的订单详情 */
	interface OrderDetallPayNumber extends tb.kxyk_mch_store_order_detall
	{
		/** 子商户ID */
		sub_id?:number
		/** 收款子商户号 */
		pay_number?:string
		/** 收款子商户名称 */
		pay_name?:string
		/** 
		 * 门店收款商户号码
		 * @protected 如果子商户授信额度不足的话
		 */
		s_pay_number?:string
		/** 当前子商户可用信誉值 */
		has_sxed:number
	}
	
	/** 洗浴系统门店用户 */
	interface XYUser extends tb.sm_user
	{
		/** 门店ID */
		sid:number
		/** 商圈ID */
		cid:number
		/** 门店专用余额 */
		s_money?:number
		/** 在门店所属行业会员VIPid */
		vip?:number
		/** vip会员名称 */
		vip_name?:string
		/** 是否拥有插队权限 */
		vip_jump?:number
	}
	/** 用户订单组件颜色 */
	interface ODColorReturns
	{
		/** 颜色1 */
		c1:string
		/** 颜色2 */
		c2:string
		/** 文字颜色1 */
		t1:string
		/** 文字颜色2 */
		t2:string
	}
	/** PD1管理端用户组件颜色 */
	interface UColorReturns
	{
		/** 颜色1 */
		c1:string
		/** 颜色2 */
		c2:string
		/** 颜色3 */
		c3:string
		/** 文字颜色1 */
		t1:string
		/** 文字颜色2 */
		t2:string
		/** 文字颜色3 */
		t3:string
		/** 用户昵称 先读取真实名称然后是昵称 组后手机号 */
		nickname:string
	}
	/** 判断订单内是否有必买项目函数返回结果约束 */
	interface GetIsHaveMustBuyReturns
	{
		/** 
		 * 订单是否有必买项目
		 * @param 0 没有必买
		 * @param 1 有必买 - 如果门店没有开启必买也会是1
		 */
		is_have_must_buy: 0 | 1;
		/** 
		 * 当前门店设置的必买项目ID列表
		 * @param 列表格式 g:80,i:1109
		 */
		must_buy_ids:string[]
		/** 
		 * 当前门店设置的必买项目列表
		 */
		must_buy_list:ShopMustBuy[]
	}
	
	/** 进店必买项目配置数据 */
	interface ShopMustBuy
	{
		/** 必买项目名称 */
		label:string
		/** 必买项目ID */
		value:string
		/** 项目游客价格 */
		price:number
		/** 游客满免金额 */
		p_exemption_price?:number
		/** 
		 * 是否全选商品 - 累积满免金额的商圈 
		 */
		p_is_all?:number
		/** 选择可以累计满免的商品和服务ID数组 */
		all_exemption_goods_list?:string[]
		/** 注册会员价格 */
		v_price:number
		/** 注册会员满免金额 */
		vp_exemption_price?:number
		/** 是否多规格
		 * @param 0 普通商品
		 * @param 1 多规格服务项目
		 */
		is_spec:number
		/** 
		 * 是否开启了会员价格
		 * @param 0 不开启
		 * @param 1 开启
		 */
		is_vip_price:number
		/** 
		 * 是否开启门票减免
		 * @param 0 不开启
		 * @param 1 开启
		 */
		is_open_exemption:number
		/** 会员价格列表 */
		vips?:{
			/** 会员名称 */
			vip_name:string
			/** 会员价格 */
			price:number
			/** 会员ID */
			vip:number
			/** 
			 * 开启免费时的满减金额
			 * 例如100 需要消费满100才能免费
			*/
			exemption_price?:number
		}[]
	}
	/** 获取用户余额函数返回参数 */
	interface UserMoneyAndSmoney{
		/** 用户余额 */
		money:number
		/** 门店专用积分 */
		s_money:number
	}
	/** 商品或多规格服务带有会员价格 */
	interface GoodsItemVipPrice
	{
		/**
		 * 是否多规格
		 * @param 0 普通商品
		 * @param 1 多规格服务项目
		 */
		is_spec:number
		/** 商品ID */
		goods_id:number
		/** 项目ID */
		item_id:number
		/** 项目名称 */
		item_name:string
		/** 商品单价 - 游客价格 */
		price:number
		/** 注册会员价格 */
		v_price:number
		/** VIP会员价格 */
		vip_price:number
		/** 
		 * 是否开通了VIP会员价格
		 * @param 0 不能使用VIP价格 
		 * @param 1 可以使用VIP价格 
		 */
		is_open_vip:number
		/** 
		 * 是否只能现金购买
		 * @param 0 不限制现金 
		 * @param 1 只能现金 
		 */
		is_cash:number
		/** 是否需要送货 */
		is_delivery?:number
	}
	/** 代理人付款列表 */
	interface ProxyPayList
	{
		/** 大厅HID */
		hid:number
		/** 用户UID */
		uid:number
		/** 
		 * 手牌性别
		 * @param 0 男浴
		 * @param 1 女浴
		 */
		sex:number
		/** 手牌号码 */
		code:string
		/** 代结算的订单 */
		orders?:tb.kxyk_mch_store_order

	}
	/** 支付明细 */
	interface PayDetall
	{
		/** 商品ID */
		gid:number
		/** 
		* 是否多规格
		* @param 0 普通商品 
		* @param 1 多规格服务 
		*/
		is_spec: 0 | 1
		/** 多规格项目item_ID */
		iid:number
		/** 本条订单详情需要支付的金额 */
		price:number
		/** 优惠金额 */
		discount:number
		/** 本条订单金额 */
		order_price:number
		/** 订单详情ID */
		odid:number
		/** 
		 * 是否只能现金支付 
		 * @param 0 不限制
		 * @param 1  只能现金支付
		*/
		is_cash:number
		/** 
		 * 支付状态
		 * @param 0 未支付
		 * @param 1 部分支付 已支付的部分会有值
		 * @param 2 完全支付
		 */
		is_pay:number
		/** 专用余额支付金额 */
		yue_s_pay:number
		/** 余额支付金额 */
		yue_pay:number
		/** 微信在线支付金额 */
		wx_pay:number
		/** 现金支付金额 */
		cash_pay:number
		/** 等待支付的金额 */
		wait_pay_price:number
		/** 商品是否需要送货 */
		is_delivery:number
		/** 商品是否为套餐 */
		is_combo:number


	}
	/** 共享用户字段 */
	interface SharedUser extends tb.kxyk_circle_shared_role
	{
		/** 宿主昵称 */
		nickname:string
		/** 宿主余额 */
		money:number
		/** 宿主积分 或信值 - 门店专用 */
		s_money:number
		/** 宿主VIP */
		vip:number
	}
	/** 用户充值余额方法参数 */
	interface RechargeMoneyParame{
		/** 充值用户UID */
		uid:number
		/** 充值金额 */
		price:number
		/** 充值门店ID */
		sid:number
		/** 充值商圈ID */
		cid:number
		/** 操作员工clerk_id */
		clerk_id?:number
		/** 操作员工uid */
		s_uid:number
		/**
		 *  调用方法类型
		 *  @param 1 = 管理员手动为用户充值
		 *  @param 2 = 用户微信在线支付
		 */
		type:number
		/** 
		 * 充值金额的收款方识别
		 * @param 0 商圈收款
		 * @param 1 门店收款
		 * @param 2 公司收款
		 */
		is_sxed:number
		/** 关联paylog系统支付表ID，微信在线支付时有 */
		pl_id?:number
	}
	/** 门店专用余额积分充值方法参数 */
	interface P1RechargeStoreYueParameter{
		/** 充值用户UID */
		uid:number,
		/** 充值金额 */
		price:number
		/** 门店ID */
		sid:number
		/** 操作管理员UID */
		s_uid:number
		/** 是否添加结算日志 */
		is_log:boolean
		/** 从前段传过来的信值写入日志表字段 */
		credit_log?:tb.kxyk_mch_store_credit_log
		/** 操作员工clerk_id */
		clerk_id?:number
	}
	/** 2024-09-11扩展前端kxyk对象增加role角色权限数据集合 */
	interface KxykRole
	{
		/** 是否洗浴门店登录管理员 
		 * @param 0 不是门店管理 其他为管理员登录 设置为门店号码 
		*/
		is_p1:number
		/** 洗浴管理员页面数据集合 */
		p1_dbs: false | sm.U.Page.Pd1
		/**
		 *  是否进入洗浴门店的用户
		 *  @param 0 不是普通用户 其他为用户登录 设置为门店号码
		 */
		p1_user:number
		/** 洗浴用户端页面数据集合 */
		p1_user_dbs:false | sm.U.Page.IndexY
		/** 管理员和用户开始监听页面事件 */
		OnEvent:Function
		/** 角色是否已经加载完成 */
		is_load?:boolean
	}

	/** 对象多级结构通过点.来声明 */
	// type Path<T> = {
	// 	[K in keyof T]: T[K] extends object 
	// 		? T[K] extends Array<any>
	// 			? K // 如果是数组类型，则不继续递归
	// 			: K | `${K}.${Path<NonNullable<T[K]>>}`
	// 		: K;
	// }[keyof T];
	// type HallMemberPath = Path<HallMember>;
	// type Debug<T> = T extends any ? T : never;

	// type HallMemberPathDebug = Debug<HallMemberPath>;
	
	/** 同步洗浴相关管理和用户端事件参数 */
	interface EmitP1Par
	{
		/**
		 * 数据类型
		 * @param edit = 修改用户已有数据
		 * @param join = 新用户加入
		 * @param del = 用户离开
		 * @param staff_join = 员工登录加入在线列表
		 * @param staff_join = 员工离开
		 * @param up_car = 同步购物车
		 * @param up_store_electron_id 更新门店打印服务器硬件ID 
		 * @param print 收到打印请求 
		 * @param up_message 更新聊天组件角标 
		 * @param pop 用户扫码进来后管理端直接弹框窗口 
		 * @param use_doom 更新房型商品的已预定和使用的房间数量
		 */
		t:'edit' | 'up_message' | 'join' | 'del' | 'staff_join' | "staff_del" | "up_car" | "up_store_electron_id" | "print" | "pop" | "use_doom"
		/** 加入新用户时的用户数据 */
		member?:HallMember
		/** 触发本次更新的源sid_ sk_id 用于同步购物车区分是否自己触发 */
		sk_id?:string
		/** 要更新的门店electron id */
		electron_id?:string
		/** 门店默认打印机更新 关联 up_store_electron_id */
		default_printer?:number
		/** 要打印的数据 */
		print?:sm.Pd1.PrintText
		/** 通知房型商品ID 和使用数量 */
		good_id?:number
		/** 房型商品已使用的房间数量 */
		use_doom?:number
		/**
		 *  kxyk_bath_hall ID 
		 * @abstract 主要用于没有绑定UID时的数据同步逻辑
		 */
		id?:number
		/** pop ID */
		pop?:number
		/** 
		 * 用户UID - P1端先找ID 没有的话找UID 
		 * 通知用户端必须要UID
		 */
		uid?:number
		/**
		 *  员工uid
		 *  员工离线时 要删除的UID
		 */
		staff_uid?:number
		/**
		 *  员工数据 
		 *  新员工上线时加入在线列表
		*/
		staff?:tb.kxyk_p1_staff_login_log
		/** 聊天信息角标数量 */
		UnreadCount?:number
		/** 要传送的数据列表，以大厅表数据结构进行约束 */
		list:{
			key:keyof HallMember,
			val:HallMemberVal
		}[]
	}


	// list:{
	// 	key:keyof HallMember,
	// 	val:HallMemberVal
	// }[]

	/** 大厅下代理支付人的余额卡券等数据 异步加载 - 购物车结算的时候加载 */
	type HallProxyMoneys={
		/** 手牌号码，如果没有绑定的话 读取用户昵称+手机号 */
		sb_code:string
		/** 余额 */
		money?:number
		/** 信值 */
		s_money?:number
		/** VIP名称 */
		vip_name?:string
		/** VIP ID */
		vip?:number
		/** 代理人用户UID */
		uid?:number
		/** 门店ID */
		sid?:number
		/** 商圈ID */
		cid?:number
		/** 优惠券 */
		coupons?:sm.CouponUser[]
	}


	type HallMemberVal = HallMember[keyof HallMember];
	type hall_vip_cards = {
		/** 用户UID */
		uid:number
		/** 会员卡号 */
		physical_card_number?:string
		/** 可用余额 */
		money:number
		/** 可用信值 */
		s_money:number
		/** VIP等级ID */
		vip:number
		/** VIP介绍 */
		vip_intro:string
		/** VIP名称 */
		vip_name:string
	}
	/** 洗浴门店大厅用户数据结构 */
	interface HallMember extends tb.kxyk_bath_hall,tb.kxyk_user_vip
	{
		/** 用户可用的会员卡列表 */
		vip_cards?:hall_vip_cards[]
		/** 用户备注列表 */
		remarks?:tb.sm_user_remark[]
		/** 订单 */
		orders?: tb.kxyk_mch_store_order
		/** member表ID */
		mid:tb.kxyk_circle_member["id"]
		/** 是否加载共享身份列表 - 异步加载控制 */
		is_loading_shared_list?:boolean,
		/** 洗浴旧的实体卡号 */
		physical_card_number?:string
		/** 代理支付人的手牌号码 */
		ph_sb_code?:string
		/** 代理人余额卡券数据 - 收银台结算时读取 */
		ph_moneys?:HallProxyMoneys
		/** 代理支付的手牌号码男女 */
		ph_sex?:number
		/** 
		 * 当前大厅数据是否新增 
		 * 是否需要通知其他管理员新用户加入
		 */
		is_new_add:boolean
		/** 商圈ID */
		cid:number
		/** 共享身份列表 */
		shared_list?:sm.SharedRole[]
		/** 当前选中的共享身份UID  */
		shared_uid:number
		/** VIP名称 红钻 金钻等 */
		vip_name:string
		/** VIP 插队权限 */
		vip_jump:number
		/** VIP 会员说明 */
		vip_info?:string
		/** VIP充值提醒 */
		tip_vip?:{
			/** 是否弹框提醒充值 */
			is_tip:boolean
			/** 提醒金额 */
			tip_price:number
			/** 过期金额 */
			out_price:number
			/** 过期时间 */
			out_time:number
			/** vip是否拥有插队功能 */
			is_jump:number
		}
		/** 用户余额 */
		money:number
		/** 累计充值数据 */
		r_money:number
		/** 门店专用积分 */
		s_money:number,
		/** 用户昵称 */
		nickname:string
		/** 用户昵称备注 或 真实名称 */
		real_name?:string
		/** 隐私密码 */
		secrecy_pass?:string
		/** 是否开启隐私 */
		is_secrecy?:number
		/** 用户电话 */
		phone:string
		/** 用户头像 */
		avatar:string
		/** 用户密码 */
		pwd:string
		/** 性别 */
		sex:number
		/** 购物车 */
		shoping_car?: sm.ShopingCar
		/** 用户可用所有卡券 */
		coupons?:sm.CouponUser[]
		/** 卡券数量 */
		coupon_count?:number
		/** 用户可用期卡列表 */
		annual?:sm.kxykAnnualUser[]
		/** 当前用户是否会员的分身 如果有值就是宿主的UID */
		is_avatar?:number
		/** 当前用户是否有分身 值是分身UID */
		a_uid?:number
		/** 适配数组类型调用 */

		/** UI虚拟字段 */
		/**
		 * 是否显示订单详情
		 * 用户端默认收缩订单详情
		 */
		is_show_order_detall?:boolean
		
		/** 用户是否解绑 - 虚拟字段 用于解绑用户后 用户端的UI通知 0 || 1 */
		is_unbind_user?:number
		/** 订购房间时给收银台传送的数据 - 虚拟字段仅用于内部传送 */
		room_pay_data?:sm.Com.RoomBookingPayBack
	}
	/** 后端获取大厅用户数据方法参数 */
	export interface GetHallMemberPar
	{
		/**
		 *  参数类型
		 *  @param 0 = kxyk_bath_hall 表ID
		 *  @param 1 = 用户UID - uid 
		 *  @param 2 = 鞋柜ID - sb_id
		 *  @param 3 = 手牌code - sb_code
		 */
		type: 0 | 1 | 2 | 3
		/** 门店ID */
		sid:number
		/** 是否为游客 */
		is_guest?:number
		/** 传入的ID */
		id:string | number
		/** 
		 * 到店状态is_come 如果为1
		 * 自动检测数据库用户是否为0，
		 * 然后更新 
		*/
		is_come?:number
		/** 是否写入数据 - 如果不在大厅的话 写入数据进入大厅 */
		is_add?:boolean
		
	}
	/** 进入洗浴门店首页后端返回参数 */
	export interface IndexYInitDbBack
	{
		/** 门店数据 */
		Store?:tb.kxyk_mch_store
		/** 用户数据 */
		Member?:sm.Pd1.HallMember | false
		/** 
		 * 是否登录了分身但没有主号，需要自动跳转到主号 
		 * @param 0 = 不跳转
		 * @param 1 = 跳转
		*/
		is_jump_main?:number
		/** 是否有携带的转增数据 */
		gi?:gi_back
	}

	/** 返回用户端的转增数据 */
	export interface gi_back extends tb.kxyk_user_give_money_and_vip
	{
		/** 赠送人名称 */
		set_nickname?:string
		/** 接收人名称 */
		get_nickname?:string
		/** 赠送的VIP名称 */
		vip_name?:string
		/** 赠送的vip权益说明 */
		vip_info?:string
	}

	/** 进入洗浴门店首页后端方法参数 */
	export interface IndexYInitDb
	{
		/** 门店ID */
		sid:number
		/** 用户UID */
		uid:number
		/** 
		 * 进入类型
		 * 0 = 用户正常进入
		 * 1 = 员工代客下单进入
		 * 2 = 员工游客模式进入
		 */
		type:number
		/** 是否到店 - 远程预约 0 = 预约 1 = 到店 */
		is_come:number
		/** 
		 * 是否扫码从小程序跳转而来
		 * @param 0 不是
		 * @param 1 是
		 */
		pop:number
		/** 是否有转增ID 转增ID被混交需要后端解码 */
		gi?:string

	}
	/** 手牌code检测返回数据参数约定 */
	export interface CheckShoeBoxRes
	{
		/** 
		 * 状态码
		 * 0 = 手牌code未在系统注册
		 * 1 = 手牌code已注册 - 鞋柜未下单
		 * 2 = 手牌code已注册 - 鞋柜已下单   
		*/
		status:number
		/** 鞋柜表数据 */
		shoeBox:tb.kxyk_bath_shoebox | false
		
	}
	/** 洗浴员工内存数据结构 */
	export interface PdStaffMemory{
		/** Uid */
		uid:number
		/** 门店ID */
		sid:number
		/** socket id */
		skid:string
		/** 员工id  */
		clerk_id?:number
		
	}
}