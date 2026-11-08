/// <reference types="vite/client" />

// declare module "@vue/runtime-core" {
//   interface ComponentInternamInstance{
//     $io:string;
//   }
// }
/// <reference types="LAN" />
declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare const WeixinJSBridge: {
	invoke: (method: string, params: any, callback: (res: any) => void) => void;
	on: (event: string, callback: (res: any) => void) => void;
	// 如果需要其他方法或事件，你可以继续声明
  };
declare module 'rollup-plugin-external-globals';
declare module 'wechat-jssdk';
declare module 'wechat-jssdk/dist/client.umd';
declare module 'MozWebSocket';
interface ImportMeta {
	readonly env: ImportMetaEnv
}
interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_APP_TITLE: string
	readonly VITE_APP_WS_URL: string
	// 更多环境变量...
}

declare namespace sm {
	import { __ } from 'lodash';
	import { Pay } from '@N/src/libs/api/pay/enum';
	interface EchartsDate{
		
		value:number,
		
		name:string,
		
	}

	interface mqtt_base
	{
		
		id:string
		
		clientId:string

	}
	
	interface mqtt_lock_base extends mqtt_base
	{
		
		lockId:string
	}
	
	interface mqtt_addLock_wait_staff{
		
		uid:number
		
		clerk_id:number

	}

	
	interface mqtt_heartbeat extends mqtt_base
	{
		
		cmd:"heartbeat",
		
		connect?:0|1
	}
	
	interface mqtt_heartbeat_send extends mqtt_heartbeat
	{
		
		cmd:"heartbeat"
		
		timestamp:number
	}
	
	type mqtt_gatewayInfo_send = mqtt_base & {
		
		cmd:"gatewayInfo",
	}
	
	type mqtt_gatewayInfo = mqtt_gatewayInfo_send & {
		
		hardVer?:string
		
		version?:string
		
		customerId?:string
		
		mac?:string
		
		ip?:string
		/** 
		 *  @param 0：正常工作状态
		 *	@param 1：网关处于等待添加门锁状态
		 */
		state?:0|1
	}
	
	type mqtt_configGateway_send = mqtt_base & {
		
		cmd:"configGateway",
		/** 
		 * 是否重置网络连接
		 * @param 0:不做任何动作
		 * @param 1：对网关进行一次复位操作，网关将会重新连接服务器
		 */
		reset:0 | 1
	}
	
	type mqtt_configGateway = mqtt_base & {
		
		cmd:"configGateway",
		/** 
		 * @param ok 执行成功
		 * @param timeout 指令超时
		 */
		result:string
	}
	
	type mqtt_addLock_send = mqtt_base & {
		
		cmd:"addLock",
	}
	
	type mqtt_addLock = mqtt_base & mqtt_addLock_send & {
		/** 
		 * 返回状态
		 * @param ok 锁绑定成功 一并返回锁ID
		 * @param timeout 指令超时
		 * @param wait 等待中 等待锁主动绑定
		 * @param fail 锁绑定失败
		 */
		result:"ok" | "timeout" | "wait" | "fail"
		
		lockId?:string
	}
	
	type mqtt_getLockInfo_send = mqtt_base & {
		
		cmd:"lockInfo",
		
		lockId:string
	}
	
	type mqtt_getLockInfo = mqtt_base & mqtt_getLockInfo_send & Omit<tb.kxyk_mqtt_gateway_lock,'id'> & {
		/** 
		 * 返回状态
		 * @param ok 锁绑定成功 一并返回锁ID
		 * @param timeout 指令超时
		 */
		result:"ok" | "timeout"
		
		status?:string
	}
	
	type mqtt_lockCmd_send = mqtt_lock_base & Pick<tb.kxyk_mqtt_gateway_lock,'holdOpen' |'delayTime' | 'refuseCopy' | 'recordPush' | 'magneticPush' | 'invalidPush'> & {
		
		cmd:"configLock"
		/** 
		 * 打开还是关闭
		 * @param open 打开
		 * @param close 关闭
		 */
		action?:"open" | "close"
	}
	
	type mqtt_lockCmd = mqtt_lock_base & {
		
		cmd:"configLock"
		/** 
		 * 返回状态
		 * @param ok 执行成功
		 * @param timeout 指令超时
		 */
		result:"ok" | "timeout"
	}

	
	type mqtt_readRecord_send = mqtt_lock_base & {
		
		cmd:"readRecord" 
		/** 读取日志需要三次握手 - 该接口也有可能自动触发 设备解锁成功或失败自动触发
		 * 服务器首先读取 可以不带该参数，等设备返回数据时再次回复设备 此时需要携带该参数 
		 * @param more 有更多数据 让设备继续读取
		 * @param ok 执行完成 设备不再上传数据
		 * @param timeout 接受数据时可能超时 
		 */
		result?:"ok" | "more" | 'timeout'
	}

	
	type mqtt_readRecord = mqtt_readRecord_send & {
		
		totalnum:number
		
		thisnum:number
		/**
		 * 记录合计，每个记录由38个字符构成，详解如下：
		 * @property 1、第1-2这两个字符为记录事件的类型,具体定义如下：
		 * @property 01：有效授权卡片开门成功事件
		 * @property 02：有效授权密码开门成功事件
		 * @property 03、未授权卡片尝试开门事件
		 * @property 04、未授权密码尝试开门事件
		 * @property 05、门磁打开事件
		 * @property 06、门磁关闭事件
		 * @property 07、常开模式下卡片关门
		 * @property 08、常开模式下密码关门
		 * @property 09、防复制失败刷卡
		 * @property 0A：有效指纹开门成功事件
		 * @property 0B：常开模式下指纹关门
		 * @property 0C：已过期/未正确使用指纹尝试开门事件
		 * @property 10：有效人脸开门成功事件
		 * @property 11：常开模式下人脸关门
		 * @property 12：已过期/未正确使用人脸尝试开门事件
		 * @property 2、3-12这10个字符代表门锁唯一ID
		 * @property 3、13-22这10个字符代表事件发生时的秒级时间戳
		 * @property 4、23-38这16个字符定义为记录编号信息
		 * @property  1、 如果为有效授权的IC卡片或未授权IC卡尝试开门事件，则前8个字符固定填0，后8个字符填物理卡号。
		 * @property  2、如果为有效授权的人脸、指纹或已过期/未正确使用人脸、指纹尝试开门事件，则前8个字符固定填0，后8个字符填人脸、指纹的唯一标识。
		 * @property  3、 如果为身份证或未授权身份证尝试开门事件，则16个字符填身份证ID。
		 * @property  4、如果为有效授权密码或未授权密码尝试开门事件，则前10个字符固定填0，后6个字符为密码
		 * @property  5、如果为门磁打开事件，前15个字符固定填0，最后1个字符填0代表关门事件，填1代表开门事件。
		 */
		records:string

	}

	
	type mqtt_clearAuth_send = mqtt_lock_base & {
		
		cmd:"clearAuth"
		/** 
		 * 要清除的授权类型
		 * @type "card" 所有卡片授权
		 * @type "password" 所有密码授权
		 * @type "face" 所有人脸授权
		 * @type "finger" 所有指纹授权
		 * @type "all" 所有授权
		 */
		authType:"card" | "password" | "face" | "finger" | "all"
	}

	
	type mqtt_authCard_send = mqtt_lock_base & {
		
		cmd:"authCard"
		/** 
		 * 是否立即清除门锁内所有卡片授权：
		 * @param 0 不做任何动作
		 * @param 1 会立即清除锁内所有卡片授权
		 */
		clearAllCard:number
		/**
		 * 每个授权由40个字符构成，一次最大可下发5组授权至门锁，详解如下：
		 * @property 1、第1-2这2个字符 00代表删除授权，为01代表添加授权。该项存在的意义在于可以在一条指令中删除旧卡并添加新卡授权，提高授权效率。
		 * @property 2、第3-18这16个字符 前8位填0,后8个字符为IC卡物理卡号,当授权为读身份证ID时，可 填入16个字符的身份证ID。
		 * @property 3、第19-20这2个字符 代表该授权有效次数，有效授权次数每开一次门，自动减1，有效次数配置范围1-99，若填FF，代表无次数限制，该项在删除授权时无意义，可填入任意值。
		 * @property 4、第21-30这10个字代表该授权有效的开始时间（秒级时间戳），若为全FF，则代表授权立即生效，该项在删除授权时无意义，可填入任意值。
		 * @property 4、第31-40这10个字符代表授权有效的结束时间（秒级时间戳），若为全FF，则代表授权永不过期，该项在删除授权时无意义，可填入任意值。
		 * 
		 * 以下为单个授权的示例
		 * 	添加卡片：请正确填写22位属性值
		 *	0100000000840a0076FFFFFFFFFFFF1711777264
		 *	删除卡片：22位属性值无意义
		 *	0000000000840a0076FFFFFFFFFFFF0000000000
		 *	请注意：
		 *	1、单次最大可下发5组授权（含添加/删除）
		 *	2、如果为添加授权，门锁内有存在的卡号时，将会更新有效授权数和卡片生效时间。
		 *	4、门锁不会自动清除时间和次数失效或到期的授权，即使失效，也依然会占用1个授权位置，若需清除已经失效的指令，请删除已经到期的指令或使用全清指令。
		 */
		cardcodes:string
	}
	
