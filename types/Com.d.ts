
declare namespace sm.Com 
{

	/** 会员批量发券组件支持的卡券类型 */
	type MemberCouponBatchGrantCouponType = "cash" | "exchange" | "discount" | "vip" | "other" | number

	/** 批量入库时组件绑定的数据 */
	type StockBatchWarehousing = 
	{
		/** 门店ID */
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
		/** 关联供货商ID */
        supp_id?:number
		/** 选择入库的商品列表 */
		goods_list:tb.UP<tb.kxyk_mch_goods_stock_log>[]
		/** 当次批量入库时的备注 */
		remark?:string
		/** 当前身份下拥有的所有可操作分类和库存列表 */
		sub_stock_list:tb.kxyk_mch_store_sub[]
	}

	/** 批量入库选择商品组件内的商品列表 */
	type SelectStockGoodsItem = tb.kxyk_mch_goods & {
		/** 二级库存ID */
		sl_id?:number
	}
	/** 生成海报组件内的卡券数据 */
	type PosterCoupon = {
		/** 卡券PID */
		id: number;
		/** 卡券名称 */
		name: string;
		/** 过期时间 随便显示一个 */
		desc: string;
		/** 发放数量 */
		count: number;
		icon?: string;
	}

	/** 分享卡券生成海报组件Props */
	type ShareCouponPosterProps = {
		/** 背景图片 */
		backgroundImage?: string;
		/** 发卡人名称 */
		senderName?: string;
		/** 要发的卡券 */
		coupons?: PosterCoupon[];
		/** 二维码生成的地址 */
		qrcodeText?: string;
		qrcodeTip?: string;
		defaultCouponDesc?: string;
		noteText?: string;
		/** 底部二维码下文字 长按识别 领取卡券 */
		sloganText?: string;
	}
	/** 卡券流转组件相似数据列表 */
	type CouponTraceDialogItem={
		/** 
		 * 数据类型 
		 * @param 0 后台员工发卡
		 * @param 1 后台员工删除卡
		 * @param 2 用户转赠  
		*/
		t:number
		/** 身份类型 */
		dimension_type:'clerk' | 'user'
		/** 分类ID UID 或者 clerk_id */
		group_id:number
		/** 卡券数量 */
		count:number
		/** 卡券名称 */
		coupon_name:string
		/** 开始时间 */
		t0:number
		/** 结束时间 */
		t1:number
		/** 操作员工名称 */
		clerk_name?:string
		/** 领取人昵称 */
		r_nickname?:string
		/** 赠送人昵称 */
		g_nickname?:string
		/** 
		 * 转赠领取卡券
		 * @param 2 领取别人的卡
		 * @param 1 转赠给别人
		 */
		coupon_type?:number
	}
	/** 卡券流转组件树形结构数据列表 */
	type CouponTraceDialogList={
		/** UID原始人UID 用于获取详细数据时的对应人 */
		uid?:number
		/** 卡包PID 用于前端组件读取子节点 */
		pid?:number
		/** 管理员所属门店名称 */
		store_name?:string
		/** 身份类型 */
		dimension_type:'clerk' | 'user'
		/** 用户昵称 */
		nickname:string
		/** 用户身份 */
		role:string
		/** 用户头像 */
		avatar:string
		/** 用户UID 或者员工clerk_id */
		group_id:number
		/** 员工发卡数量 */
		total_issued:number
		/** 员工删除数量 */
		total_deleted:number
		/** 给该用户的发放数量 */
		total_gifted:number
		/** 从该用户领取数量 */
		total_received:number
		/** 该用户的可用数量 */
		total_available:number
		/** 该用户的已用数量 */
		total_used:number
		/** 该用户的过期数量 */
		total_expired:number
		/** 是否已经加载子节点 */
		loaded?:boolean
		/** 是否正在加载子节点 */
		loading?:boolean
		/** 子节点列表 */
		children?:CouponTraceDialogList[]
	}

	/** 发卡相关前后端参数 items */
	type MemberCouponItems = 
	{
		/** 卡包ID */
		pid:number
		/** 数量 */
		count:number
	}

	/** 删除sql条件参数 */
    interface DeleteOptions {
        orderBy?: string; // 排序条件，例如 'id ASC'
        limit?: number;   // 限制数量
    }
	/** 洗浴门店批量发卡参数 */
	interface MemberCouponGiveParams
	{
		/** 发卡或分享卡券人UID */
		g_uid:number
		/** 接受卡券人UID */
		r_uid:number
		/** 可能存在的员工clerk_id */
		clerk_id?:number
		/** 发卡门店ID */
		sid:number
		/** 可能存在的上去ID */
		cid?:number
		/** 要发放的卡券列表 */
		items:{
			/** 要发卡的卡包ID */
			pid:number
			/** 要发放的数量 */
			count:number
		}[]

	}
	interface MemberCouponBatchGrantMemberInfo
	{
		/** 会员UID */
		uid?:number
		/** 会员头像地址 */
		avatar?:string
		/** 会员昵称 */
		nickname?:string
		/** 会员姓名或备用显示名称 */
		name?:string
		/** 会员手机号 */
		phone?:string
		/** 后端返回的其他会员字段 */
		[x:string]:any
	}
	interface MemberCouponBatchGrantOwnedCouponItem
	{
		/** 用户已有卡券汇总记录ID */
		id:number | string
		/** 关联的卡券或卡包ID */
		coupon_id?:number | string
		/** 卡券显示名称 */
		name:string
		/** 卡券业务类型 */
		type?:MemberCouponBatchGrantCouponType
		/** 卡券类型显示名称 */
		type_name?:string
		/** 卡券简短描述 */
		desc?:string
		/** 卡券规则说明 */
		info?:string
		/** 用户累计拥有该卡券的总数量 */
		total_count:number
		/** 用户当前可使用该卡券的数量 */
		available_count:number
		/** 用户已经使用该卡券的数量 */
		used_count:number
		/** 用户已经过期该卡券的数量 */
		expired_count:number
		/** 后端返回的其他扩展字段 */
		[x:string]:any
	}
	interface MemberCouponBatchGrantLogItem
	{
		/** 日志记录ID */
		id:number | string
		/** 关联的卡券或卡包ID */
		coupon_id?:number | string
		/** 日志标题 */
		title:string
		/** 卡券显示名称 */
		coupon_name:string
		/** 卡券业务类型 */
		type?:MemberCouponBatchGrantCouponType
		/** 获得动作名称，例如后台发放、好友分享领取 */
		action_name?:string
		/** 卡券来源用户、管理员或活动名称 */
		from_name?:string
		/** 本次获得卡券数量 */
		count:number
		/** 日志创建时间显示文本 */
		created_at?:string
		/** 日志备注说明 */
		remark?:string
		/** 后端返回的其他扩展字段 */
		[x:string]:any
	}
	interface MemberCouponBatchGrantDbs
	{
		/** 页面是否正在加载初始化数据 */
		loading:boolean
		/** 发卡时显示发卡进度 */
		giving:{
			/** 是否显示发卡进度层 */
			show:boolean
			/**  当前发卡数量 */
			count:number
			/** 总共需要发放数量 */
			total_count:number
			/** 准备删除的总卡数量 */
			delete_count:number
			/** 发卡删卡字符串 */
			str:string
		}
		/** 页面是否正在提交批量发券 */
		submitting:boolean
		/** 页面是否正在提交批量删除 */
		deleting:boolean
		/** 当前激活的页面标签，grant为发券，owned为已有卡券，log为获得日志 */
		active_tab:"grant" | "owned" | "log"
		/** 当前搜索关键字 */
		keyword:string
		/** 当前勾选准备删除的用户已有卡券记录ID列表 */
		delete_ids:(number | string)[]
		/** 当前会员基础信息 */
		member:tb.UP<tb.sm_user>
		/** 当前可给会员发放的卡券列表 */
		coupons:sm.CouponPack[]
		/** 当前会员已经拥有的卡券汇总列表 */
		owned_coupons:sm.CouponPack[]
		/** 当前会员以往获得卡券的日志列表 */
		logs:MemberCouponBatchGrantLogItem[]
		/** 后端未接入或返回失败时用于前端预览的可发放卡券列表 */
		fallback_coupons:MemberCouponBatchGrantCouponItem[]
		/** 后端未接入或返回失败时用于前端预览的用户已有卡券列表 */
		fallback_owned_coupons:MemberCouponBatchGrantOwnedCouponItem[]
		/** 后端未接入或返回失败时用于前端预览的获得日志列表 */
		fallback_logs:MemberCouponBatchGrantLogItem[]
	}

