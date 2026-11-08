
declare namespace tb 
{
    
    type UP<T> = Partial<T>;


    
    interface kxyk_make_qr_url{
        
        id:number
        
        str:string | sm.Com.CashierSubmit
    }

    
    interface kxyk_mch_goods_stock_level2{
        
        id:number
        
        sub_id:number
        
        goods_id:number
        
        stock:number
        
        sort?:number
        
        
        goods_name?:string
        
        goods_img?:string
        
        sub_name?:string
        
        sub_name2?:string
        
        stock_warn?:number
    }

    
    interface kxyk_mch_goods_supplier{
        
        id:number
        
        sid:number
        
        s_name:string
        
        s_nickname:string
        
        s_phone:string
        
        remark?:string
        
        clerk_id?:number
        
        t0:number
    }
    
    interface kxyk_mch_goods_stock_log{
        
        id:number
        
        sid:number
        
        goods_id:number
        /** 
         * 一二级库存 楼层库存
         * @count 0 一级总库存
         * @count 大于一是二级库存 楼层分类ID 关联 kxyk_mch_store_sub 表
         */
        sub_id:number
        
        sl_id?:number
        /** 
         * 库存类型
         * @param 1 采购入库 - 供货商购入
         * @param 2 赠品入库 - sub_id 0时总库存赠送入库 sub_id有值是二级库存赠送入库
         * @param 3 领用入库 - 二级库存多领取时入库
         * @param 4 盘盈入库 - 销售给客户但客户没使用完盈余入库
         * @abstract 以下是出库
         * @param 5 销售出库 - 非总库存 只能销售二级库存且需要关联楼层或员工分类
         * @param 6 赠品出库 - sub_id是0时总库存赠送 有值时二级库存赠送给客户
         * @param 7 领用出库 - 一级库存出库给二级库存多领取出库
         * @param 8 报损出库 - sub_id是0时总库存报损 有值时是二级库存报损
         * @param 9 退供应商 - 供货商退货出库
        */
        type:number
        
        is_unit?:number
        
        unit_count?:number
        
        stock_unit_count?:number
        
        count:number
        
        before_stock:number
        
        after_stock:number
        /** 
         * 关联变动来源ID
         * @param type = 5 时关联销售ID
         * @param type =  3 7 时关联的是任务表ID
         */
        ref_id:number
        
        remark:string
        
        clerk_id:number
        
        t1:number
        
        supp_id?:number
        
        
        supp_price?:number
        
        stock_unit?:string
        
        
        goods_img?:string
        
        is_unit_show?:number
        
        sub_name?:string
        
        sub_name2?:string
        
        goods_name?:string
        
        clerk_name?:string
        
        clerk_n?:string
        
        is_edit?:boolean
        
        now_stock?:number
        
    }
    
    interface kxyk_mch_store_order_detall_autoend_service{
        odid:number
    }


    
    export type kxyk_mch_store_order_detall_room ={
        
        id:number
        
        odid:number
        
        room_id:number
        
        d:string
        
        good_id:number
    }

    
    export type kxyk_coupon_cardholder = 
    {
        
        id:number
        /** 
         * 本条数据状态吗
         * @param 0 = 等待确认中
         * @param 1 = 已完成 领取成功 删除成功等
         * @param 2 = 领取失败 删除失败等
         */
        ss:number
        
        r_uid:number
        
        g_uid:number
        /** 
         * 业务类型
         * @param 0 = 门店员工给用户发卡
         * @param 1 = 门店员工删除用户卡券
         * @param 2 = 用户转赠给别人卡券 领取用户记录领取UID
         */
        t:number
        /** 
         * 涉及的卡券数组 字符串形式存储
         */
        info:string | sm.Com.MemberCouponItems[]
        
        clerk_id?:number
        
        t0:number
        
        t1?:number
    }

    
    export type kxyk_coupon_cardholder_log = {
        
        id:number
        
        pid:number
        
        count:number
        
        ccid:number
    }

    
    export type sm_user_remark = {
        
        id:number
        
        uid:number
        
        remark:string
        
        set_uid:number
        
        t0:number
        
        set_name?:string
    }

    
    export type kxyk_mch_goods_type ={
        
        id:number
        
        n:string
        
        goods_count?:number
    }
    
    export type kxyk_p1_staff_task = 
    {
        
        id:number
        
        sid:number
        
        title:string
        /** 
         * 任务类型
         * @value 0 暂未指定任务类型
         * @value 1 清理房间任务 - 客户房间结单释放
         * @value 2 库存相关
         */
        type:number    
        /**
         * 触发任务的人民
         * @info 这个命中旁边显示 现在 一分钟前 等时间
         */
        staffRole?:string
        /**
         * 触发任务的场景
         * @info 清理房间时显示 要清理的房间号码或位置 出库商品时显示商品名称和数量
         */
        rootName?:string
        
        remark?:string
        /**
         * 任务状态
         * @value 0 等待处理
         * @value 1 正在处理
         * @value 2 处理完成
         */
        ss:number
        
        t0:number
        
        t1?:number
        
        t2?:number
        
        clerk_name?:string
        
        clerk_id?:number
        
        odid?:number
        
        lid?:number
        
        sub_id?:number
        
        sub_list?:string | tb.kxyk_mch_goods_stock_log[]
        /** 
         * 库存任务类型
         * @param 0 库管下发的任务需要楼层确认
         * @param 1 楼层下发的申请需要库管确认
         */
        sub_t?:number
        
        ck_id1?:number

    }

    
    export type kxyk_mqtt_gateway_lock_auth = {
        
        id:number
        
        lid:number
        /** 
         * 授权类型
         */
        t:"Card" | "Password" | 'Finger' | "Face"
        
        v:string
        
        clerk_id?:number
        
        t0:number
        
        sb_id?:number
    }
    
    export type kxyk_mqtt_gateway_lock = {
        
        id:number
        
        fname?:string
        
        dooms?:string | string[]
        
        price?:number
        
        imgs?:string | string[]
        
        info?:string
        
        bookedDates?:string[]
        
        clientId:string
        
        lockId:string
        /**
         * 设备类型：
         *  @param 90 sub1G刷卡+密码门锁
         *  @param 91 sub1G刷卡+密码+指纹门锁
         *  @param 92 sub1G刷卡+密码+主扫门锁
         *  @param 93 sub1G刷卡+密码+人脸识别门锁
         *  @param 94 sub1G刷卡+密码+指纹+人脸识别门锁
         */
        type:number
        
        hardVer?:string
        
        version?:string
        
        customerId?:string
        
        recordNumber?:number
        
        authCard?:number
        
        authPassword?:number
        
        authFinger?:number
        
        authFace?:number
        
        maxRecordNumber?:number
         
        maxAuthCard?:number
         
        maxAuthPassword?:number
         
        maxAuthFinger?:number
         
        maxAuthFace?:number
        /**
         * 门锁当前电机工作状态：
         *  @param 0：代表门锁处于电机关闭状态
         *  @param 1：代表门锁处于电机打开状态
         */ 
        lockState?:number
        /** 
         * 该项仅在支持门磁状态检测的门锁适用，代表实际的门开/门关状态
         * @param 0：代表门处于实际闭合状态
         * @param 1：代表门处于实际打开状态
         */ 
        openState?:number
        /**
         * 门锁常开模式
         * @param 1：表示打开常开模式，门锁开门后，会一直保持打开状态，直到门锁关闭
         * @param 0：表示关闭常开模式，门锁开门后，延迟一段时间就会自动关闭
         */ 
        holdOpen?:number
         
        delayTime?:number
        /**是否开启卡片防复制，门锁在出厂时默认不启用卡片防复制功能，仅允许读取卡片的物理卡号。这可能导致一定的安全风险（可能被手机复制）。
            若需提升安全性，可联系我司采购防复制的特殊卡片并打开该软件功能，可有效防止手机和专用设备复制卡片。特殊场景下（如校园、企业）可定制程序解决防复制。
         * @param 0：不开启
         * @param 1：开启防复制功能 
        */ 
        refuseCopy?:number
        /** 
         * 记录推送策略，出厂默认配置为1：
         * @param 0：每次有效密码/卡片开门不主动推送消息，除非服务器主动读取（较省电）。
         * @param 1、每次有效密码/刷卡均触发一次消息推送，且每次上传记录时，若门锁内有历史记录，会一起上传，最大每次10条。（较耗电）。
        */ 
        recordPush?:number
        /** 
         * 门磁变化推送功能，需硬件支持
         * @param 0：关闭门磁推送（较省电）。
         * @param 1、每次门磁变化均触发一次消息推送，且每次上传记录时，若门锁内有历史记录，会一起上传，最大每次10条。（较耗电）。 
        */ 
        magneticPush?:number
        /** 
         * 未授权卡刷卡/未授权密码推送功能，只有打开该功能，才有相应推送消息，出厂默认配置为1：
         * @param 0：关闭非法卡片和密码推送（省电）
         * @param 1：每次未授权的卡或密码尝试开门触发一次消息推送，若门锁内有历史记录，会一起上传，最大每次10条。（较耗电）。
        */ 
        invalidPush?:number
         
        battery?:number
        /** 
         * 当前房间绑定的房型商品ID
         * @protected 每个房间只能绑定一个商品ID
         */
        gid?:number
        /**
         * 房间状态
         * @param 0 空闲 可以销售
         * @param 1 有客人入住
         * @param 2 客人离开后等待打扫
         * @param 3 维护维修
         */
        status?:number
    }
    
    export type kxyk_mqtt_gateway_store = 
    {
        
        id:number
        
        mgid:number
        
        sid:number
        
        gname:string
        
        t0:number
    }
    