	type mqtt_authPassword_send = mqtt_lock_base & {
		
		cmd:"authPassword" 
		/** 
		 * 是否立即清除门锁内所有密码授权:
		 * @param 0 不做任何动作
		 * @param 1 会立即清除锁内所有密码授权
		 */
		clearAllPassword:number
		/**
		 * 每个授权由40个字符构成，一次最大可下发5组授权至门锁，详解如下：
		 * @property 1、第1-2这2个字符 00代表删除授权，为01代表添加授权。该项存在的意义在于可以在一条指令中删除旧密码并添加新密码授权，提高授权效率。
		 * @property 2、第3-18这16个字符 前10位填0,后6个字符为6位密码数字字符。
		 * @property 3、第19-20这2个字符  代表该授权有效次数，有效授权次数每开一次门，自动减1，有效次数配置范围1-99，若填FF，代表无次数限制，该项在删除授权时无意义，可填入任意值。
		 * @property 4、第21-30这10个字代表该授权有效的开始时间（秒级时间戳），若为全FF，则代表授权立即生效，该项在删除授权时无意义，可填入任意值。
		 * @property 5、第31-40这10个字符代表授权有效的结束时间（秒级时间戳），若为全FF，则代表授权永不过期，该项在删除授权时无意义，可填入任意值。
		 * 
		 * 以下为单个授权的示例
		 *	添加密码：
		 *	010000000000123456FFFFFFFFFFFF1711777264
		 *	删除密码：
		 *	000000000000123456FFFFFFFFFFFF0000000000
		 *	请注意：
		 *	1、单次最大可下发5组授权（含添加/删除）
		 *	2、如果为添加授权，门锁内有存在的密码授权时，将会更新有效授权数和卡片生效时间。
		 *	4、门锁不会自动清除时间和次数失效或到期的授权，即使失效，也依然会占用1个授权位置，若需清除已经失效的指令，请删除已经到期的指令或使用全清指令。
		 */
		passwords:string
	}
	
	type atuh_base = mqtt_lock_base & {
		/** 
		 * 授权返回状态
		 * @param ok 授权成功
		 * @param timeout 授权超时
		 * @param fail 代表授权格式出错，比如授权不为31个字符的倍数，第一个字符不为0或1（删除或添加）。
		 * @param full 代表授权已满 失败
		 */
		result:"ok" | "timeout" | "fail" | "full"
	}
	
	type mqtt_authCard = atuh_base & {
		
		cmd:"authCard"
	}
	
	type mqtt_authPassword = atuh_base & {
		
		cmd:"authPassword"
	}
	
	type mqtt_clearAuth = Omit<mqtt_clearAuth_send,"authType"> & Pick<mqtt_lockCmd,"result">;
	
	type mqtt_all_cmd_red = mqtt_authCard | mqtt_authPassword | mqtt_clearAuth | mqtt_heartbeat | mqtt_gatewayInfo | mqtt_configGateway | mqtt_addLock | mqtt_getLockInfo | mqtt_lockCmd | mqtt_readRecord;
	
	type mqtt_all_cmd_send = mqtt_authPassword_send | mqtt_authCard_send | mqtt_clearAuth_send | mqtt_readRecord_send | mqtt_heartbeat_send | mqtt_gatewayInfo_send | mqtt_lockCmd_send | mqtt_configGateway_send | mqtt_addLock_send | mqtt_getLockInfo_send;
	
	interface sm_user_base 
	{
		
		nickname?:string
		
		avatar?:string
		
		phone?:string
	}

	

	/**
	 *  微信支付 合并订单下单数据字段模型
	 * @property 传入微信URL里的data数据
	 */
	interface WxPayCombineOrderData
	{
		/** 
		 * 【合单服务商APPID】服务商(合单发起方)的APPID。
		 * APPID是微信开放平台(移动应用)或微信公众平台(小程序、公众号)为开发者的应用程序提供的唯一标识。
		 * 此处请填写公众号类型的APPID，并确保该combine_appid与combine_mchid有绑定关系。
		 * 详见：商户号绑定APPID操作说明。
		 * @type string(32)
		 */
		combine_appid:string
		/** 
		 * 【合单服务商商户号】 服务商(合单发起方)的商户号，
		 * 是由微信支付系统生成并分配给每个商户的唯一标识符，
		 * 具体请参考服务商模式开发必要参数说明
		 * @type string(32)
		 */
		combine_mchid:string
		/** 
		 * 【合单商户订单号】服务商系统内部订单号，要求6~32个字符内，只能是数字、大小写字母_-|*，
		 * 且在同一个合单服务商商户号combine_mchid下唯一。
		 * @type string(32)
		 */
		combine_out_trade_no:string
		/** 
		 * 【场景信息】 支付场景描述。选填
		 */
		scene_info?:{
			/** 
			 * 【商户端设备号】 终端设备号(门店号或收银设备ID)。
			 *  @type string(16)
			*/
			device_id?:string
			/** 
			 * 【用户终端IP】 用户端实际IP，支持IPv4和IPv6两种格式的IP地址。IP获取请参考获取用户IP指引
			 *  @type string(45)
			 */
			payer_client_ip?:string
		}
		/** 
		 * 【子单信息列表】 合单支付的子单信息列表，一笔合单支付订单可支持1-50笔子单交易。
		 * 	@type array[WxPayCombineSubOrderData]
		 */
		sub_orders:WxPayCombineSubOrderData[]
		/** 
		 * [必填]【合单支付者信息】
		 * @property 合单支付者信息，openid和sub_openid二选一必填。
		 * @type object
		 */
		combine_payer_info?:{
			/** 
			 * 【用户服务商标识】
			 * @property 用户在合单服务商商户号绑定的combine_appid下的唯一标识。
			 * @type string(128)
			 */
			openid?:string
			/** 
			 * 【用户子商户标识】
			 * @property  用户在子商户号绑定的sub_appid下的唯一标识，传了此参数则sub_appid必填
			 * @type string(128)
			 */
			sub_openid?:string
		}
		/** 
		 * [选填]【支付结束时间】
		 * @porperty 
		 * 1、定义：支付结束时间是指用户能够完成该笔订单支付的最后时限，
		 * 并非订单关闭的时间。超过此时间后，用户将无法对该笔订单进行支付。如需关闭订单，
		 * 请调用关闭合单订单API接口。
		 * 2、格式要求：支付结束时间需遵循rfc3339标准格式：yyyy-MM-DDTHH:mm:ss+TIMEZONE。
		 * yyyy-MM-DD 表示年月日；T 字符用于分隔日期和时间部分；HH:mm:ss 表示具体的时分秒；
		 * TIMEZONE 表示时区（例如，+08:00 对应东八区时间，即北京时间）。
		 * 示例：2015-05-20T13:29:35+08:00 表示北京时间2015年5月20日13点29分35秒。
		 * 3、注意事项：
		 * 	(1)time_expire 参数仅在用户首次下单时可设置，且不允许后续修改，尝试修改将导致错误。
		 * 	(2)若用户实际进行支付的时间超过了订单设置的支付结束时间，服务商需使用新的商户订单号下单，
		 * 生成新的订单供用户进行支付。若未超过支付结束时间，则可使用原参数重新请求下单接口，
		 * 以获取当前订单最新的prepay_id 进行支付。
		 * 	(3)支付结束时间不能早于下单时间后1分钟，若设置的支付结束时间早于该时间，
		 * 系统将自动调整为下单时间后1分钟作为支付结束时间。
		 * @type string
		 */
		time_expire?:string
		/** 
		 * [选填]【商户回调地址】
		 * @property 服务商接收合单订单支付成功回调通知的地址，需按照notify_url填写注意事项规范填写。
		 * @type string(64)
		 */
		notify_url?:string

	}
	
