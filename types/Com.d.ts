
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

	
	type SelectStockGoodsItem = tb.kxyk_mch_goods & {
		
		sl_id?:number
	}
	
	type PosterCoupon = {
		
		id: number;
		
		name: string;
		
		desc: string;
		
		count: number;
		icon?: string;
	}

	
	type ShareCouponPosterProps = {
		
		backgroundImage?: string;
		
		senderName?: string;
		
		coupons?: PosterCoupon[];
		
		qrcodeText?: string;
		qrcodeTip?: string;
		defaultCouponDesc?: string;
		noteText?: string;
		
		sloganText?: string;
	}
	
	type CouponTraceDialogItem={
		/** 
		 * 数据类型 
		 * @param 0 后台员工发卡
		 * @param 1 后台员工删除卡
		 * @param 2 用户转赠  
		*/
		t:number
		
		dimension_type:'clerk' | 'user'
		
		group_id:number
		
		count:number
		
		coupon_name:string
		
		t0:number
		
		t1:number
		
		clerk_name?:string
		
		r_nickname?:string
		
		g_nickname?:string
		/** 
		 * 转赠领取卡券
		 * @param 2 领取别人的卡
		 * @param 1 转赠给别人
		 */
		coupon_type?:number
	}
	
	type CouponTraceDialogList={
		
		uid?:number
		
		pid?:number
		
		store_name?:string
		
		dimension_type:'clerk' | 'user'
		
		nickname:string
		
		role:string
		
		avatar:string
		
		group_id:number
		
		total_issued:number
		
		total_deleted:number
		
		total_gifted:number
		
		total_received:number
		
		total_available:number
		
		total_used:number
		
		total_expired:number
		
		loaded?:boolean
		
		loading?:boolean
		
		children?:CouponTraceDialogList[]
	}

	
	type MemberCouponItems = 
	{
		
		pid:number
		
		count:number
	}

	
    interface DeleteOptions {
        orderBy?: string; // 排序条件，例如 'id ASC'
        limit?: number;   // 限制数量
    }
	
	interface MemberCouponGiveParams
	{
		
		g_uid:number
		
		r_uid:number
		
		clerk_id?:number
		
		sid:number
		
		cid?:number
		
		items:{
			
			pid:number
			
			count:number
		}[]

	}
	interface MemberCouponBatchGrantMemberInfo
	{
		
		uid?:number
		
		avatar?:string
		
		nickname?:string
		
		name?:string
		
		phone?:string
		
		[x:string]:any
	}
	interface MemberCouponBatchGrantOwnedCouponItem
	{
		
		id:number | string
		
		coupon_id?:number | string
		
		name:string
		
		type?:MemberCouponBatchGrantCouponType
		
		type_name?:string
		
		desc?:string
		
		info?:string
		
		total_count:number
		
		available_count:number
		
		used_count:number
		
		expired_count:number
		
		[x:string]:any
	}
	interface MemberCouponBatchGrantLogItem
	{
		
		id:number | string
		
		coupon_id?:number | string
		
		title:string
		
		coupon_name:string
		
		type?:MemberCouponBatchGrantCouponType
		
		action_name?:string
		
		from_name?:string
		
		count:number
		
		created_at?:string
		
		remark?:string
		
		[x:string]:any
	}
	interface MemberCouponBatchGrantDbs
	{
		
		loading:boolean
		
		giving:{
			
			show:boolean
			
			count:number
			
			total_count:number
			
			delete_count:number
			
			str:string
		}
		
		submitting:boolean
		
		deleting:boolean
		
		active_tab:"grant" | "owned" | "log"
		
		keyword:string
		
		delete_ids:(number | string)[]
		
		member:tb.UP<tb.sm_user>
		
		coupons:sm.CouponPack[]
		
		owned_coupons:sm.CouponPack[]
		
		logs:MemberCouponBatchGrantLogItem[]
		
		fallback_coupons:MemberCouponBatchGrantCouponItem[]
		
		fallback_owned_coupons:MemberCouponBatchGrantOwnedCouponItem[]
		
		fallback_logs:MemberCouponBatchGrantLogItem[]
	}

	
	type RoomBookingPayBack = {
		
		name:string
		
		phone?:string
		
		rooms:number[]
		
		rooms_name:string[]
		
		check_in:string
		
		check_out:string
		
		nights:number
		
		total_amount:number
		
		goods_id:number
	}
	
	type RoomBookingPayDbs =
	{
		
		loading:boolean
		
		rooms:tb.kxyk_mqtt_gateway_lock[]
	}
	
	type coupon_cardholder_field = tb.kxyk_coupon_cardholder &{
		
		display_name:string
	}
	
	type coupon_cardholder_dbs =
	{
		
		list:coupon_cardholder_field[]
		
		keyword:string
		
		pop:{
			open:boolean
			has:tb.UP<tb.kxyk_coupon_cardholder>
			
			loading:boolean
			
			options:{label:string,value:string,phone?:string}[]
		}
	}
	
	type stock_log_api_res  = tb.kxyk_mch_goods_stock_log & Pick<tb.kxyk_mch_store_clerk_type,'n'> & Pick<tb.sm_user,'display_name'> & Pick<tb.kxyk_mch_goods_supplier,'s_name'|'s_nickname'|'s_phone'> & {
		
		stock_unit?:string
		
		clerk_name?:string
		
		clerk_n?:string

	}
	
	type p1_store_goods_dbs = 
	{
		
		stock:{
			
			open:boolean
			
			mode:"add" | "cut" | ''
			
			has:tb.UP<tb.kxyk_mch_goods_stock_log>
			
			goods:tb.kxyk_mch_goods | null
			
			batch_open:boolean
			
			batch_list:sm.Com.SelectStockGoodsItem[]
			
			batch_data:sm.Com.StockBatchWarehousing
			
			is_submitting:boolean
			
			log_open:boolean
			
			api:sm.rList<stock_log_api_res>
			
			sub_stock_list:tb.kxyk_mch_store_sub[]
			
			sub_stock:tb.kxyk_mch_goods_stock_level2 | false
			
			sub_stock_open:boolean
		}
		
		supplier:{
			
			has:tb.UP<tb.kxyk_mch_goods_supplier>
			
			open:boolean
			
			is_submitting:boolean
			
			list:tb.kxyk_mch_goods_supplier[]
		}
		
		gt:number
		
		sub_list:tb.kxyk_mch_store_sub[]
		
		goods_count:number
		
		goods_list:tb.kxyk_mch_goods[]
		
		goods_list_stock:tb.kxyk_mch_goods[]

		
		goods_type:tb.kxyk_mch_goods_type[]
		
		goods:tb.kxyk_mch_goods[]
		
		edit_goods:{
			
			open:boolean
			
			goods:tb.UP<tb.kxyk_mch_goods>
		}
		
		pop:{
			
			open:boolean
			has:tb.UP<tb.kxyk_mch_store_sub>
			
			goods_open:boolean
		}
		
		innerWidth:number
		
		has_sub_id:number
		
		keyword:string
		/** 
		 * 移动端当前选择的tab
		 * @param 0 = 商品板块
		 * @param 1 = 库存板块
		 * @param 2 = 供货商板块
		 */
		tab:number
	}
	
	type p1_staff_task = {
		
		list:tb.kxyk_p1_staff_task[]
		
		collapsed:boolean
		
		is_submit:boolean
		
		is_ku_guan:boolean
	}
	
	type AddGoodsDbs = {
		
		is_submit:boolean
		
		goods:tb.UP<tb.kxyk_mch_goods>
		
		new_suk_name:string
		
		sid:number
		
		sub_list:tb.kxyk_mch_store_sub[]
		
		pay_list:tb.kxyk_mch_store_sub[]
		
		vip_list:tb.kxyk_mch_type_vips[]
		
		lock_list:tb.kxyk_mqtt_gateway_lock[]
	}
	
	type SystemGatewayDevice = {
		
		id:string
		
		code:string
		
		name:string
		
		online:boolean
	}
	
	type GatewayLock = {
		
		id:number
		
		name:string
		
		enabled:boolean
		
		hasGuest:boolean
		
		online:boolean
		
		battery:number
		
		lastActive:string
	}

	
	type GatewayItem =  Omit<tb.kxyk_mqtt_gateway, 'id'> & tb.kxyk_mqtt_gateway_store & {
		
		fold:boolean
		
		deviceId:string
		
		locks:(tb.kxyk_mqtt_gateway_lock & {
			
			auths:(tb.kxyk_mqtt_gateway_lock_auth & {
				
				clerk_name?:string
			})[]
			
			showAuths?:boolean
		})[]
	}

	
	type GatewayForm = {
		
		name:string
		
		deviceId:string
	}


	
	type GatewayDbs = {
		
		gatewaySearch:string
		
		gatewayIdSeed:number
		
		lockIdSeed:number
		
		gatewayDialogVisible:boolean
		
		gatewayDeviceLoading:boolean
		
		addGatewaySubmitting:boolean
		
		systemGatewayDevices:tb.kxyk_mqtt_gateway[]
		
		Cards:{
			
			id:number
			
			number:string
			
			code:string
		}[]
		
		gatewayForm:GatewayForm
		
		sid:number
		
		gatewayList:GatewayItem[]
		
		loading:boolean
		
		addLockButtonDisabled:boolean
		
		addLockCountdown:number
		
		timer:NodeJS.Timer | null
		
		locks:{
			
			hasLock:tb.kxyk_mqtt_gateway_lock | false
			
			open:boolean
			
			addAuthOpen:boolean
			
			addAuth:GW_addLockAuth
		}
		
		house:{
			
			addHouseOpen:boolean
			
			hasRoom:tb.kxyk_mch_goods | undefined
		}
		
		rooms_goods_list:RoomGoods[]

	}
	
	type RoomGoods = tb.kxyk_mch_goods & {
		
		rooms_list?:tb.kxyk_mqtt_gateway_lock[]
		
		count?:number
		
		free?:number
		
		occupy?:number
		
		clean?:number
		
		repair?:number
		
		sub_name?:string
	}
	
	type GW_addLockAuth = {
		/** 
		 * 添加授权类型
		 * @count Card 添加手牌或卡
		 * @count Password 添加密码
		 * @count Finger 添加指纹
		 * @count Face 添加人脸
		 */
		authType:"Card" | "Password" | 'Finger' | "Face"
		
		authValue:number | null | string
		
		lid:number
		
		clerk_id?:number
		
		au_id?:number
	}
	
	type PopBoxPageDb = {
		
		show:boolean
	}

	
	type GivingBackCounts = 
	{
		
		count:number	
	}

	
	type StoreChatMsg = tb.kxyk_store_chat & {
		
		n:string
		
		nickname:string
		
		avatar?:string
		
		isLocked?:boolean

	}

	
	type MchTopTitlePageDb = {
		
		SearchShoeBox:XyNewSearchShoeBoxProps
	}

	
	type CashierSubmit = Omit<CashierDbs,"coupons"> & {
		/** 
		 * 调用组件类型 
		 * @param 1 = 购物车立即支付需要先下单
		 * @param 2 = 订单里结算调用
		*/
		type:number
		
		hid:number
		
		clerk_id?:number
		
		clerk_uid?:number
		
		os?: 'wx' | 'wxapp' | 'app' | 'h5'
		
		sid?:number
	}

	
	type CashierLeaveShoeBox = {
		
		sb_code:string
		
		sex:number
		
		oid:number
		
		list:sm.Pd1.CashierOrder[]
		
		must_full_discount:MustFullDiscount[]
	}
	
	type MustFullDiscount = {
		
		oid:number
		/** 
		 * 商品或者服务ID 
		 * @abstract 商品第一位g 服务第一位i
		 */
		gi_id:string
		
		full_price:number

	}

	
	type CashierDbs={
		
		is_render_ui:boolean
		/** 
		 * 当前可用卡券列表 - 即时计算
		 * @protected 卡券为移动端可选择样式 
		*/
		coupons:MultiCouponSelectorCoupon[]
		
		order:sm.Pd1.CashierOrder[]
		
		leave_order:CashierLeaveShoeBox[]
		
		total:number
		
		discount:number
		/**
		 * 支付方式
		 * @param 0 没有选择
		 * @param 1 微信支付 - 用户在线支付
		 * @param 2 余额支付 - 用户和店员都可以选择
		 * @param 3 信值支付 - 用户和店员都可以选择
		 * @param 4 现金支付 - 用户可以选择
		 * @param 5 现金收款 - 店员可以选择
		 * @param 6 老会员卡 - 店员可以选择
		 * @param 7 线下微信 - 店员可以选择
		 */
		ptype:number

		
		is_submit:boolean
		
		money:number
		
		s_money:number
		/** 
		 * 当前共享身份宿主UID 
		 * @param 0 自己的身份
		 */
		shared_uid:number
		
		shared_name:string
		
		vip:number
		
		is_guest:boolean
		
		
		is_must_buy_auto_order?:number
		
		must_buy_ids?:string[]
		
		must_buy_list?:sm.Pd1.ShopMustBuy[]
		
		is_formatting?:boolean
	
	}
	
	type MultiCouponSelectorCoupon = 
	{
		
		id: number | string
		
		name: string
		
		value: number
		
		condition: string
		
		startAt:number
		
		description: string
		
		endAt:number
		
		unitDesc?:string
		
		valueDesc?:string
		/** 
		 * 优惠券类型
		 * @param low 低值券
		 * @param exchange 兑换券
		 */
		type: 'low' | 'exchange'
		
		max_select?: number
		
		is_select?:number
	
		
		
		
		is_exchange?:number
		
		exchange_right?:string[]

		
		is_low?:number
		
		low_right?:string[]
		
		full_low_price?:number
		
		is_low_multiplex?:number
		
		is_low_count?:number
		
		pid?:number
	}
	
	type ReserveStaffDbs = {
		
		has_item_order_id:number
		
		has_item_order:tb.kxyk_mch_store_order_detall | false
		
		has_item?:sm.item
	}
	
	type showPopBut = {
		
		text:string
		
		action?:()=>void
	}
	type showPopOption = {
		
		title:string
		
		message:string
		
		buttons:showPopBut[]
	}

	
	type PcHallMemberPageDb = {
		
		searchUser:sm.SearchUser
		
		cashier:{
			
			show:boolean
			
			type: 1 | 2 | 3
		}
	}
	
	type IdentifyBrandDbs={
		
		is_camera:boolean
		
		vw:number
		
		vh:number
		
		tw:number
		
		th:number
		
		tt:number
		
		caseStream:any
		
		stream:any
		
		showText:string
		/** 
		 * 扫描识别状态
		 * @param 0 未扫描
		 * @param 1 扫描中
		 * @param 2 扫描未命中
		 * @param 3 扫描已名称 完成 
		*/
		type:0 | 1 | 2 | 3
		
		count:number
		/** 
		 * 识别模式
		 * @param 0 = 远程识别
		 * @param 1 = 本地识别
		 */
		Itype: 0 | 1
		
		is_remote:boolean
	}
	
	
	type MakeLogMsgInfo = {
		/** 
		 * 日志业务 
		*/
		t: '开始服务' | '结束服务' | '商品送达'|'现金收款' | '会员设置' | '充值信值' | '充值余额' | '转为店购' | '解绑手牌' | '解绑用户' | '鞋柜手牌'
		
		cid?:number
		
		sid?:number
		
		uid?:number
		
		clerk_id?:number
		
		odid?:number
		
		oid?:number
		/** 
		 * 金额
		 * @param 现金支付时的支付金额
		 * @param 充值余额和信值时的金额 
		 */
		price?:number
		/** 
		 * 现金收款时的预支付ID
		 * @protected 关联 kxyk_bath_hall_prior_pay表
		 */
		pid?:number
		
		vip?:number
		/**
		 * 充值余额时的充值类型
		 * @param 1 = 管理充值
		 * @param 2 = 用户在线充值
		 */
		type?:1 | 2
		
		hid?:number
	}
	
	type SystemLogsParams = Omit<tb.kxyk_system_logs,"id"|'t1'>
	
	type P1QrCodeParams = {
		
		Nv:string
		
		db:string
		/** 
		 * 访问接口溯源 
		 * @param qr  = 扫码进入此接口
		 * @param url = 通过url访问进入接口
		 */
		dev:string
		
		ev:string
		/** 
		 * 二维码类型
		 * @param 1 = 用户赠送卡券
		 * @param 2 = 用户申请成为门店员工
		 * @param 3 = E1合伙人售卡时 购卡用户扫码
		 * @param 4 = 用户二维码共享自己数据
		 * @param 5 = 用户展示二维码核销卡券
		 */
		type:number
		
		u:number
	}
	type ResBase = {
		/** 
		 * 状态码 
		 * @param 1 = 成功
		 * @param 0 = 失败
		*/
		status: 0 | 1
		/** 
		 * 是否有错误
		 * @param 0 = 没有错误
		 * @param 1 = 有错误
		 */
		__error__?:number
		
		msg?:string
		
		list?:any
		
		count?:number
	}
	type staff_sign_api_res_list_json = tb.kxyk_mch_store_clerk_sign & {
		
		odd:number
		
		odd2:number
		
		normal:number
		
		rest:number
		
		leaven:number
		
		absent:number
		
		day:number
		
		week:string
		
		dday:string
		
		is_detall?:boolean
	}
	type staff_sign_res_list = {
		
		clerk_id:number
		
		uid:number
		
		clerk_name:string
		
		clerk_n:string
		
		odd:number
		
		odd2:number
		
		normal:number
		
		rest:number
		
		leaven:number
		
		absent:number
		
		str_t:string
		
		days_json:staff_sign_api_res_list_json[]
	}
	type staff_sign_api_res = Omit<ResBase, 'list'> & {
		
		st2_list: finance_st2_list[]
		
		list:staff_sign_res_list[]
	}
	type system_finance_res = ResBase & {
		
		tops:system_finance_tops
		
		st2_list: finance_st2_list[]
		
		st2_type_list: {id:number,n:string}[]
		
		sales:{
			
			target_id:number
			
			nid:string
			
			item_name:string
			
			total_sold:number
		}[]
	}
	
	
	type finance_st2_list = {
		
		clerk_id:number
		
		clerk_name:string
		
		clerk_n:string
		
		clerk_type:number
		
		s_money?:number
	}
	
	type system_finance_res_map = {
		1:system_finance_list//充值信值数据
		2:system_finance_res_top2 //信值消费数据
	}
	
	type system_finance_dbs = {
		
		api:sm.rList<system_finance_list,{sDate:system_finance_args,pip:system_logs_props}>,
		
		ww:number
		
		tops:system_finance_tops
		/** 
		 * 二级分类st2 
		 * @property 信值余额时 可选员工列表 员工发放信值和余额
		 * @property 卡券时的门店或股东列表 
		 */
		st2_list: finance_st2_list[]
		
		st3?:{id:number,n:string
			
			total_count?:number
			
			total_value?:number
		}[]
		/** 
		 * 
		 */
		HasFinance:{
			
			open:boolean
			
			item?:system_finance_list
			/** 
			 * 当前正在编辑的数据
			 */
			add_edit?:tb.UP<tb.kxyk_mch_store_finance>
		}
		
		sales:{
			
			target_id:number
			
			nid:string
			
			item_name:string
			
			total_sold:number
			
			total_value?:number
		}[]
	}
	type system_finance_tops = {
		
		t1:number,
		
		t1_:number
		
		t2:number
		
		t2_:number
		
		t3:number
		
		t3_:number
		
		t4:number
		
		t4_:number
		
		t5:number
		
		t5_:number
		
		t6:number
		
		t6_:number
		
		t7:number
		
		t7_:number
		
		t8:number
		
		t8_:number
		
		t9:number
		
		t9_:number
		
		t10:number
		
		t10_:number
		
		t11:number
		
		t11_:number
		
		t12:number
		
		t12_:number
		
		t13:number
		
		t13_:number
	}

	
	type system_finance_args = sDateBase & {
		/** 
		 * 板块类型
		 * @param 1 = 信值
		 * @param 2 = 余额
		 * @param 3 = 卡券 
		 * @param 4 = 子商户
		 * @param 5 = 员工
		 */
		st:number
		/** 
		 * 顶部统计导航类型
		 * @param 1 = 信值充值金额
		 * @param 2 = 信值消费金额
		 * @param 3 = 当前门店剩余信值
		 * @param 4 = 余额充值金额
		 * @param 5 = 余额消费金额 
		 * @param 6 = 平台剩余余额 
		 * @param 7 = 卡券发放总额
		 * @param 8 = 卡券使用总和
		 * @param 9 = 卡券剩余总和
		 * @param 10 = 子商户待结算总额
		 * @param 11 = 子商户已结算总额
		 * @param 12 = 员工待结算总额
		 * @param 13 = 员工已结算总额
		 */
		top:number
		/** 
		 * 二级条件分类- 多选数组
		 * @protected -1 为全部 只要又就命中全部
		 * @property st1 未充值信值的员工clerk_id
		 * @property st2 未充值余额的员工clerk_id 或者 微信用户充值为0
		 */
		st2:number[]
		
		st3:number[]
		
		show_jiu?:number
		
		is_jiu?:number
		
		maxAllowedDate?:string
	}

	// P1财务组建返回数据类型
	type system_finance_list = tb.kxyk_mch_store_credit_log & {
		
		vip_name?:string
		
		n:string
		
		clerk_name:string
		/** 
		 * 用户名称
		 * @property 充值信值的用户
		 * @property 消费信值的用户  
		 */
		user_name:string
		/** 
		 * 用户头像 
		 * @property 充值信值的用户头像
		 * @property 消费信值的用户头像
		*/
		user_avatar:string
		/** 
		 * 用户手机号码 
		 * @property 充值信值的用户手机号码
		 * @property 消费信值的用户手机号码
		*/
		user_phone:string
		/** 
		 * 用户UID
		 * @property 充值信值的用户UID
		 * @property 消费信值的用户UID 
		*/
		user_uid:number

		

		
		discount?:number
		
		yue_s_pay?:number
		
		pay_price?:number
		
		yue_pay?:number
		
		cash_pay?:number
		
		wx_pay?:number
		
		is_transfer?:number
		
		transfer_uid?:number
		
		transfer_name?:string
		
		transfer_avatar?:string
		
		item_name?:string
		
		sub_name?:string
		
		sub_name2?:string

		// top = 3 剩余信值字段

		
		t1_?:number
		
		t1?:number
		
		t2_?:number
		
		t2?:number
		
		money?:number


		// st = 4 子商户相关字段
		
		sub_id?:number
		
		pay_name?:string
		
		str_t?:string
		
		total_amount?:number

		
		days?:store_finance_ui[]

		[key:string]:any
	};

	
	type store_finance_ui = tb.kxyk_mch_store_finance & {
		
		is_detall?:boolean
		
		sb_code?:string
	}
	
	type system_staff_clerk_dbs = 
	{
		
		list:sm.Pd1.P1StoreStaff[],
		
		type:number
		
		listType:tb.kxyk_mch_store_clerk_type[]

	}

	type report_bt1_kp = {
		
		title:string
		
		kpsl_s:string
		
		kpsl_c:number
		
		ny_s:string
		
		ny_c:number
		
		vy_s:string
		
		vy_c:number
		
		wm_s:string
		
		wm_c:number
		
		gpsl_s:string
		
		gpsl_c:number
		
		gpny_s:string
		
		gpny_c:number
		
		gpvy_s:string
		
		gpvy_c:number
		
		gpwm_s:string
		
		gpwm_c:number	
		
		hyrs_s:string
		
		hyrs_c:number
		
		nhy_s:string
		
		nhy_c:number
		
		vhy_s:string
		
		vhy_c:number
		
		yk_s:string
		
		yk_c:number
		
		rjxf_s:string
		
		rjxf_c:number
		
		zdxf_s:string
		
		zdxf_c:number
		
		zsxf_s:string
		
		zsxf_c:number

	}
	type report_bt1_js = {
		
		title:string
		
		xj_s:string
		
		xj_c:number
		
		xj_list:{
			
			clerk_id:number
			
			nickname:string
			
			amount:number
		}[]
		
		other:{
			
			pname:string
			
			other_price:number
			
			other_count:number
			
			other_id:number
		}[]
		
		xxwx_s:string
		
		xxwx_c:number
		
		lhy_s:string
		
		lhy_c:number
		
		wx_s:string
		
		wx_c:number
		
		xz_s:string
		
		xz_c:number
		
		ye_s:string
		
		ye_c:number
		
		dy_s:string
		
		dy_c:number
		
		mt_s:string
		
		mt_c:number
		
		xzcz_s:string
		
		xzcz_c:number
		
		yecz_s:string
		
		yecz_c:number
		
		jshj_s:string
		
		jshj_c:number
		
		jjhj_s:string
		
		jjhj_c:number
	}
	
	type report_bt1_gt = {
		
		title:string
		
		th:string[]
		
		th_list:{
			
			t1:number
			
			t2:number
			
			t22:number
			
			t3:number
			
			t4:number
			
			t5:number
			
			t6:number
			
			t7:number
			
			t8:number
			
			t9:number
			
			tname:string
		}[]
	}
	
	type report_bt1_bm = {
		
		title:string
		
		th:string[]
		
		th_list:{
			
			t1:number
			
			t2:number
			
			t22:number
			
			t3:number
			
			t4:number
			
			t5:number
			
			t6:number
			
			t7:number
			
			t8:number
			
			t9:number
			
			tname:string
		}[]
	}
	
	type report_bt1_cz = {
		
		t1:number
		
		t1c:number
		
		t1vip:number
		
		t1_s:number
		
		t1_u:number
		
		t2:number
		
		t2c:number
		
		t2vip:number
		
		t2_s:number
		
		t2_u:number
	}
	
	type system_report_res = {
		
		top:{
			
			s1:string
			
			s2:string
		}
		
		bt1:{
			
			kp: report_bt1_kp;
			
			js: report_bt1_js
			
			gt: report_bt1_gt
			
			bm: report_bt1_bm
			
			cz: report_bt1_cz
		}
		
		gt_list:{
			
			id:number
			
			tname:string
		}[]
		
		bm_list:{
			
			id:number
			
			tname:string
		}[]
	}
	
	type system_report_sdate =  sm.Com.sDate &
	{
		/** 
		 * 报表类型
		 * @param 1 = 统计报表
		 * @param 2 = 销量报表
		 */
		bt:number
		/** 
		 * 统计报表可多选ID列表
		 * @param 0 = 全部
		 * @param 1 = 开牌数据统计 开牌人数 男女 会员等
		 * @param 2 = 结算方式统计 现金 微信等 
		 * @param 3 = 分类销售统计 各楼层营业额 优惠 实际收入 比重
		 * @param 4 = 员工分类销售统计 各员工部门分类统计
		 * @param 5 = 信值充值统计
		 */
		btt:number[]
		/** 
		 * 商品分类统计时绑定的分类ID 
		 * @param 0 = 全部 - 其他可多选分类ID 
		*/
		gt:number[]
		/** 
		 * 部门分类统计时绑定的员工分类ID 
		 * @param 0 = 全部 - 其他可多选分类ID
		*/
		bm:number[]
		// /**
		//  * 当前选定的右边窗口数据详情ID 
		//  * @abstract ID 关联 bt 单选 必选 如果为0不显示右边窗口
		//  */	
		// did:number	
		
		clerk_id:number
		
		sid:number
	}
	
	type system_report_dbs = {
		
		sDate:system_report_sdate
		
		res?:system_report_res
		
		is_loading:boolean
		
		is_loading_right:boolean
		/** 当前选定的详情ID
		 * @param 1 = 关牌数据列表 降序
		 * @param 2 = 结算方式数据列表 暂时不可查 
		 * @param 3 = 分类销售统计 数据列表
		 * @param 4 = 员工分类销售数据列表 降序
		 * @param 5 = 信值充值数据列表 降序
		 */
		did:number
		
		api:sm.rList<sm.Com.report_detall_list>
		
		TL:string[]
		
		count:number
	}

	
	type report_t1 = {
		
		type : 1
		
		sb_code : string
		
		sex:string
		
		vip_name:string
		
		s1:number
		
		s2:number
		
		order_price:number
		
		discount:number
		
		pay_price:number
		
		cash_pay:number
		
		wx_pay:number
		
		yue_pay:number
		
		yue_s_pay:number
		
		old_card_pay:number
		
		offline_wx_pay:number
		
		settle_type?:string
	}
	
	type report_t2 = {
		
		type : 2
		
		sb_code : string
		
		item_name:string
		
		t1:string
		
		t2:string
		
		order_price:number
		
		discount:number
		
		pay_price:number
		
		cash_pay:number
		
		wx_pay:number
		
		yue_pay:number
		
		yue_s_pay:number
		
		order_pay?:string
	}
	
	type report_t5 = {
		
		type : 5
		
		type1:string
		
		uname?:string
		
		phone:string
		
		price:number
		
		vip_name:string
		
		t0:string
		
		sname:string
	}
	
	type report_t3 = {
		
		type : 3 | 4
		
		item_name?:string
		
		order_price:string
		
		discount:number
		
		pay_price:string
		
		cash_pay:string
		
		wx_pay:string
		
		yue_pay:string
		
		yue_s_pay:string
		
		old_card_pay:string
		
		offline_wx_pay:string
		
		list:report_t3[]
	}

	
	type report_detall_list = report_t1 | report_t2 | report_t5 | report_t3
	
	type report_detall_res=
	{
		
		status:number
		
		count:number
		
		list:report_detall_list[]
		
		TL:{label: string, value: string}[]
		
		title:string
		
		filename:string
	}
	
	type system_cardholder_log = {
		
		api:sm.rList<sm.U.Page.MemberCouponCardholderLog>,
	}
	
	type system_logs_dbs = {
		
		api:sm.rList<system_logs_list>,
	}
	
	type p1_store_goods = {
		/** 
		 * 当前选择的分类ID
		 * @param 0 = 全部
		 */
		has_sub_id:number
		
		g_keyword:string
		
		sub_list:tb.kxyk_mch_store_sub[],
		
		is_show_add:boolean
		
		has_goods:tb.kxyk_mch_goods
	}
	
	type system_sign_dbs ={
		
		w:number
		
		api:sm.rList<sm.Com.staff_sign_res_list>
		
		timer:any
		
		time:string
		
		time_play:boolean
		
		time_show:boolean
		
		is_submit:boolean
		
		remark:{
			
			show:boolean
			
			has:staff_sign_api_res_list_json | false
			
			msg:string
		}
		
		status_info:{
			
			text:string
			
			class:string
			
			is_possible?:boolean
		}
		
		st2_list:sm.Com.finance_st2_list[]
		
		showDay:boolean
		
		apply:{
			
			show:boolean
			
			has:tb.UP<tb.kxyk_mch_store_clerk_sign>
		}
		
		is_show_dawer:boolean
		
		has_staff:sm.Com.staff_sign_res_list | false
		
		leave_time:string
	}
	
	type system_sign_props = {
		
		is_all:boolean
		
		clerk_id:number
		
		sid:number
		
		staff:sm.Pd1.LoginStaff | false
		
		pdbs:sm.U.Page.Pd1 | false
		
		is_pc?:boolean
	}
	
	type system_past_data = {
		
		cid:number
		
		sid:number
		
		uid:number
		
		user?:sm.Pd1.XYUser
	}
	
	type system_logs_props = {
		
		role:"C1" | "P1" | "D1"
		
		id:number
		
		is_pc?:boolean
	}
	type system_logs_list = tb.kxyk_system_logs & sm.sm_user_base;
	
	interface xy_message_info
	{
		
		msg:string
		/** 
		 * 消息携带图片
		 */
		imgs?:string | string[]
		
		nickname?:string
		
		avatar?:string
		/** 
		 * 本条是否已阅读
		 * @param 0 未读 
		 * @param 1 已读
		 */
		is_read:number
		/** 
		 * 本条 管理员是否已读
		 * @param 0 未读
		 * @param 1 已读
		 */
		d1_read:number
		/** 
		 * 首先阅读本条的员工ID
		 */
		d1_read_clerk_id:number
		/** 
		 * 员工姓名 
		 * @protected 首先拿私聊员工名称->发送消息员工姓名->门店名称
		 */
		name?:string
		/** 
		 * 员工头像
		 * @protected 首先私聊->发送员工->门店图片 
		 */
		img?:string
		
		n?:string
		/** 
		 * 接受消息用户UID
		 * @param 员工发送的消息 这里是接受消息的用户UID
		 * @param 用户自己发送的消息 这里为0 
		 */
		uid?:number
		/** 
		 * 接受消息的员工id
		 * @param 员工发送私聊消息是 这里是自己的id
		 * @param 员工发送公共消息时 这里是0
		 * @param 用户对员工发送私聊信息是这里是员工ID
		 */
		clerk_id?:number
		/** 
		 * 发送消息的用户UID
		 */
		s_uid?:number
		/** 
		 * 消息类型
		 * @param 1 投诉时系统发送的等待回馈消息
		 * @param 2 用户给门店发消息
		 * @param 3 门店给用户发消息
		 * @param 4 商圈回复给用户和门店
		 * @param 5 用户预约时给门店员工的私聊 后续可能改成2 
		 */
		type:number
	}
	
	interface send_message_xy
	{
		/** 
		 * 发送消息的角色
		 * @param U 用户发送
		 * @param P 员工发送
		 */
		role:"U"|"P"
		/** 
		 * 发送消息的用户ID
		 * @param 用户发送时为UID
		 * @param 店员发送是为员工 clerk_id
		 */
		uid:number
		
		sid:number
		/** 
		 * 接受消息的ID
		 * @param 发送人为用户时 这里是0门店接受或者 clerk_id 店员私聊接受
		 * @param 发送人为员工时 这里是接受消息的用户UID
		 */
		accept_id:number
		
		msg:string
		
		imgs:string[]
		
		is_sub:boolean
		
		loading:boolean
		/** 
		 * 是否私聊
		 * 
		 */
		is_private:boolean

	}
	
	interface message_xy
	{
		/**
		 *  调用组件的身份 
		 * @property U 用户
		 * @property P 管理员
		*/
		role:"U"|"P"
		
		UnreadCount:number
		
		clerk_id?:number
		
		sid:number
		
		uid:number
		
		open:boolean
		/**
		 * 当前选定的私聊目标
		 * @protected 为0时 未选择私聊目标 显示好友列表 
		 */
		has_uid:number
		
		is_msg_2:boolean
		
		is_set_vip_1:boolean

	}

	
	interface xy_order_detall_queue_list extends tb.kxyk_mch_store_queue_config_xy
	{
		
		staff?:{
			
			id:number
			
			uid:number
			
			name:string
			
			avatar:string
			
			value:number
			
			label:string
		}[]
		
		orders:{
			
			id:number
			
			uid:number
			
			item_name:string
			
			sb_code:string
			
			sex?:number
			
			status:number
			
			t0:number
			
			t1:number
			
			goods_name:string
			
			is_jump:number
			
			clerk_id:number
			
			is_notify?:number
			
			is_guest?:number
			
			cx_openid?:string
		}[]
	}

	
	interface action_room_back{
		
		odid:number
		
		rid:number[]
		
		locks:{
			
			lid:number
			
			gname:string
			
			lock_sb_id:number
			
			lock_sb_code:string
			
			lock_pwd:string
		}[]
	}
	
	interface action_room_dbs{
		
		loading:boolean
		
		loading_room:boolean
		
		rooms:tb.kxyk_mqtt_gateway_lock[]
		
		back:action_room_back
		
		sb_lists:tb.kxyk_bath_shoebox[]

	}
	
	interface order_xy_detall{
		
		is_open:boolean
		
		is_loading:boolean
		
		od:tb.kxyk_mch_store_order_detall | false
		
		list:xy_order_detall_queue_list[]
		
		clerks:sm.Pd1.LoginStaff[]
		
		clerk:sm.Pd1.LoginStaff | false
		
		room:{
			
			show:boolean
			
			order:tb.kxyk_mch_store_order_detall | false
		}
		
		is_show_qr:boolean
		
		manual:{
			
			show:boolean
			
			od:tb.kxyk_mch_store_order_detall | false
			
			price:number,
			
			manaul_info?:string
			
			is_submit?:boolean
		}
	}
	
	interface user_kxyk_consumption{
		
		order_count:number
		
		avg_price:number
		
		all_price:number
		
		first_order_time:string
		
		finally_order_time:string
		
		first_store:string
		
		finally_store:string
		
		is_detall?:boolean
		
		list:user_store_consumption[]
	}
	
	interface user_store_consumption{
		
		store_name:string
		
		sid:number
		
		order_count:number
		
		avg_price:number
		
		all_price:number
		
		first_order_time:string
		
		finally_order_time:string
		
		min_price:number
		
		max_price:number
	}
	
	interface user_recharge_record
	{
		
		recharge_count:number
		
		total_amount:number
		
		avg_amount:number
		
		first_time:string
		
		first_amount:number
		
		last_time:string
		
		last_amount:number
		
		min_price:number
		
		max_price:number
		
		is_detall?:boolean
		
		details:{
			
			sid:number
			
			img:string
			
			store_name:string
			
			recharge_total_amount:number
			
			recharge_count:number
			
			avg_amount:number
			
			first_time:string
			
			last_time:string
			
			first_amount:number
			
			last_amount:number
			
			min_price:number
			
			max_price:number
		}[]

	}
	
	interface sm_user_detall extends tb.sm_user
	{
		
		StoreConsumption:user_kxyk_consumption
		
		RechargeRecord:user_recharge_record | false
		
		vips:sm.U.StoreUserVipSmoney
		
		SalesOrderDetall:{
			
			list1:user_store_order_detall_count[]
			
			list2:user_store_order_detall_count[]
		}
	}
	
	interface user_store_order_detall_count
	{
		
		item_name:string
		
		order_price:number
		
		order_count:number
		
		min_t1:string
		
		max_t1:string
		
		is_detall?:boolean
	}
	
	interface ShowUserInfoDbs{
		
		loading:boolean
		
		user:sm_user_detall | false
		
	}
	
	interface AddAndEditSecondaryMerchants{
		
		has:sm.WX.SecondLevelMerchantSubmission 
		
		ww:string
		
		hh:string
		
		banks1:sm.WX.BanksList[]
		
		banks2:sm.WX.BanksList[]
		
		has_level0:string
		
		has_level1:string
		
		has_bank_branch:string
		
		has_bank_branchs:{
			
			bank_branch_name:string
			
			bank_branch_id:string
		}[]
		
		level0:{
			
			province_name:string
			
			province_code:string
		}[],
		level1:{
			
			city_name:string
			
			city_code:string
		}[]
	}
	
	interface XyMember
	{
		
		searchShoeBox:sm.Com.SearchShoeBox
		
		comment:sm.D.CommentOrder
		
		is_load_shopping_cart:boolean
		
		searchUser:sm.SearchUser
		
		Identify:{
			
			open:boolean
		}
		
		cashier:{
			
			show:boolean
			/** 调用组件类型 
			 * @count 1 = 购物车立即支付 
			 * @count 2 = 所有订单中没有结算的订单
			 * @count 3 = 从订房组件传来的结算 
			 * 
			*/
			type:number
		}
		
		is_show_bind_user:boolean
		
		is_show_leave_store:boolean
	}


	
	interface PopUp
	{

	}
	
	interface MemberGoodsShoppingCartDBs
	{
		
		is_show_good_img?:boolean
		
		desc:{
			
			is_show_desc:boolean
			g:sm.good | false
		}
		
		// goods:sm.store_goods[]
		
		activeCategoryIndex:number
		
		categoryHeights:number[]
		
		BottonScrollEnd:boolean
		
		leftWidth:number
		
		goods:sm.store_goods[]
		
		Member:sm.Pd1.HallMember | false
		
		is_show_proxy:boolean
		
		is_pay_me:boolean
		
		is_loading_page:boolean
		
		is_loading_end:boolean
		
		goods_search?:string
		
		is_submit_order:boolean
		
		CollectIDCard:CollectIDCardProp
		
		RoomPay:{
			
			show:boolean
			
			good:sm.good | false
		}
	}
	
	type CollectIDCardBack = {
		
		name?:string
		
		phone?:string
		
		idcard?:string

	}
	
	type CollectIDCardProp = {
		
		show:boolean
		
		
		good:sm.good | false
	}
	
	type StoreConfig = {
		
		 show:boolean
		
		sid:number
	}
	
	type StoreConfigDbs = 
	{
		
		Store:sm.Pd1.P1StoreCache | null
		
		VipGiftRules:tb.kxyk_mch_store_vip_gift_rules[]
		
		coupons:sm.CouponPack[]
		
		must_buy_ids:string[]
		
		AllMustBuyList:sm.Pd1.ShopMustBuy[]
		
		HasMustBuyList:sm.Pd1.ShopMustBuy[]
		
		NoVipPrice:string
		
		printer:{
			
			open:boolean
			
			list:tb.kxyk_store_printer[]
			
			has:tb.UP<tb.kxyk_store_printer>
		}
		
		printer1:{
			cou
			open:boolean
			
			list:tb.kxyk_other_payment[]
			
			has:tb.UP<tb.kxyk_other_payment>
		}
		
		queue_list:tb.kxyk_mch_store_queue_config_xy[]
		
		
		goods_spen_list:{
			
			label:string
			
			value:number
			
			name:string
		}[]
	}
	
	type XyNewSearchShoeBoxProps = {
		
		show:boolean
		
		sid:number
	}
	
	type XyNewSearchShoeBoxDBs = {
		
		hall:sm.Pd1.HallMember | false
		
		Identify:{
			
			open:boolean
		}
		
		is_searching:boolean
		
		is_show_keyboard:boolean
	}
	
	type SearchShoeBox = {
		
		open:boolean
		
		sid:number
		/** 
		 * 调用组件的类型
		 * @param 1 = 大厅游客搜索未开牌的手牌
		 * @param 2 = 用户搜索已开牌且是游客可以合并的手牌
		 * @param 3 = 用户搜索代理支付 手牌 必须是已经绑定用户的手牌
		 */
		type?:number
	}
	
	interface StoreMemberXyTop
	{
		
		give:{
			
			open:boolean
			
			has:tb.UP<tb.kxyk_user_give_money_and_vip>
		}
		
		reg:EditReg
		
		credit_log:tb.kxyk_mch_store_credit_log
		
		vips:tb.kxyk_mch_type_vips[]
	}
	
	interface EditReg{
		
		open:boolean
	}
	
	interface AddSubStoreDbs
	{
		
		sid:number
		
		name:string
		
		is_add:boolean
		
		sub_store:tb.kxyk_mch_store_sub
		
		list:tb.kxyk_mch_store_sub[]
	}
	
	interface AddSubStore{
		
		open:boolean,
		
		sid:number
		
		name:string
	}
	
	interface Modal2P{
		
		open:boolean
	}
	
	interface PromotionAgreement {
		
		open:boolean
		
		agree:boolean
		
		show_xy:boolean
		
		user:{
			
			nickname:string
			
			phone:string
			
			uid:number
		}
	}
	
	type SelectGoodsAdmin=
	{
		
		open:boolean
		
		store_id:number
		
		cid:number
		
		type_id:number
		
		is_xy?:number
	}
	
	type SearchUserDb = 
	{
		
		avatar:string
		
		nickname:string
		
		phone:string
		
		uid:number
		
		money:number
		
		car_number?:tb.kxyk_mch_type[]
	}
	
	interface TuanGouPage
	{
		
		is_open:boolean
		
		has_tuangou:tb.kxyk_store_tuangou
		
		tuangou_list:tb.kxyk_store_tuangou[]
		
		tuangou_type_list:tb.kxyk_store_tuangou_type[]
		
		type_name:string
		
		qtgz_name:string
		
		coupon_list?:tb.kxyk_mch_store_is_grant_coupon[]
		
		has_tuangou_type:number
		
	}
	
	interface C1D1Counts{
		
		role:"C1"|"D1"
		
		ID:number
	}
	
	interface FinanceA1A2Res{
		/**
		 *  数据返回状态码
		 * 	@param 1 成功
		 *  @param 0 失败
		 */
		status:number
		
		count:number
		
		list:any[]
		
		dbs:{
			
			t1:number
			
			t2:number
			
			t3:number
			
			t4:number
			/** 
			 * 关联type2 
			 * @type1 =  商圈数据 为 商圈列表 
			*/
			type2List:{name:string,id:number,cid:number,circle_name:string}[]
			/** 
			 * 当前条件下的三级条件
			 * @param type = 1 商圈数据时， type4 = 1 时是商圈应缴 发放卡券 发放期卡 管理充值 现金收款等
			 * @param type = 1 商圈数据时， type4 = 2 时是商圈收益 订单分红 
			*/
			type3List:{name:string,id:number}[]
		}
	}
	
	interface PageFinanceRes{
		
		t1:number
		
		t2:number
		
		t3:number
		
		t4:number
		
		t5:number
		
		t6:number
		
		type2List:{name:string,id:number,cid:number,circle_name:string}[]
		
		type3List:{name:string,id:number}[]
	}
	
	interface A1A2FinanceApiArgs{
		/** 
		 * 公司ID - A1A2财务统计端使用所属公司ID
		 * 2024-11-25扩展
		 */
		cpid:number
		/** 
		 * 当前选择的数据类型 0 = 未选择
		 * @param 1 = 商圈数据
		 * @param 2 = 微信收款
		 * @param 3 = 已结算
		 * @param 4 = 待结算
		*/
		type: 0 | 1 | 2 | 3 | 4 | 5 | 6
		/** 
		 * 二级筛选条件
		 * @param type = 1 筛选商圈ID
		 * @param type = 2 筛选微信收款ID
		 */
		type2:number[]
		/**
		 * 三级筛选条件
		 * @param type = 1 现金收款， 余额充值 , 卖卡收款 卖期卡
		 * @param type = 2 
		 * 
		 */
		type3:number[],
		/** 
		 * 四级筛选条件
		 * @param type = 1   1 = 商圈应缴  2 = 商圈收益
		 */
		type4:number
		
		ref:boolean
		
		cid:number,
		
		sDate:sm.Com.sDate
	}
	
	interface PageFinanceApiArgs{
		/** 
		 * 公司ID - A1A2财务统计端使用所属公司ID
		 * 2024-11-25扩展
		 */
		cpid?:number
		/** 
		 * 当前选择的数据类型 0 = 未选择
		 * 1 = 门店数据
		 * 2 = 渠道数据
		 * 3 = 股东数据
		 * 4 = 供货商
		 * 5 = 已结算
		 * 6 = 待结算
		*/
		type: 0 | 1 | 2 | 3 | 4 | 5 | 6
		/** 
		 * 二级筛选条件
		 * type=1门店数据时 type2 = 筛选门店ID
		 * type=2渠道数据时 type2 = 渠道ID
		 */
		type2:number[]
		/**
		 * 三级筛选条件
		 * type = 1门店数据时 type3 = [] 全部类型 [1,2,3]  = 现金收款， 余额充值 , 卖卡收款 卖期卡
		 * type = 2渠道数据时 type3 = [] 全部管理员 或者指定管理员ID
		 * 
		 */
		type3:number[],
		/** 
		 * 四级筛选条件
		 * type = 门店数据时 type4 = 1 门店支出 type4 = 2 门店收益
		 */
		type4:number
		
		ref:boolean
		
		cid:number,
		
		sDate:sm.Com.sDate
	}
	
	interface PageFinanceNew{
		
		hh:number,
		
		is_loading:boolean
		/**
		 *  页面二级筛选数据列表
		 *  type = 门店数据时为门店名称和ID列表
		 */
		type2List:{id:number,name:string,circle_name:string}[],
		/**
		 *  页面三级筛选数据列表
		 *  type = 门店数据时为 现金收款1 余额充值3 发卡收款3
		 */
		type3List:{id:number,name:string}[],
		
		api:{
			
			url:string
			
			refresh:boolean
			
			size:number
			args:PageFinanceApiArgs
		}
		
		t1:number
		
		t2:number
		
		t3:number
		
		t4:number
		
		t5:number
		
		t6:number
		
		t22:number

	}
	
	interface TransferCoupon{
		
		open:boolean,
		
		Store:sm.Store,
		
		tUid:number,
		
		nickname:string,
		
		avatar:string,
	}
	
	interface ShoppingGoods{
		
		hh:number
		
		guestHasCar:sting
	}
	
	interface ShoppingGoodsOrder{
		
		sid:number
		
		car:sm.ShopingCar
		
		uid:number
		
		guest:boolean
		
		Tuid:number
		
		name:string
	}
	
	interface SharedProps{
		coms:{
			
			open:boolean
			
			role:"C1"|"D1"|"U1",
			
			uid:number
			
			cid:number
			
			sid:number
		}

	}
	
	interface TransferProps{
		coms:{
			
			role:"C1"|"D1"|"U1",
			
			open:boolean,
			
			cid:number,
			
		}

	}
	
	interface ShoppingGoodsProps{
		
		coms:{
			
			open:boolean,
			
			Store:sm.Store,
			/** 
			 * 调用组件类型 
			 * 1 = 加购商品
			 * 2 = 代客下单
			*/
			type:number,
			
			goods:sm.good[]
			
			user?:{
				
				uid:number,
				
				nickname:string,
				
				avatar:string,
				
				is_guest:boolean,
				
				phone:string
				
				clist:sm.UserCarMember[],
				
				vip:number
			}
		}
		
	}
	
	interface UserMoveDate{
		
		open:boolean,
		
		is_show:boolean,
		
		uid:number,
		
		money:number,
		
		list:{
			
			o_id:number,
			
			o_title:string
			
			move_id:number
			
			use_num?:number
			
			has_num?:number
		}[],
		
		move_coupon_list:{
			
			id:number,
			
			name:string,
			
			price:number,
		}[],


	}


	
	interface MessageU1Args{
		
		url:string,
	}
	
	interface refreshAPI extends sm.RefreshList
	{
		
		url:string,
		
		size:number,
		
		refresh:boolean
		
		args:{[key:string]:any}
	}
    
    
    interface sDate{
        
		show:boolean
		/**
		 * 时间类型
		 * 1 = 日
		 * 2 = 周
		 * 3 = 月
		 * 4 = 年
		 * 5 = 时段
		 * 6 = 全部
		 */
		type:number
		
		time:string | Date
		
		time1:string | Date
		
		time2:string | Date
		/**
		 *  二级数据条件
		 * 0 = 没有限制二级条件
		 * 1 = E1端支出
		 * 2 = E1端收益
		 */
		type2:number
		
		role:"C1"|"D1"|"E1"|string
        
        color?:string,
		
		cid?:number,
		
		is_jiu?:number
		
		show_jiu?:number
		
		maxAllowedDate?:string
    }
	
	interface sDateBase{
		
		show:boolean
		/**
		 * 时间类型
		 * @param 1 = 日
		 * @param 2 = 周
		 * @param 3 = 月
		 * @param 4 = 年
		 * @param 5 = 时段
		 * @param 6 = 全部
		 */
		type:number
		
		time:string | Date
		
		time1:string | Date
		
		time2:string | Date
		
        color?:string
		/**
		 *  二级数据条件 老的不再使用
		 * 0 = 没有限制二级条件
		 * 1 = E1端支出
		 * 2 = E1端收益
		 */
		type2:number
		
		role:"C1"|"D1"|"E1"| "P1"

	}
}