    export type kxyk_mqtt_gateway = {
        
        id:number
        
        clientId:string
        
        info?:string
        
        hardVer?:string
        
        customerId?:string
        
        version?:string
        
        mac?:string
        
        ip?:string
        /**
         * 网关状态  
         * @param 0 正常状态
         * @param 1 网关正处于等待添加门锁状态 
         */
        state:number
        /** 
         * 是否离线 
         * @param 0 = 离线
         * @param 1 = 在线
        */
        online?:number
        
        t0?:number
        
        t1?:number
    }

    
    export type kxyk_user_give_money_and_vip =
    {
        
        id:number
        
        set_uid:number
        
        get_uid:number
        
        money:number
        
        s_money:number
        
        vip:number
        /** 
         * 是否转赠VIP
         * @param 1 = 是
         * @param 0 = 否
         */
        is_set_vip?:number
        
        sid:number
        
        t1:number
        
        t2:number
        /** 
         * 转赠状态
         * @param 0 = 转赠中
         * @param 1 = 已接受
         * @param 2 = 已过期
         */
        state:number
    }
    
    export type kxyk_store_chat = 
    {
        
        id:number
        
        sid:number
        
        send_clerk_id:number
        /** 
         * 消息类型
         * @count 1 = 图片消息
         * @count 2 = 语音消息
         * @count 3 = 文字消息
         */
        type:number
        
        time:number
        
        n_ids?:number[] | string
        
        ck_ids?:number[] | string
        /** 
         * 消息体
         * @count 图片消息时为图片地址
         * @count 语音消息时为语音地址
         * @count 文字消息时为文字
         */
        msg:string 
    }

    
    export type kxyk_other_payment ={
        
        id:number
        
        sid:number
        
        pname:string
        
        t0:number
        /** 是否已经删除
         * @param 1 = 删除
         */
        is_del?:number

    }

    
    export type kxyk_mch_store_clerk_sign_detall = 
    {
        
        id:number
        /** 
         * 关联签到轮班表
         * 关联kxyk_mch_store_clerk_sign表
         */
        cs_id:number
        /**
         * 数据类型
         * @param 1 = 上班打卡时间 自动计算是否迟到
         * @param 2 = 下班打卡时间 自动计算是否迟到
         * @param 3 = 请小时假 包含开始和结束时间
         * @param 4 = 管理员备注
         */
        type:number
        /** 
         * 请假开始时间戳
         * @abstract 上下班打卡时间
         * @param 上班打开时间
         *  */        
        t0:number
        
        t0_str:string
        /** 
         * 请假结束时间戳
         * @abstract 上下班时记录 早到 迟到 早退 晚走 秒数
        */
        t1:number
        
        t1_str:string
        /**
         * 本条数据状态 正向还是异常
         * @param 0 上班下班正常打卡
         * @param 1 正向
         * @param 2 异常
         */
        status:number
        /**
         * 涉及小时数
         * @abstract 请假不足10分钟时不算时间  超过后按一小时计算 t1里记录的是秒 
         */
        hour:number
        
        remark?:string
    }

    
    export type kxyk_mch_store_clerk_sign = {
        
        id:number
        
        sid:number
        
        clerk_id:number
        /** 
         * 本次班次打卡状态
         * @param 0 = 等待上班打卡
         * @param 1 = 打了上班卡 还没打下班卡 
         * @param 2 = 打了下班卡 是否异常看异常字段
         * @param 3 = 公休  员工发群后自己可以设置公休日
         * @param 4 = 请假 病假或者事假
         * @param 5 = 旷工 由系统任务自动判定
         * @param 6 管理员手动处理 手动处理后不再异常 但必须填写处理理由 理由写在status3_msg字段
         * @param 7 = 正在请临时假
         */
        status:number
        /**
         * 当前正在绑定的临时请假ID 关联kxyk_mch_store_clerk_sign_detall表ID
         */
        d_id?:number
        /** 
         * 请假类型
         * @param 0 = 事假
         * @param 1 = 病假
         */
        status3_type?:number
        /**
         * 请假原因 选填
         * @protected 若管理员手动消除异常 需要填写原因
         */
        status3_msg?:string
        /**
         * 本条数据创建时间戳
         * @abstract 用于统计用户最后一次轮班时间
         */
        t0:number
        /**
         * 上班打卡时间戳
         */
        t1?:number
        
        t1_str?:string
        
        t1_lat?:string
        
        t1_lng?:string
        /**
         * 上班打开状态
         * @param 0 = 等待上班打卡中
         * @param 1 = 上班打卡时间在正常范围无异常
         * @param 2 = 提前上班打卡
         * @param 3 = 上班迟到 异常+1
         * @param 5 = 管理员设置补卡 也可以消除迟到异常
         */
        t1_status?:number
        
        t1_odd?:string
        
        t2?:number
        
        t2_str?:string
        
        t2_lat?:string
        
        t2_lng?:string
        /**
         * 下班打开状态
         * @param 0 = 还没有打下班卡 或者无需下班打卡
         * @param 1 = 下班打卡时间在正常范围无异常
         * @param 2 = 延时下班打卡
         * @param 3 = 早退下班 异常+1
         * @param 4 = 超时没有打下班卡 异常+1 缺卡
         * @param 5 = 管理员设置补卡 也等同消除异常
         */
        t2_status?:number
        
        t2_odd?:string
        /** 
         * 本班次打卡异常次数累计 
         * @protected 默认0，每次异常+1 
         */
        odd?:number
        
        d_id?:number
        /** 
         * 本班次挂在临时请假或异常详情
         */
        detall?:kxyk_mch_store_clerk_sign_detall[]
    }
    
    export type kxyk_mch_store_finance = {
        
        id:number
        
        sid:number
        
        uid:number
        
        hid?:number
        
        oid?:number
        
        odid?:number
        /**
         * 结算类型
         * @param 0 = 员工
         * @param 1 = 子商户
         */
        type:number
        /** 
         * 员工clerk_id 
         * @property 员工类型时对应的员工ID
        */
       clerk_id?:numbe
       /**
        * 子商户sub_id
        * @property 子商户类型时对应的子商户ID
        */
       sub_id?:number
       /**
        * 相对门店收益或支持
        * @param 0 = 门店收益
        * @param 1 = 门店支付给子商户
        */
       payable:number
       
       price:number
       /** 
        * 是否结算
        * @param 0 = 未结算
        * @param 1 = 正在结算（有时候可能正则申请）
        * @param 1 = 已结算
        */ 
       check:number
       
       check_clerk_id?:number
       /** 
        * 简短说明
        * @property 体现在按日查询时的色块标题 + 收益指出 数字
        */
       info?:string
       
       msg?:string
       
       t0?:string
       
       t1?:number
       
    }
    
    export type kxyk_mch_store_credit_log = {
        
        id:number
        
        sid:number
        
        uid:number
        
        price:number
        /** 
         * 充值类型
         * @param 0 = 没有指定类型
         * @param 1 = 郭总赠送A
         * @param 2 = 郭总赠送B
         * @param 3 = 郭总赠送C
         * @param 4 = 杨总赠送A
         * @param 5 = 杨总赠送B
         * @param 6 = 杨总赠送C
         */
        t:number
        
        vip?:number
        
        clerk_id?:number
        
        t0?:number
        
        type?:0 | 1
        
        type2?:0 | 1
    }

    
    export type kxyk_mch_store_vip_gift_rules = {
        
        id:number
        
        sid:number
        
        vip:number
        
        coupons:string | number[]
        
        clerk_id?:number
        
        t1?:number
        
        is_edit?:boolean
    }
    
    export type kxyk_system_logs = {
        
        id:number
        
        cid?:number
        
        sid?:number
        /**
         * 日志等级
         * @param 1 = TRACE 跟踪
         * @param 2 = DEBUG 调试
         * @param 3 = INFO 信息
         * @param 4 = WARN 警告
         * @param 5 = ERROR 错误
         * @param 6 = FATAL 致命
         */
        level: 1 | 2 | 3 | 4 | 5 | 6
        
        fn?:string
        
        msg:string
        
        t1?:number
        
        uid?:number
        
        at?:string

    }

    
    interface kxyk_e1_lower_level{
        
        id:number
        
        cid:number
        
        eid:number
        
        uid:number
        
        t1:number
        
        t2:number
        /**
         * 下级状态
         * @param 0  上下级正常
         * @param 1  下级身份已过期失效
         */
        t:number
    }
    
    interface kxyk_user_vip_set_apply
    {
        id:number
        
        uid:number
        
        cid:number
        
        sid:number
        
        vip:number
        /**
         * 申请状态
         * @const 0 等待审批
         * @const 1 申请已经通过
         * @const 2 申请已被拒绝
         */
        status:number
        /** 
         * 申请设置的大客户 E1 ID
         * @protected 关联 kxyk_mch_role_info
         */
        e1_id:number
        /**  
         * 审核通过的管理员ID 
         * @protected 关联 kxyk_mch_role_info
        */
       staff_id:number
       
       t1:number
       
       t2:number
       
       bz?:string
    }
    
    interface kxyk_subscribe_message_count{
        id:number
        
        temp_id:string
        
        count:number
        
        uid:number
    }
    
    interface kxyk_mch_store_queue_config_xy
    {
        
        id:number
        
        sid:number
        
        q_name:string
        
        q_select:string | number[]
        
        is_edit?:boolean
        
        list?:tb.kxyk_mch_store_order_detall[]
    }
    
    interface kxyk_mch_store_local_serve{
        
        id:number
        
        uid:number
        
        sid:number

        
        
        sname?:string
        
        img?:string
        
        phone?:string
        
        count?:number
        
        address?:string
        
        distance?:number
        
        lat?:string
        
        lng?:string
        
        type?:number

    }
    
    interface kxyk_mch_order{
        
        id:number
        /** 
         * 购物车ID组 - 逗号分割
         * @property 关联 kxyk_mch_cart 表
         */
        car_ids:string
        
        price:number
        /** 
         * 快递收货地址ID
         * @property 关联 kxyk_user_address表
         */
        address_id:number
        
        uid:number
        /** 
         * 平台生成的唯一订单ID
         */
        unique_id:string
        /** 
         * 订单状态
         * @const 0 未支付
         * @const 1 已支付
         * @const 2 已发货或者已经给用户生成核销码
         * @count 3 用户已确认收货 或已经核销使用
         * @count 4 已评价
         * @count 5 已经退款
         */
        status:number
        