	interface WxPayCombineSubOrderData
	{
		/** 
		 * [必填]【服务商商户号】 此处请填写服务商(合单发起方)的商户号combine_mchid
		 * @type string(32)
		 */
		mchid:string
		/** 
		 * [必填]【商户数据包】服务商在创建订单时可传入自定义数据包，该数据对用户不可见，
		 * @param 用于存储订单相关的服务商自定义信息，其总长度限制在128字符以内。
		 * @param 支付成功后查询合单订单API和合单订单支付成功回调通知均会将此字段返回给服务商，
		 * @param 并且该字段还会体现在交易账单。
		 * @type string(128)
		 */
		attach:string
		/** 
		 * [必填]子单金额信息】 子订单收款金额信息。
		 *  @type object
		 */
		amount:{
			/** 
			 * [必填]【标价金额】 子单的金额，整型，单位为分。
			 * @type integer
			 */
			total_amount:number
			/** 
			 * [必填]【标价币种】符合ISO 4217标准的三位字母代码，固定传：CNY，代表人民币。
			 * @type string(3)
			 */
			currency:string
		}
		/** 
		 * [必填]【子单商户订单号】 服务商系统内部订单号
		 * @param 要求6~32个字符内，只能是数字、大小写字母_-|*
		 * @param 且在同一个合单服务商商户号combine_mchid下唯一
		 * @type string(32)
		 */
		out_trade_no:string
		/** 
		 * [必填]【子商户号(也叫特约商户号)】 子单参与方，由服务商为子商户进件后获取
		 * @param 具体请参考服务商模式开发必要参数说明。
		 * @type string(32)
		 */
		sub_mchid:string
		/** 
		 * [选填]【商品详情】 对订单商品的详细描述
		 * @type string(6000)
		 */
		detail?:string
		/** 
		 * [必填]【商品描述】商品信息描述 
		 * @param 用户微信账单的商品字段中可见(可参考JSAPI合单支付模式介绍-6、账单示意图)
		 * @param 服务商需传递能真实代表商品信息的描述，不能超过127个字符
		 * @type string(127)
		 */
		description:string
		/** 
		 * [选填]【结算信息】 结算信息。
		 */
		settle_info?:{
			/** 
			 * 【分账标识】订单的分账标识在下单时设置，传入true表示在订单支付成功后可进行分账操作。
			 * @property 需要分账（传入true）：订单收款成功后，资金将被冻结并转入子商户基本账户的不可用余额。
			 * 服务商可通过请求分账API，将收款资金分配给服务商或其他商户及用户。完成分账操作后，
			 * 可通过接口解冻剩余资金，或在支付成功30天后自动解冻。
			 * @property 不需要分账（传入false或不传，默认为false）：
			 * 订单收款成功后，资金不会被冻结，而是直接转入子商户基本账户的可用余额。
			 * @type boolean
			 */
			profit_sharing?:boolean
		}
		/** 
		 * [选填]【子商户APPID】
		 * @property 是子商户在微信开放平台（移动应用）或公众平台（公众号/小程序）
		 * 上申请的一个唯一标识。此处请填写公众号类型的APPID(只允许一笔子单填写该参数)，
		 * 并确保该sub_appid与sub_mchid有绑定关系。具体请参考商户号绑定APPID操作说明。
		 * @type string(32)
		 */
		sub_appid?:string
		/** 
		 * [选填]【订单优惠标记】
		 * @property 代金券在创建时可以配置多个订单优惠标记，标记的内容由创券商户自定义设置。
		 * 详细参考：创建代金券批次API。如果代金券有配置订单优惠标记
		 * 则必须在该参数传任意一个配置的订单优惠标记才能使用券。
		 * 如果代金券没有配置订单优惠标记，则可以不传该参数。
		 * @type string(32)
		 */
		goods_tag?:string
	}
	
	interface WxPayNotifyV3
	{
		
		id:string
		
		create_time:string
		/** 
		 * 通知类型 
		 * @param 授权成功通知的类型为PAYSCORE.USER_OPEN_SERVICE
		 * @param 解除授权成功通知的类型为PAYSCORE.USER_CLOSE_SERVICE
		 * @param 用户确认成功通知的类型为PAYSCORE.USER_CONFIRM
		 * @param 支付成功通知的类型为PAYSCORE.USER_PAID
		 * @param 目前支付成功为 TRANSACTION.SUCCESS 服务商
		*/
		event_type:string
		/**
		 * 通知数据类型 
		 * 通知的资源数据类型，支付成功通知为encrypt-resource
		 * @param 目前是encrypt-resource
		*/
		resource_type:string
		
		summary:string
		
		resource:WxPayNotifyV3Resource
	}
	
	interface WxPayNotifyV3Resource
	{
		/** 
		 * 服务商应用appid 
		 * 服务商申请的公众号或移动应用appid。
		*/
		sp_appid:string
		/**
		 * 子商户应用appID
		 * 
		 */
		sub_appid:string
		/** 
		 * 服务商户号
		 */
		sp_mchid:string
		/** 
		 * 子商户号
		 */
		sub_mchid:string
		/**  
		 * 商户唯一订单号
		 * 商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一。
		 */
		out_trade_no:string
		/**  
		 * 微信支付订单号 - 微信支付系统生成的订单号。
		 */
		transaction_id:string
		/** 
		 * 交易类型 枚举
		 * @param JSAPI：公众号支付
		 * @param NATIVE：扫码支付
		 * @param APP：APP支付
		 * @param MICROPAY：付款码支付
		 * @param MWEB：H5支付
		 * @param FACEPAY：刷脸支付
		 */
		trade_type:"JSAPI" | "NATIVE" | "APP" | "MICROPAY" | "MWEB" | "FACEPAY"
		/** 
		 * 交易状态 枚举
		 * @param SUCCESS：支付成功
		 * @param REFUND：转入退款
		 * @param NOTPAY：未支付
		 * @param CLOSED：已关闭
		 * @param REVOKED：已撤销（付款码支付）
		 * @param USERPAYING：用户支付中（付款码支付）
		 * @param PAYERROR：支付失败(其他原因，如银行返回失败)
		 */
		trade_state:"SUCCESS"|"REFUND"|"NOTPAY"|"CLOSED"|"REVOKED"|"USERPAYING"|"PAYERROR"
		/** 
		 * 交易状态描述 示例值：支付成功
		 */
		trade_state_desc:string
		/**
		 *  付款银行
		 * 银行类型，采用字符串类型的银行标识。银行标识请参考《银行类型对照表》示例值：CICBC_DEBIT
		 */
		bank_type:string
		/** 
		 * 附带数据
		 * 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用，实际情况下只有支付完成状态才会返回该字段。示例值：自定义数据  
		*/
		attach?:string
		/** 
		 * 支付完成时间
		 * 支付完成时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE
		 */
		success_time:string
		