	/** 订房组件返回选择订房的相关数据 */
	type RoomBookingPayBack = {
		/** 订房客户姓名 */
		name:string
		/** 订房客户手机 */
		phone?:string
		/** 订购房间ID列表 */
		rooms:number[]
		/** 房间名称列表 */
		rooms_name:string[]
		/** 订房入住时间 yyyy-mm-dd */
		check_in:string
		/** 订房离店时间 yyyy-mm-dd */
		check_out:string
		/** 总共几晚 */
		nights:number
		/** 订房总价 */
		total_amount:number
		/** 房型商品ID */
		goods_id:number
	}
	/** 订房组件页面数据 */
	type RoomBookingPayDbs =
	{
		/** 页面是否正在加载数据 */
		loading:boolean
		/** 当前商品可订购的房间列表 */
		rooms:tb.kxyk_mqtt_gateway_lock[]
	}
	/** 持卡人字段表 */
	type coupon_cardholder_field = tb.kxyk_coupon_cardholder &{
		/** 持卡人名称 */
		display_name:string
	}
	/** 卡券持有人页面数据 */
	type coupon_cardholder_dbs =
	{
		/** 所有持卡人列表 */
		list:coupon_cardholder_field[]
		/** 搜索关键词过滤 */
		keyword:string
		/** 是否显示添加持卡人窗口 */
		pop:{
			open:boolean
			has:tb.UP<tb.kxyk_coupon_cardholder>
			/** 是否正在远程加载下拉选择项 */
			loading:boolean
			/** 动态选择项列表 */
			options:{label:string,value:string,phone?:string}[]
		}
	}
	/** 日志API返回的数据字段 */
	type stock_log_api_res  = tb.kxyk_mch_goods_stock_log & Pick<tb.kxyk_mch_store_clerk_type,'n'> & Pick<tb.sm_user,'display_name'> & Pick<tb.kxyk_mch_goods_supplier,'s_name'|'s_nickname'|'s_phone'> & {
		/** 商品设置的单位 */
		stock_unit?:string
		/** 操作员工姓名 */
		clerk_name?:string
		/** 员工类型 */
		clerk_n?:string

	}
	/** 新的门店商品组件页面数据 */
	type p1_store_goods_dbs = 
	{
		/** 库存相关 */
		stock:{
			/** 是否显示添加或减少库存模态框*/
			open:boolean
			/** 当前操作模式 增加或减少 */
			mode:"add" | "cut" | ''
			/** 当前操作的库存日志 */
			has:tb.UP<tb.kxyk_mch_goods_stock_log>
			/** 当前操作的商品 */
			goods:tb.kxyk_mch_goods | null
			/** 批量入库组件是否显示 */
			batch_open:boolean
			/** 批量入库组件可选择的商品列表 */
			batch_list:sm.Com.SelectStockGoodsItem[]
			/** 批量入库时的组件绑定数据 */
			batch_data:sm.Com.StockBatchWarehousing
			/** 是否正在递交数据 */
			is_submitting:boolean
			/** 是否显示库存日志框 */
			log_open:boolean
			/** 日志api接口 */
			api:sm.rList<stock_log_api_res>
			/** 当前身份权限下的二级库存列表 */
			sub_stock_list:tb.kxyk_mch_store_sub[]
			/** 当前操作的二级库存 */
			sub_stock:tb.kxyk_mch_goods_stock_level2 | false
			/** 是否显示添加二级库存的模态框 */
			sub_stock_open:boolean
		}
		/** 供货商板块相关 */
		supplier:{
			/** 当前正在编辑的供货商数据 */
			has:tb.UP<tb.kxyk_mch_goods_supplier>
			/** 是否显示添加修改供货商窗口 */
			open:boolean
			/** 是否正在递交数据 */
			is_submitting:boolean
			/** 当前门店所有的供货商列表 */
			list:tb.kxyk_mch_goods_supplier[]
		}
		/** 当前页面中选择的商品类型 商品 服务 客房等类型 */
		gt:number
		/** 当前门店所有商品分类 */
		sub_list:tb.kxyk_mch_store_sub[]
		/** 当前门店所有商品数量 */
		goods_count:number
		/** 当前门店所有商品列表 */
		goods_list:tb.kxyk_mch_goods[]
		/** 当前门店所有带库存商品列表 - 最高权限选择商品时使用 */
		goods_list_stock:tb.kxyk_mch_goods[]

		/** 当前系统所有可能商品类型 */
		goods_type:tb.kxyk_mch_goods_type[]
		/** 当前门店下所有商品 */
		goods:tb.kxyk_mch_goods[]
		/** 添加商品相关 */
		edit_goods:{
			/** 是否显示添加或者修改商品框 */
			open:boolean
			/** 当前正在编辑的商品 */
			goods:tb.UP<tb.kxyk_mch_goods>
		}
		/** 添加分类模态框相关 */
		pop:{
			/** 是否显示添加或者修改分类框 */
			open:boolean
			has:tb.UP<tb.kxyk_mch_store_sub>
			/** 是否显示选择商品组件 */
			goods_open:boolean
		}
		/** 当前屏幕宽度 */
		innerWidth:number
		/** 当前选择旧的分类ID */
		has_sub_id:number
		/** 搜索筛选商品名关键字 */
		keyword:string
		/** 
		 * 移动端当前选择的tab
		 * @param 0 = 商品板块
		 * @param 1 = 库存板块
		 * @param 2 = 供货商板块
		 */
		tab:number
	}
	/** 员工任务页面数据 */
	type p1_staff_task = {
		/** 任务列表 */
		list:tb.kxyk_p1_staff_task[]
		/** 列表是否收缩 */
		collapsed:boolean
		/** 是否正在递交按钮到后端 */
		is_submit:boolean
		/** 当前组件用户身份是否是库管 */
		is_ku_guan:boolean
	}
	/** 添加商品组件页面数据 */
	type AddGoodsDbs = {
		/** 是否正在递交 状态 */
		is_submit:boolean
		/** 当前正在编辑的商品 */
		goods:tb.UP<tb.kxyk_mch_goods>
		/** 信值规格时需要一个缓存名字字段 */
		new_suk_name:string
		/** 当前门店ID */
		sid:number
		/** 当前门店所有楼层或商品分类 */
		sub_list:tb.kxyk_mch_store_sub[]
		/** 当前门店所有可设置的收款列表 */
		pay_list:tb.kxyk_mch_store_sub[]
		/** 当前门店所有可使用的VIP会员等级列表 */
		vip_list:tb.kxyk_mch_type_vips[]
		/** 当前门店所有可选择智能锁 */
		lock_list:tb.kxyk_mqtt_gateway_lock[]
	}
	/** 后台设备类型 */
	type SystemGatewayDevice = {
		/** 设备ID */
		id:string
		/** 设备编码 */
		code:string
		/** 设备名称 */
		name:string
		/** 在线状态 */
		online:boolean
	}
	/** 智能锁类型 */
	type GatewayLock = {
		/** 智能锁ID */
		id:number
		/** 智能锁名称 */
		name:string
		/** 开关状态 */
		enabled:boolean
		/** 是否有客人 */
		hasGuest:boolean
		/** 在线状态 */
		online:boolean
		/** 电量百分比 */
		battery:number
		/** 最后更新时间 */
		lastActive:string
	}

	/** 网关类型 */
	type GatewayItem =  Omit<tb.kxyk_mqtt_gateway, 'id'> & tb.kxyk_mqtt_gateway_store & {
		/** 折叠状态 */
		fold:boolean
		/** 绑定的后台设备ID */
		deviceId:string
		/** 网关下的智能锁 */
		locks:(tb.kxyk_mqtt_gateway_lock & {
			/** 当前锁拥有的所有授权 */
			auths:(tb.kxyk_mqtt_gateway_lock_auth & {
				/** 添加授权员工姓名 */
				clerk_name?:string
			})[]
			/** 是否显示授权 */
			showAuths?:boolean
		})[]
	}

	/** 添加网关表单 */
	type GatewayForm = {
		/** 自定义网关名称 */
		name:string
		/** 选择的设备ID */
		deviceId:string
	}


	/** 智能锁网关组件页面数据 */
	type GatewayDbs = {
		/** 搜索关键字 */
		gatewaySearch:string
		/** 网关自增ID种子 */
		gatewayIdSeed:number
		/** 智能锁自增ID种子 */
		lockIdSeed:number
		/** 添加网关弹窗显示状态 */
		gatewayDialogVisible:boolean
		/** 设备列表加载状态 */
		gatewayDeviceLoading:boolean
		/** 添加网关提交状态 */
		addGatewaySubmitting:boolean
		/** 后台设备列表 */
		systemGatewayDevices:tb.kxyk_mqtt_gateway[]
		/** 门店下所有可用手牌数组 */
		Cards:{
			/** 手牌ID */
			id:number
			/** 手牌号码 */
			number:string
			/** 手牌编码 */
			code:string
		}[]
		/** 添加网关表单 */
		gatewayForm:GatewayForm
		/** 门店ID */
		sid:number
		/** 网关列表 */
		gatewayList:GatewayItem[]
		/** 页面是否正在加载数据 */
		loading:boolean
		/** 网关添加锁按钮状态 */
		addLockButtonDisabled:boolean
		/** 网关添加锁等待60秒倒计时 */
		addLockCountdown:number
		/** 计时器 */
		timer:NodeJS.Timer | null
		/** 智能锁相关 */
		locks:{
			/** 当前正在编辑的锁 */
			hasLock:tb.kxyk_mqtt_gateway_lock | false
			/** 是否显示编辑窗口 */
			open:boolean
			/** 是否显示添加授权窗口 */
			addAuthOpen:boolean
			/** 添加授权 */
			addAuth:GW_addLockAuth
		}
		/** 房型相关数据配置 */
		house:{
			/** 是否显示添加房型 */
			addHouseOpen:boolean
			/** 当前正在编辑的房型商品 */
			hasRoom:tb.kxyk_mch_goods | undefined
		}
		/** 当前门店所拥有的所有房型商品 */
		rooms_goods_list:RoomGoods[]

	}
	/** 客房板块房型商品带有房间列表和统计字段 */
	type RoomGoods = tb.kxyk_mch_goods & {
		/** 当前商品绑定的房间列表 */
		rooms_list?:tb.kxyk_mqtt_gateway_lock[]
		/** 当前房型总有多少房间 */
		count?:number
		/** 当前房型空闲数量 */
		free?:number
		/** 当前房型已入住客人数量 */
		occupy?:number
		/** 当前房型等待打扫房间数量 */
		clean?:number
		/** 当前房型维修数量 */
		repair?:number
		/** 当前房型所属商品分类 楼层 */
		sub_name?:string
	}
	/** 网关组件页面添加锁授权字段 */
	type GW_addLockAuth = {
		/** 
		 * 添加授权类型
		 * @count Card 添加手牌或卡
		 * @count Password 添加密码
		 * @count Finger 添加指纹
		 * @count Face 添加人脸
		 */
		authType:"Card" | "Password" | 'Finger' | "Face"
		/** 要设置的密码或者绑定的手牌ID */
		authValue:number | null | string
		/** 要添加授权的锁ID */
		lid:number
		/** 操作员工id */
		clerk_id?:number
		/** 删除授权时的au_id 关联 kxyk_mqtt_gateway_lock_auth */
		au_id?:number
	}
	/** 弹框组件页面数据 */
	type PopBoxPageDb = {
		/** 是否显示弹框 */
		show:boolean
	}

	/** 发放卡券时及时汇款的发送数量数据包 */
	type GivingBackCounts = 
	{
		/** 当前发放数量 */
		count:number	
	}