        t1:number
        /** 
         * 订单是否已删除
         * @count 0 未删除
         * @count 1 已删除
         */
        is_del:number
    }
    
    interface kxyk_china_area{
        
        id:number
        
        a1:string
        
        a1_code:string
        
        a2:string
        
        a2_code:string
        
        name:string
        
        code:string
        /** 
         * 行政等级
         * @property 0 = 省级
         * @property 1 = 市级
         * @property 2 = 区级
         */
        level:number
        /**
         * 上级ID
         * @property 当前身份为省级时 上级ID为0
         * @property 当前身份为市级时 上级ID为省级ID
         * @property 当前身份为区级时 上级ID为市级ID
         */
        root_id:number


    }
    
    interface kxyk_user_address{
        
        id:number
        
        uid:number
        
        s_name:string
        
        phone:string
        
        code1:string
        
        code2:string
        
        code3:string
        
        address:string
        
        is_default:number
        
        area?:string[]
        
        code1_name?:string
        
        code2_name?:string
        
        code3_name?:string

    }
    
    interface kxyk_mch_cart{
        
        id:number
        
        sid:number
        
        gid:number
        
        price:number
        
        count:number
        
        uid:number
        
        t1:number
        
        is_del?:number
        
        store_name?:string
        
        store_img?:string
        /**
         *  虚拟字段前端使用
         *  购物车内结算是否选额当前条目
         */
        is_select?:number
        
        is_select_bool?:boolean
        
        goods_img?:string
        
        goods_name?:string
        
    }
    
    interface kxyk_mch_join_apply{
        
        id:number
        
        mch_name:string
        
        items:string
        
        info?:string
        
        u_name:string
        
        u_phone:string
        
        account:string
        
        password:string
        
        time:number
        
        uid?:number
    }
    
    interface kxyk_user_pay_log_refunds{
        
        id:number
        
        pl_id:number
        /** 
         * 退款ID 每个支付商户内唯一
         * @property 可用于查询退款状态
         */
        out_refund_no:string
        /** 
         * 退款状态
         * @const 0 = 退款中
         * @const 1 = 退款成功
         * @const 2 = 退款失败
         */
        status:number
        
        err?:string
        /** 
         * 退款金额
         * @property 以分为单位
         */
        price:number
        /** 
         * 关联订单详情表id
         * @property kxyk_mch_store_order_detall
         */
        od_id:number
        
        t1?:number
        
        t2?:number
        
        refund_id?:string
    }

    
    interface kxyk_secondary_merchants_submission
    {
        
        id:number
        
        sid:number
        /** 
         * 进件状态
         * @const 0 = 已保存数据库，还未预递交
         * @const 1 = 已预递交，等待正式递交
         * @const 2 = 已递交，等待审核
         * @const 3 = 已审核，等待超级管理员签约
         * @const 4 = 已完成入住
         * @const 5 = 被驳回
         * @const 6 = 等待账户验证 银行验证 法人验证 签约验证
         * @const 7 = 已经完成
         */
        status:number
        /** 
         * 业务申请编号
         * @property 1、服务商自定义的商户唯一编号。
         * @property 2、每个编号对应一个申请单，每个申请单审核通过后会生成一个微信支付商户号。
         * @property 3、若申请单被驳回，可填写相同的“业务申请编号”，即可覆盖修改原申请单信息 。
         */
        out_request_no:string
        /** 
         * 主体类型
         * @property 非小微的主体类型需与营业执照/登记证书上一致，可参考选择主体指引，枚举值如下。
         * @property 2401：小微商户，指无营业执照的个人商家。
         * @property 2500：个人卖家，指无营业执照，已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元的个人商家。（若选择该主体，请在“补充说明”填写相关描述）。
         * @property 4：个体工商户，营业执照上的主体类型一般为个体户、个体工商户、个体经营。
         * @property 2：企业，营业执照上的主体类型一般为有限公司、有限责任公司。
         * @property 3：事业单位，包括国内各类事业单位，如：医疗、教育、学校等单位。
         * @property 2502：政府机关，包括各级、各类政府机关，如机关党委、税务、民政、人社、工商、商务、市监等。
         * @property 1708：社会组织，包括社会团体、民办非企业、基金会、基层群众性自治组织、农村集体经济组织等组织。
         */
        organization_type:"2401"|"2500"|"4"|"2"|"3"|"2502"|"1708"

        /** 
         * 【营业执照信息】
         * @property 1、主体为“小微/个人卖家”时，不填。
         * @property 2、主体为“个体工商户/企业”时，请上传营业执照。
         * @property 3、主体为“政府机关/事业单位/社会组织”时，请上传登记证书。
         */
        business_license_info?:string | sm.WX.business_license_info

        /** 
         * 【是否金融机构】
         * @property 选填，请根据申请主体的实际情况填写，可参考选择金融机构指引：
         * @property 1、若商户主体是金融机构，则填写：true。
         * @property 2、若商户主体不是金融机构，则填写：false。
         * @property 若未传入将默认填写：false。
         */
        finance_institution:boolean | number
        
        /** 
         * 【金融机构许可证信息】
         * @property 当主体是金融机构时，必填
         */
        finance_institution_info?:string | sm.WX.finance_institution_info

        /** 
         * 【证件持有人类型】
         * @property 1. 主体类型为政府机关/事业单位时选传：
         * @property （1）若上传的是法人证件，则不需要上传该字段。
         * @property （2）若因政策保密等原因，无法提供法人证件时，可上传经办人。 （经办人：经商户授权办理微信支付业务的人员，授权范围包括但不限于签约，入驻过程需完成账户验证）。
         * @property 2. 主体类型为企业/个体户/社会组织时，默认为经营者/法人，不需要上传该字段。
         * @const LEGAL = 法人
         * @const SUPER = 经办人
         */
        id_holder_type:"LEGAL"|"SUPER"

        /** 
         * 【经营者/法人证件类型】
         * @property 1、当证件持有人类型为经营者/法人时，需要填写。其他情况，无需上传。
         * @parperty 2、主体为“小微/个人卖家”，可选择：身份证。
         * @parperty 3、主体为“个体户/企业/事业单位/社会组织”：可选择任一证件类型，主体为“政府机关”仅支持中国大陆居民-身份证类型。
         * @parperty 4、若没有填写，系统默认选择：身份证。
         * @const IDENTIFICATION_TYPE_MAINLAND_IDCARD = 中国大陆居民-身份证
         * @const IDENTIFICATION_TYPE_OVERSEA_PASSPORT 其他国家或地区居民-护照
         * @const IDENTIFICATION_TYPE_HONGKONG 中国香港居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_MACAO 中国澳门居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_TAIWAN 中国台湾居民--来往大陆通行证
         * @const IDENTIFICATION_TYPE_FOREIGN_RESIDENT 外国人居留证
         * @const IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT 港澳居民证
         * @const IDENTIFICATION_TYPE_TAIWAN_RESIDENT 台湾居民证
         */
        id_doc_type:"IDENTIFICATION_TYPE_TAIWAN_RESIDENT"|"IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT"|"IDENTIFICATION_TYPE_FOREIGN_RESIDENT"|"IDENTIFICATION_TYPE_TAIWAN"|"IDENTIFICATION_TYPE_MACAO"|"IDENTIFICATION_TYPE_MAINLAND_IDCARD"|"IDENTIFICATION_TYPE_OVERSEA_PASSPORT"|"IDENTIFICATION_TYPE_HONGKONG"
        
        /** 
         * 【法定代表人说明函】
         * @property 1、当证件持有人类型为经办人时，必须上传。其他情况，无需上传。
         * @property 2、因政策保密等原因，无法提供法定代表人证件时，请参照示例图打印法定代表人说明函，全部信息需打印，不支持手写商户信息，并加盖公章。
         * @property 3、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         * @property 这里保存七牛云地址 只有提交给微信时替换为微信返回的MediaID
         */
        authorize_letter_copy?:string

        /** 
         * 【法定代表人说明函】MediaID
         * @property 这里保存微信返回的MediaID 
         * @property 递交时用这里的值替换authorize_letter_copy
         */
        authorize_letter_copy_media_id?:string

        /** 
         * 【经营者/法人身份证信息】
         * @property 当证件持有人类型为经营者/法人且证件类型为“身份证”时填写。
         */
        id_card_info?:string | sm.WX.id_card_info

        /** 
         * 【经营者/法人其他类型证件信息】
         * @property 当证件持有人类型为经营者/法人且证件类型不为“身份证”时填写。
         */
        id_doc_info?:string | sm.WX.id_doc_info

        /** 
         * 【经营者/法人是否为受益人】
         * @property 主体类型为企业时，需要填写：
         * @property 1、若经营者/法人是最终受益人，则填写：true。
         * @property 2、若经营者/法人不是最终受益人，则填写：false。
         * @property 数据库存储0 1 递交时改为 true false
         */
        owner:boolean | number

        /** 
         * 【最终受益人信息列表】仅企业需要填写。
         * @property 若经营者/法人不是最终受益所有人，则需提填写受益所有人信息，最多上传4个。
         * @property 若经营者/法人是最终受益所有人之一，可在此填写其他受益所有人信息，最多上传3个。
         * @property 根据国家相关法律法规，需要提供公司受益所有人信息，受益所有人需符合至少以下条件之一：
         * @property 1、直接或者间接拥有超过25%公司股权或者表决权的自然人。
         * @property 2、通过人事、财务等其他方式对公司进行控制的自然人。
         * @property 3、公司的高级管理人员，包括公司的经理、副经理、财务负责人、上市公司董事会秘书和公司章程规定的其他人员。
         */
        ubo_info_list?:string | sm.WX.UboInfoList[]

        /** 
         * 【结算账户信息】
         * @property 请填写商家提现收款的银行账户信息。
         */
        account_info:string | sm.WX.account_info
        
        /** 
         * 【超级管理员信息】
         * @property 请填写店铺的超级管理员信息。
         * @property 超级管理员需在开户后进行签约，并可接收日常重要管理信息和进行资金操作，请确定其为商户法定代表人或负责人
         */
        contact_info:string | sm.WX.contact_info