		payer:
		{
			
			sp_openid:string
			
			sub_openid:string
		}
		
		amount:
		{
			
			total:number
			
			payer_total:number
			/**
			 *  货币类型 
			 * @param CNY 人民币
			 */
			currency:string
			
			payer_currency:string
		}
	}
	
	interface RechargeE23MoneyParameter{
		
		eid:number,
		
		price:number
		
		give?:number 
		
		operator_uid:number 
		
		role: "C1" | "E1"
	}
	
	interface RoleFinance extends SelectDatePar {
		
		size:number
		
		page:number
		
		role_id:number
		
		cid:number
	}
	
	interface SelectDatePar{
		
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
	}
	
	interface RechargeYueParameter{
		
		uid:number
		
		price:number
		
		role:'e1' | 'd1' | 'c1'
		
		sid:number
		
		cid:number
		
		s_uid:number
	}
	
	interface RechargeStoreYueParameter{
		
		role:'d1',
		
		uid:number,
		
		price:number
		
		sid:number
		
		s_uid:number
		
		is_log:boolean
	}

	interface E111{
		id:number
		
		c_name:string
		
		avatar:string
		
		id:number
		
		cp_id:number
		
		add_uid:number
		
		name:string
		
		phone:string
		
		root_role_id?:number
		
		role_id?:number
		
		type_id?:number
		
		uid:number
		
		is_E2:number
		
		E2list?:any[]
		
		is_E3:number
		
		E3?:tb.kxyk_mch_role_e2e3_auth
		
		time:number
		
		money:number
		
		money_auth:number
	}
	
	interface StoreGoodsPrices{
		
		id:number
		
		item_id:number
		
		goods_name:string
		
		is_spec:number
		
		price:number
		
		v_price:number
		
		is_vip_price:number
		
		spec_name:string
		
		suk_name:string
		
		item_name:string
		
		i_price:number
		
		i_v_price:number
		
		iis_open_vip:number
		
		vip_price_list?:{name:string,price:number}[]
		
		/** 
		 * 佣金模式
		 * 0 = 读取默认分佣
		 * 1 = 关闭分佣
		 * 2 = 自定义分佣 
		 */
		mode?:number
		/** 
		 * 自定义分佣类型
		 * 0 = 百分比
		 * 1 = 金额
		 */
		mode_type?:number
		
		mode_number?:number
	}
	
	interface GiveCouponActivity
	{
		/** 购买活动、申领活动表的ID - kxyk_mch_coupon_activity_user 
		 *  或者股东ID
		*/
		cauid:number,
		
		uid:number,
		/** 
		 * 调用类型 type
		 *	0 = 未支付
		 *	1 = 用户自主余额支付购买
		 *	2 = 用户自主微信支付购买
		 *	3 = 管理发放支付
		 *	4 = 管理发放 - 余额补额度 - 支付
		 */
		is_pay:number
		
		pay_price:number
		
		add_pay:number
		
		staff_uid:number
		
		sid:number
		
		cid?:number
		
		eid?:number
	}
	
	interface StoreCouponActivity
	{
		id:number,
		
		cid:number,
		/**
		 * 活动状态
		 * 0 = 已暂停
		 * 1 = 正常
		 */
		status:number,
		
		title:string,
		
		price:number,
		
		coupons:number[] | string | string[],
		
		time:number
		
		url?:string
		
		couponsList?:any
		/** 
		 * 新支付模式 - 多选
		 * pay1 = 线下申领
		 * pay2 = 余额支付
		 * pay3 = 微信支付
		*/
		pay_mode:string | string[]
		
		is_premium:number,
		
		premium:number,
		
		is_grant?:number,
	}
	
	interface D1Staff{
		id?:number,
		
		store_id:number
		
		uid:number
		
		add_uid:number
		
		is_shopkeeper:number
		
		is_task:number
		
		is_give:number
		
		nickname?:string
		
		avatar?:string
		
		give_numb?:any
	}
	
	interface ScanCom {
		
		str?:string,
		
		str2?:string,
		
		open:boolean,
		
		is_scan?:boolean,
		/** 
		 * 二维码类型
		 * type = 1 用户赠送卡券 转增二维码
		 * type = 2 用户申请加入门店管理员 二维码
		 * type = 3 E1端售卡 - 用户领卡二维码
		 * type = 4 用户二维码分享自己余额和卡券 - 共享数据
		 * type = 5 用户展示核销二维码 
		*/
		type:number,
		
		close:boolean
		
		db?:any
		
		role?:string
	}
	
	interface CheckCouponIsUsedResult
	{
		
		err:boolean,
		
		msg:string,
		
		db:{
			
			coupon_type:number,
			
			actual_price:number,
			
			is_channel:boolean,
			
			channel_name:string,
		}
		
	}
	
	interface HasCouponList
	{
		
		pid:number,
		
		label:string,
		
		list:CouponUser[],
	}
	
	
	interface kxykCircleMemberFundLog
	{
		id?:number;
		
		uid:number;
		
		cid:number;
		
		sid:number;
		/**
		 *  业务类型
		 *  @param 1 = 获得卡券 
		 *  @param 2 = 获得期卡 
		 *  @param 3 = 订单消费 
		 *  @param 4 = 余额充值 
		 *  @param 5 = 管理日志 
		 *  @param 6 = 删除卡券
		 *  @param 7 = 卡券激活
		 *  @param 8 = 迁移记录
		 *  @param 9 = 会员过期 
		 *  @param 10 = 共享订单 
		 *  @param 11 = 微信订单退款  
		 *  @param 12 = 权益转赠  
		 */
		type:number;
		
		type_str?:string;
		
		coupon?:CouponUser;
		
		annual?:kxykAnnualUser;
		
		refund?:tb.kxyk_user_pay_log_refunds
		
		order?:OrderDetall[]
		/** 
		 * 挂载充值日志
		 * @property type = 4 微信在线充值
		 * @property 管理员充值没有plID
		 */
		pay_log?:tb.kxyk_user_pay_log
		
		eid:number;
		
		msg:string;
		
		t1:number;
	}
	
	interface kxykAnnual {
		
		id?:number;
		
		name:string;
		
		price:number;
		
		count:number;
		
		type:number;
		
		term:number;
		
		cid:number;
		
		goods:string;
		
	}
	
	interface kxykAnnualUser{
		
		id?:number;
		
		aid:number;
		
		uid:number;
		
		give_type:number;
		
		give_id:number;
		
		give_uid:number;
		
		status:number;
		
		t1:number;
		
		t2:number;
		
		use_count:number;
		
		end_time:number;
		
		count?:number;
		
		
		type?:number;
		
		term?:number;
		
		goods?:string;
		
		i?:number[];
		
		g?:number[];
	}
	interface KxykUser
	{
		id:number,
		
		phone:string,
		
		nickname:string,
		
		avatar:string,
		
		wx_openid:string,
		
		h5_openid:string,
		
		cx_openid:string,
		
		unionid:string,
		
		add_time:number,
		
		add_ip:string,
	}
	
	interface CreateUser
	{
		
