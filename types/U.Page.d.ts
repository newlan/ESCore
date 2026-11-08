declare namespace sm.U.Page
{


    
    export interface MemberCouponCardholderLog extends tb.kxyk_coupon_cardholder {
        
        list:{
            
            id:number
            
            name:string
            
            count:number
        }[]
        
        display_name?:string
        
        g_name?:string
        
        r_name?:string
        
        n?:string
        
        store_name?:string
    }
    
    export interface MemberCouponUser extends sm.CouponUser
    {
        
        total_count:number
        
        available_count:number
        
        used_count:number
        
        expired_count:number
    }
    
    export interface MemberCouponShareParams
    {
        
        nickname:string
        
        uid:number
        
        id:number
        
        is_same?:boolean
        
        coupon:{
            
            id:number
            
            name:string
            
            count:number
        }[]
    }
    
    export interface SystemUserCouponNewDbs
    {
        
        coupons:MemberCouponUser[]
        
        loading:boolean
        
        poster:sm.Com.ShareCouponPosterProps
        
        creating:boolean
        
        receive_open:boolean

        
        share_link:string
        
        share_link_open:boolean
        
        poster_open:boolean
        
        receiving:boolean
        
        share_info?: MemberCouponShareParams | false
        
        user?:tb.sm_user
        
        trace:{
            
            uid:number
            
            pid:number
            
            open:boolean
            
            coupon?:MemberCouponUser
        }
    }
    
    export interface MemberCouponShareDbs
    {
        
        trace:{
            
            uid:number
            
            pid:number
            
            open:boolean

        }
        
        member:tb.sm_user & {
            
            coupon_count?:number
        } | false;
        
        coupons:MemberCouponUser[]
        
        log_count:number
        
        active_tab:"coupon" | "record",
        
        loading:boolean
        
        receive_open:boolean
        
        creating:boolean
        
        api:sm.rList<MemberCouponCardholderLog>
        
        share_link:string
        
        share_link_open:boolean
        
        uid:number
        
        receiving:boolean
        
        share_info?: MemberCouponShareParams | false
    }

    
    export interface MessageStoreDbs
    {
        
        hh:number,
        
        page:number,
        
        list:sm.Com.StoreChatMsg[],
        msgDiv:HTMLElement,
        
        end:boolean,
        
        loading:boolean,
        
        open:boolean
        
        send:sm.Com.send_message_xy,
        
        is_newsletter:boolean
        
        on_start_record:boolean
        
        is_start_record:boolean
        
        msg:string
        
        app_is_start_record:boolean
        
        on_start_record_app:boolean
        
        nlist:{
            
            id:number
            
            n:string
        }[]
        
        clist:{
            
            ck_id:number
            
            uid:number
            
            nickname:string
            
            n_id:number
            
            n_name:string
        }[]
        
        n_ids:number[]
        
        ck_ids:number[]
        
        mode:number
        
        is_sending:boolean
        
        recordTimer:any
    }
    
    export interface AnalyzeStore
    {
        
        sid:number
        
        logs:string[]

    }
    
    export interface LoginKxykWxapp
    {
        
        is_open:boolean
        
        open:boolean
        /** 
         * 页面手动登录方式
         * @param 1 = 密码登录
         * @param 2 = 验证码登录
         */
        login_type:number
        
        is_dev:boolean
        
        select_x:number
        /** 
         * 是否显示登录框
         * @property 自动登录时页面纯白 一闪而过
         */
        is_show:boolean
        
        is_login:boolean
        
        is_loading:boolean
        
        is_code:boolean
        
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
    
    export interface KxykMyCart
    {
        
        
        store_name:string
        
        store_img:string
        
        sid:number
        
        list: tb.kxyk_mch_cart[]
        
    }
    
    export interface KxykConfirmOrder{
        
        list:KxykMyCart[]
        
        msg:string
        
        price:number
        
        aList:tb.kxyk_user_address[]
        
        default_address:tb.kxyk_user_address | false
        
        has_address:tb.kxyk_user_address 
        
        show1:boolean
        
        is_add:boolean
    }
    
    export interface KxykGoodsType{
        
		leftWidth:number
        
		activeCategoryIndex:number
		
		categoryHeights:number[]
		
		BottonScrollEnd:boolean
        
		goods:sm.store_goods[]
    }
    
    export interface KxykMyCartPage{
        
        list:KxykMyCart[]
        
        s1:boolean
        
        s2:boolean
        
        total:number
        
        is_del:boolean
        
        is_del_enable:boolean
        
        is_submit:boolean
        
        is_login:boolean
    }
    
    export interface KxykIndexJoinMch
    {
        
        mch:tb.kxyk_mch_join_apply
        
        is_agree:boolean
        
        is_verify_submit:boolean
        
        is_show:boolean
    }
    
    export interface kxykLocalService
    {
        
        list:tb.kxyk_mch_store_local_serve[]
        
        is_login:boolean
        
    }
    
    export interface KxykIndex
    {
        
        keyword:string
        
        banner:{
            
            title:string
            
            imgUrl:string
            
            url:string
        }[]
        
        yx_store:tb.kxyk_mch_store[]
        
        good1:tb.kxyk_mch_goods[]
        
        good2:tb.kxyk_mch_goods[]
    }
    
    export interface RouletteGameDbs{
        
        sid:number
        
        Store:tb.kxyk_mch_store | false
        
        ww:number
        
        n1deg:number
        
        is_play:boolean
        
        is_show_tip:boolean
        
        is_give:number
        
        prize:number
        
        prid:number
        
        Prize:tb.kxyk_user_prize_log | false
        
        log:tb.kxyk_user_prize_log[]
        
    }
    
    export interface A1A2Finance{
        
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
			args:sm.Com.A1A2FinanceApiArgs
		}
		
		t1:number
		
		t2:number
		
		t3:number
		
		t4:number
		
		t5:number
		
		t6:number
		
		t22:number
    }
    
    export interface C1Member
    {
        
        list:sm.C1.GetC1TypeVips[]
        
        cid:number
        
        has_edit:{
            
            price?:string | number
            
            out_price?:string |number
            
            tip_price?:string | number
            
            id?:number
            
            vid:number
            
            cid:number
            
            share_identity?:number
        }
    }
    
    export interface member
    {
        
        list:sm.A1.A1MchTypeMemberList[]
        
        cpid:number
        
        has_tab:string
        
        has_vip:tb.kxyk_mch_type_vips
        
        is_open_has_vip:boolean
        
        is_submit:boolean
    }
    
    export interface newlan
    {
        
        show_page_ids:number[]
        
        is_authorize:boolean
    }
    
    export interface Djjh
    {
        
        is_error:boolean
        
        end:boolean
        
        error_str:string
        
        store_name:string
        
        store_img:string
        
        pay_title:string
        
        pay_price:number
        
        back_url:string

    }
    
    export interface IndexY
    {
        
        is_error:boolean
        
        e1:string
        
        e2:string
        
        sid:number
        
        Store:tb.kxyk_mch_store | null
        
        is_come:number
        
        member:sm.Pd1.HallMember | null
        
        message:sm.Com.message_xy
        
        pop?:number
        
        gi?:sm.Pd1.gi_back
        
        is_show_gi:boolean
        
        get_gi_status:boolean
    }
    
    export interface PromiseDateBackCounts
    {
        
        p1:number
        
        p2:number
        
        p3:number
        
        p4:number
    }
    
    export interface PromiseDateBack
    {
        
        counts:PromiseDateBackCounts
        
        list:any[] | undefined
        
        count:number
    }
    
    export interface TransactionDetails
    {
        
        url:string
        
        ttool:number
        
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
        
		is_render_ui:boolean
        
		is_submit:boolean
        
        showSuccess:boolean
        
        animatedAmount:string
        
        sid:number
        
        is_max:0 | 1
        
        hall:sm.Pd1.HallMember | false
        
		order:sm.Pd1.CashierOrder[]
        
		is_formatting?:boolean
        
		leave_order:sm.Com.CashierLeaveShoeBox[]
        /** 
		 * 当前可用卡券列表 - 即时计算
		 * @protected 卡券为移动端可选择样式 
		*/
		coupons:sm.Com.MultiCouponSelectorCoupon[]
        
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
        
        store:tb.kxyk_mch_store | false

    }
    
    export interface Promotion
    {
        /** api.args.t
         *  页面数据类型
         *  1 = 我的收益
         *  2 = 推广活动
         *  3 = 推广订单
         *  4 = 推广人数
         */

        
        api:sm.RefreshList
        
        counts:PromiseDateBackCounts
    }
    
    export interface ThriftyNew{
        
        cid:number
        
        str1:string
        
        list:tb.kxyk_store_tuangou[]
    }
    
    export interface IndexAdmin{
        
        tab:number
        
        cid:number
        
        is_open:boolean
        
        store:{
            
            open:boolean
            
            store_number:string
            
            store_name:string
        },
        
        xyed:number,
        
        lower_level_time:number
        
        thrifty:{
            
            select_ids:number[]
            
            tg_list:tb.kxyk_store_tuangou[]
            
            config_list:tb.kxyk_store_tuangou[]
            
            str1:string
        }
    }
    
    export interface StoreTuanGouAdmin
    {
        
        sid:number
        
        u:tb.sm_user | false
        
        api:sm.RefreshList
        
        searchUser:sm.SearchUser
        
        is_give_open:boolean
        
        tuangou_list:tb.kxyk_store_tuangou[]
        
        tg_count:number
        
        tg_price:number
        
        tg_give_uid:number
        
        tg_give_list:{
            
            tgid:number,
            
            count:number
        }[]
        
        is_err:boolean
        
        is_submit:boolean
        
        t2_list:any[]
        
        sum1:number
        
        sum2:number
        
        sum3:number
        
        sum4:number
        
        sum5:number
        
        sum6:number
        
        sum7:number

    }
    
    export interface TgOrder{
        
        api:sm.RefreshList,
        
        // list:tb.kxyk_store_tuangou_user[]
    }
    
    export interface Op{
        
        tgid:number
        
        tg:tb.kxyk_store_tuangou | false
        
        is_gmxz:boolean
        
        count:number
        
        pay_type:number
        
        aff:number
    }
    
    export interface Odo{
        
        tgid:number
        
        tg:tb.kxyk_store_tuangou_user | false,
        
        scan:sm.ScanCom
    }

    
    export interface KxykGoods{
        
        gid:number
        
        good:tb.kxyk_mch_goods | false
        
        store:tb.kxyk_mch_store | false
    }

    
    export interface Od{
        
        tgid:number
        
        tg:tb.kxyk_store_tuangou | false
        
        aff:number
        
        promoter:sm.Com.PromotionAgreement

    }
    export type DailyStatistics = {
        
        left_store:number
        
        male_left_store:number
        
        female_left_store:number
        
        list:{
            
            code:string
            
            s1:number
            
            sex:number
        }[]
    }
    
    
    export interface Pd1
    {
        
        coupon_use_list:any[]
        
        is_show_shoe_list?:boolean
        
        giveCard:{
            
            show:boolean
            
            uid:number
            
            sid:number
            
            coupon_count:number
        }
        
        room:{
			
			show:boolean
			
			order:tb.kxyk_mch_store_order_detall | false
		}
        /**
         * 页面状态码
         * 1 = 默认状态，没有进行服务器验证
         * 2 = 服务器已验证，且权限正常
         * 3 = 服务器已验证，没有权限
         */
        pageStatus:1|2|3
        
        is_show_keyboard:boolean
        
        innerWidth:number
        
        message:sm.Com.message_xy
        
        pip:sm.Com.system_logs_props
        
        sign_pip:sm.Com.system_sign_props
        
        printTicket:{
            
            show:boolean
            
            is_load:boolean
            
            count:number
            
            printed_count:number
            
            print_stop:boolean
            
            is_printing:boolean

        }
        
        regUser:{
            
            show:boolean
            
            user:tb.UP<tb.sm_user>
            
            is_submit:boolean
            
            is_show_recharge:boolean
            
            type:0 | 1
            
            price:number
            
            u:tb.sm_user | false
            
            give_vip:number
            
            vips1:tb.kxyk_mch_type_vips[]
            
            vips2:any[]
            
            color:string[],
            
            show_str:string
            
            giev_name:string
            
            give_vip1:number
            
            vip_list:tb.kxyk_circle_member_vip[]
            
            is_show_history:boolean
            
            past_data:sm.Com.system_past_data
            
            reg_type?:number
            
            phone2?:string
            
        }
        
        ScanQrcode:{
            
            show:boolean
            
            card:sm.Pd1.ScanQrcodeCard | false
            
            is_verification:boolean
            
            params:sm.Com.P1QrCodeParams | false
            
            is_show_login_qrcode:boolean
            
            login_qrcode_url:string
            
        }
        
        Identify:{
            open:boolean
        }
        
        UI:{
            
            is_electron:boolean
            
            is_show_top:boolean
            
            fullscreen:boolean
            tab1:{
                
                show1:boolean
                
                show2:boolean
                
                show3:boolean
                
                show4:boolean
            }
        }
        
        now:number
        
        ShowUserInfo:{
            
            show:boolean
            
            uid:number
        }
        
        daliy:DailyStatistics
        
        refresh_count:number
        
        tab8:{
            
            t1:number
            
            t1_s?:number
            
            t1c:number
            
            t2:number
            t2c:number
            
            t3:number
            t3c:number
            
            other:{
                
                other_price?:number
                
                other_count?:number
                
                in_store_price?:number
                
                in_store_count?:number
                
                other_id?:number
            }[]
            
            old_card_count?:number
            
            old_card_total?:number
            
            offline_wx_count?:number
            
            offline_wx_total?:number
            
            cash_count?:number
            
            cash_total?:number
            
            yue_count?:number
            
            yue_total?:number
            
            yue_s_total?:number
            
            yue_s_count?:number
            
            wx_count?:number
            
            wx_total?:number
            
            discount_count?:number
            
            discount_total?:number

            
            staff_list:{
                
                nickname:string
                
                uid:number
            }[]
            
            goods_type_list:{
                
                uid:number
                
                nickname:string
                
                total_cash?:number
                
                cash_clerk_id?:number
                
                sales_count?:number
            }[]
            
            goods_ids_list:{
                
                gid:number
                
                gname:string
                
                sales_count?:number
            }[]
        }
        
        sid:number
        
        store:sm.Pd1.P1StoreCache | null
        
        time:string
        
        api:sm.rList
        
        staff: sm.Pd1.P1Staff
        
        SecondaryMerchants:sm.Pd1.SecondaryMerchants
        
        loginStaff:sm.Pd1.LoginStaff | false
        
        printer:{
            
            is_bind:boolean
            
            p:tb.kxyk_store_printer
        }
        
        electron_id:string
        
        hall:{
            
            has:sm.Pd1.HallMember | null
            
            has_avatar:{
                
                is:boolean
                
                show:boolean
                
                a_hid:number
                
                b_hid:number
            }
            
            show_has:boolean
            
            show:boolean
            
            pc_has:sm.Pd1.HallMember | false
            
            pc_show_has:boolean
            
            list:sm.Pd1.HallMember[]
            
            aList:sm.Pd1.HallMember[]
            
            bList:sm.Pd1.HallMember[]
            
            cList:sm.Pd1.HallMember[]
            /** 
             * 是否正在搜索大厅
             * 搜索范围包括 手机号 手牌号 昵称
             */
            is_search:boolean
            
            search_list:{
                
                aList:sm.Pd1.HallMember[],
                
                bList:sm.Pd1.HallMember[],
                
                cList:sm.Pd1.HallMember[],
            }
            
        }
        
        shoe:{
            
            open:boolean
            
            has:tb.kxyk_bath_shoebox
            
            is_submit:boolean
        }
        
        searchUser:sm.SearchUser
        
        searchShoeBox:sm.Com.SearchShoeBox
        
        StoreConfig:sm.Com.StoreConfig
        
        Voice:{
            
            open:boolean
            
            is_play:boolean
            
            files:{
                key:string,url:string
            }[]
            
            oids:Set<number>

            
            map:any
        }
        
        DeBug:{
            
            open:boolean
            
            list:{
                
                staff:OnlineUser[]
                
                user:OnlineUser[]
            }
            
            data:{
                /** 
                 * 数据等级
                 * @param 0 - 一般提醒
                 * @param 1 - 成功提醒
                 * @param 2 - 错误提醒
                 */
                t:0|1|2
                
                msg:string
                
                time:string
            }[]
        }

    }
    export interface OnlineUser{
        
        name:string
        
        id:number
        
        sid:string
        
        d?:string
        
        uid?:number
        
        environment?:string
    }
    export interface MyU{
        
        uid:number
        
        nickname:string
        
        phone:string
        
        avatar:string
        
        sex:number
        
        pwd:string
        
        money:number
        
        money_list:{
            
            circle_name:string
            
            money:number
            
            r_money:number
            
            cid:number
        }[]
        
        is_promoter:number
        
        s_money:number
        
        s_money_list:{
            
            store_name:string
            
            money:number
            
            sid:number
        }[]
        
        c1:number
        
        c2:number
        
        c3:number 
        
        c4:number 
        
        o1:number
        
        o2:number
        
        o3:number
        
        o4:number
        
        sList:tb.kxyk_mch_store_clerk[]
    }
    
    export interface My {
        
        show:boolean
        
        bz:{
            
            open:boolean
        }
        
        cz:{
            
            is_cz:boolean
            /** 
             * 充值类型 
             * @param 0 充值信值
             * @param 1 充值余额
             */
            type:0 | 1
            
            cid:number
            
            money:string

        }
        
        promoter:sm.Com.PromotionAgreement
        
        promotion_counts:sm.U.Page.PromiseDateBackCounts
        
        u:MyU | false,
        
        reg:sm.Com.EditReg,
        
        order:{
            
            s1:number,
            
            s2:number,
            
            s3:number,
            
            s4:number,
            
            s5:number,
        }
        
        mch_order:
        {
            
            s1:number,
            
            s2:number,
            
            s3:number,
            
            s4:number,
            
            s5:number,
        }
    }

    
    export interface KxykMchIndex{
        
        sid: number,
        
        store:tb.kxyk_mch_store | null
        
        cx_list:tb.kxyk_mch_goods[]
        
        g_list:tb.kxyk_mch_goods[]
        
        sub:tb.kxyk_mch_store_sub[]
        
        has_tuangou_type:number
        
    }
    
    export interface Gbuy{
        
        sid: number,
        
        store:tb.kxyk_mch_store | null
        
        typeList:tb.kxyk_store_tuangou_p[]
        
        tuanGouList:tb.kxyk_store_tuangou[]
        
        has_tuangou_type:number
        
        aff:number
        
    }
    
    export interface MyCoupon{
        
        type: number,
        
        topStr:string
        
        reference:boolean
        
        uid:number
        
    }
}