        /** 
         * 【经营场景信息】
         * @property 请填写经营场景信息
         */
        sales_scene_info:string | sm.WX.sales_scene_info

        /** 
         * 【结算规则】
         * @property 请填写商家的结算费率规则、所属行业等信息。若电商平台未传入，系统将填写默认值
         */
        settlement_info?:string | sm.WX.settlement_info

        /** 
         * 【商户简称】
         * @property UTF-8格式，中文占3个字节，即最多21个汉字长度。将在支付完成页向买家展示，需与商家的实际售卖商品相符 。
         */
        merchant_shortname:string

        /** 
         * 【特殊资质】array
         * @property 1、仅当商户选择了必需提交特殊资质的行业时，需要提供该项资料；若商户选择了无需特殊资质的行业，或未选择行业时，无需提交该项资料，详情查看《行业对应特殊资质》
         * @property 2、请提供为“申请商家主体”所属的特殊资质，可授权使用总公司/分公司的特殊资质；
         * @property 3、最多可上传5张照片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         * @property 这里存储七牛云图片地址 数组
         */
        qualifications?:string | string[]

        /** 
         * 特殊资质 微信返回的media_id 数组
         */
        qualifications_media_id?:string | string[]

        /** 
         * 【补充材料】array
         * @property 根据实际审核情况，额外要求提供。最多可上传15张照片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         * @property 这里存储七牛云图片地址 数组
         * @note 这里是七牛云返回的图片地址列表
         */
        business_addition_pics?:string | string[]

        /** 
         * 【补充材料】这里是微信返回的media_id 数组
         */
        business_addition_pics_media_id?:string | string[]

        /** 
         * 【补充说明】
         * @property 若主体为“个人卖家”，该字段必传，则需填写描述“ 该商户已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元。
         */
        business_addition_desc?:string
        
        applyment_id?:string

        
        status_msg?:string

        
        account_validation?:string | sm.WX.AccountValidation

        /** 
         * 【法人验证链接】
         * @property 1、当申请状态为ACCOUNT_NEED_VERIFY，且通过系统校验的申请单，将返回链接。
         * @property 2、建议将链接转为二维码展示，让商户法人用微信扫码打开，完成账户验证。
         */
        legal_validation_url?:string

        /** 
         * 【签约链接】 管理员签约链接
         * @property 1、当申请状态为NEED_SIGN时才返回。
         * @property 2、建议将链接转为二维码展示，需让申请单-管理者用微信扫码打开，完成签约。
         */
        sign_url?:string

        /** 
         * 【签约状态】
         * @property 1、未签约-UNSIGNED：该状态下，电商平台可查询获取签约链接，引导二级商户的超级管理员完成签约；
         * @property 2、已签约-SIGNED ：指二级商户的超级管理员已完成签约。注意：若申请单被驳回，商户修改了商户主体名称、法人名称、超级管理员信息、主体类型等信息，则需重新签约。
         * @property 3、不可签约-NOT_SIGNABLE：该状态下，暂不支持超级管理员签约。一般为申请单处于已驳回、已冻结、机器校验中状态，无法签约。
         * @const UNSIGNED 未签约
         * @const SIGNED 已签约
         * @const NOT_SIGNABLE 无法签约
         */
        sign_state?:"UNSIGNED"|"SIGNED"|"NOT_SIGNABLE"

        
        sub_mchid?:string
        /** 
         * 点金计划
         * @property 参与点金计划支付完成可以设置小票 否则直接关闭窗口
         * @const 0 未开启点金计划
         * @const 1 开启点金计划
         */
        click_gold?:number
    }

    
    interface kxyk_store_printer{
        
        id:number
        
        mark:string
        
        ip:string
        
        sid:number
        /** 打印机类型
         * @param 0 = 网络地址+端口链接  electron 模式
         * @param 1 = 共享地址链接 node-thermal-printer 模式
         */
        t:number
                
    }
    
    interface kxyk_user_combine_pay_order_detall
    {
        id:number
        /** 
         * 关联kxyk_user_combine_pay_order主表ID
        */   
       cpid:number
        
       odid:number
       
       out_trade_no:string
       
       sub_mchid:string
       
       sub_mch_name:string
       /**
        * 支付状态
        * @param 0 = 未支付
        * @param 1 = 已支付
        * @param 2 = 已退款
        */
       is_pay:number
       
       price:number
       
       t1:number
       
       t2?:number
       
       t3?:number
    }
    
    interface kxyk_user_combine_pay_order
    {
        
        id:number
        
        uid:number
        /** 
         * 支付商类型
         * @param 0 = 微信
         * @param 1 = 支付宝
         */
        type:number
        /** 
         * 支付状态
         * @param 0 = 未支付
         * @param 1 = 已支付
         * @param 2 = 已退款
         * @param 3 = 正在处理微信回调
         */
        status:number
        /**
         * 支付环境
         * @param wx  公众号
         * @param app  app
         * @param wxapp  小程序
         * @param h5  H5
         */
        os:string
        
        sid:number
        
        hid:number
        /** 
         * 关联订单详情表id,用逗号分割的字符串组
         */
        odids:string
        /**
         *  商户内部为一只订单ID
         * @type string(32)
         */
        out_trade_no:string
        
        prepay_id?:string
        
        transaction_id?:string
        
        t1:number
        
        t2?:number
        
        price:number
        
        pid:number
    }
    
    interface kxyk_circle_member_fund_log
    {
        
        id:number;
		
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
		 */
		type:number;
		
		type_str?:string;
		
		coupon?:CouponUser;
		
		annual?:kxykAnnualUser;
		
		order?:OrderDetall[]
		
		eid:number;
		
		msg:string;
		
		t1:number;
        
        del?:number
    }
    
    interface kxyk_user_prize_log{
        id:number
        /** 
         * 奖品ID
         * @param 0 未中奖
         * @param 1 2000元现金
         * @param 2 刷车卡
         * @param 3 啤酒
         * @param 4 刷车卡
         * @param 5 啤酒
         */
        jid:number
        
        uid:number
        
        is_give:number
        
        is_give2:number
        
        t1:number
        
        t2:number
        
        staff_uid:number

        

        
        phone?:string
        
        nickname?:string
        
        avatar?:string

    }
    
    interface kxyk_user_prize_phone{
        id:number
        
        phone:string
    }
    
    interface kxyk_bath_hall_prior_pay{
        
        id:number
        /**
         * 支付类型
         * @param 1 现金支付
         * @param 2 微信在线支付
         */
        type:number
        /**
         * 调用微信支付的地方
         * @param 0 用户购物车 即使结算
         * @param 1 用户离店结算
         */
        type2:number
        
        hid:number
        
        price:number
        
        oids:string
        
        odids:string
        
        pay_uid:number
        
        action_uid:number
        
        clerk_id?:number
        
        t1:number
        
        t2:number
        /**
         *  支付状态
         * @param 0 未支付
         * @param 1 已支付
         */
        is_pay:number
        
        is_end:number
    }
    
    interface kxyk_coupon_exchange_low{
        
        id?:number
        /** 
         * 是否兑换
         * @param 0 不能兑换
         * @param 1 兑换
         */
        is_exchange:number
        /** 
         * 是否低值
         * @param 0 不是低值
         * @param 1 低值
         */
        is_low:number
        
        sid:number 
        
        is_spec:number 
        
        goods_id:number
        
        item_id:number
        
        pid:number
    }
    
    interface kxyk_mch_store_order_detall{
        
        pay_vip?:number
        
        room_number?:string | string[]
        
        check_in?:string
        
        check_out?:string
        /** 
         * 客房订单 登记入住人姓名 2026-04-27
         */
        collect_name?:string
        /**
         * 客房订单 登记入住人电话 2026-04-27
         */
        collect_phone?:string
        
        lock_auth?:string | sm.Com.action_room_back
        /** 
         * 新的商品类型 为了提高性能 给订单详情里也增加该字段 
         * @param 0 = 老的未分类商品
         * @param 1 = 房型商品
         * @param 2 = 第三方团购 可携带多个订单 需要核销
         * @param 3 = 服务类商品 带多规格
         * @param 4 = 套票类商品 可携带卡券
         * @param 5 = 套餐类 可携带多个订单
         * @param 6 = 普通商品 
        */
        gt?:number
        /** 
		 * UI前端需要
		 * 2024-12-20
		 */
		
		is_show_detail?:boolean
        
        id?:number
        
        oid:number
        
        goods_id:number
        
        item_id:number
        
        is_spec:number
        
        item_name:string
        
        count:number
        
        price:number
        
        pay_price:number
        
        yue_s_pay:number
        
        yue_pay:number
        
        offline_wx_pay?:number
        
        old_card_pay?:number
        
        cash_pay:number
        
        cash_staff_uid?:number
        
        cash_clerk_id?:number
        
        wx_pay:number
        
        wait_pay_price:number
        /** 
         * 是否使用优惠卡 
         * @param 0 未使用
         * @param 1 使用
        */
        is_discount:number
        
        discount:number
        
        manual_clerk_id?:number
        /** 
         * 手动优惠金额可以支持负数
         * @protected 多次优惠只计最后一次
         */
        manual_discount?:number
        
        manaul_info?:string
        /** 
         * 使用的优惠券类型
         * @param 0 没有使用优惠券
         * @param 1 兑换券
         * @param 2 抵值券
         * @param 3 期卡
         */
        coupon_type:number
        
        coupon_id:number
        
        coupon_ids:string
        
        is_add_order?:number
        
        add_time?:number
        /** 
         * 订单详情支付状态
         * @param 0 未支付
         * @param 1 部分支付 仍有未支付部分
         * @param 2 彻底支付
         */
        is_pay:number
        /** 
         * 订单详情状态
         * @param 0 没有开始 预约订单正在排队
         * @param 1 开始服务 预约母订单开始服务
         * @param 2 完成服务 预约母订单完成服务
         * @param 3 已评价
         * @param 4 已投诉
         * @param 5 已退款 - 洗浴中心使用
         */
        status:number
        /** 
         * 下单时间戳
         * @protected 预约订单母订单为预约时间戳 
         */
        t0:number
        