		phone:string,
		
		nickname?:string,
		
		avatar?:string,
		
		status:number,
		
		wx_openid?:string,
		
		h5_openid?:string,
		
		cx_openid?:string,
		
		unionid?:string,
		
		add_time:number,
		
		add_ip:string,
		
		pwd?:string

	}
	/** 财务结算表字段约束  
	 *  基于商圈跟各门店、合伙人结算
	 * 	profit_payable = 0 为门店或合伙人收益 = 1 为门店或合伙人上交 
	*/
	interface Finance
	{
		
		id?:number,
		/** 财务类型 
		 * @param 1 = 门店卖卡 
		 * @param 2 = 门店卖卡佣金收入 
		 * @param 3 = 股东卖卡 
		 * @param 4 = 股东卖卡佣金收入 
		 * @param 5 = 门店卖期卡 
		 * @param 6 = D1管理员为用户充值 
		 * @param 7 = C1在后台为E2E3充值
		 * @param 8 = E1在后台为用户充值 合伙人充值为已结算
		 * @param 9 = 门店订单分红
		 * @param 10 = 股东订单分红
		 * @param 11 = 门店现金收款 需要上缴给商圈
		 * @param 12 = 用户在线充值 为已结算状态
		 * @param 13 = 用户在线购买售卡活动 为已结算状态
		 * @param 14 = 商圈获得订单分红 订单实价（包括卡券价格） - 1%平台手续费 - 门店分红 - 股东分红  = 商圈分红
		 * @param 15 = 微信收款商户收款金额 用于统计 - 废弃 改为股东佣金
         * @param 15 = 股东帮用户开通会员获得佣金 股东获得佣金 = 商圈支付
         * @param 16 = 股东下级会员消费获得佣金 股东获得佣金 = 商圈支付
		 */
		type:number,
		
		cid:number,
		
		sid:number,
		
		shareholder_id:number,
		
		price:number,
		
		pay_uid?:number,
		/** 
		 *  0 = 商圈支出 
		 * 	1 = 商圈收益
		 */
		profit_payable:number,
		
		time:string,
		
		time_unix:number,
		/** 
		 * 操作员 - 选填
		 * 门店下级管理员UID 
		 * 或者C1 C2管理员UID 
		 */
		operator_uid:number,
		
		checkout:number,
		/** 
		 * 业务关联ID1 
		 * @param type=3 type=4 type=2 type=1 该字段为 购买卡券的用户UID
         * @param type=6 type=12 充值余额用户UID
         * @param type=9 type=11 下单用户UID
         * @param type=13 购买卡券活动的用户UID
         * @param type=14 订单详情ID
		*/
		relation1?:number,
		/** 
		 * 业务关联ID2
		 * @param type=3 type=1 type=4 type=2 该字段为 用户购买的卡包ID
         * @param type=6 type=12 用户自主充值时的赠送金额
         * @param type=9 type = 11 下单订单ID
         * @param type=13 购买卡券活动的活动ID
         * @param type=15 订单详情关联的系统支付表ID pay_log表
		 */
		relation2?:number,
		
		info:string,
		
		pl_id?:number
		/** 
		 * 商圈和平台结算 
		 * @param 0 = 没有结算 
		 * @param 1 = 正在结算 
		 * @param 2 = 结算完成
		 */
		a1_check?:number

	}
	
	interface GrantPackParameter
	{
		/** 
		 * 发卡类型
		 * @param 0 = 门店发卡
		 * @param 1 = 股东发卡
		 * @param 2 = 活动发卡
		 * @param 3 = 系统发卡（充值赠送发卡）
		 * @param 4 = 老系统搬迁 
		 * @param 5 = 团购活动发卡
		 */
		get_type:number,
		
        get_id:number,
		
        cid:number,
		
        get_uid:number,
		
		uid:number,
		
		pid:number,
		/**
		 * 发卡类型 用户获卡方式
		 *	@param 0 = 未支付
		 *	@param 1 = 用户自主余额支付购买
		 *	@param 2 = 用户自主微信支付购买
		 *	@param 3 = 管理发放支付
		 *	@param 4 = 管理发放 - 余额补额度 - 支付
		 *  @param 5 = 系统赠送用户无需支付(充值赠送)
		 *  @param 6 = 老系统搬迁
		 */ 
		is_pay:number,
		
		act_id?:number
		
		act_p_id?:number
		
		act_price?:number
		
		ocid?:number
		
		prize_id?:number
		
		hid?:number
		
		gift_rules_id?:number
		/** 
		 * 订单详情ID 
		 * 1.发放套卡时捆绑的订单详情ODID
		 */
		odid?:number
	}
	
	interface CouponUser
	{
		
		is_grey?:number,
		
		grey_msg?:string,
		
		id?:number,
		
		name:string,
		
		status:number,
		
		get_time:string,
		
		get_time_unix:number,
		
		use_time?:string,
		
		use_time_unix?:number,
		
		use_mode:number,
		
		show_price?:number,
		
		actual_price?:number,
		
		is_exchange?:number,
		
		exchange_list?:tb.kxyk_coupon_exchange_low[],
		
		is_low?:number,
		
		is_low_multiplex?:number,
		
		low_list?:tb.kxyk_coupon_exchange_low[],
		
		cid:number,
		/** 零卡类型 0=门店发卡 1=股东发卡 2=活动发卡 3=系统发卡(充值赠送) 4 =老系统搬迁  5 = 团购活动发卡 2024-08-01扩展 
		 * @param 6 = 洗浴后台发卡 2026-06-08
		*/
		get_type:number,
		/** 发卡ID 门店ID或股东ID或活动ID 
		 * @param 洗浴后台发卡时为门店ID
		*/
		get_id:number
		/** 发卡人用户ID
		 * @param 洗浴后台发卡时为分享人UID 上级UID
		 */
		get_uid:number,
		
		use_sid?:number,
		
		uid:number,
		
		pid:number,
		
		count:number,
		
		used_count:number,
		
		validity_time_unix:number,
		
		validity_time:string,
		
		use_day:number,
		
		is_lock:number,
		
		is_rep:number,
		
		rep_price?:number,
		
		rep_staff_uid?:number,
		
		rep_time?:number,
		
		unlock_time?:string,
		
		full_low_price?:number,
		
		is_low_count?:number,
		
		is_select?:number,
		
		is_channel?:number,
		
		channel_name?:string,
		
		is_transfer:number,
		
		transfer_uid:number,
		
		transfer_time:string
		
		av1?:string,
		
		av2?:string,
		
		[x:string]:any,
		
		is_select_transfer?:boolean
		
		is_relocate?:number
		/** 发卡活动ID 团购活动ID tuid 
		 * @param 洗浴后台发卡时持卡人日志表ID 2026-06-08 kxyk_coupon_cardholder_log
		*/
		act_id?:number
		
		act_p_id?:number
		
		relocate_id?:number
		
		prize_id?:number
		/** 
		 * 订单详情ID 
		 * 1.发放套卡时捆绑的订单详情ODID
		 */
		odid?:number
	}

	
	interface CouponPack
	{
		[x:string]:any,
		id?:number,
		cid?:number,
		
		name:string,
		
		price:number,
		
		
		count:number,
		
		use_count:number,
		
		is_channel?:number,
		
		channel_str?:string,
		
		is_verification?:number,
		
		is_new_user_commission:number,
		
		commission_type:number,
		
		commission:number,
		
		issued_count:number,
		
		issued_has:number,
		
		show_price:number,
		
		actual_type:number,
		
		actual_price:number,
		
		user_get_authority:number,
		
		is_exchange:number,
		
		exchange?:any,
		
		exchange_left?:any[],
		
		exchange_right?:any[]|string,
		
		full_low_price:number,
		 
