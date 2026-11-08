declare namespace sm.Pd1 
{

	
	type ReserveOnOrder = {
		
		is_spec?:number
		/** 
		 * 多规格时是item_id 商品时 是goods_id
		 */
		gid:number
		
		is_proxy:boolean
		
		hid:number
	}

	
	type GiveMoneyAndVipUser = tb.sm_user &{
		
		s_money:number
		
		vip_name:string
		
		vip:number
		
		t2:number
		
		t1:number
		
		is_jump:number
		
		cid:number
		
	}

	
	type ImmediatelyOrderDetall = tb.kxyk_mch_store_order_detall & {
		
		g_bonus?:number
		/** 
		 * 商品设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额
		 * @protected 如果是服务类商品 这里只能是百分比
		 */
		g_bonus_type?:number
		
		s_bonus?:number
		/** 
		 * 门店设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额 
		 */
		s_bonus_type?:number
		
		i_bonus?:number
		/** 
		 * 门店设置的提成类型
		 * @param 0 百分百
		 * @param 1 实际金额 
		 */
		i_bonus_type?:number
		
		i_is_bouns?:number

	}
	
	type gbyyPar = {
		o:tb.kxyk_mch_store_order,
		od:tb.kxyk_mch_store_order_detall
	}

	
	type CashierOrder= Pick<tb.kxyk_mch_store_order_detall,'status' | 'oid' | 'gt'> & {
		
		is_spec:number
		
		PSR?:number
		
		name:string
		
		price:number
		
		discount:number
		
		manual_discount?:number
		
		clerk_name2?:string
		
		id:number
		
		coupon_ids:number[]
		
		room_db?:sm.Com.RoomBookingPayBack
		
		is_show_select_coupon?:boolean
		/** 
		 * 使用卡券类型
		 * @param 0 没有使用卡券
		 * @param 1 使用兑换券
		 * @param 2 使用低值券
		 */
		coupon_type?:0 | 1 | 2
		
		count?:number
		/** 
		 * 已经下单后的订单详情ID
		 * @protected 购物车立即支付时没有ID
		 */
		odid?:number
		
		gi_id?:string
		/** 
		 * 当前订单属于哪个手牌号码 只有代付逻辑中显示
		 */
		sb_code?:string
		
		is_proxy_pay?:0 | 1
		
		is_must_buy?:0 | 1
		
		is_must_discount?:0 | 1
		
		mid:number
		
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

	
	type BotString = {
		
		gbyy:gbyyPar
	}
	
	type ScanQrcodeCard = sm.CouponUser & Pick<sm.CouponPack,"price">
	
	type P1ClerkAndType = tb.kxyk_mch_store_clerk & Omit<tb.kxyk_mch_store_clerk_type,"id"> & Pick<tb.kxyk_mch_store,"is_follow_sub"> 
	
	
	type P1StaffTask = tb.kxyk_mch_store_clerk_type & {
		
		clerk_id:number
	}


	
	type P1OrderDetall = tb.kxyk_mch_store_order & {
		Store?:tb.kxyk_mch_store
	}

	
	type P1StoreCache = tb.kxyk_mch_store & {
		
		vips?:tb.kxyk_mch_type_vips[]
		
		gift_rules?:tb.kxyk_mch_store_vip_gift_rules[]
		
		give_coupons?:sm.CouponPack[]
		
		other_list?:tb.kxyk_other_payment[]
		
		printer?:tb.kxyk_store_printer
		
		pay_sub?:tb.kxyk_mch_store_sub[]
		
		sub_list?:tb.kxyk_mch_store_sub[]
	}

	
	type VipOnOrderGiveCouponRuleList = {
		
		vip:number
		
		rules:{
			
			id:number
			
			title:string

		}
	}

	
	type P1ClerkGoodsList = tb.kxyk_mch_store_sub &{
		
		goods:sm.good[]
	}
	
	type P1ClerkSpenList = sm.item & {
		
		name:string
		
		sub_id:number
		
		name2:string
		
		spec_name:string
		
		suk_name:string
		
		goods_name:string
		
		goods_img:string
		
		is_reserve?:number
		
		is_user_buy?:number
	}

	
	interface StaffAuthField{
		
		hall_0:"hall_0"
		
		hall_1:"hall_1"
		
		hall_2:"hall_2"
		
		hall_3:"hall_3"
		
		hall_4:"hall_4"
		
		hall_5:"hall_5"
		
		shoe_0:"shoe_0"
		
		shoe_1:"shoe_1"
		
		shoe_2:"shoe_2"
		
		vip_0:"vip_0"
		
		vip_1:"vip_1"
		
		vip_2:"vip_2"
		
		staff_0:"staff_0"
		
		staff_1:"staff_1"
		
		staff_2:"staff_2"
		
		mch_0:"mch_0"
		
		mch_1:"mch_1"
		
		mch_2:"mch_2"
		
		con_0:"con_0"
		
		con_1:"con_1"
		
		con_2:"con_2"
		
		sales_0:"sales_0"
		
		sales_1:"sales_1"
		
		debug_0:"debug_0"
		
		queue_0:"queue_0"
		
		msg_2:"msg_2"
		
		notice:"notice"
		
		set_vip_0:"set_vip_0"
		
		set_vip_1:"set_vip_1"
		
		log0:"log0"
		
		un_sb_code:"un_sb_code"
		
		un_user:"un_user"
		
		vip_recharge:"vip_recharge"
		
		vip_store_consume:"vip_store_consume"
		
		user_avatar:"user_avatar"
		
		scan_number:"scan_number"
		
		msg_1:"msg_1"
		
		voice:"voice"
		
		top_up:"top_up"
		
		finance:"finance"
		
		cancel_order:"cancel_order"
		
		sign:"sign"
		 
		close_share:"close_share"
		
		cancel_combo:"cancel_combo"
		
		consume_combo:"consume_combo"
		
		free_tickets:"free_tickets"
		
		set_order_clerk:"set_order_clerk"
		
		set_manual_discount:"set_manual_discount"
		
		goods:"goods"
		
		bind_proxy:"bind_proxy"
		
		shoe_count:"shoe_count"
		
		report:'report'
		
		show_phone:"show_phone"
		
		scanning_complete:"scanning_complete"
		
		is_cash:"is_cash"
		
		is_wx_refund:"is_wx_refund"
		
		is_sync_xf:"is_sync_xf"
		
		mqtt_lock:"mqtt_lock"
		
		member_coupons:"member_coupons"
		
		supply_stock:"supply_stock"
		
		close_price:"close_price"
		
		old_data:"old_data"
		
		is_show_pic:"is_show_pic"
	}
	
	type StaffAuthFieldArray = StaffAuthField[keyof StaffAuthField]

	
	interface WechatRedisBanksList
	{
		
		Corporate:sm.WX.BanksList[],
		
		Personal:sm.WX.BanksList[],
	}
	
	interface SecondaryMerchants{
		
		open:boolean
		
		api:sm.rList
	}
	
	interface StoreDefaultPrint extends tb.kxyk_mch_store
	{
		
		print?:tb.kxyk_store_printer
	}
	
	interface LoginStaff extends tb.kxyk_mch_store_clerk
	{
		
		cid?:number
		
		audit_date?:string
		
		real_name:string
		
		avatar:string
		
		phone:string
		
		is_printer?:number
		
		printer?:tb.kxyk_store_printer
		
		n?:string
		
		is_sign?:number
		
		is_location?:number
		
		location_range?:number
		
		work_start?:string
		
		work_end?:string
		
		is_off_work?:number
		
		span_days?:number
		
		off_start?:string
		
		off_end?:string
		/** 
		 * 打卡签到相关数据集合 
		 * @protected 如果为False 则数据还未初始化
		 */
		sign?:tb.kxyk_mch_store_clerk_sign | false
		
		server_queue:tb.kxyk_mch_store_queue_config_xy[],
		
		goods_queue:tb.kxyk_mch_store_sub[]
		
        give_coupons:string | number[]
		
		finance_queue?:string | number[]
		
		task_queue?:string | number[]
		
		privileges?:{
			
			on:sm.Pd1.StaffAuthFieldArray[]
		}
		
		pop:number
		
		is_show_sign?:number
		
		reserve_gid?:number
		
		reserve?: tb.UP<tb.kxyk_mch_goods> & {
			
			list?:sm.item[]
			
			queue?:tb.kxyk_mch_store_order_detall[]
		}
	}
	
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
	
	interface PrintText{
		
		t1:string
		
		t2?:string
		
		t3?:string
		
		list:string[]
		
		b1?:string
		
		b2?:string
		
		b3?:string
		
		print?:tb.kxyk_store_printer
		
		qr?:string
	}
	
	interface ElectronBack
	{
		/**
		 *  返回状态码 
		 * @param 0 = 返回有错误
		 * @param 1 = 返回无错误
		*/
		status:number
		
		msg?:string
		
		deviceId?:string
	}
	
	interface ElectronSendMap
	{
		/**
		 * @param 0 = 获取设备deviceId
		 */
		0: {
			
			t:0
		};

		/**
		 * @param 1 = 测试打印机是否正常
		 * @field Ip 需要测试打印机的地址
		 */
		1: { 
			
			t:1,
			
			Ip: string 
		};

		/**
		 * @param 2 = 打印绑定成功
		 * @field mark 打印机名称
		 */
		2: { 
			
			t:2,
			
			mark: string
			 
			Ip?:string
		};

		/**
		 * @param 3 = 打印任务
		 * @field pt 打印任务内容
		 */
		3: {
			
			t:3 
			
			pt: sm.Pd1.PrintText 
		};

		/**
		 * 打开或退出全屏
		 * @param 4 = 打开或退出全屏
		 * @field fullscreen 是否全屏boole
		 */
		4: {
			
			t:4,
			
			fullscreen: boolean 
		};
		/**
		 * 关闭软件
		 * @param 5 = 关闭软件
		 */
		5: {
			
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
		
		Ip?:string
		
		mark?:string
		
		pt?:sm.Pd1.PrintText

	}
	
	interface P1Staff{
		
		list:tb.kxyk_p1_staff_login_log[]
		
		StaffList: P1StoreStaff[]
		
		open:boolean
		
		open2:boolean
		
		scan:sm.ScanCom
	}
	
	interface P1StoreStaff extends tb.kxyk_mch_store_clerk
	{
		
		nickname?:string
		
		avatar?:string
		
		nickname2?:string
		
		avatar2?:string
		
		phone?:string
		
		pwd?:string

	}
	
	interface OrderDetallPayNumber extends tb.kxyk_mch_store_order_detall
	{
		
		sub_id?:number
		
		pay_number?:string
		
		pay_name?:string
		/** 
		 * 门店收款商户号码
		 * @protected 如果子商户授信额度不足的话
		 */
		s_pay_number?:string
		
		has_sxed:number
	}
	
	
	interface XYUser extends tb.sm_user
	{
		
		sid:number
		
		cid:number
		
		s_money?:number
		
		vip?:number
		
		vip_name?:string
		
		vip_jump?:number
	}
	
	interface ODColorReturns
	{
		
		c1:string
		
		c2:string
		
		t1:string
		
		t2:string
	}
	
	interface UColorReturns
	{
		
		c1:string
		
		c2:string
		
		c3:string
		
		t1:string
		
		t2:string
		
		t3:string
		
		nickname:string
	}
	
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
	
	
	interface ShopMustBuy
	{
		
		label:string
		
		value:string
		
		price:number
		
		p_exemption_price?:number
		/** 
		 * 是否全选商品 - 累积满免金额的商圈 
		 */
		p_is_all?:number
		
		all_exemption_goods_list?:string[]
		
		v_price:number
		
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
		
		vips?:{
			
			vip_name:string
			
			price:number
			
			vip:number
			/** 
			 * 开启免费时的满减金额
			 * 例如100 需要消费满100才能免费
			*/
			exemption_price?:number
		}[]
	}
	
	interface UserMoneyAndSmoney{
		
		money:number
		
		s_money:number
	}
	
	interface GoodsItemVipPrice
	{
		/**
		 * 是否多规格
		 * @param 0 普通商品
		 * @param 1 多规格服务项目
		 */
		is_spec:number
		
		goods_id:number
		
		item_id:number
		
		item_name:string
		
		price:number
		
		v_price:number
		
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
		
		is_delivery?:number
	}
	
	interface ProxyPayList
	{
		
		hid:number
		
		uid:number
		/** 
		 * 手牌性别
		 * @param 0 男浴
		 * @param 1 女浴
		 */
		sex:number
		
		code:string
		
		orders?:tb.kxyk_mch_store_order

	}
	
	interface PayDetall
	{
		
		gid:number
		/** 
		* 是否多规格
		* @param 0 普通商品 
		* @param 1 多规格服务 
		*/
		is_spec: 0 | 1
		
		iid:number
		
		price:number
		
		discount:number
		
		order_price:number
		
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
		
		yue_s_pay:number
		
		yue_pay:number
		
		wx_pay:number
		
		cash_pay:number
		
		wait_pay_price:number
		
		is_delivery:number
		
		is_combo:number


	}
	
	interface SharedUser extends tb.kxyk_circle_shared_role
	{
		
		nickname:string
		
		money:number
		
		s_money:number
		
		vip:number
	}
	
	interface RechargeMoneyParame{
		
		uid:number
		
		price:number
		
		sid:number
		
		cid:number
		
		clerk_id?:number
		
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
		
		pl_id?:number
	}
	
	interface P1RechargeStoreYueParameter{
		
		uid:number,
		
		price:number
		
		sid:number
		
		s_uid:number
		
		is_log:boolean
		
		credit_log?:tb.kxyk_mch_store_credit_log
		
		clerk_id?:number
	}
	
	interface KxykRole
	{
		/** 是否洗浴门店登录管理员 
		 * @param 0 不是门店管理 其他为管理员登录 设置为门店号码 
		*/
		is_p1:number
		
		p1_dbs: false | sm.U.Page.Pd1
		/**
		 *  是否进入洗浴门店的用户
		 *  @param 0 不是普通用户 其他为用户登录 设置为门店号码
		 */
		p1_user:number
		
		p1_user_dbs:false | sm.U.Page.IndexY
		
		OnEvent:Function
		
		is_load?:boolean
	}

	
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
		
		member?:HallMember
		
		sk_id?:string
		
		electron_id?:string
		
		default_printer?:number
		
		print?:sm.Pd1.PrintText
		
		good_id?:number
		
		use_doom?:number
		/**
		 *  kxyk_bath_hall ID 
		 * @abstract 主要用于没有绑定UID时的数据同步逻辑
		 */
		id?:number
		
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
		
		UnreadCount?:number
		
		list:{
			key:keyof HallMember,
			val:HallMemberVal
		}[]
	}


	// list:{
	// 	key:keyof HallMember,
	// 	val:HallMemberVal
	// }[]

	
	type HallProxyMoneys={
		
		sb_code:string
		
		money?:number
		
		s_money?:number
		
		vip_name?:string
		
		vip?:number
		
		uid?:number
		
		sid?:number
		
		cid?:number
		
		coupons?:sm.CouponUser[]
	}


	type HallMemberVal = HallMember[keyof HallMember];
	type hall_vip_cards = {
		
		uid:number
		
		physical_card_number?:string
		
		money:number
		
		s_money:number
		
		vip:number
		
		vip_intro:string
		
		vip_name:string
	}
	
	interface HallMember extends tb.kxyk_bath_hall,tb.kxyk_user_vip
	{
		
		vip_cards?:hall_vip_cards[]
		
		remarks?:tb.sm_user_remark[]
		
		orders?: tb.kxyk_mch_store_order
		
		mid:tb.kxyk_circle_member["id"]
		
		is_loading_shared_list?:boolean,
		
		physical_card_number?:string
		
		ph_sb_code?:string
		
		ph_moneys?:HallProxyMoneys
		
		ph_sex?:number
		/** 
		 * 当前大厅数据是否新增 
		 * 是否需要通知其他管理员新用户加入
		 */
		is_new_add:boolean
		
		cid:number
		
		shared_list?:sm.SharedRole[]
		
		shared_uid:number
		
		vip_name:string
		
		vip_jump:number
		
		vip_info?:string
		
		tip_vip?:{
			
			is_tip:boolean
			
			tip_price:number
			
			out_price:number
			
			out_time:number
			
			is_jump:number
		}
		
		money:number
		
		r_money:number
		
		s_money:number,
		
		nickname:string
		
		real_name?:string
		
		secrecy_pass?:string
		
		is_secrecy?:number
		
		phone:string
		
		avatar:string
		
		pwd:string
		
		sex:number
		
		shoping_car?: sm.ShopingCar
		
		coupons?:sm.CouponUser[]
		
		coupon_count?:number
		
		annual?:sm.kxykAnnualUser[]
		
		is_avatar?:number
		
		a_uid?:number
		

		
		/**
		 * 是否显示订单详情
		 * 用户端默认收缩订单详情
		 */
		is_show_order_detall?:boolean
		
		
		is_unbind_user?:number
		
		room_pay_data?:sm.Com.RoomBookingPayBack
	}
	
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
		
		sid:number
		
		is_guest?:number
		
		id:string | number
		/** 
		 * 到店状态is_come 如果为1
		 * 自动检测数据库用户是否为0，
		 * 然后更新 
		*/
		is_come?:number
		
		is_add?:boolean
		
	}
	
	export interface IndexYInitDbBack
	{
		
		Store?:tb.kxyk_mch_store
		
		Member?:sm.Pd1.HallMember | false
		/** 
		 * 是否登录了分身但没有主号，需要自动跳转到主号 
		 * @param 0 = 不跳转
		 * @param 1 = 跳转
		*/
		is_jump_main?:number
		
		gi?:gi_back
	}

	
	export interface gi_back extends tb.kxyk_user_give_money_and_vip
	{
		
		set_nickname?:string
		
		get_nickname?:string
		
		vip_name?:string
		
		vip_info?:string
	}

	
	export interface IndexYInitDb
	{
		
		sid:number
		
		uid:number
		/** 
		 * 进入类型
		 * 0 = 用户正常进入
		 * 1 = 员工代客下单进入
		 * 2 = 员工游客模式进入
		 */
		type:number
		
		is_come:number
		/** 
		 * 是否扫码从小程序跳转而来
		 * @param 0 不是
		 * @param 1 是
		 */
		pop:number
		
		gi?:string

	}
	
	export interface CheckShoeBoxRes
	{
		/** 
		 * 状态码
		 * 0 = 手牌code未在系统注册
		 * 1 = 手牌code已注册 - 鞋柜未下单
		 * 2 = 手牌code已注册 - 鞋柜已下单   
		*/
		status:number
		
		shoeBox:tb.kxyk_bath_shoebox | false
		
	}
	
	export interface PdStaffMemory{
		
		uid:number
		
		sid:number
		
		skid:string
		
		clerk_id?:number
		
	}
}