	/** 店内聊天数据单挑解析 包含发送人行吗部门等 */
	type StoreChatMsg = tb.kxyk_store_chat & {
		/** 员工分类名称 */
		n:string
		/** 员工姓名或者昵称 */
		nickname:string
		/** 员工头像 - 有可能为空 */
		avatar?:string
		/** 是否锁定消息 前端提醒时使用 锁定后等语音播放完成才能自动关闭 */
		isLocked?:boolean

	}

	/** 洗浴系统顶部门店关注栏组件页面数据 - 带有搜索手牌功能 */
	type MchTopTitlePageDb = {
		/** 搜索手牌组件 */
		SearchShoeBox:XyNewSearchShoeBoxProps
	}

	/** 收银台立即支付传递给后端服务器的参数约定 */
	type CashierSubmit = Omit<CashierDbs,"coupons"> & {
		/** 
		 * 调用组件类型 
		 * @param 1 = 购物车立即支付需要先下单
		 * @param 2 = 订单里结算调用
		*/
		type:number
		/** 要处理的大厅hid - 当前支付或结算的用户大厅ID */
		hid:number
		/** 收款员工clerkk_id */
		clerk_id?:number
		/** 收款员工UID */
		clerk_uid?:number
		/** 当前调用环境 */
		os?: 'wx' | 'wxapp' | 'app' | 'h5'
		/** 独立结算时可能携带sid */
		sid?:number
	}

	/** 收银台离店结算时的手牌数据结构 */
	type CashierLeaveShoeBox = {
		/** 当前手牌或昵称 如果有手牌就显示手牌 */
		sb_code:string
		/** 手牌男女 */
		sex:number
		/** 当前手牌的订单ID */
		oid:number
		/** 当前手牌的订单列表 */
		list:sm.Pd1.CashierOrder[]
		/** 当前手牌下门店配置的必买项目以及当前手牌下合法满减总金额，数组，多个必买项中各自合法的满减金额 */
		must_full_discount:MustFullDiscount[]
	}
	/** 当前手牌下门店配置的必买项目以及当前手牌下合法满减总金额，数组，多个必买项中各自合法的满减金额 */
	type MustFullDiscount = {
		/** 订单ID */
		oid:number
		/** 
		 * 商品或者服务ID 
		 * @abstract 商品第一位g 服务第一位i
		 */
		gi_id:string
		/** 合法满减金额 */
		full_price:number

	}

	/** 收银台组件也没数据集合 */
	type CashierDbs={
		/** 是否重新渲染ui */
		is_render_ui:boolean
		/** 
		 * 当前可用卡券列表 - 即时计算
		 * @protected 卡券为移动端可选择样式 
		*/
		coupons:MultiCouponSelectorCoupon[]
		/** 当前收银台组件订单列表 - 需要动态生成 */
		order:sm.Pd1.CashierOrder[]
		/** 当前离店结算订单列表 */
		leave_order:CashierLeaveShoeBox[]
		/** 当前收银总金额 - 实付金额 */
		total:number
		/** 当前优惠总金额 */
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

		/** 递交状态 是否正在递交数据到后端 */
		is_submit:boolean
		/** 当前用户可以使用的余额 */
		money:number
		/** 当前用户可以使用的信值 */
		s_money:number
		/** 
		 * 当前共享身份宿主UID 
		 * @param 0 自己的身份
		 */
		shared_uid:number
		/** 共享宿主名称 */
		shared_name:string
		/** 当前用户可使用的VIP等级 */
		vip:number
		/** 当前用户是否游客 */
		is_guest:boolean
		/** 进店必买相关计算 */
		/** 是否开启了进店必买 */
		is_must_buy_auto_order?:number
		/** 进店必买ID组 */
		must_buy_ids?:string[]
		/** 进店避免配置组 */
		must_buy_list?:sm.Pd1.ShopMustBuy[]
		/** 当前购物车正在格式化 */
		is_formatting?:boolean
	
	}
	/** 选择卡券组件中的卡券字段约束 */
	type MultiCouponSelectorCoupon = 
	{
		/** 卡券ID */
		id: number | string
		/** 卡券名称 */
		name: string
		/** 折扣券优惠金额 */
		value: number
		/** 满减条件 */
		condition: string
		/** 卡有效开始时间 (时间戳, 单位秒) */
		startAt:number
		/** 描述信息，优惠券可用时展示 */
		description: string
		/** 卡失效日期 (时间戳, 单位秒) */
		endAt:number
		/** 显示优惠单位 */
		unitDesc?:string
		/** 显示的价格 */
		valueDesc?:string
		/** 
		 * 优惠券类型
		 * @param low 低值券
		 * @param exchange 兑换券
		 */
		type: 'low' | 'exchange'
		/** 低值券最大可选数量 */
		max_select?: number
		/** 是否已被其他订单选定 0 or 1 */
		is_select?:number
	
		/** 卡券本身属性 */
		
		/** 是否兑换券 */
		is_exchange?:number
		/** 可兑换商品或服务ID组 - 字符串需要转换为数组 */
		exchange_right?:string[]

		/** 是否低值券 */
		is_low?:number
		/** 可低值商品或服务ID组 - 字符串 */
		low_right?:string[]
		/** 低值券满减限制 - 满多少才能使用低值券 */
		full_low_price?:number
		/** 卡券是否允许叠加使用 */
		is_low_multiplex?:number
		/** 卡券可使用数量限制 */
		is_low_count?:number
		/** 卡券卡包PID */
		pid?:number
	}
	/** 技师员工服务组件页面数据 */
	type ReserveStaffDbs = {
		/** 当前选择正在处理的预约项目订单详情ID 母订单ID */
		has_item_order_id:number
		/** 当前正在处理的预售项目订单 母订单体 */
		has_item_order:tb.kxyk_mch_store_order_detall | false
		/** 当前选择的商品服务项目 即将下单 */
		has_item?:sm.item
	}
	/** 提示框按钮声明 */
	type showPopBut = {
		/** 按钮文字 */
		text:string
		/** 按钮动作 */
		action?:()=>void
	}
	type showPopOption = {
		/** 弹框标题 */
		title:string
		/** 弹框内容 */
		message:string
		/** 弹框按钮 */
		buttons:showPopBut[]
	}

	/** PC端大厅用户组建页面数据 */
	type PcHallMemberPageDb = {
		/** 搜索会员组建 */
		searchUser:sm.SearchUser
		/** 结算组件相关数据 */
		cashier:{
			/** 是否显示组件 */
			show:boolean
			/** 组件调用类型 */
			type: 1 | 2 | 3
		}
	}
	/** 识别手牌号码组件页面数据 */
	type IdentifyBrandDbs={
		/** 页面是否支持调用摄像头 */
		is_camera:boolean
		/** 屏幕宽度 - 摄像头视频大小 */
		vw:number
		/** 屏幕高度 - 摄像头视频大小 */
		vh:number
		/** 提示框宽度 */
		tw:number
		/** 提示框高度 */
		th:number
		/** 提示框距离顶部距离 */
		tt:number
		/** 视频流对象 */
		caseStream:any
		/** h5绑定video视频流 */
		stream:any
		/** 提示文本 */
		showText:string
		/** 
		 * 扫描识别状态
		 * @param 0 未扫描
		 * @param 1 扫描中
		 * @param 2 扫描未命中
		 * @param 3 扫描已名称 完成 
		*/
		type:0 | 1 | 2 | 3
		/** 扫描次数 */
		count:number
		/** 
		 * 识别模式
		 * @param 0 = 远程识别
		 * @param 1 = 本地识别
		 */
		Itype: 0 | 1
		/** 是否正在远程识别 */
		is_remote:boolean
	}
	
	/** 生成系统日志消息体方法参数 */
	type MakeLogMsgInfo = {
		/** 
		 * 日志业务 
		*/
		t: '开始服务' | '结束服务' | '商品送达'|'现金收款' | '会员设置' | '充值信值' | '充值余额' | '转为店购' | '解绑手牌' | '解绑用户' | '鞋柜手牌'
		/** 商圈ID */
		cid?:number
		/** 门店ID */
		sid?:number
		/** 触发日志的员工或用户ID */
		uid?:number
		/** 触发日志的员工ID */
		clerk_id?:number
		/** 订单详情ID */
		odid?:number
		/** 订单ID */
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
		/** 设置会员时的vip 为0是为店内会员 */
		vip?:number
		/**
		 * 充值余额时的充值类型
		 * @param 1 = 管理充值
		 * @param 2 = 用户在线充值
		 */
		type?:1 | 2
		/** 可能涉及的HID */
		hid?:number
	}
	/** 系统日志写入参数 */
	type SystemLogsParams = Omit<tb.kxyk_system_logs,"id"|'t1'>
	/** P1解析二维码参数 */
	type P1QrCodeParams = {
		/** Nv展示二维码端监控的一次性回调标识 */
		Nv:string
		/** 二维码携带的base64数据 */
		db:string
		/** 
		 * 访问接口溯源 
		 * @param qr  = 扫码进入此接口
		 * @param url = 通过url访问进入接口
		 */
		dev:string
		/** 展示二维码用户的登录环境 H5 APP WX 等 */
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
		/** 展示二维码用户的UID */
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
		/** 携带信息 错误信息或其他提示信息 */
		msg?:string
		/** 数据列表 */
		list?:any
		/** 数据总条数 */
		count?:number
	}
	type staff_sign_api_res_list_json = tb.kxyk_mch_store_clerk_sign & {
		/** 所选时间条件下总异常数 */
		odd:number
		/** 增益 */
		odd2:number
		/** 正常打卡天数 */
		normal:number
		/** 公休天数 */
		rest:number
		/** 请假天数 */
		leaven:number
		/** 旷工天数 */
		absent:number
		/** 当前 日 月 数字 */
		day:number
		/** 星期几 */
		week:string
		/** 几月几日 */
		dday:string
		/** 前端详情开关 */
		is_detall?:boolean
	}
	type staff_sign_res_list = {
		/** 员工ID  */
		clerk_id:number
		/** 用户UID */
		uid:number
		/** 员工名称 */
		clerk_name:string
		/** 员工分类 */
		clerk_n:string
		/** 请假小时数 */
		odd:number
		/** 增益小时 早到 晚退 */
		odd2:number
		/** 正常打卡天数 */
		normal:number
		/** 公休天数 */
		rest:number
		/** 请假天数 */
		leaven:number
		/** 旷工天数 */
		absent:number
		/** 年月日 day转换为数字字符串 */
		str_t:string
		/** 每天 每月 或每年 详细json数据 */
		days_json:staff_sign_api_res_list_json[]
	}
	type staff_sign_api_res = Omit<ResBase, 'list'> & {
		/** 二级分类所有考核人员列表 */
		st2_list: finance_st2_list[]
		/** 返回数据列表 */
		list:staff_sign_res_list[]
	}
	type system_finance_res = ResBase & {
		/** 顶部统计top 1 2 3 4 5 6  */
		tops:system_finance_tops
		/** 二级分类员工clerk列表 */
		st2_list: finance_st2_list[]
		/** 员工类型 - 扩展至账务员工板块 */
		st2_type_list: {id:number,n:string}[]
		/** 查询当前的商品或服务销售数量 */
		sales:{
			/** 用于分组的ID 商品或者服务ID */
			target_id:number
			/** 用户选择的ID + g or i */
			nid:string
			/** 商品或服务名称 */
			item_name:string
			/** 销售数量 */
			total_sold:number
		}[]
	}
	