		is_low_count:number,
		
		is_low:number,
		
		is_low_multiplex:number,
		
		low?:any,
		
		low_left?:any[],
		
		low_right?:any[]|string,
		
		issuing_rule:string,
		
		issuing_start:string,
		issuing_end:string,
		
		use_day:number,
		
		use_end:string,
		
		is_give:number,
		
		is_grant?:number,
		
		sort?:number,
		
		is_rep:number,
		
		rep_msg?:string,
		
		has_count?:number,
		
		has_used_count?:number,
		
		rep_price?:number,
		
		coupon?:{
			
			show_price:number,
			
			actual_price:number,
		}[],
		
		give_count?:number
		
		del_count?:number
	}
	
	interface store_memory_user{
		
		AllList:sm.StoreMember[],
		
		Alist:sm.StoreMember[],
		
		Blist:sm.QueueList[],
		DelayList:sm.StoreMember[],
		[x:string]:any
	}
	
	interface store
	{
		id:number,
		
		name:string,
		
		user_queue_expire:number,
		
		user_end_expire:number,
		
		user_queue_notice:number,
		
		address:string,
		
		img:string,
		
		scale:number,
		
		phone:string,
		
		operate_start:string,
		
		operate_end:string
		
		lat:string,
		
		lng:string,
		
		status:number,
		
		status_msg:string,
		
		type:number,
		
		cid:number

	}
	
	interface StoreNotice
	{
		
		id?:number,
		
		type:1|2,
		
		sid:number,
		
		uid:number,
		
		order_id?:number,
		
		is_solve:0|1,
		
		solve:0|1|2,
		
		d1_uid?:number,
		
		time:int,
		
		msg:string,
	}

	
	interface CarType {
		
		id: number,
		
		name: string,
		
		spec_name: string,
		
		is_select?:boolean,
	}
	//用户端sIndex首页
	interface Sindex {
		
		pageName: string,
		
		id: number,
		is_error: boolean,
		
		is_sync:boolean,
		
		in: boolean,
		error_title?: string, error_msg?: string,
		
		Store: Store,
		
		CarType: CarType[],
	}
	
	interface action_d1
	{
		
		type:"notice"|"ask_pay",
		db:any,
	}
	interface SearchUser{
		
		open:boolean,
		/** 
		 * 区分调用组件的地方 
		 * 0 = D1端调用
		 * 1 = E1端调用
		 * 2 = 团购员工端搜索用户
		 * 3 = 洗浴大厅搜索用户 游客绑手牌 - 手牌可以不开牌
		 * 4 = 用户绑游客时的搜索手牌
		*/
		type:number,
		
		cid:number,
		
		ref?:boolean,
	}
	//D1端页面数据结构约束
	interface PageD1 {
		
		pageName: string,
		
		status:boolean,
		
		Store: Store,
		
		is_boss:boolean,
		
		is_sync:boolean,
		
		is_up_notice:boolean,
		
		is_error: boolean,
		error_title?: string, error_msg?: string,
		
		is_show_user:boolean,
		
		is_set_coms:boolean,
		
		has_set_coms_id:number,
		
		CarType: CarType[],
		
		Sidebar: boolean,
		
		Store_: Store_,
		
		CameraComs:{open:boolean}
		
		SearchUser:SearchUser
		
		CouponActivity:{open:boolean,refresh:boolean}
		
		Statistics:{refresh:boolean}
		
		is_d1:boolean
	}
	
	interface SortQueueList{
		
		item_name:string,
		
		queue_count:number,
		
		is_up?:boolean,
		
		up_str?:string,
		
		server_count:number,
		
		list:QueueUserList[],
	}
	interface QueueList
	{
		
		goods_id:number,
		
		goods_name:string,
		
		suk_name:string,
		
		item_name:string,
		
		queue_count:number,
		
		server_count:number,
		
		list:StoreMember[],
		
		service_time:number,
		
		price?:number,
		
		is_up?:boolean,
		
		up_str?:string,
	}
	
	interface Store_ {
		
		AllList:StoreMember[],
		
		DelayList:StoreMember[];
		
		AList:StoreMember[],
		
		BList:QueueList[],
		
		Summary:any[],
		
		DayOrder:any[],
		
		sxed:number
		
		Staff:{
			
			count:number,
			
			list:any[]
		}
	}
	
	interface Store {
		
		id: number,
		
		name: string,
		
		img: string,
		
		address: string,
		
		lat: string,
		
		lng: string,
		
		operate_start: string,
		
		operate_end: string,
		
		status: number,
		
		status_msg: string,
		
		phone: string,
		
		StoreMember: StoreMember,
		
		FollowCount?: number,
		
		cid: number,
		
		goods: good[],
		
		has_type_car:string,
		
		user_queue_expire:number,
		
		user_end_expire:number,
		
		user_queue_notice:number,

	};
	
	interface UserCarMember
	{
		
		id:number,
		
		number:string,
		
		type:number,
		
		name:string,
		
		is_show: boolean 
		
		is_select?:boolean
		
		sw_select?:boolean
		
		is_add?:boolean
	}
	
	interface SharedRole{
		
		uid:number,
		
		s_uid:number,
		
		nickname:string
		
		avatar:string
		
		money:number
		
		phone:string
		
		is_money:number
		
		is_s_money:number
		
		s_money:number
		
		is_coupon:number,
		
		is_role:number
		
		car:UserCarMember[]
		
		coupons:CouponUser[],
		
		coupon_count?:number
		
		vip:number
		
		vip_name:string
	}
	
	interface StoreMember {
		id?:number,
		
		uid: number,
		
		share_list?:  false | SharedRole[],
		
		is_guest?:boolean,
		
		is_follow: number,
		
		is_coms: boolean,
		
		is_make_order:number,
		
		status: number,
		
		is_reg: boolean,
		
		phone: string,
		
		cid: number,
		
		nickname: string,
		
		avatar: string,
		
		money: number,
		
		s_money:number,
		
		r_money:number,
		
		vip_name:string,
		
		vip: number,
		
		tip_vip?:{
			
			is_tip:boolean
			
			tip_price:number
			
			out_price:number
			
			out_time:number
			
			is_jump:number
		}
		
		vip_jump:number,
		
		car: UserCarMember[],
		
		
		shoping_car: ShopingCar,
		
		coupons: CouponUser[],
		
		coupons_cache: CouponUser[],
		
		vip_cache:number,
		
		vip_name_cache:string,
		
		money_cache:number,
		
		s_money_cache:number,
		
		annual:kxykAnnualUser[],
		
		order?:Order
		
		is_notice?:number,
		
		is_again_queue?:number,
		
		is_valet?:boolean,
		
		is_fast?:boolean,
		
		sex?:number,
		
		pwd?:string,
		
		real_name?:string,
		
		birthday?:string,
		
		bank_number?:string
		
		card_id?:string
		
		car_photo?:string,
		
		tags?:tb.kxyk_circle_member_tags[]
		
		tags_tem?:[]
		
		is_show_move?:boolean
		
		job?:string,
		
		shared_uid?:number,
		
		queue?: {
			
			number: string,
			
			time: string,
			
			before: {
				
				a1:number,
				
				a2:number,
				
				a3:number,
			},
			
			waiting_time: number,
			
			list?:SortQueueList[],
		},
	}
	
	interface QueueUserList
	{
		
		uid:number,
		
		car_number:string,
		
		is_coms:boolean,
		
		number:string,
		
		time:string,
		
		status:number,
		
		car_type:string,
		
		is_me?:boolean,
		
		vip:number,
		
		vip_jump:number,
	}
	
	interface ShopingCar {
		
		discount: number,
		
		yue: number,
		
		cash: number,
		
		car_number:string,
		
		glist: ShopingCarItem[]
		
