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
		/** 数值 */
		value:number,
		/** 名称 */
		name:string,
		/**  */
	}

	interface mqtt_base
	{
		/** 指令序列id，最大长度20，后续服务器应当复制该id进行回复，否则网关会视为未回复，忽略服务器的回复指令 */
		id:string
		/** 本网关设备唯一ID */
		clientId:string

	}
	/** 门锁基本类型 */
	interface mqtt_lock_base extends mqtt_base
	{
		/** 锁ID */
		lockId:string
	}
	/** 等待加入网关时请求端参数约定 map名称是网关ID 最后一次请求添加锁的用户信息 */
	interface mqtt_addLock_wait_staff{
		/** 等待回调更新前端的用户UID */
		uid:number
		/** 员工ID */
		clerk_id:number

	}

	/** 收到设备传来的心跳 */
	interface mqtt_heartbeat extends mqtt_base
	{
		/** 心跳包 */
		cmd:"heartbeat",
		/** 0：代表网关当前还未连接上服务器，本次为第一次连接或重新连接（6秒一次）。 */
		connect?:0|1
	}
	/** 回复设备心跳包 */
	interface mqtt_heartbeat_send extends mqtt_heartbeat
	{
		/** 发送指令 */
		cmd:"heartbeat"
		/** 当前时间戳 */
		timestamp:number
	}
	/** 发送获取设备配置命令 */
	type mqtt_gatewayInfo_send = mqtt_base & {
		/** 发送命令 */
		cmd:"gatewayInfo",
	}
	/** 获取设备配置返回数据 */
	type mqtt_gatewayInfo = mqtt_gatewayInfo_send & {
		/** 网关硬件版本号 */
		hardVer?:string
		/** 网关软件版本号 */
		version?:string
		/** 保留位，生产时烧入，不允许变更，可针对大客户定制 */
		customerId?:string
		/** 网关MAC地址 */
		mac?:string
		/** 网关IP地址 */
		ip?:string
		/** 
		 *  @param 0：正常工作状态
		 *	@param 1：网关处于等待添加门锁状态
		 */
		state?:0|1
	}
	/** 下发重置连接命令 */
	type mqtt_configGateway_send = mqtt_base & {
		/** 命令 */
		cmd:"configGateway",
		/** 
		 * 是否重置网络连接
		 * @param 0:不做任何动作
		 * @param 1：对网关进行一次复位操作，网关将会重新连接服务器
		 */
		reset:0 | 1
	}
	/** 设备返回复位重置执行结果 */
	type mqtt_configGateway = mqtt_base & {
		/** 命令 */
		cmd:"configGateway",
		/** 
		 * @param ok 执行成功
		 * @param timeout 指令超时
		 */
		result:string
	}
	/** 发送添加门锁指令 */
	type mqtt_addLock_send = mqtt_base & {
		/** 命令 */
		cmd:"addLock",
	}
	/** 接受设备返回添加锁指令的状态 */
	type mqtt_addLock = mqtt_base & mqtt_addLock_send & {
		/** 
		 * 返回状态
		 * @param ok 锁绑定成功 一并返回锁ID
		 * @param timeout 指令超时
		 * @param wait 等待中 等待锁主动绑定
		 * @param fail 锁绑定失败
		 */
		result:"ok" | "timeout" | "wait" | "fail"
		/** 锁绑定成功携带的锁ID */
		lockId?:string
	}
	/** 发送获取锁详情数据指令 */
	type mqtt_getLockInfo_send = mqtt_base & {
		/** 命令 */
		cmd:"lockInfo",
		/** 锁ID */
		lockId:string
	}
	/** 返回获取锁详情数据 */
	type mqtt_getLockInfo = mqtt_base & mqtt_getLockInfo_send & Omit<tb.kxyk_mqtt_gateway_lock,'id'> & {
		/** 
		 * 返回状态
		 * @param ok 锁绑定成功 一并返回锁ID
		 * @param timeout 指令超时
		 */
		result:"ok" | "timeout"
		/** 锁的位置状态 开发文档没有该字段 但设备返回了 */
		status?:string
	}
	/** 下发门锁指令 - 设置门锁 */
	type mqtt_lockCmd_send = mqtt_lock_base & Pick<tb.kxyk_mqtt_gateway_lock,'holdOpen' |'delayTime' | 'refuseCopy' | 'recordPush' | 'magneticPush' | 'invalidPush'> & {
		/** 命令 */
		cmd:"configLock"
		/** 
		 * 打开还是关闭
		 * @param open 打开
		 * @param close 关闭
		 */
		action?:"open" | "close"
	}
	/** 发送设置门锁指令后收到的设备回馈 */
	type mqtt_lockCmd = mqtt_lock_base & {
		/** 命令 */
		cmd:"configLock"
		/** 
		 * 返回状态
		 * @param ok 执行成功
		 * @param timeout 指令超时
		 */
		result:"ok" | "timeout"
	}

	/** 获取锁内开锁日志 - 包括成功和失败的所有日志 */
	type mqtt_readRecord_send = mqtt_lock_base & {
		/** 命令 */
		cmd:"readRecord" 
		/** 读取日志需要三次握手 - 该接口也有可能自动触发 设备解锁成功或失败自动触发
		 * 服务器首先读取 可以不带该参数，等设备返回数据时再次回复设备 此时需要携带该参数 
		 * @param more 有更多数据 让设备继续读取
		 * @param ok 执行完成 设备不再上传数据
		 * @param timeout 接受数据时可能超时 
		 */
		result?:"ok" | "more" | 'timeout'
	}

	/** 接受读取锁内日志数据 */
	type mqtt_readRecord = mqtt_readRecord_send & {
		/** 锁内总共记录数量 */
		totalnum:number
		/** 本次推送的记录数量 */
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

	/** 清空锁内所有授权接口 */
	type mqtt_clearAuth_send = mqtt_lock_base & {
		/** 命令 */
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

	/** 添加卡券授权 */
	type mqtt_authCard_send = mqtt_lock_base & {
		/** 命令 */
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
	/** 添加密码授权 */
	type mqtt_authPassword_send = mqtt_lock_base & {
		/** 命令 */
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
	/** 添加授权统一回调 除了命令 */
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
	/** 添加卡券授权回调 */
	type mqtt_authCard = atuh_base & {
		/** 命令 */
		cmd:"authCard"
	}
	/** 添加密码授权回调 */
	type mqtt_authPassword = atuh_base & {
		/** 命令 */
		cmd:"authPassword"
	}
	/** 清除授权回调字段 */
	type mqtt_clearAuth = Omit<mqtt_clearAuth_send,"authType"> & Pick<mqtt_lockCmd,"result">;
	/** 接收到的所有指令合集 */
	type mqtt_all_cmd_red = mqtt_authCard | mqtt_authPassword | mqtt_clearAuth | mqtt_heartbeat | mqtt_gatewayInfo | mqtt_configGateway | mqtt_addLock | mqtt_getLockInfo | mqtt_lockCmd | mqtt_readRecord;
	/** 可以发送到指令合集 */
	type mqtt_all_cmd_send = mqtt_authPassword_send | mqtt_authCard_send | mqtt_clearAuth_send | mqtt_readRecord_send | mqtt_heartbeat_send | mqtt_gatewayInfo_send | mqtt_lockCmd_send | mqtt_configGateway_send | mqtt_addLock_send | mqtt_getLockInfo_send;
	/** 系统用户相关Base字段 */
	interface sm_user_base 
	{
		/** 用户昵称 */
		nickname?:string
		/** 用户头像地址 */
		avatar?:string
		/** 用户手机号码 */
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
	/** 微信合并下单子订单数据模型 */
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
	/** 微信支付回调通知解析后的参数 */
	interface WxPayNotifyV3
	{
		/** 通知ID  唯一 */
		id:string
		/** 通知时间 iso8601时间 */
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
		/** 回调摘要 目前显示支付成功 */
		summary:string
		/** 支付回调主要数据 */
		resource:WxPayNotifyV3Resource
	}
	/** 微信支付回调通知解析后的参数resource */
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
		/** 支付者信息 */
		payer:
		{
			/** 用户在服务商下的openid */
			sp_openid:string
			/** 用户在子商户下的openid */
			sub_openid:string
		}
		/** 订单金额 */
		amount:
		{
			/** 总金额 单位 分 */
			total:number
			/** 用户支付金额 单位 分 */
			payer_total:number
			/**
			 *  货币类型 
			 * @param CNY 人民币
			 */
			currency:string
			/** 用户支付币种 CNY 人民币 */
			payer_currency:string
		}
	}
	/** 大客户充值方法参数约束 */
	interface RechargeE23MoneyParameter{
		/** 大客户ID */
		eid:number,
		/** 充值金额 */
		price:number
		/** 赠送金额 - 前端传来可用于验证 */
		give?:number 
		/** 操作人UID */
		operator_uid:number 
		/** 调用方法的角色 */
		role: "C1" | "E1"
	}
	/** 用户端页面相关接口约束 start */
	interface RoleFinance extends SelectDatePar {
		/** 分页大小 */
		size:number
		/** 分页页码 */
		page:number
		/** 身份ID */
		role_id:number
		/** 商圈ID */
		cid:number
	}
	/** 调用选择时间组件参数 */
	interface SelectDatePar{
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
	}
	/** 充值余额方法参数 */
	interface RechargeYueParameter{
		/** 被充值用户UID */
		uid:number
		/** 充值金额 */
		price:number
		/** 调用方法的角色 */
		role:'e1' | 'd1' | 'c1'
		/** 角色关联ID 门店ID - 合伙人ID - 商圈ID */
		sid:number
		/** 商圈ID */
		cid:number
		/** 操作管理员Uid */
		s_uid:number
	}
	/** 充值门店专用余额方法参数 */
	interface RechargeStoreYueParameter{
		/** 调用方法角色 */
		role:'d1',
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
	}

	interface E111{
		id:number
		/** 商圈名称 */
		c_name:string
		/** 合伙人微信头像地址 */
		avatar:string
		/** 合伙人ID */
		id:number
		/** 所属公司ID */
		cp_id:number
		/** 添加本身份的上级管理UID */
		add_uid:number
		/** 合伙人名称 */
		name:string
		/** 合伙人联系电话 */
		phone:string
		/** 当前身份所归属的上级身份ID */
		root_role_id?:number
		/** 当前身份类型ID - C1 D1 */
		role_id?:number
		/** 当前身份所属行业ID */
		type_id?:number
		/** 用户UID */
		uid:number
		/** 合伙人是否拥有投资门店权限 */
		is_E2:number
		/** 投资门店数据列表 */
		E2list?:any[]
		/** 合伙人是否拥有发卡权限 */
		is_E3:number
		/** E3数据 */
		E3?:tb.kxyk_mch_role_e2e3_auth
		/** 加入合伙人时间戳 */
		time:number
		/** 大客户余额 */
		money:number
		/** 授权金额 */
		money_auth:number
	}
	/** 门店所有服务和商品价格 普通价格 会员价格 等级会员价格 */
	interface StoreGoodsPrices{
		/** 商品ID */
		id:number
		/** 项目id */
		item_id:number
		/** 商品或服务名称 */
		goods_name:string
		/** 是否多规格 */
		is_spec:number
		/** 商品游客价格 */
		price:number
		/** 商品普通会员价格 */
		v_price:number
		/** 商品是否有等级会员价格 */
		is_vip_price:number
		/** 车型名称 - 规格名称 */
		spec_name:string
		/** 服务名称 - 洗车 发动机清洗.. */
		suk_name:string
		/** 项目名称 - 普洗 精细.... */
		item_name:string
		/** 项目游客价格 */
		i_price:number
		/** 项目普通会员价格 */
		i_v_price:number
		/** 项目是否有等级会员价格 */
		iis_open_vip:number
		/** 等级会员价格列表 */
		vip_price_list?:{name:string,price:number}[]
		/** 前端佣金相关 */
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
		/** 自定义分佣数值 - 关联moda_type 支持两位小数点*/
		mode_number?:number
	}
	/** 购卡活动发放卡券方法参数 */
	interface GiveCouponActivity
	{
		/** 购买活动、申领活动表的ID - kxyk_mch_coupon_activity_user 
		 *  或者股东ID
		*/
		cauid:number,
		/** 购买或申领活动的用户UID */
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
		/** 支付金额 */
		pay_price:number
		/** 补交金额 */
		add_pay:number
		/** 操作员工UID 0 = 用户自主操作 */
		staff_uid:number
		/** 门店ID */
		sid:number
		/** 商圈ID 合伙人使用 */
		cid?:number
		/** 股东ID */
		eid?:number
	}
	/** 购买卡券活动表 */
	interface StoreCouponActivity
	{
		id:number,
		/** 商圈ID */
		cid:number,
		/**
		 * 活动状态
		 * 0 = 已暂停
		 * 1 = 正常
		 */
		status:number,
		/** 活动名称 */
		title:string,
		/** 销售金额 - 不关联卡券的结算金额 */
		price:number,
		/** 卡券ID列表 */
		coupons:number[] | string | string[],
		/** 添加任务时间戳 */
		time:number
		/** 前端展示活动地址 */
		url?:string
		/** 前端展示卡券列表 */
		couponsList?:any
		/** 
		 * 新支付模式 - 多选
		 * pay1 = 线下申领
		 * pay2 = 余额支付
		 * pay3 = 微信支付
		*/
		pay_mode:string | string[]
		/** 是否开启补交金额 */
		is_premium:number,
		/** 补价差价金额 */
		premium:number,
		/** 是否有发卡权限 C1 端配置门店或者股东适用 */
		is_grant?:number,
	}
	/** 员工表字段约束 */
	interface D1Staff{
		id?:number,
		/** 门店ID */
		store_id:number
		/** 用户ID */
		uid:number
		/** 添加用户的管理ID */
		add_uid:number
		/** 是否店长 */
		is_shopkeeper:number
		/** 是否有处理店铺任务的权限 */
		is_task:number
		/** 是否允许发放营销卡券 */
		is_give:number
		/** 员工昵称 */
		nickname?:string
		/** 员工头像 */
		avatar?:string
		/**  */
		give_numb?:any
	}
	/** 二维码组件参数 */
	interface ScanCom {
		/** 扫码页面显示的文字 */
		str?:string,
		/** 提示内容 */
		str2?:string,
		/** 是否打开显示二维码 */
		open:boolean,
		/** 二维码是否被扫描 */
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
		/** 是否点击背景关闭二维码 */
		close:boolean
		/** 要传送的数据 - 转换base64 1K以下 */
		db?:any
		/** 调用角色 */
		role?:string
	}
	/** 检测和使用卡券返回字段约束 */
	interface CheckCouponIsUsedResult
	{
		/** 是否错误 */
		err:boolean,
		/** 错误文本 */
		msg:string,
		/** 返回卡券检测状态 */
		db:{
			/** 卡券类型 0 = 检测错误  1 = 兑换券 2 = 低值券 */
			coupon_type:number,
			/** 低值总金额 - 为低值券时，多张抵制券的总金额 */
			actual_price:number,
			/** 是否渠道 */
			is_channel:boolean,
			/** 渠道名称 */
			channel_name:string,
		}
		
	}
	/** 前端选择商品时的卡券列表 */
	interface HasCouponList
	{
		/** 卡包ID */
		pid:number,
		/** 同类卡包名称 */
		label:string,
		/** 卡券列表 */
		list:CouponUser[],
	}
	/** 开薪怡客数据库用户字段 */
	/** 开薪怡客商圈用户资金变动数据字段 */
	interface kxykCircleMemberFundLog
	{
		id?:number;
		/** 用户ID */
		uid:number;
		/** 商圈ID */
		cid:number;
		/** 门店ID */
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
		/** 业务类型 1 = 获得卡券 2 = 获得期卡 */
		type_str?:string;
		/** type = 1 时挂载的卡券数据 */
		coupon?:CouponUser;
		/** type = 2 时挂载的期卡数据 */
		annual?:kxykAnnualUser;
		/** type = 11 时 挂载退款数据 */
		refund?:tb.kxyk_user_pay_log_refunds
		/** type = 3 时挂载的订单数据 */
		order?:OrderDetall[]
		/** 
		 * 挂载充值日志
		 * @property type = 4 微信在线充值
		 * @property 管理员充值没有plID
		 */
		pay_log?:tb.kxyk_user_pay_log
		/** 业务关联ID */
		eid:number;
		/** 日志消息体 */
		msg:string;
		/** 记录时间 */
		t1:number;
	}
	/** 开薪怡客期卡基表声明 */
	interface kxykAnnual {
		/** ID */
		id?:number;
		/** 期卡名称 */
		name:string;
		/** 结算价格 */
		price:number;
		/** 可用次数 0 = 无限次 */
		count:number;
		/** 期卡类型 0 = 月卡 1 = 年卡 */
		type:number;
		/** 可用期限 关联期卡类型 type */
		term:number;
		/** 商圈ID */
		cid:number;
		/** 可用商品范围 item or goods ID */
		goods:string;
		
	}
	/** 开薪怡客用户期卡基表 */
	interface kxykAnnualUser{
		/** id */
		id?:number;
		/** 关联期卡表ID */
		aid:number;
		/** 获得期卡用户ID */
		uid:number;
		/** 获得期卡渠道 0 = 从门店获取 1 = 从股东处获取 */
		give_type:number;
		/** 获得渠道ID 关联渠道类型 门店ID 或 股东ID 等 */
		give_id:number;
		/** 发放期卡的管理员 UID 门店下管理员UID 或 股东UID */
		give_uid:number;
		/** 期卡是否可用 0 = 不可用 1 = 可用 */
		status:number;
		/** 获得期卡时间戳 */
		t1:number;
		/** 期卡到期时间戳 获得期卡时计算得到 */
		t2:number;
		/** 已使用期卡次数 */
		use_count:number;
		/** 期卡失效时间 */
		end_time:number;
		/** 期卡可用数量 */
		count?:number;
		/** 关联基表字段 */
		/** 期卡类型 0 = 月卡 1 = 年卡 */
		type?:number;
		/** 期卡时限 1 2 3 月 或 年 */
		term?:number;
		/** 可兑换列表 */
		goods?:string;
		/** 可兑换服务列表ID */
		i?:number[];
		/** 可兑换物品列表ID */
		g?:number[];
	}
	interface KxykUser
	{
		id:number,
		/** 手机号码 */
		phone:string,
		/** 用户名称 */
		nickname:string,
		/** 用户头像 */
		avatar:string,
		/** 公众号OPENID */
		wx_openid:string,
		/** appOPENID */
		h5_openid:string,
		/** 小程序OPENID */
		cx_openid:string,
		/** unionid */
		unionid:string,
		/** 注册时间 - unix时间戳*/
		add_time:number,
		/** 注册IP  */
		add_ip:string,
	}
	/** 创建新用户字段约束 */
	interface CreateUser
	{
		/** 手机号码 */
		phone:string,
		/** 用户名称 */
		nickname?:string,
		/** 用户头像 */
		avatar?:string,
		/** 用户状态 是否禁止用户登录  */
		status:number,
		/** 公众号OPENID */
		wx_openid?:string,
		/** appOPENID */
		h5_openid?:string,
		/** 小程序OPENID */
		cx_openid?:string,
		/** unionid */
		unionid?:string,
		/** 注册时间 - unix时间戳*/
		add_time:number,
		/** 注册IP  */
		add_ip:string,
		/** 登录密码 */
		pwd?:string

	}
	/** 财务结算表字段约束  
	 *  基于商圈跟各门店、合伙人结算
	 * 	profit_payable = 0 为门店或合伙人收益 = 1 为门店或合伙人上交 
	*/
	interface Finance
	{
		/** ID !断言 */
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
		/** 商圈ID - 所有参数数据都基于商圈结算 */
		cid:number,
		/** 门店ID - 收支门店 */
		sid:number,
		/** 合伙人ID - 股东大客户 E2E3 ID */
		shareholder_id:number,
		/** 收支金额 */
		price:number,
		/** 支付用户 - 选填 - 关联业务 */
		pay_uid?:number,
		/** 
		 *  0 = 商圈支出 
		 * 	1 = 商圈收益
		 */
		profit_payable:number,
		/** 数据产生时间 - 字符串 */
		time:string,
		/** 数据产生时间 - 时间戳 */
		time_unix:number,
		/** 
		 * 操作员 - 选填
		 * 门店下级管理员UID 
		 * 或者C1 C2管理员UID 
		 */
		operator_uid:number,
		/** 是否结算 0 = 没有结算 1 =等待结算（已申请） 2 = 结算完成  */
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
		/** 文字说明 */
		info:string,
		/** 关联kxyk_user_pay_log 支付日志表 */
		pl_id?:number
		/** 
		 * 商圈和平台结算 
		 * @param 0 = 没有结算 
		 * @param 1 = 正在结算 
		 * @param 2 = 结算完成
		 */
		a1_check?:number

	}
	/** 发放卡包参数  */
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
		/** 发卡ID 门店ID或股东ID或活动ID */
        get_id:number,
		/** 卡券所属商圈 */
        cid:number,
		/** 发卡人用户ID */
        get_uid:number,
		/** 获得卡券用户ID */
		uid:number,
		/** 卡包ID */
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
		/** 发卡活动ID - 团购活动ID为用户购买之后订单ID */
		act_id?:number
		/** 团购项目ID */
		act_p_id?:number
		/** 门店手动发放活动卡时扩展的上缴金额 - 根据活动配置 */
		act_price?:number
		/** 迁移老卡ID */
		ocid?:number
		/** 用户中将表ID */
		prize_id?:number
		/** 洗浴大厅ID  */
		hid?:number
		/** 会员开牌赠卡规则ID - 关联kxyk_mch_store_vip_gift_rules表 */
		gift_rules_id?:number
		/** 
		 * 订单详情ID 
		 * 1.发放套卡时捆绑的订单详情ODID
		 */
		odid?:number
	}
	/** 平台用户卡券字段约束 */
	interface CouponUser
	{
		/** 卡券是否灰色显示 - 用户前端显示 - 用户购买卡券时显示 */
		is_grey?:number,
		/** 卡券显示灰色原因 - 用户前端显示 - 用户购买卡券时显示 */
		grey_msg?:string,
		/** ID */
		id?:number,
		/** 卡券名称 */
		name:string,
		/** 卡券状态 0=待使用 1=已使用 2=已过期 */
		status:number,
		/** 领取时间 - 字符串 */
		get_time:string,
		/** 领取时间 10位时间戳 */
		get_time_unix:number,
		/** 使用时间 - 字符串 */
		use_time?:string,
		/** 使用时间 10位时间戳 */
		use_time_unix?:number,
		/** 使用方式 0=未使用 1=兑换使用 2=低值使用 */
		use_mode:number,
		/** 兑换时显示面额 */
		show_price?:number,
		/** 低值时低值金额 */
		actual_price?:number,
		/** 是否兑换 */
		is_exchange?:number,
		/** 可兑换列表 */
		exchange_list?:tb.kxyk_coupon_exchange_low[],
		/** 是否低值 */
		is_low?:number,
		/** 是否可以叠加其他低值券一起使用 */
		is_low_multiplex?:number,
		/** 可低值列表 */
		low_list?:tb.kxyk_coupon_exchange_low[],
		/** 卡券所属商圈 */
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
		/** 卡券在哪个门店使用 使用门店ID */
		use_sid?:number,
		/** 卡券所属用户ID */
		uid:number,
		/** 卡券所属卡包ID */
		pid:number,
		/** 卡券可用次数 */
		count:number,
		/** 已用次数 */
		used_count:number,
		/** 根据卡包计算后的有效期时间戳 */
		validity_time_unix:number,
		/** 根据卡包计算后的有效期字符串 */
		validity_time:string,
		/** CU里缓存卡包下的有效天数，防止卡包修改后无法对应 */
		use_day:number,
		/** 卡券是否锁定状态 */
		is_lock:number,
		/** 是否需要补差价 */
		is_rep:number,
		/** 需要补充的差价金额 */
		rep_price?:number,
		/** 收取差价的管理员UID */
		rep_staff_uid?:number,
		/** 收取补价时间 - 时间戳 10位 */
		rep_time?:number,
		/** 解锁时间 */
		unlock_time?:string,
		/** 满多少可以使用抵值券 - 卡包字段 */
		full_low_price?:number,
		/** 可使用抵值券的数量 - 卡包字段 */
		is_low_count?:number,
		/** 是否在订单中被选择 - 虚拟字段 */
		is_select?:number,
		/** 是否属于渠道卡券 - 卡包字段 */
		is_channel?:number,
		/** 渠道名称 - 卡包字段 */
		channel_name?:string,
		/** 是否转赠卡券 */
		is_transfer:number,
		/** 转赠卡券用户的UID */
		transfer_uid:number,
		/** 转赠时间 - 字符串格式 2022-02-01 */
		transfer_time:string
		/** 赠送用户头像 */
		av1?:string,
		/** 被送用户头像 */
		av2?:string,
		/** 前端显示 - 关联商品时的卡券类型 -  0 = 低值 1 = 兑换 */
		[x:string]:any,
		/** 转增卡券前端显示 - 是否赠送被选中 */
		is_select_transfer?:boolean
		/** 是否迁移老系统卡券 */
		is_relocate?:number
		/** 发卡活动ID 团购活动ID tuid 
		 * @param 洗浴后台发卡时持卡人日志表ID 2026-06-08 kxyk_coupon_cardholder_log
		*/
		act_id?:number
		/** 团购活动项目ID */
		act_p_id?:number
		/** 被迁移的老系统卡券ID */
		relocate_id?:number
		/** 关联用户中奖表ID */
		prize_id?:number
		/** 
		 * 订单详情ID 
		 * 1.发放套卡时捆绑的订单详情ODID
		 */
		odid?:number
	}

	/** 平台卡包字段约束*/
	interface CouponPack
	{
		[x:string]:any,
		id?:number,
		cid?:number,
		/** 卡包名称 */
		name:string,
		/** 销售金额 */
		price:number,
		/** 实际价格 - 每张卡券 */
		/** 卡包内有多少卡券 - 单位张 */
		count:number,
		/** 卡包内的卡券每张可使用次数 */
		use_count:number,
		/** 是否渠道 0 or 1 */
		is_channel?:number,
		/** 渠道名称 */
		channel_str?:string,
		/** 是否核销 */
		is_verification?:number,
		/** 是否仅拓新分佣 - 只有新用户购买卡券时分佣 0关闭 1开启 */
		is_new_user_commission:number,
		/** 分佣单位 百分比或者实际金额  0=百分比 1=实际金额*/
		commission_type:number,
		/** 分佣金额 - 关联分佣单位 */
		commission:number,
		/** 卡包发放数量 - 超过数量无法发放 */
		issued_count:number,
		/** 当前卡包已经发放数量 */
		issued_has:number,
		/** 票面金额 - 用户领取后显示的卡券金额(兑换券根据总售价计算卡券面额显示) */
		show_price:number,
		/** 低值券配置模式 0 = 通用型(所有券使用相同低值金额) 1 = 手动配置（单独配置每张券的低值金额） */
		actual_type:number,
		/** 抵值券实际价值 用于订单低值时的真实面额 自动模式所有卡券统一该值*/
		actual_price:number,
		/**  领取用户限制 0=所有用户 1=仅新用户可领取该卡*/
		user_get_authority:number,
		/** 兑换开关 */
		is_exchange:number,
		/** 该卡包下的卡券可以兑换的门店和商品 - 这里扩展二三级结构 */
		exchange?:any,
		/** 兑换组件左窗口选择数据 */
		exchange_left?:any[],
		/** 兑换组件右窗口选择数据 */
		exchange_right?:any[]|string,
		/** 消费满多少时可以低值 */
		full_low_price:number,
		/** 单次可用于低值的卡券数量  */ 
		is_low_count:number,
		/** 卡包下的卡券是否可以低值金额 0 = 不可以低值（计算得到该值） 1=有低值区域和商品 */
		is_low:number,
		/** 低值券是否可以叠加其他抵制券使用 */
		is_low_multiplex:number,
		/** 可以低值的门店和商品 - 这里扩展二三级结构 */
		low?:any,
		/** 低值组件左窗口选择数据 */
		low_left?:any[],
		/** 低值组件右窗口选择数据 */
		low_right?:any[]|string,
		/** 卡券发放规则 发放时间 0 = 立即发放 1 = 每周一发放 2 = 每月一号 自定义发放时间为10位时间戳*/
		issuing_rule:string,
		/** 活动期限(自动发卡周期只在活动期限，可以发放的卡券也只能显示在活动期限内) 开始日期 - 结束日期 不填为长期 (10位时间戳) */
		issuing_start:string,
		issuing_end:string,
		/** 卡券使用期限 默认领取后1年内可使用 - 或者手动输入一个有效天数*/
		use_day:number,
		/** 截止日期 卡券不受自身有效期影响 总的截止到期后 所有卡券都过期 - 时间戳 */
		use_end:string,
		/** 是否允许赠送他人 */
		is_give:number,
		/** 门店是否拥有发放权限 */
		is_grant?:number,
		/** 卡券排序 */
		sort?:number,
		/** 是否补价卡 */
		is_rep:number,
		/** 补价说明 */
		rep_msg?:string,
		/** 当前用户拥有数量 */
		has_count?:number,
		/** 当前用户拥有已使用或已过期卡券数量 */
		has_used_count?:number,
		/** 补价金额 */
		rep_price?:number,
		/** 卡券列表 */
		coupon?:{
			/** 卡券面额 */
			show_price:number,
			/** 低值金额 */
			actual_price:number,
		}[],
		/** 前端发卡时一次性发放数量 */
		give_count?:number
		/** 前端删除时一次性删除数量 */
		del_count?:number
	}
	/** 门店内存用户整体约束 */
	interface store_memory_user{
		/** 所有用户列表 */
		AllList:sm.StoreMember[],
		/** A列表 */
		Alist:sm.StoreMember[],
		/** B列表 */
		Blist:sm.QueueList[],
		DelayList:sm.StoreMember[],
		[x:string]:any
	}
	/** 门店数据库表约约束 */
	interface store
	{
		id:number,
		/** 门店名称 */
		name:string,
		/** 倒号排队过期等待时间 */
		user_queue_expire:number,
		/** 完成服务灰色等待时间 */
		user_end_expire:number,
		/** 提前几人开始通知 */
		user_queue_notice:number,
		/** 门店地址 */
		address:string,
		/** 门头照片 */
		img:string,
		/** 结算比例 */
		scale:number,
		/** 门店联系人电话 */
		phone:string,
		/** 门店开始营业时间 */
		operate_start:string,
		/** 门店结束营业时间 */
		operate_end:string
		/** 门店经纬 */
		lat:string,
		/** 门店经纬度 */
		lng:string,
		/** 门店状态 0=暂停营业 1=正常营业 2=停业维护*/
		status:number,
		/** 停业说明 */
		status_msg:string,
		/** 门店分类 */
		type:number,
		/** 商圈ID */
		cid:number

	}
	/** 门店各类消息字段约束 */
	interface StoreNotice
	{
		/** 消息ID */
		id?:number,
		/** 消息类型 1=用户扫码付款请求 */
		type:1|2,
		/** 门店ID 0=通用公共 */
		sid:number,
		/** 用户ID */
		uid:number,
		/** 付款订单ID */
		order_id?:number,
		/** 消息是否需要管理员处理 0=不需要处理 1=需要处理 */
		is_solve:0|1,
		/** 消息处理状态 0 = 等待处理 1 = 已同意 2 = 已拒绝 */
		solve:0|1|2,
		/** 处理消息的管理员ID */
		d1_uid?:number,
		/** 消息创建日期 */
		time:int,
		/** 消息体 255字符 */
		msg:string,
	}

	/** 车型字段约束 */
	interface CarType {
		/** 车型ID */
		id: number,
		/** 车型名称 */
		name: string,
		/** 车型说明 */
		spec_name: string,
		/** 车型是否可选 */
		is_select?:boolean,
	}
	//用户端sIndex首页
	interface Sindex {
		/** 页面名称 */
		pageName: string,
		/** 门店ID */
		id: number,
		is_error: boolean,
		/** 是否在同步中 */
		is_sync:boolean,
		/** 是否到店 */
		in: boolean,
		error_title?: string, error_msg?: string,
		/** 门店数据 包含门店数据下用户会员数据 */
		Store: Store,
		/** 车型列表 */
		CarType: CarType[],
	}
	/** 通知D1事件 */
	interface action_d1
	{
		/** 消息通知   请求支付  */
		type:"notice"|"ask_pay",
		db:any,
	}
	interface SearchUser{
		/** 是否打开搜索框 */
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
		/** 商圈ID必填 */
		cid:number,
		/** E1端调用时刷新列表 */
		ref?:boolean,
	}
	//D1端页面数据结构约束
	interface PageD1 {
		/** 页面名称 */
		pageName: string,
		/** 页面权限是否已经准备好 */
		status:boolean,
		/** 门店数据 */
		Store: Store,
		/** 是否老板访问 */
		is_boss:boolean,
		/** 是否在同步中 */
		is_sync:boolean,
		/** 控制刷新门店通知 */
		is_up_notice:boolean,
		/** 页面是否有错误 */
		is_error: boolean,
		error_title?: string, error_msg?: string,
		/** 是否显示用户首页组件 */
		is_show_user:boolean,
		/** 是否显示设置到店状态模态框 */
		is_set_coms:boolean,
		/** 当前准备设置到店状态的用户ID */
		has_set_coms_id:number,
		/** 车型列表 */
		CarType: CarType[],
		/** 侧边栏是否打开 */
		Sidebar: boolean,
		/** 内存门店数据 */
		Store_: Store_,
		/** 打开摄像头组件 */
		CameraComs:{open:boolean}
		/** 搜索会员组件数据 */
		SearchUser:SearchUser
		/** 购卡活动组件数据 */
		CouponActivity:{open:boolean,refresh:boolean}
		/** 数据统计活动组件参数 */
		Statistics:{refresh:boolean}
		/** 加载数据统计控制 - 权限完成才能加载 */
		is_d1:boolean
	}
	/** 排序排队列表 支持多队列 */
	interface SortQueueList{
		/** 队列名称 精洗 普洗 */
		item_name:string,
		/** 排队人数 */
		queue_count:number,
		/** 是否可以升级 */
		is_up?:boolean,
		/** 升级字符串 */
		up_str?:string,
		/** 服务人数 */
		server_count:number,
		/** 队伍列表 */
		list:QueueUserList[],
	}
	interface QueueList
	{
		/** 商品id */
		goods_id:number,
		/** 商品名称 */
		goods_name:string,
		/** 服务名称 */
		suk_name:string,
		/** 项目名称 */
		item_name:string,
		/** 排队用户数量 */
		queue_count:number,
		/** 服务用户数量 */
		server_count:number,
		/** 用户列表 */
		list:StoreMember[],
		/** 后台配置的服务时长 - 分钟 */
		service_time:number,
		/** 汇总项目价格 用于区分一键升级 */
		price?:number,
		/** 是否可以升级服务 */
		is_up?:boolean,
		/** 升级名称 */
		up_str?:string,
	}
	/** 门店内存数据 */
	interface Store_ {
		/** 所有用户数据 */
		AllList:StoreMember[],
		/** 付款后 服务超时没有完成的列表 - 包括没有开始服务 和开始服务后没有完成 */
		DelayList:StoreMember[];
		/** 进店用户 - 还没有列队 - 包括没有完善资料的用户 - 会员却还没下单用户 - 订单内不包含列队服务用户 */
		AList:StoreMember[],
		/** 正在排队用户列表 - 包括 下单成功 开始服务 等待结束服务用户 */
		BList:QueueList[],
		/** 营业汇总 - 带有时间查询条件 */
		Summary:any[],
		/** 今日订单  */
		DayOrder:any[],
		/** 门店当前可用授信额度 -实时计算 */
		sxed:number
		/** 店员员工相关 */
		Staff:{
			/** 今日签到人数 */
			count:number,
			/** 员工能列表 暂时没有约束后续定义 */
			list:any[]
		}
	}
	/** 门店数据 包含门店数据下用户会员数据 */
	interface Store {
		/** 门店ID */
		id: number,
		/** 门店名称 */
		name: string,
		/** 门店门头照片 */
		img: string,
		/** 门店详细地址 */
		address: string,
		/** 门店经度 */
		lat: string,
		/** 门店维度 */
		lng: string,
		/** 门店开始营业时间 */
		operate_start: string,
		/** 门店结束营业时间 */
		operate_end: string,
		/** 门店营业状态 */
		status: number,
		/** 门店停业说明 */
		status_msg: string,
		/** 门店联系电话 */
		phone: string,
		/** 门店下属当前用户会员信息 */
		StoreMember: StoreMember,
		/** 门店关注总人数 */
		FollowCount?: number,
		/** 所属商圈ID */
		cid: number,
		/** 商品列表 */
		goods: good[],
		/** 扩展-当前页面所选车型 */
		has_type_car:string,
		/** 倒号排队过期等待时间 */
		user_queue_expire:number,
		/** 完成服务灰色等待时间 */
		user_end_expire:number,
		/** 提前几人开始通知 */
		user_queue_notice:number,

	};
	/** 用户车牌 */
	interface UserCarMember
	{
		/** 车牌ID */
		id:number,
		/** 车牌号码 */
		number:string,
		/** 车型ID */
		type:number,
		/** 车型名称 */
		name:string,
		/** 是否显示 */
		is_show: boolean 
		/** 是否选中当前车牌，用于区分那个车牌下单 */
		is_select?:boolean
		/** d1端切换车牌选中变量 */
		sw_select?:boolean
		/** D1端区分当前车牌是否新增 - 新增属性用户动态数组 */
		is_add?:boolean
	}
	/** 共享身份字段约束 */
	interface SharedRole{
		/** 用户UID */
		uid:number,
		/** 共享身份用户UID */
		s_uid:number,
		/** 共享身份名称 */
		nickname:string
		/** 共享身份头像 */
		avatar:string
		/** 共享身份余额 */
		money:number
		/** 共享身份电话 */
		phone:string
		/** 是否允许共享余额 */
		is_money:number
		/** 是否允许共享门店专用余额 */
		is_s_money:number
		/** 共享身份门店专用余额 */
		s_money:number
		/** 是否允许共享卡券 */
		is_coupon:number,
		/** 是否允许共享身份 */
		is_role:number
		/** 共享身份车牌列表 */
		car:UserCarMember[]
		/** 共享身份下可用卡券 */
		coupons:CouponUser[],
		/** 共享身份下可用卡券数量 */
		coupon_count?:number
		/** 会员ID */
		vip:number
		/** 会员名称 */
		vip_name:string
	}
	/** 门店下会员 */
	interface StoreMember {
		id?:number,
		/** 用户ID */
		uid: number,
		/** 共享其他用户身份列表 */
		share_list?:  false | SharedRole[],
		/** 是否游客 */
		is_guest?:boolean,
		/** 是否关注门店 */
		is_follow: number,
		/** 是否到店 */
		is_coms: boolean,
		/** 用户下单状态 0 没有下单 1正在首次下单 2正在加单 3下单完成 */
		is_make_order:number,
		/** 用户在门店状态 0进店 1进店且抽取号码 2进店排队且下单 3已支付 4下单后已开始服务 5服务完成 */
		status: number,
		/** 是否需要注册 */
		is_reg: boolean,
		/** 用户手机号码 */
		phone: string,
		/** 商圈ID - Cid */
		cid: number,
		/** 用户昵称 */
		nickname: string,
		/** 用户头像 */
		avatar: string,
		/** 用户余额 */
		money: number,
		/** 门店专用余额 */
		s_money:number,
		/** 总充值余额 */
		r_money:number,
		/** 会员名称 */
		vip_name:string,
		/** vip id */
		vip: number,
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
		/** vip是否允许插队 */
		vip_jump:number,
		/** 用户车牌列表 */
		car: UserCarMember[],
		/** 当前选择车牌 - 用于下单时区分多车牌 */
		/** 用户当前购物车 */
		shoping_car: ShopingCar,
		/** 用户卡券列表 */
		coupons: CouponUser[],
		/** 2024-03-15扩展 - 缓存自己的卡券 - 用于多身份共享 */
		coupons_cache: CouponUser[],
		/** 缓存VIP */
		vip_cache:number,
		/** 缓存VIP名字 */
		vip_name_cache:string,
		/** 缓存余额 */
		money_cache:number,
		/** 门店专用余额 */
		s_money_cache:number,
		/** 用户期卡列表 */
		annual:kxykAnnualUser[],
		/** 订单相关 */
		order?:Order
		/** 是否被通知 值=通知时间 */
		is_notice?:number,
		/** 是否被记录重新抽号 0=不用重新抽号 时间戳=记录时间 需要重新抽号 */
		is_again_queue?:number,
		/** 是否代客下单 */
		is_valet?:boolean,
		/** 是否快速管理 */
		is_fast?:boolean,
		/** 性别 */
		sex?:number,
		/** 登录密码 */
		pwd?:string,
		/** 真实姓名 */
		real_name?:string,
		/** 出生日期 */
		birthday?:string,
		/** 扩展member 下的银行卡字段 */
		bank_number?:string
		/** 身份证号 */
		card_id?:string
		/** 用户汽车照片URL */
		car_photo?:string,
		/** 用户标签列表 */
		tags?:tb.kxyk_circle_member_tags[]
		/** 临时添加的TGS */
		tags_tem?:[]
		/** 是否显示迁移界面 */
		is_show_move?:boolean
		/** 会员职业 */
		job?:string,
		/** 当前用户是否选择了共享身份 - 共享其他用户的UID */
		shared_uid?:number,
		/** 排队信息 */
		queue?: {
			/** 排队号码 */
			number: string,
			/** 排队时间 */
			time: string,
			/** 前车数量 */
			before: {
				/** a1 之前等待总车辆 */
				a1:number,
				/** a2 店内等待数量 */
				a2:number,
				/** 预约等待数量 */
				a3:number,
			},
			/** 还需等待时间 */
			waiting_time: number,
			/** 自身之前的排队列表 */
			list?:SortQueueList[],
		},
	}
	/** 排队列表项约束 */
	interface QueueUserList
	{
		/** 用户ID */
		uid:number,
		/** 用户车牌 */
		car_number:string,
		/** 是否到店 - 用于颜色计算 */
		is_coms:boolean,
		/** 排队号码 */
		number:string,
		/** 等待时间 */
		time:string,
		/** 颜色状态 */
		status:number,
		/** 车型 大中小型 */
		car_type:string,
		/** 是否自己 */
		is_me?:boolean,
		/** 是否VIP */
		vip:number,
		/** 是否可以插队 */
		vip_jump:number,
	}
	/** 用户购物车 */
	interface ShopingCar {
		/** 购物车内优惠字段 */
		discount: number,
		/** 购物车余额字段 */
		yue: number,
		/** 购物车现金字段 */
		cash: number,
		/** 当前购物车关联车牌号码 */
		car_number:string,
		/** 购物车详细条目 */
		glist: ShopingCarItem[]
		/** 添加下单员工ID */
		clerk_id?:number
	}
	/** 购物车商品项目 */
	interface ShopingCarItem {
		/** 商品ID */
		goods_id: number
		/** 商品名称 */
		goods_name: string,
		/** 是否多规格 */
		is_spec: number,
		/** 是否只能现金购买 */
		is_cash?:number
		/** 商品是否使用优惠券 - 有值就是优惠券ID */
		coupon_id: number,
		/** 商品是否使用优惠券 - 优惠ID列表 */
		coupon_ids:number[],
		/** 优惠券类型 0 = 没有使用优惠券 1 = 兑换券 2 = 抵值券 */
		coupon_type:number,
		/** 当前用户身份购买时的价格 - 单价*数量的总价 */
		price:number
		/** 优惠金额 */
		discount:number
		/** 购买数量 */
		count: number,
		/** 规格ID */
		spec_id?: number,
		/** 规格名称 */
		spec_name?: string,
		/** 服务项目列表 */
		suk: ShopingCarItemSuk[]
		/** 购物车携带可能的 房型商品 入住房客登记信息 */
		collect?:sm.Com.CollectIDCardBack
		/** 商品新类型 gt 2026-04-24 */
		gt?:number
		/** 当前商品可能绑定的二级库存ID */
		stock_level2_id?:number
		/** 选择的员工ID */
		clerk_id?:number
	}
	/** 购物车 - 服务项目下 -规格 */
	interface ShopingCarItemSuk {
		/** 服务名称 洗车服务*/
		suk_name: string,
		/** 服务ID */
		suk_id: number,
		/** 项目名称  普洗*/
		item_name: string,
		/** 项目ID */
		item_id: number,
		/** 当前身份项目价格 */
		price: number,
		/** 卡券支付优惠金额 */
		discount: number,
		/** 余额支付优惠金额 */
		yue: number,
		/** 现金支付金额 */
		cash: number,
		/** 是否使用优惠券 - 如果有值就是优惠券ID */
		coupon_id: number,
		/** 优惠券使用类型 - 0 = 没有使用优惠券 1 = 兑换券 2 = 低值券 */
		coupon_type:number,
		/** 是否使用期卡 - 如果有值即是期卡ID */
		annual_id:number,
		/** 卡券IDS */
		coupon_ids:number[],
		/** 是否预约项目 */
		is_reserve?:number
	}
	/** 用户端页面 end */



	/** 内存数据通知店铺和用户的参数约束 */
	interface action_user { key: string, val: any }
	interface action_store { 
		uid: number, 
		atype:"edit"|"edit_info"|"join"|"del"|"up_car"|"up_coupons"|"up_car_type"|"up_notice2"|"up_shared_role_list"
		// E1更新售卡记录列表
		| "e1_get_give_list"
		,
		alist: action_user[] 
	}


	/** 多规格商品接口 多规格项目表 start */
	// 属性 -  kxyk_mch_goods_spec_suk_item 表条目
	interface item {

		id: number,
		/** 虚拟字段 商品分类下设置的PSR */
		sub_PSR?:number,
		/** Platform settlement ratio 平台余额结算比例 */
		PSR?:number,
		/** 项目名称 */
		item_name: string,
		/** 游客购买价格 */ 
		price: number,
		/** 没有等级的普通会员购买价格 */
		v_price: number,
		/** 上级项目ID 洗车服务 打蜡镀晶 机舱清理 */
		suk_id: number,
		/** 上级规格ID 小型车 中型车 大型车*/
		spec_id: number,
		/** 上级商品ID  汽车服务 */
		goods_id: number,
		/** 服务结束方式 
		 * 0 = 手动结束
		 * 1 = 自动结束
		 */
		end_type?:number
		/** 结束服务时间间隔 单位分钟 */
		end_time?:number
		/** 当前项目是否使用了卡券 多选ID */
		coupon_ids:number[],
		/** 当前项目是否使用了卡券 - 改为记录期卡ID */
		coupon_id:number|number[],
		/** 卡券类型 0=没有卡券 1= 兑换 2=地址 */
		coupon_type?:number,
		/** 卡券优惠金额  */
		coupon_price?:number,
		/** 当前项目是否使用了包年包月期卡 */
		annaul_id?:number;
		/** 期卡优惠金额 */
		annaul_price?:number;
		/** 是否开启等级会员 */
		is_open_vip:number;
		/** 是否只能现金购买 */
		is_cash?:number
		/** 是否独立配置结算子商户 */
		is_sub_pay?:number
		/** 结算子商户ID 关联 kxyk_mch_store_sub  */
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

		/** 是否开启独立提成设置 20225-12-23扩展 */
		is_bouns?:number
		/** 提成设置数额 */
		bouns?:number
		/** 
		 * 提成金额类型
		 * @param 0 百分比
		 * @param 1 实际数
		 */
		bouns_type?:number
		/** 等级会员价格列表 */
		vips:ItemVipsPrice[];
		/** 项目排序 */
		sort?:number;
		/** 2025-11-12 扩展技师前端使用 */

		/** 当前项目suk名称 */
		suk_name?:string
		/** 技师端显示的价格 */
		show_price?:number
		/** 技师端前端生成可可选卡券列表 用户选择卡券组件 */
		select_coupons?:sm.Com.MultiCouponSelectorCoupon[]
		/** 前端是否显示选择卡券 */
		show_select_coupons?:boolean
		/** 2025-12-12扩展 虚拟字段 - 在新下单时判断是否为预约类型  */
		is_reserve?:number
	};
	interface ItemVipsPrice
	{
		/** 会员名称 */
		vip_name:string,
		/** 会员价格 */
		price:number;
		/** 会员ID */
		vip_id:number;
	}
	/** 2024-10-30 扩展洗浴门店商品列表 */
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
		/** Platform settlement ratio 平台余额结算比例 */
		PSR?: number,
		/** 门店ID */
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
		/** 房型商品绑定的房间ID */
        rooms?:string | number[]
        /**
         * 房型已经使用的房间数量包括：入住+预定+维修
         */
        doom?:number
        /**
         * 当前房型绑定的房间总数
         */
        room_count?:number
		/**  商品副标题 - 房型介绍 1.8米大床 2人入住 等此类信息 */
		goods_name_sub?: string,
		/** 商品名称 */
		goods_name: string,
		/** 前端下单时选择的数量 */
		count: number,
		/** 关联子门店ID 0 = 未关联  kxyk_mch_store_sub */
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
		/** 是否套餐商品订单 - 套餐商品捆绑订单*/
        is_combo?:number
		/** 套餐商品配置的商品或服务ID 直接下单 逗号分割ID */
		combo_list?:string | string[],
		/** 是否套卡商品 下单购买赠送卡券 */
		is_combo2?:number
		/** 套票商品配置的JSON 卡券ID和数量 */
		combo2_list?:string | {id:number,count:number}[],
		/** 销售提成、奖金给服务员 */
		bonus?: number,
		/** 是否多规格 */
		is_spec?: number,
		/** 商品图片 */
		goods_img?: string,
		/** 规格列表 */
		spec: sm.spec[],
		/** 当前规格id */
		has_spec?: number,
		/** 当前规格价格 */
		has_price?: number,
		/** 非多规格商品是否开启会员价购买 */
		is_vip_price?: number,
		/** 是否开启等级会员购买 */
		is_open_vip?:number,
		/** 是否为预约型服务 */
		is_reserve?:number,
		/** 预约型服务是否允许用户自主下单 */
		is_user_buy?:number,
		/** 新的等级会员价格列表 */
		vips:ItemVipsPrice[],
		/** 商品价格 - 完善信息后价格 */
		price?: number,
		/** 会员价格 - 游客价格 */
		v_price?: number,
		/** 排序 */
		sort?: number,
		/** 是否使用优惠券 */
		coupon_id?:number|number[],
		/** 扩展新的可多选优惠券ID */
		coupon_ids:number[],
		/** 优惠券类型 0=没有卡券 1= 兑换 2=低值 */
		coupon_type?:number,
		/** 优惠金额 */
		coupon_price?:number,
		/** 进货价格 */
		import_price?: number,
		/** 出货价格 */
		export_price?: number,
		/** 进货渠道名 */
		import_store_name?: string,
		/** 进货渠道电话 */
		import_store_phone?: number,
		/** 用户购买后是否需要送货 默认送货 */
        is_delivery?:number  
		/** 是否第三方商品 */
		is_other?:number
        /** 关联第三方表ID  kxyk_other_payment */
        other_id?:number
        /** 第三方商品价格 用于团购统计 */
        other_price?:number
		/** 商品详情 图片列表 */
		desc1?: string[] | string
		/** 
		 * 是否只能现金支付
		 * @param 0 = 不限制
		 * @param 1 = 只能现金支付 烟草类
		 */
		is_cash?:number
		/** 前端显示 */
		UiShow?: {
			/** 现金 */
			cash: number,
			/** 余额 */
			yue: number,
			/** 优惠 */
			discount: number,
		},
		/** 前端需要 是否携带入收集的入住客户信息 姓名 电话 身份等 */
		collect?:sm.Com.CollectIDCardBack
		/** 是否二级库存商品 */
		is_secondary_stock?:boolean
		/** 当前二级库存数量 */
		stock?:number
		/** 当前关联的二级库存ID */
		stock_level2_id?:number
	}
	// 服务类前端展示商品列表 实际为商品分类下集成商品列表
	interface good_type { 
		/** 前端UI - 当前分类下选择的子门店ID */
		has_sub?:number,
		has?: string, 
		goods: sm.good[]; 
		label: string; 
		id: number, 
		level: number; 
		root_id: number, 
		children: any[] 
	}
	/** 多规格 end */

	/** 用户位置上报接口 */
	interface location { lat?: number; lng?: number; province?: string; city?: string; district?: string; address?: string; uid?: number; url?: string; ip?: string; os?: string;[index: number]: number; }
	interface resArgs { 
		/** 数据列表 */
		list?:any[],
		/** 数据总条数 */
		count?:number

		msg?: string, 
		__error__?: number, 
		/** 返回状态码 1=成功 0=错误 */
		status?: number; 
		db?: any;
		[x: string]: any; 
	}
	
	/** 前后端传送参数多接口约束 */

	
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
	/** 缓存UserList用户数据 */
	interface CacheUser {
		sid: string, uid?: number, [key: string]: any
	}
	/** 支付模块 - v3 2024-10-+10 */
	interface PayArgsV3
	{
		/** 支付金额 - 支持两位小数点数字 */
		price:number
		/** 
		 * 商品描述 - 购买商品名称等
		 */
		title: string
		/** 支付环境 WX WXAPP APP*/
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
		/** 公司ID */
		cpid?:number
		/** 商圈ID */
		cid?:number
		/** 当前支付用户UID */
		uid?: number
		/** 支付用户数据 */
		user?:tb.sm_user
		/** 支付日志表数据 */
		
		/** 门店ID */
		sid?:number
		/** 支付回调Api接口  */
		api:string
		/** 支付完成后的跳转地址 */
		back_url:string
		/** 如果商户设置了独立收款 - 独立收款商户号码 -独立收款必然是门店收款不处理is_sxed */
		sp_mchid?:string
		/** 扩展字段 可以扩展一个对象参数来保存当前业务相关数据 */
		extend?:{
			uid?:number
			[x: string]: any
		},
	}
	/** 微信支付参数 - 扩展余额支付  */
	interface PayArgs {
		/** 支付金额 - 支持两位小数点的数字*/
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
		/** 支付环境 WX WXAPP APP*/
		ev?: "H5" | "WX" | "WXAPP" | "APP",
		/** 
		 * 支付方式 wxpay alipay bankpay.... ,余额支付需要关联商圈ID
		*/
		mode: 'wxpay' | 'alipay' | 'bankpay' | 'yuepay',
		/** 商圈ID */
		cid?:number,
		/** 用户UID */
		uid?: number,
		/** 支付回调Api接口 */
		api: string,
		/** 当前支付用户 */
		user?: Tabe.User,
		/** 支付日志表数据 */
		PayLog?: Tabe.PayLog,
		/** 扩展字段 可以扩展一个对象参数来保存当前业务相关数据 */
		Extend?: any,
		[x: string]: any,
	}
	interface Utils {
		/**本地主机信息 */
		host: string;
		/** 正则验证 */
		regx: { is_mobile: (n: number) => boolean, is_vehicle_number: (s: string) => boolean };
		/** 系统环境验证 */
		sys: { is_ios: boolean, is_app: boolean, is_wx: boolean, is_wxapp: boolean, os: () => string },
		/** 获得当前用户环境 */
		getEvn: () => string,
		/** 模拟进程等待 */
		sleep: (ms: number) => any,
		// find: (arr: any, obj: object) => object | boolean,
		find: <U extends T,U>(arr: T[], obj: U) => T | boolean,
		getUUID: (len: number) => string,
		AMap: typeof AMAP;
		format: (time: number, str: string) => string;
		format_hh: (time: number) => string;
		format_m: (m: number) => string;
		/** 格式化时间之前 */
		beautifyTime:(m:number)=>string;
		/**计算两个坐标返回差距 单位米 */
		getDistanceFromGCJ02: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
		DOM: {
			/** 或者页面可视区域剩余高度 参数为要计算的class明数组 */
			get_surplus_higth: (c: string[]) => number;
			/** 格式化时间为秒和分钟 */
			format_ms:(m:number)=>string,
		}
	}
	interface Order
	{
		id?:number,
		/** 门店ID */
		sid:number,
		/** 用户ID */
		uid:number,
		/** 订单总价 */
		order_price:number,
		/** 优惠总价 */
		discount_price:number,
		/** 线下现金支付金额 */
		cash_price:number,
		/** 余额支付金额 */
		yue_price:number,
		/** 门店专用余额支付金额 */
		yue_s_price:number,
		/** 微信在线支付金额 */
		wx_price?:number
		/** 下单车牌号码 */
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
		/** 当前订单是否请求支付 - 用户线下扫码后等待状态 */
		ask_pay?:boolean|undefined,
		/** 
		 * 是否支付 
		 * @param 0 没有任何支付
		 * @param 1 余额部分支付，仍有待支付 
		 * @param 2 订单彻底支付完成 
		*/
		is_pay:number,
		/** 支付时间 */
		pay_time:number,
		/** 下单管理员ID */
		add_uid:number,
		/** 下单时间 */
		time:number,
		/** 订单详情 */
		detall?:OrderDetall[],
		/** 订单状态 0 = 没有开始服务  1 = 正在服务 2 = 完成服务 */
		status:number
		/** 开始服务时间 */
		t1:number,
		/** 完成服务时间 */
		t2:number
		/** 订单是否别人转增 - 或者订单是否为共享订单 */
		is_transfer?:number
		/** 转增订单的UID */
		transfer_uid?:number
		/** 订单是否已分账 */
		is_distribute?:number
		/** 等待支付订单金额 */
		wait_pay_price?:number
		/** 关联洗浴大厅表ID */
		hid?:number
	}
	interface OrderDetall
	{
		id?:number,
		/** 订单ID */
		oid:number,
		/** 商品ID */
		goods_id:number,
		/** 项目ID */
		item_id:number,
		/** 是否多规格 */
		is_spec:number,
		/** 购买数量 */
		count:number,
		/** 购买单价 */
		price:number,
		/** 支付总价格 */
		pay_price:number,
		/** 余额支付金额 */
		yue_pay?:number
		/** 专用余额支付金额 */
		yue_s_pay?:number
		/** 现金支付金额 */
		cash_pay?:number
		/** 微信在线支付金额 */
		wx_pay?:number
		/** 等待支付的金额 */
		wait_pay_price?:number
		/** 是否优惠 */
		is_discount:number,
		/** 服务项目名称 */
		item_name:string,
		/** 优惠金额 */
		discount:number,
		/** 优惠券类型 0 = 没有优惠券 1=兑换券 2=抵值券 3=包年包月期卡*/
		coupon_type:number,
		/** 期卡ID*/
		coupon_id:number,
		/** 优惠券ID组  */
		coupon_ids:number[] | string,
		/** 本项是否为加单操作 */
		is_add_order:number,
		/** 加单时间 - 没有加单时间的读取订单时间 */
		add_time:number,
		/** 
		 * 是否支付
		 * @param 0 没有支付
		 * @param 1 部分支付 
		 * @param 2 完全支付
		 */
		is_pay:number,
		/** 项目状态 0=没有开始服务 1=正在服务 2=服务已完成 3=服务已评价 4=服务被投诉 */
		status:number,
		/** 项目优惠状态 */
		status2:string,
		/** 开始服务时间 */
		t1:number,
		/** 服务结束时间 */
		t2:number,
		/** 评价时间 */
		t3:number,
		/** 评价星级 */
		rate:number;
		/** 评价内容 */
		msg:string,
		/** 服务是否超时 */
		is_overtime?:boolean,
		/** 超时时间 */
		overtime?:string,
		/** 是否使用渠道卡券 */
		is_channel?:number,
		/** 渠道名称 */
		channel_name?:string,
		/** 扩展门店sid */
		sid?:number
		/** 扩展商圈ID */
		cid?:number
		/** 是否转增订单 - 洗浴转增订单放在订单详情 */
		is_transfer?:number
		/** 转赠人UID */
		transfer_uid?:number
		/** 
		 * UI前端需要
		 * 2024-12-20
		 */
		/** 是否显示详情 订单金额实付金额等 */
		is_show_detail?:boolean
	}
	/** 下拉刷新组件后端接受参数 */
	interface RefreshArgs{
		/** 当前分页页码 */
		page:number,
		/** 每页大小 */
		size:number,
		/** 附带参数合集 */
		args:any
	}
	/** 下拉刷新带分页动态列表组件参数约束 前端 */
	interface RefreshList{
		/** 接口地址 */
		url:string,
		/** 分页大小 */
		size:number,
		/** 刷新控制器 */
		refresh:boolean,
		item_type?:any,
		/** 携带参数 */
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
		/** 接口地址 */
		url:string,
		/** 分页大小 */
		size:number,
		/** 刷新控制器 */
		refresh:boolean,
		/** 携带参数 */
		args:A
		/** 分页组件返回item数据类型 */
		item_type?:InferItemType<T, A, M>
		/** 布局xs <576px */
		xs?:number,
		/** 布局sm ≥576px */
		sm?:number
		/** 布局md ≥768px */
		md?:number
		/** 布局lg ≥992px */
		lg?:number
		/** 布局xl ≥1200px */
		xl?:number
		/** 布局xxl ≥1600px */
		xxl?:number
		/** row绑定class */
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
		/** 支付方式 微信 阿里 银行 */
		mode: string;
		/** 支付环境 小程序 公众号 APP */
		ev: string;
		/** 支付状态 */
		status: number;
		/** 支付用户Uid */
		uid: number;
		/** 支付用户OPENID */
		openid: string;
		/** 支付回调接口 */
		api: string;
		/** 支付金额 */
		price: number;
		/** 是否发生支付错误 */
		fail: number;
		/** 错误说明 */
		fail_msg: string;
		/** 商户内唯一ID */
		out_trade_no: string;
		/** 预支付ID */
		prepay_id: string;
		/** 微信transaction_id */
		transaction_id: string;
		/** 扩展字段合集 */
		extend: string;
		save: Function;
	}
}