        t1:number
        
        t1_staff_uid?:number
        
        t2:number
        
        t2_staff_uid?:number
        
        t3:number
        
        rate:number
        
        msg:string
        
        is_channel?:number
        
        channel_name?:string
        
        status2:string
        
        is_transfer?:number
        
        transfer_uid?:number
        /**
         *  服务结束模式
         * @param 0 手动结束服务
         * @param 1 自动结束服务
         */
        end_type?:number
        
        end_time?:number
        /** 
         * 本条是否代理人支付 
         * 并非支付状态 仅标识本条是否代理人来支付
        */
        is_proxy_pay?:number
        /**
         *  代理人订单表OID
         *  如果本条是代理人支付，那关联到代理人支付时候的订单表ID
         */
        proxy_oid?:number
        
        is_must_buy?:number
        
        is_free?:number
        
        pl_id?:number
        
        is_tips?:number
        /** 
         * 员工权限表ID  关联 kxyk_mch_store_clerk表
         */
        clerk_id?:number
         
        is_notify?:number
        
        finance_id?:number

        
        
        g_sub_id?:number
        
        g_pay_name?:string
        
        g_pay_number?:string

        
        is_sub_pay?:number
        
        it_sub_id?:number
        
        it_pay_name?:string
        
        it_pay_number?:string
        /**
         * 是否预约母订单
         * @protected 如果为1 本条数据ID为预约服务母订单ID
         */
        is_reserve?:number
        /**
         * 预约订单关联的母订单ID
         * @protected 如果有值存储的就是预约母订单ID
         */
        reserve_id?:number
        /**
         * 是否套票母订单 团购
         * @protected 如果商品配置需要送达 就是套餐 - 下单直接自动下单多个订单，如果商品不需要送达 就是团购需要核销
         * 
         */
        is_combo?:number
        
        combo_id?:number
        
        is_combo2?:number
        /** 
         * 多规格绑定的收款商户 默认比例
         * @protected 店内服务分账时先查项目是否单独绑定了收款商户以及分账比例和默认比例，这里是项目单独绑定收款默认比例
         */ 
        it_default_scale?:number
        /** 
         * 商品绑定的收款商户 默认比例
         * @protected 项目没有绑定的话，这里是商品绑定收款默认比例
         */
        g_default_scale?:number
        /** 
         * 商品配置的销售提成类型
         * @protected 如果商品没有设置提成 就去门店配置里获取该设置，门店也没配置的话就没有提成
         * @param 0 按比例
         * @param 1 按金额
         */
        g_bonus_type?:number
        
        g_bonus?:number
        /** 
         * 商品设置的店内分账单位
         * @param 0 按比例
         * @param 1 按金额 it_sub_id
         */
        g_sub_pay_type?:number
        
        g_sub_pay_price?:number
        /** 
         * 项目设置的店内分账单位 有限使用项目配置
         * @param 0 按比例
         * @param 1 按金额
         */
        it_sub_pay_type?:number
        
        it_sub_pay_price?:number


        
        clerk_name2?:string

        
        clerk_name?:string
        
        clerk_avatar?:string
        /**
         *  商品是否需要送货
         * @count 0 不需要
         * @count 1 需要
         */
        is_delivery?:number

        /**
         * 团购类商品是否为店内购买
         * @count 1 有值为是 改值是操作员工clerk_id
         * @count 0 不是店购
         */
        in_store_pay?:number
        
        uid?:number
        
        sid?:number
        
        h_is_proxy?:number
        
        h_proxy_hids?:string
        
        h_is_proxy_pay?:number
        
        h_proxy_pay_hid?:number
        

        

        
        cid?:number
        
        hid?:number
        
        t1_w?:string
        
        t2_w?:string
        
        vip?:number
        
        hall?:sm.Pd1.HallMember
        
        is_voice?: undefined | boolean
        
        goods_name?:string
        
        suk_name?:string

        
        sb_code?:string
        
        mid?:number
    }
    
    interface kxyk_mch_store_order{
        
        detall?:tb.kxyk_mch_store_order_detall[]
        
        detall_all?:tb.kxyk_mch_store_order_detall[]
        
        detall_cache?:tb.kxyk_mch_store_order_detall[]
        
        id ?:number
        
        sid:number
        
        uid:number
        
        order_price:number
        
        discount_price:number
        
        cash_price:number
        
        yue_price:number
        
        yue_s_price:number
        
        wx_price:number
        
        offline_wx_price:number
        
        old_card_price:number
        /** 
         * 支付方式 
         * @param 洗浴系统暂时不使用该字段
         * @param 1 线下现金支付
		 * @param 2 线上微信支付
		 * @param 3 足额余额支付
		 * @param 4 余额现金混合支付 + 线下现金
		 * @param 5 余额现金混合支付 + 现金微信在线支付
		 * @param 6 后续扩展其他支付方式 - 如支付宝
         */
        pay_type:number
        /** 
         * 支付状态
         * @param 0 未支付
         * @param 1 部分支付
         * @param 2 完全支付
         */
        is_pay:number
        
        pay_time:number
        
        add_uid:number
        
        time:number
        /** 
         * 订单状态
         * @param 0 没有开始服务
         * @param 1 正在服务
         * @param 2 完成服务
         */
        status:number
        
        t1:number
        
        t2:number
        /** 
         * 扩展下单号码
         * @param 洗车行业为车牌号码
         * @param 洗浴行业为手牌号码
         */
        car_number:string
        /**
         *  是否已经分账
         * @param 0 未分账
         * @param 1 已分账
         */
        is_distribute:number
        /**
         * 是否为转增订单 
         * @param 洗车行业为是否转增订单
         * @param 洗浴行业转增订单放入订单详情这里不适用
         */
        is_transfer?:number
        
        transfer_uid?:number
        
        wait_pay_price:number
        
        hid:number
        /** 
         * 代理支付金额，
         * @param 代理人显示所有自己和代理其他人总额 
         * @param 被代理人显示只属于自己金额
         */
        proxy_price?:number
        /** 
         * 代理人结算列表
         * @param 帮其他人结算的订单列表
         */
        proxy_list?:sm.Pd1.HallMember[]

    }
    
    interface kxyk_company{
        id?:number
        
        name:string
        
        bing:string
        
        pay_number?:string
        
        pay_name?:string
        
        xy_pay_number?:string
        
        xy_pay_name?:string
    }
    
    interface kxyk_user_vip
    {
        id?:number
        
        cpid:number
        
        tid:number
        
        uid:number
        
        vip:number
        
        t1:number
        
        t2:number
    }
    
    interface kxyk_mch_type_vips_circle_config{
        id?:number
        /**  
         * 公司配置的行业ID 关联kxyk_mch_type_vips
         */
        vid:number
        
        cid:number
        
        price?:number 
        
        out_price?:number
        
        tip_price?:number
        
        share_identity?:number
    }
    
    interface kxyk_mch_type_vips
    {
        id?:number
        
        cpid:number
        
        type:number
        
        name:string
        
        info:string
        
        is_jump:number
        /**
         *  权重，数字越大身份越高
         *  用于判断会员身份权重
         */
        /** 
         * 是否用户充值获得
         * @protected 如果设置为0 只能管理员手动设置赠送
         */
        is_user_action:number
        layer:number
        
        share_identity?:number
        /**
         *  有效期类型 - 关联vip_day
         *  @param 0 年
         *  @param 1 月
         *  @param 2 日
         */
        day_type:number
        /** 
         * 会员有效期
         * 开通会员时根据该值设置会有有效期
         * 有效期内再次触发充值条件会重新更新有效期
         */
        vip_day?:number
        /** 
         * 余额低于该值时，用户登录系统会提示充值
         * 设置0时不提醒
         *  */ 
        tip_price?:number
        /**
         *  余额低于该值会员身份失效 0 = 不验证
         */
        out_price?:number
        
        price?:number
        
        is_avatar?:number
        
        is_syue?:number
        /** 
         * 虚拟字段开始
         */
        
        ui_is_give?:number
        /** 佣金模式 0 = 默认 1= 关闭分佣 2 = 自定义分佣
         * @param 0 = 默认
         * @param 1 = 关闭分佣
         * @param 2 = 自定义分佣 发放会员全是2
         */
        mode?:number
        /** 
         * 佣金类型 0 = 百分比 1= 实数单位元
         * @param 0 = 百分比
         * @param 1 = 实数单位元
         */
        mode_type?:number
        
        mode_number?:number

    }
    
    interface kxyk_newlan{
        
        id?:number
        
        show_page_ids:string 
    }
    
    interface kxyk_user_pay_log{
        id?:number
        /** 
         * 支付模式
         * @param wxpay 微信支付
		 * @param alipay 阿里支付
		 * @param bankpay 银行卡支付
		 * @param yuepay 余额支付
        */
        mode:'wxpay' | 'alipay' | 'bankpay' | 'yuepay'
        /**
         * 支付状态码
         * @param 0 未支付
		 * @param 1 正在支付
		 * @param 2 已支付
         */
        status:number
        
        uid:number
        
        openid:string
        /** 
         * 支付环境
         * @param H5 h5环境包括PC环境
		 * @param WX 微信公众号
		 * @param WXAPP 微信小程序
		 * @param APP APP
         */
        ev?: "H5" | "WX" | "WXAPP" | "APP" | "h5" | "wx" | "wxapp" | "app"
        
        api:string
        
        price:number
        /** 
         * 是否发生支付错误
         * @param 0 没有错误
         * @param 1 支付错误
         */
        fail: 0 | 1
        
        fail_msg?:string
        /** 
         * 商户内部唯一订单号 - 系统生成，支付商户内唯一
         */
        out_trade_no:string
        /** 
         * 父out_trade_no ID,out_trade_no里存放的是子 ID
         * @property 统一系统支付时存放合单支付父ID 
         * @property 正常合单支付时为空 父ID存放于kxyk_user_combine_pay_order 表
         */
        on_out_trade_no?:string