		clerk_id?:number
	}
	
	interface ShopingCarItem {
		
		goods_id: number
		
		goods_name: string,
		
		is_spec: number,
		
		is_cash?:number
		
		coupon_id: number,
		
		coupon_ids:number[],
		
		coupon_type:number,
		
		price:number
		
		discount:number
		
		count: number,
		
		spec_id?: number,
		
		spec_name?: string,
		
		suk: ShopingCarItemSuk[]
		
		collect?:sm.Com.CollectIDCardBack
		
		gt?:number
		
		stock_level2_id?:number
		
		clerk_id?:number
	}
	
	interface ShopingCarItemSuk {
		
		suk_name: string,
		
		suk_id: number,
		
		item_name: string,
		
		item_id: number,
		
		price: number,
		
		discount: number,
		
		yue: number,
		
		cash: number,
		
		coupon_id: number,
		
		coupon_type:number,
		
		annual_id:number,
		
		coupon_ids:number[],
		
		is_reserve?:number
	}
	



	
	interface action_user { key: string, val: any }
	interface action_store { 
		uid: number, 
		atype:"edit"|"edit_info"|"join"|"del"|"up_car"|"up_coupons"|"up_car_type"|"up_notice2"|"up_shared_role_list"
		// E1更新售卡记录列表
		| "e1_get_give_list"
		,
		alist: action_user[] 
	}


	
	// 属性 -  kxyk_mch_goods_spec_suk_item 表条目
	interface item {

		id: number,
		
		sub_PSR?:number,
		
		PSR?:number,
		
		item_name: string,
		 
		price: number,
		
		v_price: number,
		
		suk_id: number,
		
		spec_id: number,
		
		goods_id: number,
		/** 服务结束方式 
		 * 0 = 手动结束
		 * 1 = 自动结束
		 */
		end_type?:number
		
		end_time?:number
		
		coupon_ids:number[],
		
		coupon_id:number|number[],
		
		coupon_type?:number,
		
		coupon_price?:number,
		
		annaul_id?:number;
		
		annaul_price?:number;
		
		is_open_vip:number;
		
		is_cash?:number
		
		is_sub_pay?:number
		
		sub_pay?:number
		/** 
		 * 子商户结算单位 支持小数点
		 * @param 0 百分比
		 * @param 1 实际数 单位元
		 */
		sub_pay_type?:number
		/** 
		 * 子商户结算金额
		 * @property 服务不设置会读取商品设置 商品不设置会读取子商户默认设置
		 */
		sub_pay_price?:number

		
		is_bouns?:number
		
		bouns?:number
		/** 
		 * 提成金额类型
		 * @param 0 百分比
		 * @param 1 实际数
		 */
		bouns_type?:number
		
		vips:ItemVipsPrice[];
		
		sort?:number;
		

		
		suk_name?:string
		
		show_price?:number
		
		select_coupons?:sm.Com.MultiCouponSelectorCoupon[]
		
		show_select_coupons?:boolean
		
		is_reserve?:number
	};
	interface ItemVipsPrice
	{
		
		vip_name:string,
		
		price:number;
		
		vip_id:number;
	}
	
	interface store_goods extends tb.kxyk_mch_store_sub
	{
		goods:good[]
	}
	// 规格 - 属性接口 属性名称，id,服务列表,绑定服务名称
	interface suk { suk_name: string, id: number, items: sm.item[], is_must?: string, item_name: string, has_suk?: number };
	// 规格接口
	interface spec { id?: number, spec_name: string, suk: sm.suk[], is_show: boolean, }
	// 商品接口
	interface good {
		type_id?: number,
		cpid?: number,
		stock?: number,
		
		PSR?: number,
		
		store_id?: number,
		id: number,
		/** 
         * 新扩展商品类型 2026-04-16
         * @param 0 = 老的未分类商品
         * @param 1 = 房型商品
         * @param 2 = 第三方团购 可携带多个订单 需要核销
         * @param 3 = 服务类商品 带多规格
         * @param 4 = 套票类商品 可携带卡券
         * @param 5 = 套餐类 可携带多个订单
         * @param 6 = 普通商品
         */
        gt?:number
		
        rooms?:string | number[]
        /**
         * 房型已经使用的房间数量包括：入住+预定+维修
         */
        doom?:number
        /**
         * 当前房型绑定的房间总数
         */
        room_count?:number
		
		goods_name_sub?: string,
		
		goods_name: string,
		
		count: number,
		
		sub?:number
		/**
		 *  关联收款收款商户号码
		 *  如果不设置默认收款商户为门店设置的收款商户
		 * @param 商品绑定收款商户关联 kxyk_mch_store_sub表ID ，0 = 默认收款走门店设置号码
		 */
		sub_pay?:number
		/** 
		 * 子商户结算单位 支持小数点
		 * @param 0 百分比
		 * @param 1 实际数 单位元
		 */
		sub_pay_type?:number
		/** 
		 * 子商户结算金额
		 * @property 服务不设置会读取商品设置 商品不设置会读取子商户默认设置
		 */
		sub_pay_price?:number
		/** 
		 * 销售提成单位
		 * @param 0 百分比
		 * @param 1 实际数
		 */
		bonus_type?:number,
		
        is_combo?:number
		
		combo_list?:string | string[],
		
		is_combo2?:number
		
		combo2_list?:string | {id:number,count:number}[],
		
		bonus?: number,
		
		is_spec?: number,
		
		goods_img?: string,
		
		spec: sm.spec[],
		
		has_spec?: number,
		
		has_price?: number,
		
		is_vip_price?: number,
		
		is_open_vip?:number,
		
		is_reserve?:number,
		
		is_user_buy?:number,
		
		vips:ItemVipsPrice[],
		
		price?: number,
		
		v_price?: number,
		
		sort?: number,
		
		coupon_id?:number|number[],
		
		coupon_ids:number[],
		
		coupon_type?:number,
		
		coupon_price?:number,
		
		import_price?: number,
		
		export_price?: number,
		
		import_store_name?: string,
		
		import_store_phone?: number,
		
        is_delivery?:number  
		
		is_other?:number
        
        other_id?:number
        
        other_price?:number
		
		desc1?: string[] | string
		/** 
		 * 是否只能现金支付
		 * @param 0 = 不限制
		 * @param 1 = 只能现金支付 烟草类
		 */
		is_cash?:number
		
		UiShow?: {
			
			cash: number,
			
			yue: number,
			
			discount: number,
		},
		
		collect?:sm.Com.CollectIDCardBack
		
		is_secondary_stock?:boolean
		
		stock?:number
		
		stock_level2_id?:number
	}
	// 服务类前端展示商品列表 实际为商品分类下集成商品列表
	interface good_type { 
		
		has_sub?:number,
		has?: string, 
		goods: sm.good[]; 
		label: string; 
		id: number, 
		level: number; 
		root_id: number, 
		children: any[] 
	}
	

	
	interface location { lat?: number; lng?: number; province?: string; city?: string; district?: string; address?: string; uid?: number; url?: string; ip?: string; os?: string;[index: number]: number; }
	interface resArgs { 
		
		list?:any[],
		
		count?:number

		msg?: string, 
		__error__?: number, 
		
		status?: number; 
		db?: any;
		[x: string]: any; 
	}
	
	

	
	interface reqArgs {
		a: string; 
		mid?: number;
		p:sm.D
		[key: string]: any; 

	}

	//前端 be 函数回调函数
	interface beBackFunction {
		(res: resArgs): void;
	}
	
	interface CacheUser {
		sid: string, uid?: number, [key: string]: any
	}
	
	interface PayArgsV3
	{
		
		price:number
		/** 
		 * 商品描述 - 购买商品名称等
		 */
		title: string
		
