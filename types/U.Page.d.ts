declare namespace sm.U.Page
{


    /** 转赠领取卡券后台返回日志列表 */
    export interface MemberCouponCardholderLog extends tb.kxyk_coupon_cardholder {
        /** 挂载卡券列表 */
        list:{
            /** id log表ID */
            id:number
            /** 卡券名称 是卡包名称 */
            name:string
            /** 卡券数量 */
            count:number
        }[]
        /** 如果涉及员工的话 员工名称 */
        display_name?:string
        /** 赠送人名称 */
        g_name?:string
        /** 接收人名称 */
        r_name?:string
        /** 员工分类名称 */
        n?:string
        /** 门店名称 */
        store_name?:string
    }
    /** 转赠领取卡券页面卡券字段 */
    export interface MemberCouponUser extends sm.CouponUser
    {
        /** 当前拥有的卡券数量 */
        total_count:number
        /** 可用数量 */
        available_count:number
        /** 已使用数量 */
        used_count:number
        /** 过期数量 */
        expired_count:number
    }
    /** 转赠卡券等待领取时的参数 */
    export interface MemberCouponShareParams
    {
        /** 赠送人昵称或手机号 */
        nickname:string
        /** 赠送人UID */
        uid:number
        /** 赠送数据ID kxyk_coupon_cardholder表 */
        id:number
        /** 是否同一个人 */
        is_same?:boolean
        /** 可领取的卡券列表 */
        coupon:{
            /** id log表ID */
            id:number
            /** 卡券名称 是卡包名称 */
            name:string
            /** 卡券数量 */
            count:number
        }[]
    }
    /** 新用户卡券组件页面数据 */
    export interface SystemUserCouponNewDbs
    {
        /** 用户当前卡券数据 */
        coupons:MemberCouponUser[]
        /** 页面是否正在加载数据 */
        loading:boolean
        /** 生成海报组件需要的数据 */
        poster:sm.Com.ShareCouponPosterProps
        /** 是否正在生成连接 */
        creating:boolean
        /** 是否显示领取卡券弹框 */
        receive_open:boolean

        /** 连接地址 */
        share_link:string
        /** 是否显示分享链接弹框 */
        share_link_open:boolean
        /** 是否显示生成海报弹框 */
        poster_open:boolean
        /** 正在领取卡券的loading */
        receiving:boolean
        /** 分享用户数据 */
        share_info?: MemberCouponShareParams | false
        /** 页面缓存用户数据 */
        user?:tb.sm_user
        /** 卡券流转组件相关数据 */
        trace:{
            /** 用户UID */
            uid:number
            /** 卡包ID */
            pid:number
            /** 是否显示组件 */
            open:boolean
            /** 当前选择的卡券数据 */
            coupon?:MemberCouponUser
        }
    }
    /** 转赠领取卡券页面数据dbs */
    export interface MemberCouponShareDbs
    {
        /** 卡券流转组件相关数据 */
        trace:{
            /** 用户UID */
            uid:number
            /** 卡包ID */
            pid:number
            /** 是否显示组件 */
            open:boolean

        }
        /** 用户数据 */
        member:tb.sm_user & {
            /** 所有卡券数量 */
            coupon_count?:number
        } | false;
        /** 卡券数据 */
        coupons:MemberCouponUser[]
        /** 当前用户日志条数 */
        log_count:number
        /** 当前选择选择的标签 */
        active_tab:"coupon" | "record",
        /** 是否正在加载 */
        loading:boolean
        /** 是否显示领取卡券弹框 */
        receive_open:boolean
        /** 是否正在生成连接 */
        creating:boolean
        /** 日志列表API */
        api:sm.rList<MemberCouponCardholderLog>
        /** 连接地址 */
        share_link:string
        /** 是否显示分享链接弹框 */
        share_link_open:boolean
        /** 当前页面用户UID 用于加载日志组件 */
        uid:number
        /** 正在领取卡券的loading */
        receiving:boolean
        /** 分享用户数据 */
        share_info?: MemberCouponShareParams | false
    }

    /** 门店内群聊组件页面dbs */
    export interface MessageStoreDbs
    {
        /** 聊天窗口高度 */
        hh:number,
        /** 聊天内容分页 */
        page:number,
        /** 聊天内容列表 */
        list:sm.Com.StoreChatMsg[],
        msgDiv:HTMLElement,
        /** 是否已经加载到最后一页 */
        end:boolean,
        /** 聊天数据正在加载 */
        loading:boolean,
        /** 是否显示留言窗口 */
        open:boolean
        /** 发送消息 */
        send:sm.Com.send_message_xy,
        /** 是否正在和小程序通讯 */
        is_newsletter:boolean
        /** 小程序端 是否开始录音了 */
        on_start_record:boolean
        /** 小程序端 是否已经点击了开始录音按钮 */
        is_start_record:boolean
        /** 提示词 */
        msg:string
        /** APP端是否开始录音了 */
        app_is_start_record:boolean
        /** APP端开始录音了 */
        on_start_record_app:boolean
        /** 当前门店的分类列表 */
        nlist:{
            /** 分类ID */
            id:number
            /** 分类名称 */
            n:string
        }[]
        /** 当前门店的员工列表 */
        clist:{
            /** 员工ID */
            ck_id:number
            /** 员工UID */
            uid:number
            /** 员工昵称 */
            nickname:string
            /** 员工分类ID */
            n_id:number
            /** 员工分类名称 */
            n_name:string
        }[]
        /** 当前选择对哪个部门发消息包含0 就是所有人其他ID 就是其他部门 */
        n_ids:number[]
        /** 当前选择对哪个员工发送消息 包含0 = 全部 其他ID为员工ID */
        ck_ids:number[]
        /** 当前选择的输入法模式 0 = 文字输入 1 = 语音 */
        mode:number
        /** 正在递交数据 */
        is_sending:boolean
        /** 录音定时器 限制60秒 */
        recordTimer:any
    }
    /** 解析扫码跳转小程序页面 */
    export interface AnalyzeStore
    {
        /** 地址栏获得门店ID */
        sid:number
        /** 开发调试日志列表 */
        logs:string[]

    }
    /** 小程序登录页面 */
    export interface LoginKxykWxapp
    {
        /** 是否同意协议 */
        is_open:boolean
        /** 是否显示用户协议 */
        open:boolean
        /** 
         * 页面手动登录方式
         * @param 1 = 密码登录
         * @param 2 = 验证码登录
         */
        login_type:number
        /** 当前页面是否开发环境 */
        is_dev:boolean
        /** 开发环境选择要登录的UID */
        select_x:number
        /** 
         * 是否显示登录框
         * @property 自动登录时页面纯白 一闪而过
         */
        is_show:boolean
        /** 登录按钮是否可以递交 */
        is_login:boolean
        /** 页面是否正在加载中 */
        is_loading:boolean
        /** 是否可以发送验证码 */
        is_code:boolean
        /** 发送验证码倒计时限制 毫秒 */
        count_down:number
        /** 
         * H5登录完成后是否需要跳转到小程序登录
         * @property 小程序环境下 任何登录默认都跳转到原生小程序登录
         * @property 原生小程序登录完成跳转回来时携带参数 此次H5登录后不需要跳转到小程序
         * @property ------- 当前值并未实际应用，小程序回调登录H5如果已经登录成功直接返回true
         * @const 1 需要跳转到小程序
         * @const 0 不需要跳转到小程序
        */
       is_jump_wxapp:number
    }
    /** 平台购物车数据 */
    export interface KxykMyCart
    {
        
        /** 商户名称 */
        store_name:string
        /** 商户图片 */
        store_img:string
        /** 商户ID */
        sid:number
        /** 商户下的购物车条目 */
        list: tb.kxyk_mch_cart[]
        
    }
    /** 平台购物车之后确认订单页面 */
    export interface KxykConfirmOrder{
        /** 当前准备结算的订单列表 */
        list:KxykMyCart[]
        /** 卖家留言 */
        msg:string
        /** 加上运费的总支付金额 */
        price:number
        /** 当前用户所有收货地址 */
        aList:tb.kxyk_user_address[]
        /** 当前用户默认收货地址 */
        default_address:tb.kxyk_user_address | false
        /** 当前选中的收货地址 */
        has_address:tb.kxyk_user_address 
        /** 是否显示收货地址列表模态框 */
        show1:boolean
        /** 是否点击了添加收货地址 */
        is_add:boolean
    }
    /** 开薪怡客平台商品分类页面数据 */
    export interface KxykGoodsType{
        /** 左边导航栏宽度 */
		leftWidth:number
        /** 当前计算后的游标 */
		activeCategoryIndex:number
		/** 每个分类的高度数组 */
		categoryHeights:number[]
		/** 点击按钮滚动是否完成 */
		BottonScrollEnd:boolean
        /** 购物车组件门店商品列表 */
		goods:sm.store_goods[]
    }
    /** 开薪怡客平台购物车页面数据 */
    export interface KxykMyCartPage{
        /** 购物车数据 */
        list:KxykMyCart[]
        /** 是否全选结算 */
        s1:boolean
        /** 是否全选删除 */
        s2:boolean
        /** 当前购物车合计金额 */
        total:number
        /** 是否显示删除购物车样式 */
        is_del:boolean
        /** 删除按钮是否可用 */
        is_del_enable:boolean
        /** 是否可以结算 */
        is_submit:boolean
        /** 是否已经登录 */
        is_login:boolean
    }
    /** 开薪怡客商家入驻页面数据 */
    export interface KxykIndexJoinMch
    {
        /** 商家入驻表单 */
        mch:tb.kxyk_mch_join_apply
        /** 是否同意入驻协议 */
        is_agree:boolean
        /** 是否可以递交入驻申请 */
        is_verify_submit:boolean
        /** 是否显示递交成功弹框 */
        is_show:boolean
    }
    /** 开薪怡客首页本地服务页面数据 */
    export interface kxykLocalService
    {
        /** 本地服务门店列表 */
        list:tb.kxyk_mch_store_local_serve[]
        /** 用户是否登录 */
        is_login:boolean
        
    }
    /** 新的开薪怡客移动端首页 */
    export interface KxykIndex
    {
        /** 首页搜索关键词 */
        keyword:string
        /** 顶部轮播图 */
        banner:{
            /** 图片标题 */
            title:string
            /** 图片地址 */
            imgUrl:string
            /** 跳转链接 */
            url:string
        }[]
        /** 优选门店列表 */
        yx_store:tb.kxyk_mch_store[]
        /** 首页自营产品列表 */
        good1:tb.kxyk_mch_goods[]
        /** 首页推荐产品列表 */
        good2:tb.kxyk_mch_goods[]
    }
    /** 轮盘游戏页面数据集合 */
    export interface RouletteGameDbs{
        /** 门店ID */
        sid:number
        /** 门店数据 */
        Store:tb.kxyk_mch_store | false
        /** 屏幕宽度 */
        ww:number
        /** 动画滚动角度变量 */
        n1deg:number
        /** 正在播放动画 */
        is_play:boolean
        /** 是否显示提示框 */
        is_show_tip:boolean
        /** 是否已经点击了领取 */
        is_give:number
        /** 等待领取的奖品ID */
        prize:number
        /** 抽奖表ID */
        prid:number
        /** 抽奖表数据 */
        Prize:tb.kxyk_user_prize_log | false
        /** 滚动日志 */
        log:tb.kxyk_user_prize_log[]
        
    }
    /** A1A2 财务页面 */
    export interface A1A2Finance{
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
			args:sm.Com.A1A2FinanceApiArgs
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
    /** C1 - 会员管理页面 */
    export interface C1Member
    {
        /** 会员列表带C1设置 */
        list:sm.C1.GetC1TypeVips[]
        /** 商圈ID */
        cid:number
        /** 新增修改会员配置缓存变量 */
        has_edit:{
            /** 充值金额 */
            price?:string | number
            /** 过期金额 */
            out_price?:string |number
            /** 提醒金额 */
            tip_price?:string | number
            /** id */
            id?:number
            /** vid Vip表ID */
            vid:number
            /** 商圈ID */
            cid:number
            /** 共享身份数量 */
            share_identity?:number
        }
    }
    /** A1会员管理页面 */
    export interface member
    {
        /** 带行业分类的会员列表 */
        list:sm.A1.A1MchTypeMemberList[]
        /** 所属公司 ID */
        cpid:number
        /** 当前选择的Tab页面 */
        has_tab:string
        /** 当前选择的会员等级 */
        has_vip:tb.kxyk_mch_type_vips
        /** 是否打开新建修改会员等级模态框 */
        is_open_has_vip:boolean
        /** 正在提交或检验会员数据 */
        is_submit:boolean
    }
    /** newlan测试页面 */
    export interface newlan
    {
        /** 拥有访问页面权限的uid数组 */
        show_page_ids:number[]
        /** 是否有访问权限 */
        is_authorize:boolean
    }
    /** 点金计划小票页面 */
    export interface Djjh
    {
        /** 页面是否有错误 */
        is_error:boolean
        /** 页面是否加载完成 - 后端是否已经返回数据 */
        end:boolean
        /** 错误提示 */
        error_str:string
        /** 商户名称 */
        store_name:string
        /** 商户门头照片 */
        store_img:string
        /** 支付商品描述 */
        pay_title:string
        /** 支付金额 */
        pay_price:number
        /** 跳转地址 */
        back_url:string

    }
    /** 用户端洗浴首页 */
    export interface IndexY
    {
        /** 页面是否有错误 */
        is_error:boolean
        /** 页面错误标题 */
        e1:string
        /** 页面错误副标题 */
        e2:string
        /** 门店ID */
        sid:number
        /** 门店数据 */
        Store:tb.kxyk_mch_store | null
        /** 页面地址栏参数是否到店 */
        is_come:number
        /** 用户数据集合 */
        member:sm.Pd1.HallMember | null
        /** 聊天组件数据 */
        message:sm.Com.message_xy
        /** 从小程序扫码跳转进入携带的pop参数 */
        pop?:number
        /** 后端是否有返回的转增相关数据 */
        gi?:sm.Pd1.gi_back
        /** 是否显示领取转增框 */
        is_show_gi:boolean
        /** 接受转赠时的按钮状态 */
        get_gi_status:boolean
    }
    /** 我的页面后台数据返回约束统计合计 */
    export interface PromiseDateBackCounts
    {
        /** 我的收益金额 */
        p1:number
        /** 推广活动数量 */
        p2:number
        /** 推广订单数量 */
        p3:number
        /** 推广人数 */
        p4:number
    }
    /** 我的推广页面后台数据返回格式 */
    export interface PromiseDateBack
    {
        /** 统计数据合集 */
        counts:PromiseDateBackCounts
        /** 数据列表*/
        list:any[] | undefined
        /** 数据总条数 */
        count:number
    }
    /** 消费明细页面数据 */
    export interface TransactionDetails
    {
        /** 二维码地址 */
        url:string
        /** 当前收银台代付总金额 没有减优惠 */
        ttool:number
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
        /** 是否重新渲染ui */
		is_render_ui:boolean
        /** 递交状态 是否正在递交数据到后端 */
		is_submit:boolean
        /** 是否显示支付成功动画窗口 */
        showSuccess:boolean
        /** 动画金额 支付成功的金额 */
        animatedAmount:string
        /** 门店ID 从地址来获取 */
        sid:number
        /** 当前窗口是否最大化 1是最大化 */
        is_max:0 | 1
        /** 当前正在查看的大厅开牌数据 */
        hall:sm.Pd1.HallMember | false
        /** 当前收银台组件订单列表 - 需要动态生成 */
		order:sm.Pd1.CashierOrder[]
        /** 当前购物车正在格式化 */
		is_formatting?:boolean
        /** 当前离店结算订单列表 */
		leave_order:sm.Com.CashierLeaveShoeBox[]
        /** 
		 * 当前可用卡券列表 - 即时计算
		 * @protected 卡券为移动端可选择样式 
		*/
		coupons:sm.Com.MultiCouponSelectorCoupon[]
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
        /** 是否开启了进店必买 */
		is_must_buy_auto_order?:number
		/** 进店必买ID组 */
		must_buy_ids?:string[]
		/** 进店避免配置组 */
		must_buy_list?:sm.Pd1.ShopMustBuy[]
        /** 门店数据 */
        store:tb.kxyk_mch_store | false

    }
    /** 我的推广页面 */
    export interface Promotion
    {
        /** api.args.t
         *  页面数据类型
         *  1 = 我的收益
         *  2 = 推广活动
         *  3 = 推广订单
         *  4 = 推广人数
         */

        /** 页面后端数据接口 */
        api:sm.RefreshList
        /** 统计数据合集 */
        counts:PromiseDateBackCounts
    }
    /** 新省钱页面 */
    export interface ThriftyNew{
        /** 商圈ID  */
        cid:number
        /** 顶部文字说明 */
        str1:string
        /** 可展示活动列表 */
        list:tb.kxyk_store_tuangou[]
    }
    /** C1配置管理页面变量约束 */
    export interface IndexAdmin{
        /** 当前选择的tab页面 */
        tab:number
        /** 商圈ID 地址栏获取 */
        cid:number
        /** 配置活动模态框 */
        is_open:boolean
        /** 默认商户号相关 */
        store:{
            /** 是否显示配置窗口 */
            open:boolean
            /** 保存的默认商户号吗 */
            store_number:string
            /** 默认商户名称 */
            store_name:string
        },
        /** 商圈下所有商户默认信誉额度配置 */
        xyed:number,
        /** 下级时间 单位是天 */
        lower_level_time:number
        /** 省钱列表 */
        thrifty:{
            /** 当前选择的活动id列表 */
            select_ids:number[]
            /** 当前商圈下所有团购活动 */
            tg_list:tb.kxyk_store_tuangou[]
            /** 已经配置好的活动列表 */
            config_list:tb.kxyk_store_tuangou[]
            /** 省钱页面顶部文字描述 */
            str1:string
        }
    }
    /** 门店团购员工后台页面 */
    export interface StoreTuanGouAdmin
    {
        /** 门店ID */
        sid:number
        /** 管理员用户数据 */
        u:tb.sm_user | false
        /** 页面动态数据api  */
        api:sm.RefreshList
        /** 搜索用户组件 */
        searchUser:sm.SearchUser
        /** 发放活模态框是否显示 */
        is_give_open:boolean
        /** 当前门店上架的活动列表 */
        tuangou_list:tb.kxyk_store_tuangou[]
        /** 发放活动时共几个活动 */
        tg_count:number
        /** 发放活动共多少钱 */
        tg_price:number
        /** 当前要发放的用户UID */
        tg_give_uid:number
        /** 当前要发放的活动列表 */
        tg_give_list:{
            /** 活动iD */
            tgid:number,
            /** 发放数量 */
            count:number
        }[]
        /** 页面是否有错误 */
        is_err:boolean
        /** 递交发卡按钮加载状态 */
        is_submit:boolean
        /** T2筛选条件 */
        t2_list:any[]
        /** 当前售出总额 */
        sum1:number
        /** 当前核销总额 */
        sum2:number
        /** 当前待处理抽奖数量 */
        sum3:number
        /** 当前已处理抽奖数据 */
        sum4:number
        /** 当前中奖现金数量 */
        sum5:number
        /** 当前中奖洗车卡数量 */
        sum6:number
        /** 当前中奖啤酒数量 */
        sum7:number

    }
    /** 团购订单页面 */
    export interface TgOrder{
        /** 动态数据接口 */
        api:sm.RefreshList,
        /** 数据列表 */
        // list:tb.kxyk_store_tuangou_user[]
    }
    /** 团购活动支付页面数据 */
    export interface Op{
        /** 团购活动ID */
        tgid:number
        /** 当前活动 */
        tg:tb.kxyk_store_tuangou | false
        /** 是否打开购买须知 */
        is_gmxz:boolean
        /** 当前页面购买数量 */
        count:number
        /** 当前页面支付方式 */
        pay_type:number
        /** 进入当前页面的推广人Uid */
        aff:number
    }
    /** 购买团购活动详情页面数据 */
    export interface Odo{
        /** 团购活动ID */
        tgid:number
        /** 当前活动 */
        tg:tb.kxyk_store_tuangou_user | false,
        /** 二维码组件数据 */
        scan:sm.ScanCom
    }

    /** 收付通商品详情页面 */
    export interface KxykGoods{
        /** 商品ID */
        gid:number
        /** 当前商品数据 */
        good:tb.kxyk_mch_goods | false
        /** 当前商户所属门店数据 */
        store:tb.kxyk_mch_store | false
    }

    /** 团购活动详情页面数据 */
    export interface Od{
        /** 团购活动ID */
        tgid:number
        /** 当前活动 */
        tg:tb.kxyk_store_tuangou | false
        /** 进入当前页面的推广人Uid */
        aff:number
        /** 推广相关 */
        promoter:sm.Com.PromotionAgreement

    }
    export type DailyStatistics = {
        /** 今日开牌数量 */
        left_store:number
        /** 今日开牌男浴数量 */
        male_left_store:number
        /** 今日开牌女浴数量 */
        female_left_store:number
        /** 数据列表 */
        list:{
            /** 手牌号码 */
            code:string
            /** 开牌时间 */
            s1:number
            /** 手牌行不 0 = 男 1 = 女 */
            sex:number
        }[]
    }
    /** 员工 */
    /** PC端吧台页面数据集合 */
    export interface Pd1
    {
        /** 营业额用户使用卡券统计列表 */
        coupon_use_list:any[]
        /** 是否显示移动端的取鞋列表 */
        is_show_shoe_list?:boolean
        /** 会员发卡相关 */
        giveCard:{
            /** 是否显示发卡组件 */
            show:boolean
            /** 接受卡券的uID */
            uid:number
            /** 门店ID */
            sid:number
            /** 当前拥有的卡券数量 */
            coupon_count:number
        }
        /** 激活房间组件用的数据 */
        room:{
			/** 显示激活房间组件 */
			show:boolean
			/** 当前订单信息 */
			order:tb.kxyk_mch_store_order_detall | false
		}
        /**
         * 页面状态码
         * 1 = 默认状态，没有进行服务器验证
         * 2 = 服务器已验证，且权限正常
         * 3 = 服务器已验证，没有权限
         */
        pageStatus:1|2|3
        /** 是否显示移动端员工数字键盘 */
        is_show_keyboard:boolean
        /** 访问当前页面的屏幕宽度 */
        innerWidth:number
        /** 聊天组件数据 */
        message:sm.Com.message_xy
        /** 日志组件参数 */
        pip:sm.Com.system_logs_props
        /** 签到组件参数 */
        sign_pip:sm.Com.system_sign_props
        /** 打印信值小票相关 */
        printTicket:{
            /** 是否显示打印框 */
            show:boolean
            /** 是否真正加载数据 */
            is_load:boolean
            /** 当前需要打印的总点单数量 */
            count:number
            /** 当前已经打印的数量 */
            printed_count:number
            /** 是否点击了停止打印按钮 */
            print_stop:boolean
            /** 是否正在打印 */
            is_printing:boolean

        }
        /** 注册会员相关 2026-01-23 */
        regUser:{
            /** 是否显示注册抽屉 */
            show:boolean
            /** 要注册和编辑的会员 */
            user:tb.UP<tb.sm_user>
            /** 是否正在递交注册 */
            is_submit:boolean
            /** 是否显示充值窗口 */
            is_show_recharge:boolean
            /** 充值余额还是信值 */
            type:0 | 1
            /** 要充值的金额 */
            price:number
            /** 要充值的用户 */
            u:tb.sm_user | false
            /** 充值信值要赠送的会员ID */
            give_vip:number
            /** 可以赠送的信值vip */
            vips1:tb.kxyk_mch_type_vips[]
            /** 充值余额可以赠送的vip */
            vips2:any[]
            /** 会员标签颜色 */
            color:string[],
            /** 显示要赠送的文字 */
            show_str:string
            /** 充值余额要赠送的会员名称 */
            giev_name:string
            /** 充值余额要赠送的VIP 第 */
            give_vip1:number
            /** 所有会员---- */
            vip_list:tb.kxyk_circle_member_vip[]
            /** 是否显示用户往期数据 */
            is_show_history:boolean
            /** 往期数据需要的参数 */
            past_data:sm.Com.system_past_data
            /** 手动注册会员时的类型 0 = 手机号 1 = 会员卡 */
            reg_type?:number
            /** 关联手机号码 */
            phone2?:string
            
        }
        /** 扫描核销相关 */
        ScanQrcode:{
            /** 是否显示扫码组件 */
            show:boolean
            /** 要核销的卡券数据 */
            card:sm.Pd1.ScanQrcodeCard | false
            /** 是否正在核销 */
            is_verification:boolean
            /** 当前扫码核销时二维码携带的参数 */
            params:sm.Com.P1QrCodeParams | false
            /** 是否显示当前登录员工的登录二维码，中断扫码登录 */
            is_show_login_qrcode:boolean
            /** 员工登录二维码地址 */
            login_qrcode_url:string
            
        }
        /** 识别手牌组件参数 */
        Identify:{
            open:boolean
        }
        /** 管理端UI控制 */
        UI:{
            /** 当前环境是否有electron */
            is_electron:boolean
            /** 是否显示顶部板块 财务不显示 */
            is_show_top:boolean
            /** win环境下是否全屏 */
            fullscreen:boolean
            tab1:{
                /** 是否收缩未绑手牌板块 */
                show1:boolean
                /** 是否收缩已绑定手牌版本 */
                show2:boolean
                /** 是否收缩系统队列板块 */
                show3:boolean
                /**  是否收缩取鞋用户板块 */
                show4:boolean
            }
        }
        /** 当前页面实时时间戳 用于计算各类需要时间戳的地方 */
        now:number
        /** 会员信息组件数据 */
        ShowUserInfo:{
            /** 是否显示会员信息组件 */
            show:boolean
            /** 显示信息的会员UID */
            uid:number
        }
        /** 今日顾客数量统计 */
        daliy:DailyStatistics
        /** 缓存下拉刷新组件count */
        refresh_count:number
        /** 营业额相关 */
        tab8:{
            /** 营业额 */
            t1:number
            /** 实收金额 */
            t1_s?:number
            /** 数量 */
            t1c:number
            /** 服务 */
            t2:number
            t2c:number
            /** 商品 */
            t3:number
            t3c:number
            /** 团购统计数组 */
            other:{
                /** 当前条件统计价格 */
                other_price?:number
                /** 统计数量 */
                other_count?:number
                /** 第三方店内购买总价 */
                in_store_price?:number
                /** 第三方店内购买总数 */
                in_store_count?:number
                /** 第三方ID */
                other_id?:number
            }[]
            /** 老卡总条数 */
            old_card_count?:number
            /** 老卡总额 */
            old_card_total?:number
            /** 线下微信总条数 */
            offline_wx_count?:number
            /** 线下微信总额 */
            offline_wx_total?:number
            /** 现金总条数 */
            cash_count?:number
            /** 现金总额 */
            cash_total?:number
            /** 余额总条数 */
            yue_count?:number
            /** 余额总额 */
            yue_total?:number
            /** 信值总额 */
            yue_s_total?:number
            /** 信值总条数 */
            yue_s_count?:number
            /** 微信总条数 */
            wx_count?:number
            /** 微信总额 */
            wx_total?:number
            /** 卡券优惠总条数 */
            discount_count?:number
            /** 卡券优惠总额 */
            discount_total?:number

            /** 查询服务时的员工列表 */
            staff_list:{
                /** 昵称 */
                nickname:string
                /** uid */
                uid:number
            }[]
            /** 查询商品服务时的商品分类列表 */
            goods_type_list:{
                /** 分类ID */
                uid:number
                /** 分类名称 */
                nickname:string
                /** 现金总额 */
                total_cash?:number
                /** 现金收款员工ID */
                cash_clerk_id?:number
                /** 销量 */
                sales_count?:number
            }[]
            /** 营业额 - 商品 - 当前条件商品可查列表的商品ID */
            goods_ids_list:{
                /** 商品ID */
                gid:number
                /** 商品名称 */
                gname:string
                /** 销量 */
                sales_count?:number
            }[]
        }
        /** 门店ID */
        sid:number
        /** 门店数据 */
        store:sm.Pd1.P1StoreCache | null
        /** 当前页面显示动态时钟 */
        time:string
        /** 后端通信API接口 */
        api:sm.rList
        /** 员工相关 */
        staff: sm.Pd1.P1Staff
        /** 二级商户相关 */
        SecondaryMerchants:sm.Pd1.SecondaryMerchants
        /** 2025-03-20 登录员工数据 */
        loginStaff:sm.Pd1.LoginStaff | false
        /** 绑定的打印机相关 */
        printer:{
            /** 是否绑定了打印机 */
            is_bind:boolean
            /** 绑定的打印机数据 */
            p:tb.kxyk_store_printer
        }
        /** electron id 当前硬件唯一ID */
        electron_id:string
        /** 大厅 */
        hall:{
            /** 当前选定的大厅用户 */
            has:sm.Pd1.HallMember | null
            /** 当前会员分身相关 */
            has_avatar:{
                /** 是否存在分身 */
                is:boolean
                /** 管理窗口是否显示分身数据 要么显示分身要么显示主用户 */
                show:boolean
                /** 分身HID */
                a_hid:number
                /** 宿主hid */
                b_hid:number
            }
            /** 是否显示member当前用户同步组件 */
            show_has:boolean
            /** 是否显示大厅用户模态框 */
            show:boolean
            /** 是否显示当前用户 - 2025-07-31扩展PC端 */
            pc_has:sm.Pd1.HallMember | false
            /** 是否显示当前用户 PC端 */
            pc_show_has:boolean
            /** 大厅所有用户列表 */
            list:sm.Pd1.HallMember[]
            /** 预约和自足下单客户 - 未绑定手牌用户 */
            aList:sm.Pd1.HallMember[]
            /** 已绑手牌客户 */
            bList:sm.Pd1.HallMember[]
            /** 等待取鞋用户 status = 5 */
            cList:sm.Pd1.HallMember[]
            /** 
             * 是否正在搜索大厅
             * 搜索范围包括 手机号 手牌号 昵称
             */
            is_search:boolean
            /** 搜索结果列表 */
            search_list:{
                /** 预约和自主下单客户 - 未绑定手牌用户 */
                aList:sm.Pd1.HallMember[],
                /** 已绑定手牌用户 */
                bList:sm.Pd1.HallMember[],
                /** 等待取鞋用户 status = 5 */
                cList:sm.Pd1.HallMember[],
            }
            
        }
        /** 鞋柜 - 添加修改鞋柜模态框相关 */
        shoe:{
            /** 是否显示添加修改鞋柜模态框 */
            open:boolean
            /** 当前鞋柜 - 添加 修改 元数据 */
            has:tb.kxyk_bath_shoebox
            /** 是否正在递交保存 */
            is_submit:boolean
        }
        /** 搜索用户组件 */
        searchUser:sm.SearchUser
        /** 搜索鞋柜组件 */
        searchShoeBox:sm.Com.SearchShoeBox
        /** 门店设置组件 */
        StoreConfig:sm.Com.StoreConfig
        /** 语音播报系统 */
        Voice:{
            /** 是否开启语音播报 */
            open:boolean
            /** 语音播放是否准备就绪 */
            is_play:boolean
            /** 系统所有语音文件列表 */
            files:{
                key:string,url:string
            }[]
            /** 已播报订单ID order_detall_id集合 */
            oids:Set<number>

            /** 完成初始化的语音MAP */
            map:any
        }
        /** 调试面板相关 */
        DeBug:{
            /** 是否显示调试面板 */
            open:boolean
            /** 当前在线用户列表 */
            list:{
                /** 在线员工列表 */
                staff:OnlineUser[]
                /** 在线用户列表 */
                user:OnlineUser[]
            }
            /** 调试面板数据 */
            data:{
                /** 
                 * 数据等级
                 * @param 0 - 一般提醒
                 * @param 1 - 成功提醒
                 * @param 2 - 错误提醒
                 */
                t:0|1|2
                /** 提醒内容 */
                msg:string
                /** 提醒时间 */
                time:string
            }[]
        }

    }
    export interface OnlineUser{
        /** 在线用户名称 */
        name:string
        /** ID */
        id:number
        /** sid */
        sid:string
        /** 最后登录时间 */
        d?:string
        /** 用户uid */
        uid?:number
        /** 用户环境 */
        environment?:string
    }
    export interface MyU{
        /** uid */
        uid:number
        /** 用户昵称 */
        nickname:string
        /** 用户手机号码 */
        phone:string
        /** 用户头像 */
        avatar:string
        /** 性别 */
        sex:number
        /** 登录密码 */
        pwd:string
        /** 用户平台信值总和 多商圈累计 */
        money:number
        /** 用户平台余额详情 多个商圈列表 */
        money_list:{
            /** 商圈名称 */
            circle_name:string
            /** 信值 */
            money:number
            /** 当前商圈累计充值 */
            r_money:number
            /** 商圈ID */
            cid:number
        }[]
        /** 是否为推广员 0 or 1 */
        is_promoter:number
        /** 用户门店余额总和 多商圈多门店余额累加 */
        s_money:number
        /** 门店专用余额列表 */
        s_money_list:{
            /** 门店名称 */
            store_name:string
            /** 专用余额 */
            money:number
            /** 门店ID */
            sid:number
        }[]
        /** 用户核销券数量 */
        c1:number
        /** 用户兑换券数量 */
        c2:number
        /** 用户低值券数量 */
        c3:number 
        /** 用户商圈会员卡数量 */
        c4:number 
        /** 待支付数量 */
        o1:number
        /** 发货数量 */
        o2:number
        /** 待收货数量 */
        o3:number
        /** 已评价或待评价数量 */
        o4:number
        /** 拥有门店管理列表 */
        sList:tb.kxyk_mch_store_clerk[]
    }
    /** 用户个人中心页面数据 */
    export interface My {
        /** 是否显示收货地址组件 */
        show:boolean
        /** 保障协议 */
        bz:{
            /** 是否显示消费者权益协议窗口 */
            open:boolean
        }
        /** 充值相关 */
        cz:{
            /** 充值抽屉开关 */
            is_cz:boolean
            /** 
             * 充值类型 
             * @param 0 充值信值
             * @param 1 充值余额
             */
            type:0 | 1
            /** 选择商圈ID */
            cid:number
            /** 充值金额 */
            money:string

        }
        /** 推广相关 */
        promoter:sm.Com.PromotionAgreement
        /** 推广相关 - 4个统计 */
        promotion_counts:sm.U.Page.PromiseDateBackCounts
        /** 用户信息 */
        u:MyU | false,
        /** 修改注册信息模态框 */
        reg:sm.Com.EditReg,
        /** 订单相关数据  */
        order:{
            /** 待支付 */
            s1:number,
            /** 待发货 */
            s2:number,
            /** 待收货 */
            s3:number,
            /** 待评价 */
            s4:number,
            /** 已退货 */
            s5:number,
        }
        /** 新订单相关数据 */
        mch_order:
        {
            /** 待支付 */
            s1:number,
            /** 待发货 */
            s2:number,
            /** 待收货 */
            s3:number,
            /** 待评价 */
            s4:number,
            /** 已退货 */
            s5:number,
        }
    }

    /** 收付通商户首页数据 */
    export interface KxykMchIndex{
        /** 门店ID */
        sid: number,
        /** 门店数据 */
        store:tb.kxyk_mch_store | null
        /** 商户促销商品列表 */
        cx_list:tb.kxyk_mch_goods[]
        /** 其他商品列表 */
        g_list:tb.kxyk_mch_goods[]
        /** 门店分类列表 */
        sub:tb.kxyk_mch_store_sub[]
        /** 选择的当前商品分类 */
        has_tuangou_type:number
        
    }
    /** 门店团购页面数据约束 */
    export interface Gbuy{
        /** 门店ID */
        sid: number,
        /** 门店数据 */
        store:tb.kxyk_mch_store | null
        /** 活动分类列表 */
        typeList:tb.kxyk_store_tuangou_p[]
        /** 活动列表 */
        tuanGouList:tb.kxyk_store_tuangou[]
        /** 当前活动类型 */
        has_tuangou_type:number
        /** 进入当前页面的推广人Uid */
        aff:number
        
    }
    /** 用户个人中心我的卡券页面 */
    export interface MyCoupon{
        /** 页面类型1 = 核销券 2 = 兑换券 3 = 低值券 4 = 会员卡 */
        type: number,
        /** 顶部导航文字 */
        topStr:string
        /** 刷新卡券列表 */
        reference:boolean
        /** 用户UID */
        uid:number
        
    }
}