        /**
         *  微信预支付标识号码
         * @param 该标识由微信生成 有效期24小时
         */
        prepay_id:string
        /**
         *  微信支付订单号码
         * @param 该订单号码由微信生成 - 可用于退款 或 分账
         */
        transaction_id:string
        
        extend?:string
        
        time:string
        
        sid:number
        
        cid?:number
        
        cpid?:number
        /** 
         * 收款对象
         * @param 0 = 商圈收款
         * @param 1 = 门店收款
         * @param 2 = 公司收款
         */
        is_sxed?:number
        /**
         *  微信支付模式
         * @param 0  服务商模式
         * @param 1  商户直连模式
         */
        mch_type:0 | 1
        
        sp_mchid:string
        
        sub_mchid:string
        
        sub_id?:number
        
        sp_appid?:string
        
        back_url:string 
        
        pay_title:string
        /** 
         * 微信退款状态
         * @const 0 未退款
         * @const 1 正在退款
         * @const 2 完成退款
         * @const 3 退款错误，详情需要查询退款表
         */
        refund_status?:number 
        
        
        store_name?:string
        
        store_img?:string
    }
    
    interface kxyk_p1_staff_login_log{
        id?:number
        
        uid:number
        
        sid:number
        
        t1:number
        
        t2:number
        
        t3:number
        
        count:number
        
        nickname?:string
        
        avatar?:string
        
        phone?:string

    }
    
    interface kxyk_mch_store_sub{
        id?:number
        
        PSR?:number
        
        sid:number
        
        name:string
        /** 
         * 子门店副名称 - 或二级分类名称
         *  一楼 二楼 之类的分类副标题 
        */
        name2:string
        
        pay_name?:strings
        
        pay_number?:string
        
        default_scale?:number
        
        sxed?:number
        
        time:number
        /** 
         * 数据类型
         * @param 0 = 商品分类
         * @param 1 = 收款商户号
         */
        t:number

        
        list?:tb.kxyk_mch_store_order_detall[]
        
        goods_ids?:number[]
        
        user_show?:number
        
        sort?:number
        
        g_ids?:string | number[]
        

        
        stock_list?:tb.kxyk_mch_goods_stock_level2[]
        
        goods_count?:number
    }
    
    interface kxyk_mch_goods{
        id?:number
        
        PSR?:number
        
        is_stock?:number
        
        stock_warn?:number
        
        stock_unit?:string
        
        stock_unit_count?:number
        
        goods_img:string
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
        
        cpid:number
        
        type_id:number
        
        goods_name:string
        
        time:number
        
        sub?:number
		/**
		 *  关联收款收款商户号码 - 数据库
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
		
		bonus?: number,
        
        is_spec:number
        
        is_combo?:number
		
		combo_list?:string | number[],
		
		is_combo2?:number
		
		combo2_list?:string | {id:number,count:number}[],
        
        price:number
        
        v_price:number
        
        sort:number
        
        store_id:number
        
        is_vip_price:number
        
        stock:number
        
        sales?:number
        
        is_other?:number
        
        other_id?:number
        
        other_price?:number
        
        import_price:number
        
        export_price:number
        
        is_cash?:number
        
        
        import_store_name:string
        
        import_store_phone:string
        
        s1?:string
        
        desc1?:string | string[]

        
        is_delivery?:number
        
		is_reserve?:number,
		
		is_user_buy?:number,
        
        vips?:sm.ItemVipsPrice[]

        
        
        is_loading_spec?:boolean
        
		spec?: sm.spec[],
        
        level_id?:number
    }
    
    interface kxyk_store_tuangou_promotion{
        id?:number
        
        tgid:number
        
        uid:number
        
        time:number
    }
    
    interface kxyk_mch_type{
        id?:number
        
        name:string
        
        cp:number
        
        root_id:number
        
        level:number
        
        spec_name:string
    }
    
    interface kxyk_circle_member_vip
    {
        id?:number
        
        name:string
        
        price:number
        
        cid:number
        
        r:number
        
        info:string
        
        is_jump:number
        /**  
         * 关联门店
         * @param 0  未关联门店为商圈会员等级
         * @param 关联门店 
         */
        
        sid:number
        
        is_user_action?:number
        
        layer?:number
    }
    
    interface kxyk_config_ids
    {
        id?:number
        
        ids:string 
        
        ids_list?:number[],
        /** 
         * 配置类型
         * 1 = 首页省钱板块配置团能够活动 - kxyk_store_tuangou
         * 2 = 配置各商圈下洗浴门店类型ID  - kxyk_mch_store_types 
         * 3 = 用户中奖表 可以中几次大奖 - kxyk_user_prize_log
         */
        type:number
        
        cid:number
        
        tab:string
        /** 
         * 扩展字段1
         * type = 1 时是省钱页面顶部文字描述
         */
        str1:string
        
    }
    
    interface sm_user
    {
        uid:number,
        
        account?:string
        
        wx_openid?:string
        
        h5_openid?:string
        
        cx_openid?:string
        
        unionid?:string
        
        pwd:string
        
        real_name:string
        
        birthday:string
        
        card_id:string
        
        mark:string
        
        partner_id:number
        
        group_id:number
        
        nickname:string
        
        avatar:string
        
        phone:string
        
        phone2?:string
        
        reg_type?:number 
        
        money:number
        
        add_time:number
        
        add_ip:string
        
        last_time:number
        
        last_ip:string
        
        now_money:number
        
        brokerage_price:number
        
        integral:number
        
        sign_num:number
        
        status:number
        
        level:number
        
        spread_uid:number
        
        spread_time:number
        
        user_type:string
        
        is_promoter:number
        
        pay_count:number
        
        spread_count:number
        
        clean_time:number
        
        addres:string
        
        adminid:number
        /** 
         * 用户登录类型
         * h5,wechat,routine
         */
        login_type:string
        
        province:number
        
        city:number
        
        area:number
        
        lat:string
        
        lng:string
        
        is_superior_open:number
        
        is_modules:number
        
        transfer:number
        
        car_number:string
        
        car_type:string
        
        car_trademark:string
        
        wx_number:string
        
        staff_id:number
        /**
         *  性别
         *  0 = 未设置
         *  1 = 男
         *  2 = 女
         */
        sex:number
        
        physical_card_number?:string
        /** 
         * 隐私开关
         * @param 0 = 关闭
         * @param 1 = 开启
         */
        is_secrecy?:number
        
        secrecy_pass?:string
        
        is_avatar?:number
        
        display_name?:string
        
        
        mb_id?:number
        
        s_money?:number
        
        su_id?:number
        /** 
         * 本次登录是否已经验证了隐私密码 
         * @param 0 未验证
         * @param 1 已验证
        */
        is_check_secrecy_pass?:number
        
        vip?:sm.U.UserTypeVip
        
        vip_name?:string
        
        give_count?:number
        
        remarks?:tb.sm_user_remark[]
    }
    
    interface kxyk_mch_store_clerk_type
    {
        
        id:number
        
        sid:number
        
        audit_date?:string
        
        n:string
        
        server_queue: string | number[]
        
        goods_queue: string | number[]
        
        finance_queue: string | number[]
        
        task_queue: string | number[]
        
        privileges:string | {
            
            on:sm.Pd1.StaffAuthFieldArray[]
        }
        
        give_coupons:string | number[]
        
        pop:number
        
        is_sign?:number
        
        is_location?:number
        
        location_range?:number
        
        work_start?:string
        
        work_end?:string
        
        is_off_work?:number
        /** 
         * 下班打卡跨越的天数
         * @private 单位是天 默认0不跨天
        */
        span_days?:number
        
        off_start?:string
        
        off_end?:string
        
        reserve_gid?:number
        /** 
         * 数据报表或其他统计中是否统计该分类 - 万喜 其他公司打卡分类
         * @param 0 = 统计
         * @param 1 = 不统计
         */
        is_statistics?:number
    }
    
    interface kxyk_mch_store_clerk
    {
        id?:number
        
        audit_date?:string
        
        store_id:number
        
        uid:number
        
        add_uid:number
        
        is_shopkeeper:number
        
        is_task:number
        
        is_give:number
        
        t?:number
        
        acc?:string
        
        paw?:string
         
        is_printer?:number
        /**
         *  是否已离职
         * @param 0 = 正常
         * @param 1 = 已离职
         */
        is_del?:number
        
        is_del_y?:number
        

        
        name?:string
        
        img?:string
        
        operate_start?:string
        
        operate_end?:string
        
        avatar?:string
        
        nickname?:string
        
        n?:string
        
        UnreadCount?:number
    }
    
    interface kxyk_store_tuangou_user
    {
        id?:number
        
        tgid:number
        
        uid:number
        
        sid:number
        
        aff:number
        
        is_pay:number
        /**
         *  支付方法
         * 0 = 微信在线支付
         * 1 = 线下支付 - 吧台员工操作
         */
        pay_type:number
        
        count:number
        
        price:number
        
        pay_price:number
        
        is_aff:number
        
        aff_price:number
        
        is_give:number
        
        give_ids:string
        
        time:number
        
        staff_uid:number
        /**
         *  订单状态
         * 0 = 未支付
         * 1 = 已支付，待发货
         * 2 = 已发货，待收货/核销
         * 3 = 已收货或使用，待评价
         * 4 = 已评价
         * 5 = 已退货
         */
        status:number
        
        is_err:number
        
        err_str:string
        
        is_del:number
        
        
        
        title?:string
        
        s_name?:string
        
        img?:string
        
        youxiaoqi?:string
        
        kysj?:number
        
        kysj_s?:string
        
        kysj_e?:string
        
        tg?:tb.kxyk_store_tuangou
        
        store?:tb.kxyk_mch_store
    }
    
    interface kxyk_mch_store_is_grant_coupon{
        id?:number
        
        sid:number
        
        cid:number
        
        pid:number
        
        del: 0 | 1
        /**
         *  权限类型
         *  0 = 卡券
         *  1 = 期卡
         *  2 = 购卡活动
         */
        type:number
        
        
        name?:string
    }
    