		ev?: "H5" | "WX" | "WXAPP" | "APP",
		/** 
		 * 支付方式 wxpay alipay bankpay....
		 * @param wxpay 微信支付
		 * @param alipay 阿里支付
		 * @param bankpay 银行卡支付
		 * @param yuepay 余额支付
		 * @param 余额支付需要关联商圈ID = cid
		 * @param 所有支付都需要关联商户ID = sid
		*/
		mode: 'wxpay' | 'alipay' | 'bankpay' | 'yuepay'
		/** 
		 * 收款身份 
		 * @param 0 = 商圈收款
		 * @param 1 = 门店收款
		 * @param 2 = A公司收款
		*/
		is_sxed?:number
		
		cpid?:number
		
		cid?:number
		
		uid?: number
		
		user?:tb.sm_user
		
		
		
		sid?:number
		
		api:string
		
		back_url:string
		
		sp_mchid?:string
		
		extend?:{
			uid?:number
			[x: string]: any
		},
	}
	
	interface PayArgs {
		
		price: number,
		/** 收款标题 规范 
		 * PC网站	扫码支付 示例：腾讯充值中心-QQ会员充值
		 * 公众号/小程序支付 示例：商家名称-销售商品类目 商家名称必须为实际销售商品的商家
		 * 门店扫码	公众号/小程序支付	店名-销售商品类目	小张南山店-超市	线下门店支付
		 * 门店扫码	扫码支付	店名-销售商品类目	小张南山店-超市	线下门店支付
		 * 门店付款码	付款码支付	店名-销售商品类目	小张南山店-超市	线下门店支付
		 * 第三方手机浏览器	H5支付	浏览器打开的移动网页的主页title名-商品概述	腾讯充值中心-QQ会员充值	-
		 * 第三方APP	APP支付	应用市场上的APP名字-商品概述	天天爱消除-游戏充值 
		 */
		title: string,
		
		ev?: "H5" | "WX" | "WXAPP" | "APP",
		/** 
		 * 支付方式 wxpay alipay bankpay.... ,余额支付需要关联商圈ID
		*/
		mode: 'wxpay' | 'alipay' | 'bankpay' | 'yuepay',
		
		cid?:number,
		
		uid?: number,
		
		api: string,
		
		user?: Tabe.User,
		
		PayLog?: Tabe.PayLog,
		
		Extend?: any,
		[x: string]: any,
	}
	interface Utils {
		
		host: string;
		
		regx: { is_mobile: (n: number) => boolean, is_vehicle_number: (s: string) => boolean };
		
		sys: { is_ios: boolean, is_app: boolean, is_wx: boolean, is_wxapp: boolean, os: () => string },
		
		getEvn: () => string,
		
		sleep: (ms: number) => any,
		// find: (arr: any, obj: object) => object | boolean,
		find: <U extends T,U>(arr: T[], obj: U) => T | boolean,
		getUUID: (len: number) => string,
		AMap: typeof AMAP;
		format: (time: number, str: string) => string;
		format_hh: (time: number) => string;
		format_m: (m: number) => string;
		
		beautifyTime:(m:number)=>string;
		
		getDistanceFromGCJ02: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
		DOM: {
			
			get_surplus_higth: (c: string[]) => number;
			
			format_ms:(m:number)=>string,
		}
	}
	interface Order
	{
		id?:number,
		
		sid:number,
		
		uid:number,
		
		order_price:number,
		
		discount_price:number,
		
		cash_price:number,
		
		yue_price:number,
		
		yue_s_price:number,
		
		wx_price?:number
		
		car_number:string,
		/**
		 * 支付方式
		 * @param 1 线下现金支付
		 * @param 2 线上微信支付
		 * @param 3 足额余额支付
		 * @param 4 余额现金混合支付 + 线下现金
		 * @param 5 余额现金混合支付 + 现金微信在线支付
		 * @param 6 后续扩展其他支付方式 - 如支付宝
		 */
		pay_type:number,
		
		ask_pay?:boolean|undefined,
		/** 
		 * 是否支付 
		 * @param 0 没有任何支付
		 * @param 1 余额部分支付，仍有待支付 
		 * @param 2 订单彻底支付完成 
		*/
		is_pay:number,
		
		pay_time:number,
		
		add_uid:number,
		
		time:number,
		
		detall?:OrderDetall[],
		
		status:number
		
		t1:number,
		
		t2:number
		
		is_transfer?:number
		
		transfer_uid?:number
		
		is_distribute?:number
		
		wait_pay_price?:number
		
		hid?:number
	}
	interface OrderDetall
	{
		id?:number,
		
		oid:number,
		
		goods_id:number,
		
		item_id:number,
		
		is_spec:number,
		
		count:number,
		
		price:number,
		
		pay_price:number,
		
		yue_pay?:number
		
		yue_s_pay?:number
		
		cash_pay?:number
		
		wx_pay?:number
		
		wait_pay_price?:number
		
		is_discount:number,
		
		item_name:string,
		
		discount:number,
		
		coupon_type:number,
		
		coupon_id:number,
		
		coupon_ids:number[] | string,
		
		is_add_order:number,
		
		add_time:number,
		/** 
		 * 是否支付
		 * @param 0 没有支付
		 * @param 1 部分支付 
		 * @param 2 完全支付
		 */
		is_pay:number,
		
		status:number,
		
		status2:string,
		
		t1:number,
		
		t2:number,
		
		t3:number,
		
		rate:number;
		
		msg:string,
		
		is_overtime?:boolean,
		
		overtime?:string,
		
		is_channel?:number,
		
		channel_name?:string,
		
		sid?:number
		
		cid?:number
		
		is_transfer?:number
		
		transfer_uid?:number
		/** 
		 * UI前端需要
		 * 2024-12-20
		 */
		
		is_show_detail?:boolean
	}
	
	interface RefreshArgs{
		
		page:number,
		
		size:number,
		
		args:any
	}
	
	interface RefreshList{
		
		url:string,
		
		size:number,
		
		refresh:boolean,
		item_type?:any,
		
		args:{
			sDate?:sm.SelectDatePar,
			[x:string]:any
		}
	}

	// 从映射表 M 中按 args.sDate.st 推导 item_type
	type InferItemType<T, A, M> =
		A extends { sDate: { top: infer S } }
			? S extends keyof M
				? M[S]
				: T
			: T
	interface rList<T = any, A = any,M = {}>{
		
		url:string,
		
		size:number,
		
		refresh:boolean,
		
		args:A
		
		item_type?:InferItemType<T, A, M>
		
		xs?:number,
		
		sm?:number
		
		md?:number
		
		lg?:number
		
		xl?:number
		
		xxl?:number
		
		class?:string
	}
}

declare namespace Tabe {
	interface User {
		uid: number;
		unionid: string | null;
		real_name: string | null;
		card_id: string | null;
		nickname: string | null;
		avatar: string | null;
		phone: string | null;
		add_time: number | null;
		add_ip: string | null;
		last_time: number | null;
		last_ip: string | null;
		now_money: any | null;
		integral: number | null;
		addres?: string | null;
		province?: number | null;
		city?: number | null;
		area?: number | null;
		lat?: string | null;
		lng?: string | null;
		car_number: string | null;
		car_type?: string | null;
		wx_number?: string | null;
		wx_openid?: string | null;
		h5_openid?: string | null;
		cx_openid?: string | null;
	}

	interface PayLog {
		// 声明表字段
		id: number;
		
		mode: string;
		
		ev: string;
		
		status: number;
		
		uid: number;
		
		openid: string;
		
		api: string;
		
		price: number;
		
		fail: number;
		
		fail_msg: string;
		
		out_trade_no: string;
		
		prepay_id: string;
		
		transaction_id: string;
		
		extend: string;
		save: Function;
	}
}