	/** 员工列表st2多选 */
	type finance_st2_list = {
		/** 员工ID */
		clerk_id:number
		/** 员工名称 */
		clerk_name:string
		/** 员工分类 */
		clerk_n:string
		/**  员工分类ID */
		clerk_type:number
		/** 当前统计剩余金额 */
		s_money?:number
	}
	/**财务数据返回类型map，根据top返回不同的数据类型 */
	type system_finance_res_map = {
		1:system_finance_list//充值信值数据
		2:system_finance_res_top2 //信值消费数据
	}
	/** P1财务组件页面数据 */
	type system_finance_dbs = {
		/** 获取日志的下拉刷新API */
		api:sm.rList<system_finance_list,{sDate:system_finance_args,pip:system_logs_props}>,
		/** 当前屏幕宽度 */
		ww:number
		/** 顶部统计数据 */
		tops:system_finance_tops
		/** 
		 * 二级分类st2 
		 * @property 信值余额时 可选员工列表 员工发放信值和余额
		 * @property 卡券时的门店或股东列表 
		 */
		st2_list: finance_st2_list[]
		/** 员工分类列表 */
		st3?:{id:number,n:string
			/** 卡券数量 */
			total_count?:number
			/** 卡券总价格 */
			total_value?:number
		}[]
		/** 
		 * 
		 */
		HasFinance:{
			/** 是否显示弹框 */
			open:boolean
			/** 正在操作的当前子商户或者员工 */
			item?:system_finance_list
			/** 
			 * 当前正在编辑的数据
			 */
			add_edit?:tb.UP<tb.kxyk_mch_store_finance>
		}
		/** 当前各产品服务销量 */
		sales:{
			/** 用于分组的ID 商品或者服务ID */
			target_id:number
			/** 用户选择的ID + g or i */
			nid:string
			/** 商品或服务名称 */
			item_name:string
			/** 销售数量 */
			total_sold:number
			/** 销售总价格 */
			total_value?:number
		}[]
	}
	type system_finance_tops = {
		/** 充值信值总金额 */
		t1:number,
		/** 充值信值笔数 */
		t1_:number
		/** 消费信值总金额 */
		t2:number
		/** 消费信值笔数 */
		t2_:number
		/** 当前门店剩余信值总金额 */
		t3:number
		/** 剩余信值人数 */
		t3_:number
		/** 充值余额总金额 */
		t4:number
		/** 充值余额笔数 */
		t4_:number
		/** 消费余额总金额 */
		t5:number
		/** 消费余额笔数 */
		t5_:number
		/** 当前门店剩余余额总金额 */
		t6:number
		/** 剩余余额人数 */
		t6_:number
		/** 卡券发放金额 */
		t7:number
		/** 卡券发放笔数 */
		t7_:number
		/** 卡券使用金额 */
		t8:number
		/** 卡券使用笔数 */
		t8_:number
		/** 卡券剩余金额 */
		t9:number
		/** 卡券剩余人数 */
		t9_:number
		/** 子商户等待结算总金额 */
		t10:number
		/** 子商户等待结算笔数 */
		t10_:number
		/** 子商户已结算总金额 */
		t11:number
		/** 子商户已结算笔数 */
		t11_:number
		/** 员工等待结算金额 */
		t12:number
		/** 员工等待结算笔数 */
		t12_:number
		/** 员工已结算金额 */
		t13:number
		/** 员工已结算笔数 */
		t13_:number
	}