    interface kxyk_store_tuangou_p{
        id?:number
        
        tgid:number
        
        name:string
        
        count:number
        
        price:number
        
        coupon:string
        
        rule:string

        
        
        rule_list?:{key:string,val:string}[]
        
        coupon_list?:[]
        
        coupon_list2?:sm.U.tuanGouPCouponList[]
    }
    
    interface kxyk_store_tuangou{
        id?:number
        
        title:string
        
        type:number
        
        type_str?:string
        
        img:string
        
        o_price:number
        
        zhekou:number
        
        n_price:number
        
        youxiaoqi:string
        
        kysj:number
        
        kysj_s:string
        
        kysj_e:string
        /** 
         * 适用人群
         * 0 = 所有人群
         * 1 = 男士
         * 2 = 女士
         */
        syrq:number
        
        jjrq:string
        
        is_yy:number
        
        yygz:string
        
        zshy:number
        
        qtgz:string
        
        sid:number
        
        s_name?:string
        
        is_fy:number
        
        /** 
         * 分佣类型 后定
         * 0 = 所有人转发可分佣
         */
        fy_type:number
        
        fy_dw:number
        
        fy_je:number
        
        time:number
        
        del: 0|1
        
        sold:number
        
        
        p?:kxyk_store_tuangou_p[]
        
        qtgz_list?:string[]
        
        cid?:number
        
        count?:number
        
        store?:tb.kxyk_mch_store
    }
    
    interface kxyk_store_tuangou_type{
        id?:number
        
        sid:number
        
        name:string
    }
    
    
    interface kxyk_bath_hall
    {
        
        id?:number
        
        sid:number
        
        is_come:number
        
        is_guest:number
        
        guest_number?:number
        
        sb_code:string
        
        sb_id:number
        
        sb?:kxyk_bath_shoebox
        /** 
        * @param 0 = 未下单
        * @param 1 = 已下单，未支付
        * @param 2 = 已下单，已全部支付 未绑定手牌
        * @param 3 = 服务中 - 必须全部支付才能除非该状态，如果有未支付仍然显示未支付
        * @param 4 = 服务已完成 且没有需要支付订单 可以关牌 已绑定手牌 
        * @param 5 = 用户等待取鞋子
        * @param 6 = 交易完成 大厅不再显示
         */
        status:number
        
        s1:number
        
        s1_str:string
        
        s2:number
        
        s2_str:string
        
        uid:number
        /** 
         * 手牌绑定类型
         * @param 0 = 未绑定
         * @param 1 = 扫描读卡器关联
         * @param 2 = 管理员手动搜索手牌关联
         * @param 3 = 用户输入手牌号码自主关联
         */
        bind_type:number
        /** 
		 * 是否下单
		 * @param 0 = 未下单
		 * @param 1 = 已下单
		 */
		is_order: 0 | 1
        
        oid?:number
        
        is_vip_uid: 0 | 1
        
        is_proxy_pay?:number
        
        proxy_pay_hid?:number
        
        is_proxy?:number
        
        proxy_hids?:string
        
        is_have_must_buy?:number
        
        is_click_out?:number
        
        is_click_cash_pay?:number
        
        is_overnight_fee?:number
        /** 
         * 如果是分身 这里关联主号hid
         */
        main_hid?:number
    }
    
    interface kxyk_bath_shoebox
    {
        
        physical_card_number?:string
        id?:number
        
        sex:number
        
        code:string 
        /** 是否VIP  
         * @param 0 = 普通手牌
         * @param 1 = VIP手牌
        */
        vip:number
        
        vip_uid:number
        
        vip_start:number
        
        vip_end:number
        
        number:string
        
        time:number
        /** 
         * 鞋柜当前状态
         * 0 = 空闲
         * 1 = 使用中
         */
        status:number
        
        use_id:number
        
        hid?:number
        
        sid:number
        
        is_wm?:number
        
        
        nickname?:string
        
        avatar?:string
        
        phone?:string
        
        day?:number
        
        uid?:number
        
        hid?:number
        
        u2_nickname?:string        
        
        u2_phone?:string
        
        u2_avatar?:string
        
        is_guest?:number
        
        guest_number?:number
        
        price?:number

    }
    
    interface kxyk_mch_store_money
    {
        id?:number
        
        uid:number
        
        sid:number
        
        money:number
        
        s_uid:number
        
        vip:number
        
        vip_name?:string
        
        name?:string
        
        cid?:number
        
        nickname?:string
        
        is_jump?:number
        
    }
    
    interface kxyk_circle_shared_role
    {
        id?:number
        
        cid:number
        
        sid:number
        
        uid:number
        
        s_uid:number
        
        is_money:number
        
        is_coupon:number 
        
        is_s_money:number
        
        is_role?:number
        
        time:number 
    }


    
    interface kxyk_circle_msg{
        id?:number
        
        cid:number
        
        sid:number
        /** 
         * 发送消息用户UID
         * 0 = 系统发送 
        */
        s_uid:number
        /** 
         * 接受消息用户UID 
         * 0 = 接收端为商圈或门店 
         * 根据type区分消息类型
        */
        uid:number
        /**
         * 消息类型
         * @param 1  用户投诉后系统以商圈身份给用户发送等待投诉回馈消息
         * @param 2  用户给门店发送消息
         * @param 3  门店给用户发送消息
         * @param 4  商圈回复给门店和用户
         * @param 5  用户预约员工技师时，系统发送用户和员工私聊提示信息,如果以前没有聊过 此行为类似加好友
         * @param 6  门店群聊
         */
        type:number
        
        msg:string
        
        imgs?:string | string[]
        
        is_read:number
        
        d1_read:number
        
        d1_read_clerk_id:number
        
        c1_read:number
        
        time:number
        /** 
         * 有可能涉及的订单详情ID
         * @param type = 5 时 这里是预约订单ID 
         */
        odid?:number
        /** 
         * 接受消息员工id
         * @param 接受消息的员工ID 
         * @param 跟用户私聊时 发送消息的员工ID 
         */
        clerk_id?:number
        
        send_clerk_id?:number
    }
    
    interface kxyk_mch_store_order_detall_complaint{
        id?:number
        
        odid:number
        /** 
         * 数据类型
         * 0 = 用户投诉门店
         * 1 = 门店回复用户
         * 2 = 商圈回复用户
         */
        type:number
        
        uid:number
        
        msg:string
        
        imgs:string | string[]
        
        time:number
        
        end_time:number
        
        clerk_id?:number
    }
    
    interface kxyk_circle_member_tags{
        id?:number
        
        cid:number
        
        str:string
        
        add_uid:number
        
        uid:number
    }
    
    interface kxyk_circle_recharge_rule{
        id?:number
        
        price:number
        
        cid:number
        
        give:number
        /** 
         * 赠送类型 
         * 0 = 赠送金额
         * 1 = 赠送会员
        */
        type:number
        /** 
         * 规则适用范围
         * 0 = D端门店规则
         * 1 = 大客户规则
        */
        type2:number
        
        vip:number
    }
    
    interface kxyk_circle_finance
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
         * @param 17 = 洗浴系统用户微信付款购买时的微信收款日志
		 */
		type:number,
		
		cid:number,
		
		sid:number,
		
		shareholder_id:number,
		
		price:number,
		
		pay_uid?:number,
		/** 本条数据是收益还是应缴 
         * @param 0 = 商圈支出 
         * @param 1 = 商圈收益
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
        /** 关联结算日志表ID
         *  关联kxyk_circle_finance_ns表
         * @protected 根据条件每次结束会修改所有待结算条目 设置为结算日志ID
        */
        ns_id:number,
		/** 是否与商圈结算 相对门店和股东 
         * @param 0 = 没有结算 
         * @param 1 = 等待结算（已申请）
         * @param 2 = 结算完成  
         */
		checkout:number,
		/** 
		 * 业务关联ID1 
		 * @param type = 3 type=4 type=2 type=1 该字段为 购买卡券的用户UID
         * @param type = 6 type=12 充值余额用户UID
         * @param type = 9 type=11 下单用户UID
         * @param type = 13 购买卡券活动的用户UID
         * @param type = 15 为申请会员表ID 关联kxyk_user_vip_set_apply表
		*/
		relation1?:number,
		/** 
		 * 业务关联ID2
		 * @param type = 3 type=1 type=4 type=2 该字段为 用户购买的卡包ID
         * @param type = 6 type=12 用户自主充值时的赠送金额
         * @param type = 9 type = 11 下单订单ID
         * @param type = 13 购买卡券活动的活动ID
		 */
		relation2?:number,
		