	/** P1财务组件上传给服务器参数约束(下拉刷新组建指定) */
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
		/** 员工分类选择 多选 */
		st3:number[]
		/** 是否显示九点 */
		show_jiu?:number
		/** 默认是否选中9点 */
		is_jiu?:number
		/** 最低时间限制  */
		maxAllowedDate?:string
	}

	// P1财务组建返回数据类型
	type system_finance_list = tb.kxyk_mch_store_credit_log & {
		/** 会员名称 */
		vip_name?:string
		/** 员工类型名称 */
		n:string
		/** 员工姓名 */
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

		/** 信值使用字段 */

		/** 订单卡券优惠金额 */
		discount?:number
		/** 订单信值支付金额 */
		yue_s_pay?:number
		/** 订单总支付金额 */
		pay_price?:number
		/** 订单余额支付金额 */
		yue_pay?:number
		/** 订单现金支付金额 */
		cash_pay?:number
		/** 订单微信支付金额 */
		wx_pay?:number
		/** 订单是否别人赠送订单 */
		is_transfer?:number
		/** 转赠订单的UID */
		transfer_uid?:number
		/** 转赠人名称 */
		transfer_name?:string
		/** 转赠人头像 */
		transfer_avatar?:string
		/** 订单名称 服务或商品名称 */
		item_name?:string
		/** 订单商品分类1 */
		sub_name?:string
		/** 订单商品分类2 */
		sub_name2?:string

		// top = 3 剩余信值字段

		/** 总充值次数 */
		t1_?:number
		/** 总充值金额 */
		t1?:number
		/** 总消费次数 */
		t2_?:number
		/** 总消费金额 */
		t2?:number
		/** 剩余信值 */
		money?:number


		// st = 4 子商户相关字段
		/** 子商户id */
		sub_id?:number
		/** 子商户或员工名称 */
		pay_name?:string
		/** 子商户或员工当前选择的时间条件 格式化字符串 */
		str_t?:string
		/** 子商户或员工当前条件汇总金额 */
		total_amount?:number

		/** 子商户当天收益数据 */
		days?:store_finance_ui[]

		[key:string]:any
	};

	/** 前端使用子商户结算表 */
	type store_finance_ui = tb.kxyk_mch_store_finance & {
		/** 是否打开msg详情 前端能使用 */
		is_detall?:boolean
		/** 手牌号码 */
		sb_code?:string
	}
	/** 员工组件页面数据 */
	type system_staff_clerk_dbs = 
	{
		/** 所有员工列表 */
		list:sm.Pd1.P1StoreStaff[],
		/** 当前选择的员工类型 */
		type:number
		/** 当前门店所有员工类型列表 */
		listType:tb.kxyk_mch_store_clerk_type[]

	}

	type report_bt1_kp = {
		/** 开牌标题文字 */
		title:string
		/** 开牌数量文字 */
		kpsl_s:string
		/** 开牌数量文字值 */
		kpsl_c:number
		/** 男浴文字 */
		ny_s:string
		/** 男浴数量 */
		ny_c:number
		/** 女浴文字 */
		vy_s:string
		/** 女浴数量 */
		vy_c:number
		/** 外卖文字 */
		wm_s:string
		/** 外卖数量 */
		wm_c:number
		/** 关牌文字 */
		gpsl_s:string
		/** 关牌数量 */
		gpsl_c:number
		/** 关牌男浴文字 */
		gpny_s:string
		/** 关牌男浴数量 */
		gpny_c:number
		/** 关牌女浴文字 */
		gpvy_s:string
		/** 关牌女浴数量 */
		gpvy_c:number
		/** 关牌外卖文字 */
		gpwm_s:string
		/** 关牌外卖数量 */
		gpwm_c:number	
		/** 会员人数文字 */
		hyrs_s:string
		/** 会员人数数量 */
		hyrs_c:number
		/** 男会员文字 */
		nhy_s:string
		/** 男会员数量 */
		nhy_c:number
		/** 女会员文字 */
		vhy_s:string
		/** 女会员数量 */
		vhy_c:number
		/** 游客文字 */
		yk_s:string
		/** 游客数量 */
		yk_c:number
		/** 人均消费文字 */
		rjxf_s:string
		/** 人均消费数量 */
		rjxf_c:number
		/** 最多消费文字 */
		zdxf_s:string
		/** 最多消费数量 */
		zdxf_c:number
		/** 最少消费文字 */
		zsxf_s:string
		/** 最少消费数量 */
		zsxf_c:number

	}
	type report_bt1_js = {
		/** 结算标题文字 */
		title:string
		/** 现金结算文字 */
		xj_s:string
		/** 现金结算数量 */
		xj_c:number
		/** 现金收款列表 */
		xj_list:{
			/** 收款人ID */
			clerk_id:number
			/** 收款人名称 */
			nickname:string
			/** 收款金额 */
			amount:number
		}[]
		/** 第三方销量统计 */
		other:{
			/** 第三方名称 */
			pname:string
			/** 销售核销总额 */
			other_price:number
			/** 销售核销数量 */
			other_count:number
			/** 第三方ID */
			other_id:number
		}[]
		/** 线下微信文字 */
		xxwx_s:string
		/** 线下微信金额 */
		xxwx_c:number
		/** 老会员卡文字 */
		lhy_s:string
		/** 老会员金额 */
		lhy_c:number
		/** 微信结算文字 */
		wx_s:string
		/** 微信结算数量 */
		wx_c:number
		/** 信值结算文字 */
		xz_s:string
		/** 信值结算数量 */
		xz_c:number
		/** 余额结算文字 */
		ye_s:string
		/** 余额结算数量 */
		ye_c:number
		/** 抖音文字 */
		dy_s:string
		/** 抖音数量 */
		dy_c:number
		/** 美团文字 */
		mt_s:string
		/** 美团数量 */
		mt_c:number
		/** 信值充值文字 */
		xzcz_s:string
		/** 信值充值数量 */
		xzcz_c:number
		/** 余额充值文字 */
		yecz_s:string
		/** 余额充值数量 */
		yecz_c:number
		/** 结算总计文字 */
		jshj_s:string
		/** 结算总计数量 */
		jshj_c:number
		/** 净收合计文字 */
		jjhj_s:string
		/** 净收合计数量 */
		jjhj_c:number
	}
	/** 商品分类数据统计字段 */
	type report_bt1_gt = {
		/** 商品分类统计标题文字 */
		title:string
		/** 表格中文字段数组 一维 */
		th:string[]
		/** 表格数据 */
		th_list:{
			/** 营业额 */
			t1:number
			/** 优惠额 */
			t2:number
			/** 赠送金额 */
			t22:number
			/** 实额 */
			t3:number
			/** 现金付款 */
			t4:number
			/** 微信付款 */
			t5:number
			/** 余额付款 */
			t6:number
			/** 信值付款 */
			t7:number
			/** 老会员卡 */
			t8:number
			/** 线下微信 */
			t9:number
			/** 分类名称 */
			tname:string
		}[]
	}
	/** 部门数据统计结果字段 */
	type report_bt1_bm = {
		/** 商品分类统计标题文字 */
		title:string
		/** 表格中文字段数组 一维 */
		th:string[]
		/** 表格数据 */
		th_list:{
			/** 营业额 */
			t1:number
			/** 优惠额 */
			t2:number
			/** 赠送金额 */
			t22:number
			/** 实额 */
			t3:number
			/** 现金付款 */
			t4:number
			/** 微信付款 */
			t5:number
			/** 余额付款 */
			t6:number
			/** 信值付款 */
			t7:number
			/** 老会员卡 */
			t8:number
			/** 线下微信 */
			t9:number
			/** 分类名称 */
			tname:string
		}[]
	}
	/** 信值余额充值统计结果字段 */
	type report_bt1_cz = {
		/** 信值充值金额 */
		t1:number
		/** 信值充值笔数 */
		t1c:number
		/** 信值赠送vip数量 */
		t1vip:number
		/** 员工充值信值金额 */
		t1_s:number
		/** 用户充值信值金额 */
		t1_u:number
		/** 余额充值金额 */
		t2:number
		/** 余额充值笔数 */
		t2c:number
		/** 余额赠送VIP数量 */
		t2vip:number
		/** 员工充值余额金额 */
		t2_s:number
		/** 用户充值余额金额 */
		t2_u:number
	}
	/** 系统报表组件后端返回数据 */
	type system_report_res = {
		/** 顶部时间数据 */
		top:{
			/** 查询数据的时间字符串 */
			s1:string
			/** 查询数据的工种 管理员 财务 等 */
			s2:string
		}
		/** 统计报表数据返回 */
		bt1:{
			/** 开牌数据统计 */
			kp: report_bt1_kp;
			/** 结算方式统计 */
			js: report_bt1_js
			/** 商品分类数据统计 */
			gt: report_bt1_gt
			/** 部门数据统计结果 */
			bm: report_bt1_bm
			/** 信值余额充值统计结果 */
			cz: report_bt1_cz
		}
		/** 商品分类列表 - 这里是门店下所有分类 */
		gt_list:{
			/** 分类ID */
			id:number
			/** 分类名称 */
			tname:string
		}[]
		/** 部门分类 - 这里是门店下所有部门 */
		bm_list:{
			/** 部门ID */
			id:number
			/** 部门名称 */
			tname:string
		}[]
	}
	/** 系统报表组件sDate内携带的其他参数 */
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
		/** 从前端传来的参数 可能会携带员工ID  */
		clerk_id:number
		/** 门店ID */
		sid:number
	}
	/** 系统报表组件页面数据 */
	type system_report_dbs = {
		/** 选择日期组件参数 */
		sDate:system_report_sdate
		/** 后端返回的数据结构 */
		res?:system_report_res
		/** 页面是否正在加载数据 */
		is_loading:boolean
		/** 页面是否正在加载右边详情数据 */
		is_loading_right:boolean
		/** 当前选定的详情ID
		 * @param 1 = 关牌数据列表 降序
		 * @param 2 = 结算方式数据列表 暂时不可查 
		 * @param 3 = 分类销售统计 数据列表
		 * @param 4 = 员工分类销售数据列表 降序
		 * @param 5 = 信值充值数据列表 降序
		 */
		did:number
		/** 右边数据详情窗口下拉分页组件API */
		api:sm.rList<sm.Com.report_detall_list>
		/** 右边数据列表头部 */
		TL:string[]
		/** 右边窗口查询出来的数据条数 */
		count:number
	}

	/** 开关牌数据详情返回字段约束 */
	type report_t1 = {
		/** 开关牌子数据详情 */
		type : 1
		/** 手牌号码 */
		sb_code : string
		/** 性别 */
		sex:string
		/** 会员身份 */
		vip_name:string
		/** 开牌时间戳 */
		s1:number
		/** 关牌时间戳 */
		s2:number
		/** 订单金额 */
		order_price:number
		/** 优惠金额 包括手动优惠 */
		discount:number
		/** 实付金额 */
		pay_price:number
		/** 现金支付金额 */
		cash_pay:number
		/** 微信支付金额 */
		wx_pay:number
		/** 余额支付金额 */
		yue_pay:number
		/** 信值支付金额 */
		yue_s_pay:number
		/** 老会员卡支付 */
		old_card_pay:number
		/** 吧台微信支付 */
		offline_wx_pay:number
		/** 结算数据 动态生成 */
		settle_type?:string
	}
	/** 结算方式 订单详情数据 返回字段约束 */
	type report_t2 = {
		/** 结算方式数据详情 */
		type : 2
		/** 手牌号码 */
		sb_code : string
		/** 项目名称 */
		item_name:string
		/** 下单时间戳 */
		t1:string
		/** 完成订单时间戳 */
		t2:string
		/** 订单金额 */
		order_price:number
		/** 优惠金额 包括手动优惠 */
		discount:number
		/** 实付金额 */
		pay_price:number
		/** 现金支付金额 */
		cash_pay:number
		/** 微信支付金额 */
		wx_pay:number
		/** 余额支付金额 */
		yue_pay:number
		/** 信值支付金额 */
		yue_s_pay:number
		/** 结算数据 动态生成 */
		order_pay?:string
	}
	/** 信值余额充值记录 */
	type report_t5 = {
		/** 信值余额充值记录 */
		type : 5
		/** 充值类型 */
		type1:string
		/** 用户昵称 */
		uname?:string
		/** 充值用户手机号码 */
		phone:string
		/** 充值金额 */
		price:number
		/** 充值赠送会员 */
		vip_name:string
		/** 充值时间 */
		t0:string
		/** 充值操作员 */
		sname:string
	}
	/** 商品分类详细数据 */
	type report_t3 = {
		/** 商品分类详细数据 */
		type : 3 | 4
		/** 商品分类或商品名称 */
		item_name?:string
		/** 订单金额 */
		order_price:string
		/** 优惠金额 */
		discount:number
		/** 实付金额 */
		pay_price:string
		/** 现金支付金额 */
		cash_pay:string
		/** 微信支付金额 */
		wx_pay:string
		/** 余额支付金额 */
		yue_pay:string
		/** 信值支付金额 */
		yue_s_pay:string
		/** 老卡支付金额 */
		old_card_pay:string
		/** 线下微信 */
		offline_wx_pay:string
		/** 分类下的商品销量列表 */
		list:report_t3[]
	}

	/** 数据报表详情List数据字段约定联合体 */
	type report_detall_list = report_t1 | report_t2 | report_t5 | report_t3
	/** 数据报告详情返回前端数据约束 */
	type report_detall_res=
	{
		/** 返回状态 */
		status:number
		/** 返回数据总条数 */
		count:number
		/** 数据列表 */
		list:report_detall_list[]
		/** 表格标题 */
		TL:{label: string, value: string}[]
		/** 导出数据title */
		title:string
		/** 导出数据文件名 */
		filename:string
	}
	/** 系统卡券日志组件 */
	type system_cardholder_log = {
		/** 获取日志的下拉刷新API */
		api:sm.rList<sm.U.Page.MemberCouponCardholderLog>,
	}
	/** 系统日志组件页面数据 */
	type system_logs_dbs = {
		/** 获取日志的下拉刷新API */
		api:sm.rList<system_logs_list>,
	}
	/** P1门店商品页面组件相关数据 */
	type p1_store_goods = {
		/** 
		 * 当前选择的分类ID
		 * @param 0 = 全部
		 */
		has_sub_id:number
		/** 筛选商品关键字 */
		g_keyword:string
		/** 商品分类列表 */
		sub_list:tb.kxyk_mch_store_sub[],
		/** 是否显示添加修改商品抽屉 */
		is_show_add:boolean
		/** 当前正在编辑的商品或服务 */
		has_goods:tb.kxyk_mch_goods
	}
	/** 系统签到组件页面数据 */
	type system_sign_dbs ={
		/** 设备屏幕宽度 */
		w:number
		/** 获取签到列表数据API */
		api:sm.rList<sm.Com.staff_sign_res_list>
		/** 计时器 */
		timer:any
		/** 当前时间戳 每秒更新一次 */
		time:string
		/** 是否播放时钟秒数 */
		time_play:boolean
		/** 是否显示时钟 */
		time_show:boolean
		/** 是否正在递交打卡 */
		is_submit:boolean
		/** 管理备注相关 */
		remark:{
			/** 是否显示备注框 */
			show:boolean
			/** 当前操作的签到数据 */
			has:staff_sign_api_res_list_json | false
			/** 输入的备注 */
			msg:string
		}
		/** 打卡状态文字 样式等 */
		status_info:{
			/** 显示的打卡文字 */
			text:string
			/** 使用的样式 */
			class:string
			/** 当前定位是否可以打卡 */
			is_possible?:boolean
		}
		/** 所有需要打卡的员工列表 */
		st2_list:sm.Com.finance_st2_list[]
		/** 是否显示选择天书按钮 */
		showDay:boolean
		/** 请假公休申请组建数据 */
		apply:{
			/** 是否显示申请框 */
			show:boolean
			/** 当前申请数据 */
			has:tb.UP<tb.kxyk_mch_store_clerk_sign>
		}
		/** 是否显示抽屉 抽屉用于显示点击年月后的详细签到列表 */
		is_show_dawer:boolean
		/** 当前选择的用户详细数据 */
		has_staff:sm.Com.staff_sign_res_list | false
		/** 请假计时显示字符串 格式化为小时 */
		leave_time:string
	}
	/** 系统签到组建参数 */
	type system_sign_props = {
		/** 是否显示其他人的签到 */
		is_all:boolean
		/** 员工ID */
		clerk_id:number
		/** 门店ID */
		sid:number
		/** 调用组件的员工数据 */
		staff:sm.Pd1.LoginStaff | false
		/** 注入pd1页面数据到组件 */
		pdbs:sm.U.Page.Pd1 | false
		/** 是否PCUI */
		is_pc?:boolean
	}
	/** 往期数据组件参数 */
	type system_past_data = {
		/** 商圈ID */
		cid:number
		/** 门店ID */
		sid:number
		/** 用户ID */
		uid:number
		/** 当前往期数据返回的用户数据 */
		user?:sm.Pd1.XYUser
	}
	/** 系统日志组件参数 */
	type system_logs_props = {
		/** 调用组件的身份 */
		role:"C1" | "P1" | "D1"
		/** 调用ID */
		id:number
		/** 是否PC */
		is_pc?:boolean
	}
	type system_logs_list = tb.kxyk_system_logs & sm.sm_user_base;
	/** 洗浴门店聊天数据单挑消息体 - 非数据库 -链表加解析产生 */
	interface xy_message_info
	{
		/** 文字消息体 */
		msg:string
		/** 
		 * 消息携带图片
		 */
		imgs?:string | string[]
		/** 用户昵称 */
		nickname?:string
		/** 用户头像 */
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
		/** 员工类型如果有的话 */
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
	/** 洗浴聊天组件发送消息时的字段约定 */
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
		/** 门店ID */
		sid:number
		/** 
		 * 接受消息的ID
		 * @param 发送人为用户时 这里是0门店接受或者 clerk_id 店员私聊接受
		 * @param 发送人为员工时 这里是接受消息的用户UID
		 */
		accept_id:number
		/** 消息内容 */
		msg:string
		/** 消息附加图片列表 */
		imgs:string[]
		/** 是否可以递交 前端能使用 */
		is_sub:boolean
		/** 递交状态 */
		loading:boolean
		/** 
		 * 是否私聊
		 * 
		 */
		is_private:boolean

	}
	/** 洗浴聊天组件数据约束 */
	interface message_xy
	{
		/**
		 *  调用组件的身份 
		 * @property U 用户
		 * @property P 管理员
		*/
		role:"U"|"P"
		/** 等待处理的角标数量 - 未读消息数量 */
		UnreadCount:number
		/** 员工clerk_id */
		clerk_id?:number
		/** 门店ID */
		sid:number
		/** 用户Uid - 当前调用组件用户 */
		uid:number
		/** 是否打开组件 */
		open:boolean
		/**
		 * 当前选定的私聊目标
		 * @protected 为0时 未选择私聊目标 显示好友列表 
		 */
		has_uid:number
		/** 是否有投诉管理权限 */
		is_msg_2:boolean
		/** 是否有审核会员设置的权限 */
		is_set_vip_1:boolean

	}

	/** 洗浴系统服务项目排队列表 */
	interface xy_order_detall_queue_list extends tb.kxyk_mch_store_queue_config_xy
	{
		/** 员工列表 */
		staff?:{
			/** 员工ID  kxyk_mch_store_clerk 表*/
			id:number
			/** 员工UID */
			uid:number
			/** 员工名称 */
			name:string
			/** 员工头像 */
			avatar:string
			/** id重命名 */
			value:number
			/** lable */
			label:string
		}[]
		/** 排队订单列表 */
		orders:{
			/** 订单详情ID */
			id:number
			/** 用户UID */
			uid:number
			/** 项目名称 */
			item_name:string
			/** 手牌号码 */
			sb_code:string
			/** 手牌性别  */
			sex?:number
			/** 订单状态 */
			status:number
			/** 下单时间戳 */
			t0:number
			/** 开始服务时间戳 */
			t1:number
			/** 商品名称 */
			goods_name:string
			/** 是否可以插队 0 1 */
			is_jump:number
			/** 是否有预约的技师ID */
			clerk_id:number
			/** 是否小程序模板消息通知排队到号 */
			is_notify?:number
			/** 是否游客 */
			is_guest?:number
			/** 用户小程序里的openid */
			cx_openid?:string
		}[]
	}

	/** 激活房间组件返回数据 */
	interface action_room_back{
		/** 订单详情ID */
		odid:number
		/** 选择的房间ID数组  kxyk_mqtt_gateway_lock 表 */
		rid:number[]
		/** 选择要激活和设置的房间 */
		locks:{
			/** 房间ID */
			lid:number
			/** 房间号码 或名称 */
			gname:string
			/** 选择授权的手牌号码ID */
			lock_sb_id:number
			/** 手牌号码 */
			lock_sb_code:string
			/** 要设置的密码 */
			lock_pwd:string
		}[]
	}
	/** 激活房间组件页面数据 */
	interface action_room_dbs{
		/** 页面正在加载后台数据 lodaing */
		loading:boolean
		/** 确认按钮正在激活房间 */
		loading_room:boolean
		/** 当前订单可选择的房间列表 */
		rooms:tb.kxyk_mqtt_gateway_lock[]
		/** 组件最终返回的数据 */
		back:action_room_back
		/** 当前门店所有手牌 */
		sb_lists:tb.kxyk_bath_shoebox[]

	}
	/** 订单详情组件页面数据 */
	interface order_xy_detall{
		/** 是否打开排队预约抽屉 */
		is_open:boolean
		/** 加载队列中 */
		is_loading:boolean
		/** 正在处理的订单详情 */
		od:tb.kxyk_mch_store_order_detall | false
		/** 当前服务项目可能存在的队列数据 */
		list:xy_order_detall_queue_list[]
		/** 当前门店所有员工列表 */
		clerks:sm.Pd1.LoginStaff[]
		/** 当前已登录的员工数据 如果有的话 */
		clerk:sm.Pd1.LoginStaff | false
		/** 激活房间相关数据 */
		room:{
			/** 显示激活房间组件 */
			show:boolean
			/** 当前订单信息 */
			order:tb.kxyk_mch_store_order_detall | false
		}
		/** 是否显示线上入住办理二维码框 */
		is_show_qr:boolean
		/** 手动优惠相关数据 */
		manual:{
			/** 是否显示手动优惠框 */
			show:boolean
			/** 当前操作的订单详情 */
			od:tb.kxyk_mch_store_order_detall | false
			/** 优惠金额 */
			price:number,
			/** 选填备注 */
			manaul_info?:string
			/** 正在递交 */
			is_submit?:boolean
		}
	}
	/** 用户平台消费记录统计数据 */
	interface user_kxyk_consumption{
		/** 订单总数 */
		order_count:number
		/** 平均价格 */
		avg_price:number
		/** 总价格 */
		all_price:number
		/** 首次下单时间 */
		first_order_time:string
		/** 最后一次下单时间 */
		finally_order_time:string
		/** 首次下单门店 */
		first_store:string
		/** 最后一次下单门店 */
		finally_store:string
		/** 前端UI是否显示各门店列表 */
		is_detall?:boolean
		/** 各门门店消费记录 */
		list:user_store_consumption[]
	}
	/** 用户门店消费统计数据 */
	interface user_store_consumption{
		/** 门店名称 */
		store_name:string
		/** 门店ID */
		sid:number
		/** 订单总数 */
		order_count:number
		/** 平均价格 */
		avg_price:number
		/** 总价格 */
		all_price:number
		/** 首次订单时间 */
		first_order_time:string
		/** 最后一次下单时间 */
		finally_order_time:string
		/** 最少一笔消费 */
		min_price:number
		/** 最多一笔消费 */
		max_price:number
	}
	/** 用户充值记录详情 */
	interface user_recharge_record
	{
		/** 充值总次数 */
		recharge_count:number
		/** 充值总金额 */
		total_amount:number
		/** 平均充值金额 */
		avg_amount:number
		/** 首次充值时间 */
		first_time:string
		/** 首次充值金额 */
		first_amount:number
		/** 最后一程充值时间 */
		last_time:string
		/** 最后一次充值金额 */
		last_amount:number
		/** 最小充值金额 */
		min_price:number
		/** 最大充值金额 */
		max_price:number
		/** 前端UI相关 是否显示详情 */
		is_detall?:boolean
		/** 充值记录详情 各门店充值统计 */
		details:{
			/** 门店ID */
			sid:number
			/** 门店图片 */
			img:string
			/** 门店名称 */
			store_name:string
			/** 门店充值总金额 */
			recharge_total_amount:number
			/** 当前门店充值次数 */
			recharge_count:number
			/** 当前门店平均充值金额 */
			avg_amount:number
			/** 门店首次充值时间 */
			first_time:string
			/** 门店最后充值时间 */
			last_time:string
			/** 首次充值金额 */
			first_amount:number
			/** 最后一次充值金额 */
			last_amount:number
			/** 最少充值金额 */
			min_price:number
			/** 最多充值金额 */
			max_price:number
		}[]

	}
	/** 带有门店消费统计的用户 */
	interface sm_user_detall extends tb.sm_user
	{
		/** 门店消费列表 */
		StoreConsumption:user_kxyk_consumption
		/** 用户充值记录 */
		RechargeRecord:user_recharge_record | false
		/** 用户会员数据 */
		vips:sm.U.StoreUserVipSmoney
		/** 用户在当前门店里符合当前员工权限的服务或商品消费记录 */
		SalesOrderDetall:{
			/** 服务销售列表 */
			list1:user_store_order_detall_count[]
			/** 商品销售列表 */
			list2:user_store_order_detall_count[]
		}
	}
	/** 用户在门店消费项目记录 */
	interface user_store_order_detall_count
	{
		/** 消费项目名称 服务名称或商品名称 */
		item_name:string
		/** 消费金额 */
		order_price:number
		/** 消费次数 */
		order_count:number
		/** 第一次购买时间 */
		min_t1:string
		/** 最后一次购买时间 */
		max_t1:string
		/** ui是否显示详情 */
		is_detall?:boolean
	}
	/** 会员信息组件页面数据 */
	interface ShowUserInfoDbs{
		/** 页面是否正在加载数据 */
		loading:boolean
		/** 页面用户数据 */
		user:sm_user_detall | false
		
	}
	/** 收付通平台二级商户进件新增编辑组件页面数据  */
	interface AddAndEditSecondaryMerchants{
		/** 当前新增编辑二级商户进件递交数据 */
		has:sm.WX.SecondLevelMerchantSubmission 
		/** 当前组件模态框宽度 */
		ww:string
		/** 当前组件模态框高度 */
		hh:string
		/** 微信个人业务银行列表 - 对私 */
		banks1:sm.WX.BanksList[]
		/** 微信对公业务银行列表 - 对公 */
		banks2:sm.WX.BanksList[]
		/** 当前选择的省 */
		has_level0:string
		/** 当前选择的市 */
		has_level1:string
		/** 当前选择的支行 */
		has_bank_branch:string
		/** 当前可选择的支行列表 */
		has_bank_branchs:{
			/** 支行名称 */
			bank_branch_name:string
			/** 支行ID */
			bank_branch_id:string
		}[]
		/** 全国省数据列表 */
		level0:{
			/** 省名称 */
			province_name:string
			/** 省编码 */
			province_code:string
		}[],
		level1:{
			/** 市名称 */
			city_name:string
			/** 市编码 */
			city_code:string
		}[]
	}
	/** 洗浴member组件页面数据 */
	interface XyMember
	{
		/** 搜索鞋柜组件 */
		searchShoeBox:sm.Com.SearchShoeBox
		/** 评价组件数据 */
		comment:sm.D.CommentOrder
		/** 购物车组件是否加载完成 */
		is_load_shopping_cart:boolean
		/** 搜索用户组件调用参数 */
		searchUser:sm.SearchUser
		/** 手牌识别组建 */
		Identify:{
			/** 是否显示组建 */
			open:boolean
		}
		/** 收银台组件数据 */
		cashier:{
			/** 是否显示组建 */
			show:boolean
			/** 调用组件类型 
			 * @count 1 = 购物车立即支付 
			 * @count 2 = 所有订单中没有结算的订单
			 * @count 3 = 从订房组件传来的结算 
			 * 
			*/
			type:number
		}
		/** 是否显示移动端绑定用户抽屉 */
		is_show_bind_user:boolean
		/** 是否显示离店关牌确认框 */
		is_show_leave_store:boolean
	}


	/** 弹框提醒组件 充值提醒 广告提醒等 */
	interface PopUp
	{

	}
	/** 洗浴会员组件页面数据 */
	interface MemberGoodsShoppingCartDBs
	{
		/** 当前身份是否有显示商品图片的权限 */
		is_show_good_img?:boolean
		/** 商品详情相关 */
		desc:{
			/** 是否显示抽屉 */
			is_show_desc:boolean
			g:sm.good | false
		}
		/** 当前门店商品列表 - 带分类 */
		// goods:sm.store_goods[]
		/** 当前计算后的游标 */
		activeCategoryIndex:number
		/** 每个分类的高度数组 */
		categoryHeights:number[]
		/** 点击按钮滚动是否完成 */
		BottonScrollEnd:boolean
		/** 左边导航栏宽度 */
		leftWidth:number
		/** 购物车组件门店商品列表 */
		goods:sm.store_goods[]
		/** 购物车组件内的用户数据 */
		Member:sm.Pd1.HallMember | false
		/** 是否显示选择代理支付模态框 */
		is_show_proxy:boolean
		/** 是否代付 - 拥有代理人支付时使用 */
		is_pay_me:boolean
		/** 页面是否正在加载中2025-08-01 */
		is_loading_page:boolean
		/** 页面是否已经加载完成 */
		is_loading_end:boolean
		/** 商品搜索框筛选显示商品列表 */
		goods_search?:string
		/** 是否正在递交落单数据 2025-12-18 新下单逻辑 */
		is_submit_order:boolean
		/** 是否显示收集身份证组件 */
		CollectIDCard:CollectIDCardProp
		/** 预定房间组件相关 */
		RoomPay:{
			/** 是否显示组件 */
			show:boolean
			/** 当前预定房间商品 */
			good:sm.good | false
		}
	}
	/** 收集入住房间人员组件返回的 入住人姓名 电话 或身份证之类的数据 */
	type CollectIDCardBack = {
		/** 入住房间人姓名 */
		name?:string
		/** 联系电话 */
		phone?:string
		/** 入住人可能的身份证号码 */
		idcard?:string

	}
	/** 收集身份证组件参数和收集的数据列表 */
	type CollectIDCardProp = {
		/** 是否显示组件 */
		show:boolean
		/** 预定房间数量 */
		/** 携带的商品 */
		good:sm.good | false
	}
	/** 门店设置组件 */
	type StoreConfig = {
		/** 是否显示组件 */
		 show:boolean
		/** 门店ID */
		sid:number
	}
	/** 门店设置组件页面数据 */
	type StoreConfigDbs = 
	{
		/** 门店数据 */
		Store:sm.Pd1.P1StoreCache | null
		/** VIP购买送卡规则列表 */
		VipGiftRules:tb.kxyk_mch_store_vip_gift_rules[]
		/** 商圈所有卡券列表 */
		coupons:sm.CouponPack[]
		/** 选定必买ID列表 */
		must_buy_ids:string[]
		/** 缓存以前选定的必买列表 */
		AllMustBuyList:sm.Pd1.ShopMustBuy[]
		/** 当前选定的必买列表 */
		HasMustBuyList:sm.Pd1.ShopMustBuy[]
		/** 无会员价格页面变量 */
		NoVipPrice:string
		/** 打印机相关参数 */
		printer:{
			/** 是否显示添加修改打印机模态框 */
			open:boolean
			/** 打印机列表 */
			list:tb.kxyk_store_printer[]
			/** 当前添加修改的打印机 */
			has:tb.UP<tb.kxyk_store_printer>
		}
		/** 第三方收款信息 */
		printer1:{
			/** 是否显示添加第三方收款 */cou
			open:boolean
			/** 第三方收款列表 */
			list:tb.kxyk_other_payment[]
			/** 当前添加修改的打印机 */
			has:tb.UP<tb.kxyk_other_payment>
		}
		/** 队列列表 */
		queue_list:tb.kxyk_mch_store_queue_config_xy[]
		/**  */
		/** 门店所有服务项目列表 */
		goods_spen_list:{
			/** 项目名称 */
			label:string
			/** 项目ID */
			value:number
			/** 原项目名称 */
			name:string
		}[]
	}
	/** 新搜索手牌组件页面数据 */
	type XyNewSearchShoeBoxProps = {
		/** 是否显示搜索手牌组件 */
		show:boolean
		/** 门店ID */
		sid:number
	}
	/** 新搜索手牌组件页面数据 */
	type XyNewSearchShoeBoxDBs = {
		/** 当前使用组件的用户数据 */
		hall:sm.Pd1.HallMember | false
		/** 调用摄像头识别手牌组件 */
		Identify:{
			/** 是否显示识别组件 */
			open:boolean
		}
		/** 是否正在后端搜索手牌号码 */
		is_searching:boolean
		/** 是否显示数字键盘 */
		is_show_keyboard:boolean
	}
	/** 搜索鞋柜组件props */
	type SearchShoeBox = {
		/** 是否显示组件 */
		open:boolean
		/** 门店ID */
		sid:number
		/** 
		 * 调用组件的类型
		 * @param 1 = 大厅游客搜索未开牌的手牌
		 * @param 2 = 用户搜索已开牌且是游客可以合并的手牌
		 * @param 3 = 用户搜索代理支付 手牌 必须是已经绑定用户的手牌
		 */
		type?:number
	}
	/** 洗浴顶部会员组件页面数据 */
	interface StoreMemberXyTop
	{
		/** 赠送余额信值窗口相关数据 */
		give:{
			/** 是否显示赠送窗口 */
			open:boolean
			/** 当前转赠表数据 */
			has:tb.UP<tb.kxyk_user_give_money_and_vip>
		}
		/** 注册修改资料组件 */
		reg:EditReg
		/** 信值充值日志 */
		credit_log:tb.kxyk_mch_store_credit_log
		/** 只用于信值的会员等级 */
		vips:tb.kxyk_mch_type_vips[]
	}
	/** 新修改注册资料组件参数 */
	interface EditReg{
		/** 是否显示修改注册资料抽屉 */
		open:boolean
	}
	/** 添加子门店组件页面变量 */
	interface AddSubStoreDbs
	{
		/** 当前操作的门店ID */
		sid:number
		/** 当前门店名称 */
		name:string
		/** 是否打开添加子门店窗口 */
		is_add:boolean
		/** 当前子门店数据 添加-修改 */
		sub_store:tb.kxyk_mch_store_sub
		/** 自门店列表 */
		list:tb.kxyk_mch_store_sub[]
	}
	/** 添加子门店组件参数 */
	interface AddSubStore{
		/** 是否显示配置窗口 */
		open:boolean,
		/** 门店ID */
		sid:number
		/** 门店名称 */
		name:string
	}
	/** 新模态框2组件参数 */
	interface Modal2P{
		/** 是否显示模态框 */
		open:boolean
	}
	/** 平台推广协议组件参数 */
	interface PromotionAgreement {
		/** 是否显示协议抽屉 */
		open:boolean
		/** 是否同意协议 */
		agree:boolean
		/** 是否显示协议 */
		show_xy:boolean
		/** 申请用户信息 */
		user:{
			/** 用户昵称 */
			nickname:string
			/** 用户手机号 */
			phone:string
			/** UID */
			uid:number
		}
	}
	/** 配置商品组件参数约束 */
	type SelectGoodsAdmin=
	{
		/** 是否显示组件 */
		open:boolean
		/** 门店ID */
		store_id:number
		/** 商圈ID */
		cid:number
		/** A端配置的行业类型ID */
		type_id:number
		/** 是否洗浴 0 1 */
		is_xy?:number
	}
	/** 搜索用户组件返回返回数据字段约束 */
	type SearchUserDb = 
	{
		/** 用户头像 */
		avatar:string
		/** 用户昵称 */
		nickname:string
		/** 用户电话号码 */
		phone:string
		/** 用户UID */
		uid:number
		/** 用户余额或信值 */
		money:number
		/** 用户车牌列表 */
		car_number?:tb.kxyk_mch_type[]
	}
	/** 添加团购活动组件页面数据约束 */
	interface TuanGouPage
	{
		/** 是否显示添加或修改DIV */
		is_open:boolean
		/** 当前正在操作的团购活动 */
		has_tuangou:tb.kxyk_store_tuangou
		/** 当前页面团购活动列表 */
		tuangou_list:tb.kxyk_store_tuangou[]
		/** 当前门店下的团购分类列表 */
		tuangou_type_list:tb.kxyk_store_tuangou_type[]
		/** 输入新分类名称 */
		type_name:string
		/** 其他规则名称 */
		qtgz_name:string
		/** 当前门店可发放的卡券列表 */
		coupon_list?:tb.kxyk_mch_store_is_grant_coupon[]
		/** 当前页面已选择分类 */
		has_tuangou_type:number
		
	}
	/** 数据统计组件C1D1调用参数 */
	interface C1D1Counts{
		/** 调用组件身份 */
		role:"C1"|"D1"
		/** C1商圈ID 或者D1 门店ID */
		ID:number
	}
	/**  A1A2财务统计方法返回数据约束 */
	interface FinanceA1A2Res{
		/**
		 *  数据返回状态码
		 * 	@param 1 成功
		 *  @param 0 失败
		 */
		status:number
		/** 数据总条数 */
		count:number
		/** 数据列表 */
		list:any[]
		/** 其他综合统计数据 */
		dbs:{
			/** 商圈总金额 */
			t1:number
			/** 微信收款总金额 */
			t2:number
			/** 已结算金额 */
			t3:number
			/** 待结算金额 */
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
	/** C1财务管理后台返回数据格式约束 */
	interface PageFinanceRes{
		/** 当前条件下门店总金额 */
		t1:number
		/** 当前条件下渠道总金额 */
		t2:number
		/** 当前条件下股东总金额 */
		t3:number
		/** 当前条件下供货商总金额 */
		t4:number
		/** 当前条件下已结算总金额 */
		t5:number
		/** 当前条件下待结算总金额 */
		t6:number
		/** 当前条件下的type2List type=门店数据时 这里是门店ID列表*/
		type2List:{name:string,id:number,cid:number,circle_name:string}[]
		/** 当前条件下的type3List type=门店数据时 这里是门店收益和支出筛选条件*/
		type3List:{name:string,id:number}[]
	}
	/** A1A2财务管理页面API */
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
		/** 刷新数据 */
		ref:boolean
		/** 商圈ID */
		cid:number,
		/** 时间组件参数 */
		sDate:sm.Com.sDate
	}
	/** C1财务管理页面API */
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
		/** 刷新数据 */
		ref:boolean
		/** 商圈ID */
		cid:number,
		/** 时间组件参数 */
		sDate:sm.Com.sDate
	}
	/** 新C1财务管理页面参数 */
	interface PageFinanceNew{
		/** 数据列表高度 */
		hh:number,
		/** 是否正在请求后台数据 */
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
		/** 后台请求API接口参数 */
		api:{
			/** 后端接口低值 */
			url:string
			/** 刷新控制 */
			refresh:boolean
			/** 分页大小 */
			size:number
			args:PageFinanceApiArgs
		}
		/** T1当前门店总金额 */
		t1:number
		/** T2当前渠道总金额 */
		t2:number
		/** T3当前股东总金额 */
		t3:number
		/** T4当前供货商总金额 */
		t4:number
		/** T5当前已结算总金额 */
		t5:number
		/** T1当前待结算总金额 */
		t6:number
		/** 渠道卡券数量 */
		t22:number

	}
	/** 赠送卡券组件参数 */
	interface TransferCoupon{
		/** 是否显示赠卡模态框 */
		open:boolean,
		/** 赠送卡券用户整个商城变量 */
		Store:sm.Store,
		/** 接受卡券用户UID */
		tUid:number,
		/** 接受卡券用户昵称 */
		nickname:string,
		/** 接口卡券用户头像 */
		avatar:string,
	}
	/** 选择商品+购物车组件页内所有字段约束 */
	interface ShoppingGoods{
		/** 页面容器高度 */
		hh:number
		/** 游客模式当前选择车型 */
		guestHasCar:sting
	}
	/** 转增订单后端API传参约束 */
	interface ShoppingGoodsOrder{
		/** 门店ID */
		sid:number
		/** 选好服务或商品的购物车 */
		car:sm.ShopingCar
		/** 下单本体用户UID */
		uid:number
		/** 是否游客下单 */
		guest:boolean
		/** 被赠用户UID */
		Tuid:number
		/** 游客昵称 */
		name:string
	}
	/** 共享组件参数 */
	interface SharedProps{
		coms:{
			/** 是否显示组件 */
			open:boolean
			/** 调用组件身份 */
			role:"C1"|"D1"|"U1",
			/** 共享用户UID */
			uid:number
			/** 商圈ID */
			cid:number
			/** 门店ID - 约束共享身份需要指定门店 */
			sid:number
		}

	}
	/** 选择商品+购物车组件Props 调用组件的参数 */
	interface TransferProps{
		coms:{
			/** 调用组件的身份 */
			role:"C1"|"D1"|"U1",
			/** 是否显示组件  */
			open:boolean,
			/** 商圈ID */
			cid:number,
			
		}

	}
	/** 选择商品+购物车组件Props 调用组件的参数 */
	interface ShoppingGoodsProps{
		/** 参数合集 */
		coms:{
			/** 是否显示组件 */
			open:boolean,
			/** 门店所有商品列表 */
			Store:sm.Store,
			/** 
			 * 调用组件类型 
			 * 1 = 加购商品
			 * 2 = 代客下单
			*/
			type:number,
			/** 商品列表 - 组件内使用独立商品列表 - 浅拷贝*/
			goods:sm.good[]
			/** 转增下单的用户 */
			user?:{
				/** UID */
				uid:number,
				/** 昵称 */
				nickname:string,
				/** 头像 */
				avatar:string,
				/** 是否游客 */
				is_guest:boolean,
				/** 电话号码 */
				phone:string
				/** 用户车牌列表 */
				clist:sm.UserCarMember[],
				/** 用户VIP */
				vip:number
			}
		}
		
	}
	/** 用户老系统余额卡券迁移参数 - StoreMemberIndex页面使用 */
	interface UserMoveDate{
		/** 是否显示迁移窗口 */
		open:boolean,
		/** 是否显示闪烁的迁移按钮 */
		is_show:boolean,
		/** 用户UID */
		uid:number,
		/** 迁移余额 */
		money:number,
		/** 迁移卡券列表 */
		list:{
			/** 老卡券ID  sm_store_coupon_user表 */
			o_id:number,
			/** 老卡券名称 */
			o_title:string
			/** 要替代的新卡券ID 新卡包表kxyk_coupon_pack*/
			move_id:number
			/** 老卡券可用次数 */
			use_num?:number
			/** 老卡券已用次数 */
			has_num?:number
		}[],
		/** 当前店铺可选替代卡券列表 */
		move_coupon_list:{
			/** 新卡包ID */
			id:number,
			/** 新卡包名称 */
			name:string,
			/** 新卡包价值 */
			price:number,
		}[],


	}


	/** Message用户组件变量约束 */
	interface MessageU1Args{
		
		url:string,
	}
	/** 下拉刷新组件数据接口 */
	interface refreshAPI extends sm.RefreshList
	{
		/** 后端接口地址 */
		url:string,
		/** 分页大小 */
		size:number,
		/** 刷新控制器 */
		refresh:boolean
		/** 接口额外携带参数 */
		args:{[key:string]:any}
	}
    
    /** 时间查询组件参数约束 */
    interface sDate{
        /** 是否显示组件 */
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
		/** 当前选择的日期字符串 */
		time:string | Date
		/** 选择时段 开始日期 */
		time1:string | Date
		/** 选择时段 结束日期 */
		time2:string | Date
		/**
		 *  二级数据条件
		 * 0 = 没有限制二级条件
		 * 1 = E1端支出
		 * 2 = E1端收益
		 */
		type2:number
		/** 调用组件的身份 */
		role:"C1"|"D1"|"E1"|string
        /** 组件内按钮颜色 */
        color?:string,
		/** 商圈ID */
		cid?:number,
		/** 是否9点模式 */
		is_jiu?:number
		/** 是否显示九点 */
		show_jiu?:number
		/** 最低时间限制  */
		maxAllowedDate?:string
    }
	/** 选择日期组件基本数据字段 */
	interface sDateBase{
		/** 是否显示选择日期组件 */
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
		/** 当前选择的日期字符串 */
		time:string | Date
		/** 选择时段 开始日期 */
		time1:string | Date
		/** 选择时段 结束日期 */
		time2:string | Date
		/** 组件内按钮颜色指定16进制色值 */
        color?:string
		/**
		 *  二级数据条件 老的不再使用
		 * 0 = 没有限制二级条件
		 * 1 = E1端支出
		 * 2 = E1端收益
		 */
		type2:number
		/** 调用组件的身份 */
		role:"C1"|"D1"|"E1"| "P1"

	}
}