		info:string,
        /** 
         * 关联系统支付表ID kxyk_user_pay_log - 如果有的话
         */
        pl_id?:number
        /** 
         * 商圈和平台结算 
         * @param 0 = 没有结算 
         * @param 1 = 正在结算 
         * @param 2 = 结算完成
         */
        a1_check?:number

	}
    
    interface kxyk_circle_finance_ns{
        id?:number,
        /**
         * 结算类型
         * 1 = 门店申请结算（相对商圈）
         */
        type:number
        /**
         *  结算状态 
         * 0 = 已失效
         * 1 = 正在结算
         * 2 = 结算完成
        */
        status:number
        
        cid:number
        
        sid:number
        
        t1:number
        
        price:number
        
        t_uid:number
        
        t2:number
        
        s_uid:number
    }
    
    interface kxyk_mch_role_e2e3_auth_config{
        id?:number
        /** 
         * 数据类型
         * @param 0 = 股东配置门店商品或服务
         * @param 1 = 大客户配置商圈卡包
         * @param 2 = 商圈为大客户配置的充值规则  - gid 捆绑充值规则ID
         * @param 3 = 商圈为大客户配置的赠送会员佣金规则
         * @param 4 = E1下级门店商品服务佣金设置 关闭佣金或自定义默认佣金在kxyk_mch_role_e2e3_auth表
         */
        type:number
        
        cid:number
        
        sid:number
        /**
         * 关联 type
         * 商品是否多规格
         * 0 = 商品 1 = 服务
         */
        is_spec:number
        /** 
         * 关联type 
         * @param type = 0 时是商品或者服务ID
         * @param type = 1 时是卡包ID
         * @param type = 2 时是充值规则ID
         * @param type = 3 时是vips id 关联kxyk_mch_type_vips
         * @param type = 4 时是商品或者服务ID
         */
        gid:number
        
        role_id:number
        /** 
         * 佣金模式
         * 0 = 默认 - 读取上级配置
         * 1 = 关闭分佣
         * 2 = 自定义分佣
         */
        mode:number
        
        mode_number:number
        
        mode_type:number
        
        [x:string]:any
    }
    
    interface kxyk_mch_role{
        id:number
        
        name:string
        
        belonging:string
        
        sort:number
        
        mark:string
    }
    
    interface kxyk_mch_role_e2e3_auth{
        id:number
        
        role_id:number
        /** 
         * 数据类型 0 = 投资股东 1 = 大客户 2 = 发会员
         * @param 0 = 投资股东配置门店商品佣金
         * @param 1 = 大客户发卡配置
         * @param 2 = 大客户发放会员配置
         * @param 3 = E1下级会员门店分佣配置 
         */
        type:number
        
        sid:number
        /** 
         * 默认佣金类型 
         * 关联投资股东时门店所有交易默认使用该配置 - 除非单独为商品或服务设置分红配置
         * 关联大客户时，当前大客户所有发卡权限默认佣金 
         * 0 = 百分比 
         * 1 = 直接金额 
        */
        d_type:number
        /** 
         * 支持小数点关联d_type
         * type = 0 为投资股东佣金设置
         * type = 1 大客户在当前商圈的发卡余额，结合e_max时可以为负数
         */
        d_number:number
        /** 
         * 是否开启收益保证限制 
         * type = 0 投资股东收益保证有最低、最高两个限制 - 按年或月结算
         */
        is_ensure:number
        
        e_type:number
        
        e_min:number
        /** 
         * 最高限制分红金额 - 支持2位小数 
         * type = 0 投资股东最高分红限制
         * type = 1 大客户的授权金额限制 可以拖欠商圈的最大金额
         */
        e_max:number
        /** 
         * 大客户商城支付方式配置 - 多选
         * pay1 pay2 pay3 线下申领 余额支付 微信支付
         */
        pay_mode?:string | []
        
        time:number
        
        on_list?:sm.StoreGoodsPrices[]
        
        on_list_e3?:sm.CouponPack[]
        
        on_list_e4?:tb.kxyk_mch_type_vips[]
        
        config?:tb.kxyk_mch_role_e2e3_auth_config[]
        
        ruels?:any[]

    }
    /**
     * kxyk_mch_store 商圈门店表  pay_number
     */
    interface kxyk_mch_store{
        id:number,
        
        PSR?:number
        
        unpaid_reminder?:number
        
        name:string
        
        name2?:string
        
        img:string
        
        address:string
        
        is_expand_pay?:number
        
        vip_prefix?:string 
        
        lat:string
        
        lng:string
        
        operate_start:string
        
        operate_end:string
        /**
         *  门店营业状态
         *  0 = 暂停营业
         *  1 = 正常营业
         *  2 = 门店维护
         */
        status:number
        
        status_msg?:string
        
        phone:string
        
        add_uid:number
        /** 
         * 门店内部图片和营业执照等图片列表
         */
        license?:string | []
        
        n1?:string
        
        fields?:string | number[]
        
        add_time:number
        
        cid:number
        
        type:number
        
        scale:number
        
        user_end_expire:number
        
        user_queue_expire:number
        
        is_own?:number
        
        user_queue_notice:number
        
        electron_id?:string
        /** 门店默认绑定的打印机id
         * 自动打印时使用
         * 关联 kxyk_store_printer
          */
        default_printer?:number
        /** 
         * 门店消费时候是否有必买项目
         * @param 0 = 不限制
         * @param 1 = 有必须购买的项目
         */
        is_must_buy?:number
        /** 
         * 员工下单商品权限是否跟随分类或楼层
         * @param 0 = 根据配置权限读取服务商品
         * @param 1 = 根据sub类型或楼层读取服务商品
         */
        is_follow_sub?:number
        /** 
         * 订单服务权限跟随商品权限
         * @param 0 = 不限制权限
         * @param 1 = 只能管理自己拥有的服务
         */
        is_order_sub?:number
        /** 
         * 是否开启会员下单赠送卡券
         * @protected 这里是总开关只有开启这里能赠送 和赠送规则不冲突
         * @param 0 = 不开启
         * @param 1 = 开启
         */
        is_vip_open_gift?:number
        
        must_buy_ids?:string | string[]
        
        must_buy_list?:string | sm.Pd1.ShopMustBuy[]
        /**
         * 商品和服务价格列表 - 前端用
         */
        goods:false | sm.StoreGoodsPrices[]

        
        is_to_yue?:number
        /**
         * 洗浴购物车组件 门店商品列表
         */
        shopping_cart_goods?:sm.store_goods[]
        
        rjxf:number 
        /** 
         * 收款模式
         * @count  0 = 服务商模式
         * @count  1 = 独立收款
         */
        pay_type?:number
        
        pay_number?:string
        
        pay_number2?:string
        
        sxed?:number
        
        sxed1?:number
        
        is_notice?:number
        
        notice_all?:number
        
        range_m?:number
        
        is_overnight_fee?:number
        /**
         * 配置的过夜费自动添加的商品或服务ID组以逗号分割 商品G122,服务I222
         */
        overnight_fee_ids?:string | string[]
        
        overnight_t0?:string

        
        
        FollowCount?:number
        
        is_follow?:number
        
        distance?:number
        
        is_follow?:number
        
        cpid?:number
        
        UnreadCount?:number
        /** 
         * 记录日志等级 
         * @param 0 = 全部记录
         * @param 1 = 跟踪
         * @param 2 = 调试
         * @param 3 = 信息
         * @param 4 = 警告
         * @param 5 = 错误
         * @param 6 = 致命
        */
        log_level?:number
        /** 
         * 商品销售提成单位
         * @param 0 = 百分百
         * @param 1 = 元
         */
        bonus_type?:number
        
        is_must_buy_auto_order?:number
        
        bonus?:number
        
        [x:string]:any
    }
    /**
     * kxyk_mch_role_info 开薪怡客角色管理表
     */
    interface kxyk_mch_role_info{
        id?:number,
        
        cp_id:number
        
        add_uid:number
        /** 
         * 区域识别码 
         * all = 全国
         * area = 区域 关联kxyk_mch_role_info_region - role_info_id
         */
        region:'all' | 'area' | string[]
        
        name:string
        
        circle_name?:string
        
        phone:string
        
        root_role_id:number
        
        card_id:string
        
        role_id:number
        
        type_id:number
        
        uid:number
        
        is_E2:number
        
        E2_income?:number
        
        is_E3:number
        
        E3_income?:number
        
        is_E4?:number
        
        E4_income?:number
        
        E5_income?:number
        
        time:number
        
        is_select?:boolean
        
        is_sub_role?:boolean
        
        sub_role?:any
        
        E2_list?:any
        
        E5_list?:any
        
        E3_list?:sm.CouponPack[]
        
        E4_list?:tb.kxyk_mch_role_e2e3_auth_config[]
        
        money:number
        
        r_money:number
        
        give_money:number
        
        money_auth:number
        
        pay_mode:string
        
        lower_level_time?:number
        
        ruels?:string | any[]
        
        store_number?:string
        
        store_name?:string
        [x:string]:any
    }
    /**
     * kxyk_circle_member 商圈会员表
     */
    interface kxyk_circle_member
    {
        
        id?:number
        
        uid:number
        
        cid:number
        
        money:number
        
        vip:number
        
        time:string
        
        classify:number
        
        r_money:number
        
        is_move_vip?:number
        
        move_vip_store?:number
        
        bank_number?:string
        
        give_money?:number
        
        car_photo?:string
        
        job?:string
        
        is_add_info_uid?:number
        
        
        nickname?:string
        
        avatar?:string
        
        phone?:string
        
        cp_id?:number
        
        type_id?:number

    }
    /**
     * kxyk_mch_coupon_activity 
     * 购卡活动表
    */
    interface kxyk_mch_coupon_activity{
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
    /** 
     * kxyk_mch_coupon_activity_user
     * 购买申领购卡活动的用户表
     */
    interface kxyk_mch_coupon_activity_user 
    {
        
        id?:number
        /** 
         * 活动或卡包ID 关联s_role
         * s_role = d1 为活动ID
         * s_role = e1 为合伙人售卡卡包ID 
         */
        aid:number
        
        uid:number,
        /**
         *  活动地址溯源用户ID
         *  可能是c1 c2 d1 d2 e1 e2 等有权限的用户UID
         */
        s_uid:number,
        /**
         *  活动地址溯源门店ID 
         *  s_role = d1 为门店ID 
         *  s_role = e1 为合伙人ID 
         */
        s_sid:number,
        
        s_role:string,
        /** 
         * 活动是否支付 
         * 0 = 未支付
         * 1 = 余额购买支付
         * 2 = 在线微信支付
         * 3 = 管理发放支付
         * 4 = 管理发放 - 余额补额 - 支付
         */
        is_pay:number,
        
        staff_id:number,
        
        is_give:number,
        
        t1:number,
        
        t2:number,
        /** 
         * 用户购买活动状态
         * 0 = 等待员工手动处理
         * 1 = 已购买成功
         * 2 = 已被拒绝
         * 3 = 管理员拒绝后用户手动设置关闭显示
         * 4 = 用户自主支付失败
         */
        status:number,
        
        pay_price:number,
        
        add_pay:number,
        
        give_coupons?:string | number[]
        
        err_msg:string
        
        price?:number
        
        car_list?:sm.UserCarMember[]
        
        is_premium?:number
        
        premium?:number
        
        title?:string
        
        
        couponsList?:sm.CouponUser[]
        
        cid?:number
        
        pay_mode?:string[]
        
        bank_number?:string
    }
}

type TabNameAll = keyof typeof tb;