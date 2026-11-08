
declare namespace tb 
{
    /** 更新表字段约束 */
    type UP<T> = Partial<T>;


    /** 微信支付前置二维码生成缓存表 */
    interface kxyk_make_qr_url{
        /** ID */
        id:number
        /** 保存前端传来的收银台数据 */
        str:string | sm.Com.CashierSubmit
    }

    /** 二级库存表 */
    interface kxyk_mch_goods_stock_level2{
        /** ID */
        id:number
        /** 商品楼层分类ID */
        sub_id:number
        /** 商品ID */
        goods_id:number
        /** 当前库存数量 */
        stock:number
        /** 当前商品的排序值 */
        sort?:number
        /** ------------ 虚拟字段 ------------ */
        /** 商品名称 */
        goods_name?:string
        /** 商品图片 */
        goods_img?:string
        /** 楼层名称，出库日志使用 */
        sub_name?:string
        /** 楼层二级名称 */
        sub_name2?:string
        /** 库存警告 */
        stock_warn?:number
    }

    /** 供货商表 */
    interface kxyk_mch_goods_supplier{
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 供货商名称 */
        s_name:string
        /** 联系人 */
        s_nickname:string
        /** 联系电话 */
        s_phone:string
        /** 备注 */
        remark?:string
        /** 添加员工ID */
        clerk_id?:number
        /** 添加时间戳 */
        t0:number
    }
    /** 库存日志表 */
    interface kxyk_mch_goods_stock_log{
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 商品ID */
        goods_id:number
        /** 
         * 一二级库存 楼层库存
         * @count 0 一级总库存
         * @count 大于一是二级库存 楼层分类ID 关联 kxyk_mch_store_sub 表
         */
        sub_id:number
        /** 二级库存表ID 关联kxyk_mch_goods_stock_level2表  */
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
        /** 是否使用件 */
        is_unit?:number
        /** 件的数量 商品里设置了每件等于多少个 商品内设置的单位 */
        unit_count?:number
        /** 每件等于多少单位 */
        stock_unit_count?:number
        /** 涉及变动数量 */
        count:number
        /** 变动前库存数量 */
        before_stock:number
        /** 变动后库存数量 */
        after_stock:number
        /** 
         * 关联变动来源ID
         * @param type = 5 时关联销售ID
         * @param type =  3 7 时关联的是任务表ID
         */
        ref_id:number
        /** 变更原因 */
        remark:string
        /** 操作员工ID */
        clerk_id:number
        /** 变动时间 */
        t1:number
        /** 关联供货商ID */
        supp_id?:number
        /** 本次入库供货价格 */
        /** 本次出入库涉及的价格 */
        supp_price?:number
        /** 商品库存单位 */
        stock_unit?:string
        /** ---------- 虚拟字段是否使用件选项 ---------- */
        /** 批量入库时需要显示商品图片 */
        goods_img?:string
        /** 是否显示件 前端使用 */
        is_unit_show?:number
        /** 本条数据携带的楼层分类名称 */
        sub_name?:string
        /** 楼层二级名称 */
        sub_name2?:string
        /** 商品名称 */
        goods_name?:string
        /** 员工名称 */
        clerk_name?:string
        /** 员工类型 */
        clerk_n?:string
        /** 本条是否正在编辑 */
        is_edit?:boolean
        /** 当前库存数量 */
        now_stock?:number
        
    }
    /** 等待自动结束的订单详情ID列表 */
    interface kxyk_mch_store_order_detall_autoend_service{
        odid:number
    }


    /** 订房订单表 */
    export type kxyk_mch_store_order_detall_room ={
        /** ID */
        id:number
        /** 订单ID */
        odid:number
        /** 房间ID */
        room_id:number
        /** 订房日期 */
        d:string
        /** 房型商品ID 用于统计订房数量 */
        good_id:number
    }

    /** 批量卡券管理主表 */
    export type kxyk_coupon_cardholder = 
    {
        /** ID */
        id:number
        /** 
         * 本条数据状态吗
         * @param 0 = 等待确认中
         * @param 1 = 已完成 领取成功 删除成功等
         * @param 2 = 领取失败 删除失败等
         */
        ss:number
        /** 领取卡券用户UID */
        r_uid:number
        /** 发卡人UID 分享人UID 如果系统发卡 则为0 */
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
        /** 操作员工ID */
        clerk_id?:number
        /** 发送时间戳 */
        t0:number
        /** 领取时间戳 完成时间戳 */
        t1?:number
    }

    /** 系统卡券持有人领取卡包日志表 */
    export type kxyk_coupon_cardholder_log = {
        /** ID */
        id:number
        /** 发卡人UID 分享人UID 如果系统发卡 则为0 */
        pid:number
        /** 本次领取数量 */
        count:number
        /** 关联主表ID */
        ccid:number
    }

    /** 用户备注表 */
    export type sm_user_remark = {
        /** ID */
        id:number
        /** 用户UID */
        uid:number
        /** 备注内容 */
        remark:string
        /** 设置备注的用户UID */
        set_uid:number
        /** 设置备注的时间 */
        t0:number
        /** 设置备注的员工名 */
        set_name?:string
    }

    /** 新商品类型表 */
    export type kxyk_mch_goods_type ={
        /** ID */
        id:number
        /** 类型名称 */
        n:string
        /** 当前分类拥有的商品数量 前端使用 虚拟字段 */
        goods_count?:number
    }
    /** P1员工任务表 */
    export type kxyk_p1_staff_task = 
    {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 任务标题 */
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
        /** 任务介绍 */
        remark?:string
        /**
         * 任务状态
         * @value 0 等待处理
         * @value 1 正在处理
         * @value 2 处理完成
         */
        ss:number
        /** 任务时间戳 */
        t0:number
        /** 开始处理任务的时间戳 */
        t1?:number
        /** 完成任务的时间戳 */
        t2?:number
        /** 正在处理任务或处理任务的员工名称 */
        clerk_name?:string
        /** 正在处理或者处理任务的员工ID 库存相关时存储楼层员工ID */
        clerk_id?:number
        /** 打扫任务时管理的订单详情ID */
        odid?:number
        /** 打扫任务时涉及的锁ID */
        lid?:number
        /** 库存 - 二级库存楼层分类ID */
        sub_id?:number
        /** 库存任务存储库存日志表字符 */
        sub_list?:string | tb.kxyk_mch_goods_stock_log[]
        /** 
         * 库存任务类型
         * @param 0 库管下发的任务需要楼层确认
         * @param 1 楼层下发的申请需要库管确认
         */
        sub_t?:number
        /** 库存确认员工ID 确认收到库存 确认发放库存时 */
        ck_id1?:number

    }

    /** 智能锁授权表 */
    export type kxyk_mqtt_gateway_lock_auth = {
        /** ID */
        id:number
        /** 门锁ID 关联kxyk_mqtt_gateway_lock */
        lid:number
        /** 
         * 授权类型
         */
        t:"Card" | "Password" | 'Finger' | "Face"
        /** 授权值 手牌号码 或者 密码 或指纹和人脸ID */
        v:string
        /** 操作员工ID */
        clerk_id?:number
        /** 添加时间 */
        t0:number
        /** 关联手牌表ID kxyk_bath_shoebox  */
        sb_id?:number
    }
    /** 智能门锁表 */
    export type kxyk_mqtt_gateway_lock = {
        /** ID */
        id:number
        /** 房间名称 可以为空 */
        fname?:string
        /** 虚拟字段 未来的约定日期列表 '2025-05-06,2025-07-28'格式 */
        dooms?:string | string[]
        /** 当前房间设置的价格 */
        price?:number
        /** 当前房间房间介绍的图片组 */
        imgs?:string | string[]
        /** 房间介绍 */
        info?:string
        /** 当前房间已预定的日期列表 */
        bookedDates?:string[]
        /** 网管设备ID 一般为10个字符 */
        clientId:string
        /** 门锁设备唯一ID,一般为10个字符 */
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
        /** 硬件版本：固定4字节16进制字符串 */
        hardVer?:string
        /** 固件版本：固定4字节16进制字符串 */
        version?:string
        /** 保留位，生产时烧入，不允许变更，可针对大客户定制 */
        customerId?:string
        /** 门锁本地当前存在多少条记录（含授权开门记录、门磁记录、未授权尝试开门记录） */
        recordNumber?:number
        /** 当前已存在多少条卡片授权 */
        authCard?:number
        /** 当前已存在多少条密码授权 */
        authPassword?:number
        /** 当前已存在多少条指纹授权(仅支持指纹功能门锁) */
        authFinger?:number
        /** 当前已存在多少人脸授权(仅支持人脸功能门锁) */
        authFace?:number
        /** 门锁最大可存记录数 */
        maxRecordNumber?:number
        /** 门锁最大可存卡片授权 */ 
        maxAuthCard?:number
        /**门锁最大可存密码授权 */ 
        maxAuthPassword?:number
        /**门锁最大可存指纹(仅支持指纹功能门锁) */ 
        maxAuthFinger?:number
        /**门锁最大可存人脸(仅支持人脸功能门锁) */ 
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
        /** 延迟关门时间，非必填项，当不填写时，为触发信号 填写1~14下发，表示延迟开门后延迟1~14秒 */ 
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
        /** 门锁当前剩余电量值，范围为0-100，代表剩余电量百分比 */ 
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
    /** 只能门锁门店表 */
    export type kxyk_mqtt_gateway_store = 
    {
        /** ID */
        id:number
        /** 管理系统网关表 kxyk_mqtt_gateway ID*/
        mgid:number
        /** 门店ID */
        sid:number
        /** 自定义网关名称 二楼右 之类的 */
        gname:string
        /** 添加网关时间戳 */
        t0:number
    }
    /** 智能门锁网关表 */
    export type kxyk_mqtt_gateway = {
        /** ID */
        id:number
        /** 设备ID */
        clientId:string
        /** 设置网关备注 */
        info?:string
        /** 网关硬件版本号 */
        hardVer?:string
        /** 保留位，生产时烧入，不允许变更，可针对大客户定制 */
        customerId?:string
        /** 网关软件版本号 */
        version?:string
        /** 网关MAC地址 */
        mac?:string
        /** 网关IP地址 */
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
        /** 设备添加时间戳 */
        t0?:number
        /** 设备上次心跳时间戳 */
        t1?:number
    }

    /** 用户转赠余额信值表 */
    export type kxyk_user_give_money_and_vip =
    {
        /** ID */
        id:number
        /** 转赠用户ID */
        set_uid:number
        /** 接受用户ID */
        get_uid:number
        /** 转赠余额金额 */
        money:number
        /** 转赠信值金额 */
        s_money:number
        /** 转赠vip */
        vip:number
        /** 
         * 是否转赠VIP
         * @param 1 = 是
         * @param 0 = 否
         */
        is_set_vip?:number
        /** 门店ID */
        sid:number
        /** 转赠时间 */
        t1:number
        /** 接受时间 */
        t2:number
        /** 
         * 转赠状态
         * @param 0 = 转赠中
         * @param 1 = 已接受
         * @param 2 = 已过期
         */
        state:number
    }
    /** 门店内部聊天表 */
    export type kxyk_store_chat = 
    {
        /** id */
        id:number
        /** 门店ID */
        sid:number
        /** 发送消息的员工ID */
        send_clerk_id:number
        /** 
         * 消息类型
         * @count 1 = 图片消息
         * @count 2 = 语音消息
         * @count 3 = 文字消息
         */
        type:number
        /** 消息发送时间戳 */
        time:number
        /** 要广播的员工分类ID组 */
        n_ids?:number[] | string
        /** 要广播的员工ID组 */
        ck_ids?:number[] | string
        /** 
         * 消息体
         * @count 图片消息时为图片地址
         * @count 语音消息时为语音地址
         * @count 文字消息时为文字
         */
        msg:string 
    }

    /** 第三方收款表 */
    export type kxyk_other_payment ={
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 第三方名称 */
        pname:string
        /** 添加时间戳 */
        t0:number
        /** 是否已经删除
         * @param 1 = 删除
         */
        is_del?:number

    }

    /** 员工打卡正向异常状态详情表 */
    export type kxyk_mch_store_clerk_sign_detall = 
    {
        /** ID */
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
        /** 请假开始时间字符串 上下班打卡时间字符串 */
        t0_str:string
        /** 
         * 请假结束时间戳
         * @abstract 上下班时记录 早到 迟到 早退 晚走 秒数
        */
        t1:number
        /** 请假结束时间字符串 */
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
        /** 管理员备注内容 */
        remark?:string
    }

    /** 洗浴系统打卡签到表 */
    export type kxyk_mch_store_clerk_sign = {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 员工ID */
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
        /** 上班打卡时间字符串 */
        t1_str?:string
        /** 上班打卡经度 */
        t1_lat?:string
        /** 上班打卡纬度 */
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
        /** 上班异常时的备注说明 选填 */
        t1_odd?:string
        /** 下班打卡时间戳 */
        t2?:number
        /** 下班打卡时间字符串 */
        t2_str?:string
        /** 下班打卡经度 */
        t2_lat?:string
        /** 下班打卡纬度 */
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
        /** 下班异常时的备注说明 选填 */
        t2_odd?:string
        /** 
         * 本班次打卡异常次数累计 
         * @protected 默认0，每次异常+1 
         */
        odd?:number
        /** 当前正在请小时假捆绑的详情ID */
        d_id?:number
        /** 
         * 本班次挂在临时请假或异常详情
         */
        detall?:kxyk_mch_store_clerk_sign_detall[]
    }
    /** 门店内部结算表 */
    export type kxyk_mch_store_finance = {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 用户UID */
        uid:number
        /** 大厅Hid 如果涉及的话 */
        hid?:number
        /** 订单ID 如果涉及 */
        oid?:number
        /** 订单详情ID 如果涉及 */
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
       /** 涉及金额 */
       price:number
       /** 
        * 是否结算
        * @param 0 = 未结算
        * @param 1 = 正在结算（有时候可能正则申请）
        * @param 1 = 已结算
        */ 
       check:number
       /** 点击结算的员工ID */
       check_clerk_id?:number
       /** 
        * 简短说明
        * @property 体现在按日查询时的色块标题 + 收益指出 数字
        */
       info?:string
       /** 详细说明 */
       msg?:string
       /** 时间字符串 */
       t0?:string
       /** 时间戳 */
       t1?:number
       
    }
    /** 信值充值日志表 */
    export type kxyk_mch_store_credit_log = {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 用户UID */
        uid:number
        /** 充值金额 */
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
        /** 是否指定VIP */
        vip?:number
        /** 添加规则员工ID clerk_id */
        clerk_id?:number
        /** 添加时间戳 */
        t0?:number
        /** 充值类型 0 = 信值 1 = 余额 */
        type?:0 | 1
        /** 是否用户自主充值 0=管理员手动充值 1 = 用户自主在线充值 */
        type2?:0 | 1
    }

    /** VIP会员下单赠送卡券规则表 */
    export type kxyk_mch_store_vip_gift_rules = {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** VIP ID */
        vip:number
        /** 要赠送的卡券id 都好分割 */
        coupons:string | number[]
        /** 添加规则员工ID clerk_id */
        clerk_id?:number
        /** 添加时间 */
        t1?:number
        /** ui 是否编辑 */
        is_edit?:boolean
    }
    /** 开薪怡客系统日志表 */
    export type kxyk_system_logs = {
        /** ID */
        id:number
        /** 商圈ID */
        cid?:number
        /** 门店ID */
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
        /** 写入日志的方法路径 */
        fn?:string
        /** 日志文本 */
        msg:string
        /** 写入时间戳 */
        t1?:number
        /** 触发写入日志的用户UID */
        uid?:number
        /** 触发写入日志的操作字符串 例如 开牌 关牌 充值等 */
        at?:string

    }

    /** E1下级关系表 */
    interface kxyk_e1_lower_level{
        /** ID */
        id:number
        /** 商圈ID */
        cid:number
        /** 大客户E1 id 关联info表 */
        eid:number
        /** 用户ID */
        uid:number
        /** 开始时间戳 */
        t1:number
        /** 过期时间戳 */
        t2:number
        /**
         * 下级状态
         * @param 0  上下级正常
         * @param 1  下级身份已过期失效
         */
        t:number
    }
    /** 设置会员申请表 */
    interface kxyk_user_vip_set_apply
    {
        id:number
        /** 要设置会员的用户UID */
        uid:number
        /** 商圈ID */
        cid:number
        /** 门店ID 暂时不用 */
        sid:number
        /** 申请要设置的vip ID 关联kxyk_mch_type_vips表*/
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
       /** 申请时间戳 */
       t1:number
       /** 通过时间戳 */
       t2:number
       /** 申请时的备注 */
       bz?:string
    }
    /** 平台用户消息订阅模板可发送数量 */
    interface kxyk_subscribe_message_count{
        id:number
        /** 模板ID */
        temp_id:string
        /** 可发送数量 */
        count:number
        /** 用户UID */
        uid:number
    }
    /** 洗浴门店排队配置表 */
    interface kxyk_mch_store_queue_config_xy
    {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 排队项目名称 */
        q_name:string
        /** 排队选择的id组 */
        q_select:string | number[]
        /** 是否正在编辑 - 虚拟字段 */
        is_edit?:boolean
        /** 当前队列的排队列表 前端使用 */
        list?:tb.kxyk_mch_store_order_detall[]
    }
    /** 平台本地服务门店表 */
    interface kxyk_mch_store_local_serve{
        /** ID */
        id:number
        /** 用户uid */
        uid:number
        /** 门店ID */
        sid:number

        /** 虚拟字段 关联门店 */
        /** 门店名称 */
        sname?:string
        /** 门店照片 */
        img?:string
        /** 门店联系手机号码 */
        phone?:string
        /** 门店消费订单数量 */
        count?:number
        /** 门店地址 */
        address?:string
        /** 门店距离 单位：米 */
        distance?:number
        /** 经度 */
        lat?:string
        /** 维度 */
        lng?:string
        /** 门店类型 */
        type?:number

    }
    /** 平台订单表 */
    interface kxyk_mch_order{
        /** ID */
        id:number
        /** 
         * 购物车ID组 - 逗号分割
         * @property 关联 kxyk_mch_cart 表
         */
        car_ids:string
        /** 订单金额 */
        price:number
        /** 
         * 快递收货地址ID
         * @property 关联 kxyk_user_address表
         */
        address_id:number
        /** 购买用户UID */
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
        /** 下单时间戳 */
        t1:number
        /** 
         * 订单是否已删除
         * @count 0 未删除
         * @count 1 已删除
         */
        is_del:number
    }
    /** 平台三级行政地区表 */
    interface kxyk_china_area{
        /** ID */
        id:number
        /** 省级名称 */
        a1:string
        /** 省级编码 */
        a1_code:string
        /** 市级名称 */
        a2:string
        /** 市级编码 */
        a2_code:string
        /** 区级行政名称 */
        name:string
        /** 区级编码 */
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
    /** 平台用户快递地址表 */
    interface kxyk_user_address{
        /** id */
        id:number
        /** 用户UID */
        uid:number
        /** 收货人姓名 */
        s_name:string
        /** 收货人手机号码 */
        phone:string
        /** 省编码 */
        code1:string
        /** 市编码 */
        code2:string
        /** 区编码 */
        code3:string
        /** 收货人详细地址 */
        address:string
        /** 是否默认 */
        is_default:number
        /** 虚拟字段 前端选择省市区 */
        area?:string[]
        /** 解析出来的省名称 */
        code1_name?:string
        /** 解析出来的市名称 */
        code2_name?:string
        /** 解析出来的区名称 */
        code3_name?:string

    }
    /** 开薪怡客 平台购物车 */
    interface kxyk_mch_cart{
        /** id */
        id:number
        /** 门店ID */
        sid:number
        /** 商品ID */
        gid:number
        /** 商品单价 */
        price:number
        /** 商品数量 */
        count:number
        /** 用户UID */
        uid:number
        /** 添加购物车时间戳 */
        t1:number
        /** 是否已经删除 - 下单成功后会删除购物车条目 */
        is_del?:number
        /** 虚拟字段 - 商户名称 */
        store_name?:string
        /** 虚拟字段 - 商户照片 */
        store_img?:string
        /**
         *  虚拟字段前端使用
         *  购物车内结算是否选额当前条目
         */
        is_select?:number
        /** 前端生成虚拟字段用来使用多选框 */
        is_select_bool?:boolean
        /** 虚拟字段 - 商品图片 */
        goods_img?:string
        /** 虚拟字段 - 商品名称 */
        goods_name?:string
        
    }
    /** 入驻平台商户申请表 */
    interface kxyk_mch_join_apply{
        /** ID */
        id:number
        /** 商户名称 */
        mch_name:string
        /** 主营项目 鞋帽 化妆品等 */
        items:string
        /** 门店简介 可选 */
        info?:string
        /** 联系人称呼 */
        u_name:string
        /** 联系人手机号码 */
        u_phone:string
        /** 联系人设置的登录账户 */
        account:string
        /** 联系人设置的登录密码 */
        password:string
        /** 入住时间戳 */
        time:number
        /** 申请用户的uid */
        uid?:number
    }
    /** 微信支付退款申请表 */
    interface kxyk_user_pay_log_refunds{
        /** ID */
        id:number
        /** 支付日志表ID 关联kxyk_user_pay_log表ID */
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
        /** 失败原因 */
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
        /** 申请退款时间戳 */
        t1?:number
        /** 实际退款时间戳 */
        t2?:number
        /** 微信生成的退款ID */
        refund_id?:string
    }

    /** 微信收付通平台二级商户进件表 */
    interface kxyk_secondary_merchants_submission
    {
        /** ID */
        id:number
        /** 门店ID */
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
        /** 微信返回的申请ID */
        applyment_id?:string

        /** 各个状态文字提醒 例如驳回原因 等 */
        status_msg?:string

        /** 验证银行账户数据 */
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

        /** 申请到的商户支付ID */
        sub_mchid?:string
        /** 
         * 点金计划
         * @property 参与点金计划支付完成可以设置小票 否则直接关闭窗口
         * @const 0 未开启点金计划
         * @const 1 开启点金计划
         */
        click_gold?:number
    }

    /** 系统打印机表 */
    interface kxyk_store_printer{
        /** 打印机ID */
        id:number
        /** 打印机标识 鞋吧 收银台等 */
        mark:string
        /** 打印机内网IP */
        ip:string
        /** 所属门店ID */
        sid:number
        /** 打印机类型
         * @param 0 = 网络地址+端口链接  electron 模式
         * @param 1 = 共享地址链接 node-thermal-printer 模式
         */
        t:number
                
    }
    /** 合单下单系统订单详情子表 */
    interface kxyk_user_combine_pay_order_detall
    {
        id:number
        /** 
         * 关联kxyk_user_combine_pay_order主表ID
        */   
       cpid:number
       /** 关联kxyk_user_combine_pay_order主表ID  */ 
       odid:number
       /** 收款商户内部唯一ID */
       out_trade_no:string
       /** 收款商户id */
       sub_mchid:string
       /** 收款商户名称 */
       sub_mch_name:string
       /**
        * 支付状态
        * @param 0 = 未支付
        * @param 1 = 已支付
        * @param 2 = 已退款
        */
       is_pay:number
       /** 支付金额 */
       price:number
       /** 下单时间 */
       t1:number
       /** 支付时间 */
       t2?:number
       /** 退款时间 */
       t3?:number
    }
    /** 合单下单系统主表 */
    interface kxyk_user_combine_pay_order
    {
        /** id */
        id:number
        /** 支付用户UID */
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
        /** 收款商户ID */
        sid:number
        /** 关联大厅表HID */
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
        /** 微信返回的预支付标识有效期24小时 */
        prepay_id?:string
        /** 微信transaction_id */
        transaction_id?:string
        /** 下单时间戳 */
        t1:number
        /** 支付时间戳 */
        t2?:number
        /** 总支付金额 */
        price:number
        /** 预支付ID 关联 kxyk_bath_hall_prior_pay表 */
        pid:number
    }
    /** 用户往期数据日志表 */
    interface kxyk_circle_member_fund_log
    {
        /** id */
        id:number;
		/** 用户UID */
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
		 */
		type:number;
		/** 业务类型 1 = 获得卡券 2 = 获得期卡 虚拟字段 */
		type_str?:string;
		/** type = 1 时挂载的卡券数据 */
		coupon?:CouponUser;
		/** type = 2 时挂载的期卡数据 */
		annual?:kxykAnnualUser;
		/** type = 3 or 10 时挂载的订单数据 */
		order?:OrderDetall[]
		/** 业务关联ID */
		eid:number;
		/** 日志消息体 */
		msg:string;
		/** 记录时间 */
		t1:number;
        /** 是否被用户隐藏显示 */
        del?:number
    }
    /** 用户抽经表 */
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
        /** 中奖用户 */
        uid:number
        /** 用户是否点击了领奖 */
        is_give:number
        /** 是否领取成功 */
        is_give2:number
        /** 用户领取事件 */
        t1:number
        /** 发放事件 */
        t2:number
        /** 发放管理员ID */
        staff_uid:number

        /** 虚拟字段 */

        /** 中奖用户手机号 */
        phone?:string
        /** 中奖用户昵称 */
        nickname?:string
        /** 中奖用户头像 */
        avatar?:string

    }
    /** 中头奖手机号表 */
    interface kxyk_user_prize_phone{
        id:number
        /** 可以中奖的手机号码 */
        phone:string
    }
    /** 洗浴门店预支付表 */
    interface kxyk_bath_hall_prior_pay{
        /** ID */
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
        /** 关联洗浴大厅Hid */
        hid:number
        /** 预支付金额 */
        price:number
        /** 关联订单表ID组 本次支付涉及的所有订单 */
        oids:string
        /** 关联订单详情的ID组以逗号分割 */
        odids:string
        /** 支付用户的UID */
        pay_uid:number
        /** 操作用户 收款店员uid */
        action_uid:number
        /** 操作员工ID */
        clerk_id?:number
        /** 预支付下单时间 */
        t1:number
        /** 完成支付时间 */
        t2:number
        /**
         *  支付状态
         * @param 0 未支付
         * @param 1 已支付
         */
        is_pay:number
        /** 是否已经搬迁员工ID完成 */
        is_end:number
    }
    /** 卡券兑换低值配置表 */
    interface kxyk_coupon_exchange_low{
        /** ID */
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
        /** 门店ID */
        sid:number 
        /** 是否多规格 */
        is_spec:number 
        /** 商品ID */
        goods_id:number
        /** 多规格项目服务id */
        item_id:number
        /** 卡包ID */
        pid:number
    }
    /** 订单详情表 */
    interface kxyk_mch_store_order_detall{
        /** 余额信值消费时记录当时的VIP等级 以便后续结算 */
        pay_vip?:number
        /** 预定房价号码 逗号分割 或者前端转为数组 */
        room_number?:string | string[]
        /** 客房订单入住日期字符串 */
        check_in?:string
        /** 客房订单离店日期字符串 */
        check_out?:string
        /** 
         * 客房订单 登记入住人姓名 2026-04-27
         */
        collect_name?:string
        /**
         * 客房订单 登记入住人电话 2026-04-27
         */
        collect_phone?:string
        /**  */
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
		/** 是否显示详情 订单金额实付金额等 */
		is_show_detail?:boolean
        /** id */
        id?:number
        /** 关联订单表ID kxyk_mch_store_order */
        oid:number
        /** 商品ID */
        goods_id:number
        /** 对规格的服务ID */
        item_id:number
        /** 是否多规格 */
        is_spec:number
        /** 服务项目名称 */
        item_name:string
        /** 购买数量 非多规格时有值 */
        count:number
        /** 购买商品或服务单价 */
        price:number
        /** 支付总金额 */
        pay_price:number
        /** 专用积分支付金额 */
        yue_s_pay:number
        /** 通用余额支付金额 */
        yue_pay:number
        /** 线下微信支付金额 */
        offline_wx_pay?:number
        /** 老会员卡支付金额 */
        old_card_pay?:number
        /** 现金支付金额 */
        cash_pay:number
        /** 现金收款人UID */
        cash_staff_uid?:number
        /** 现金收款员工ID */
        cash_clerk_id?:number
        /** 微信在线支付金额 */
        wx_pay:number
        /** 等待支付总金额 */
        wait_pay_price:number
        /** 
         * 是否使用优惠卡 
         * @param 0 未使用
         * @param 1 使用
        */
        is_discount:number
        /** 优惠金额 */
        discount:number
        /** 手动优惠员工ID */
        manual_clerk_id?:number
        /** 
         * 手动优惠金额可以支持负数
         * @protected 多次优惠只计最后一次
         */
        manual_discount?:number
        /** 手动优惠时可能填写的备注 */
        manaul_info?:string
        /** 
         * 使用的优惠券类型
         * @param 0 没有使用优惠券
         * @param 1 兑换券
         * @param 2 抵值券
         * @param 3 期卡
         */
        coupon_type:number
        /** 使用的期卡ID */
        coupon_id:number
        /** 使用优惠券id组，逗号分割 */
        coupon_ids:string
        /** 是否加单 - 洗车行业系统使用 */
        is_add_order?:number
        /** 加单时间戳 没有时间是读取订单时间 - 洗车行业使用 */
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
        /** 开始服务时间戳 */
        t1:number
        /** 点击开始服务的员工UID */
        t1_staff_uid?:number
        /** 结束服务时间戳 */
        t2:number
        /** 点击结束服务的员工UID */
        t2_staff_uid?:number
        /** 评价时间戳 */
        t3:number
        /** 评价星级 0- 5星星 */
        rate:number
        /** 评价或投诉内容 限制100个字符串 */
        msg:string
        /** 是否使用了渠道卡 - 洗车行业使用 */
        is_channel?:number
        /** 渠道卡名称 */
        channel_name?:string
        /** 扩展字段 - 所用卡券标识 年卡 兑换 建行兑换等 */
        status2:string
        /** 是否转增订单 - 洗浴使用 */
        is_transfer?:number
        /** 转赠人UID */
        transfer_uid?:number
        /**
         *  服务结束模式
         * @param 0 手动结束服务
         * @param 1 自动结束服务
         */
        end_type?:number
        /** 自动结束服务时间间隔 - 单位分钟 */
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
        /** 是否门店设置的必买项目 */
        is_must_buy?:number
        /** 是否满免 */
        is_free?:number
        /** 关联系统用户支付表ID kxyk_user_pay_log 用于微信退款 */
        pl_id?:number
        /** 本条订单是否进行了语音提示 */
        is_tips?:number
        /** 
         * 员工权限表ID  关联 kxyk_mch_store_clerk表
         */
        clerk_id?:number
        /** 是否已经发送了消息称模板消息通知用户排队到号 */ 
        is_notify?:number
        /** 微信支付后结算给子商户的结算ID */
        finance_id?:number

        /** 关联店内分账相关字段 */
        /** 商品关联的收款子商户ID */
        g_sub_id?:number
        /** 商品设置的收款子商户名称 */
        g_pay_name?:string
        /** 商品设置的子商户微信收款商户号码 */
        g_pay_number?:string

        /** 是否开启了子商户收款 */
        is_sub_pay?:number
        /** item 关联的收款子商户ID */
        it_sub_id?:number
        /** item 多规格项目设置的收款名称 */
        it_pay_name?:string
        /** 多规格设置的微信收款商户号码 */
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
        /** 套票子订单关联母订单ID */
        combo_id?:number
        /** 是否套票订单 */
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
        /** 商品配置的销售提成金额 关联类型 小数点2位 */
        g_bonus?:number
        /** 
         * 商品设置的店内分账单位
         * @param 0 按比例
         * @param 1 按金额 it_sub_id
         */
        g_sub_pay_type?:number
        /** 商品设置的店内分账金额 关联类型 小数点2位 */
        g_sub_pay_price?:number
        /** 
         * 项目设置的店内分账单位 有限使用项目配置
         * @param 0 按比例
         * @param 1 按金额
         */
        it_sub_pay_type?:number
        /** 项目设置的店内分账金额 关联类型 小数点2位 */
        it_sub_pay_price?:number


        /** 手动优惠员工名称 */
        clerk_name2?:string

        /** 关联预约技师名称 关联字段 */
        clerk_name?:string
        /** 关联预约技师头像 */
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
        /** 关联订单表UID -  虚拟字段 */
        uid?:number
        /** 关联订单表SID -  虚拟字段 */
        sid?:number
        /** 关联大厅表 是否代理人 -  虚拟字段 */
        h_is_proxy?:number
        /** 关联大厅表 所代理的大厅ID数组字符串 ,逗号分割 -  虚拟字段 */
        h_proxy_hids?:string
        /** 关联大厅表 是否被代理 -  虚拟字段 */
        h_is_proxy_pay?:number
        /** 关联大厅表 代理自己的hid -  虚拟字段 */
        h_proxy_pay_hid?:number
        

        /** 前端UI - 虚拟字段 */

        /** 商圈ID */
        cid?:number
        /** 大厅ID 补丁 */
        hid?:number
        /** 等待服务的排队时间 */
        t1_w?:string
        /** 服务时间 */
        t2_w?:string
        /** 前端排队使用 VIP插队 计算 */
        vip?:number
        /** 嵌套大厅到订单详情用于前端队列 2025-06-10 */
        hall?:sm.Pd1.HallMember
        /** 是否语音播报 前端排队使用 */
        is_voice?: undefined | boolean
        /** 商品名称 前端使用 */
        goods_name?:string
        /** 规格名称 前端排队使用 */
        suk_name?:string

        /** 当前订单属于哪个手手牌号码 - 2025-12-18 只有结算组件显示 其他地方没有改值 */
        sb_code?:string
        /** 离店购物车里虚拟字段mid */
        mid?:number
    }
    /** 订单表 */
    interface kxyk_mch_store_order{
        /** 订单详情 - 虚拟字段*/
        detall?:tb.kxyk_mch_store_order_detall[]
        /** 所有订单详情 - 包括共享身份里 非代理订单 */
        detall_all?:tb.kxyk_mch_store_order_detall[]
        /** 代理人订单详情缓存， 用于解决前端订单详情因格式化不断累加  */
        detall_cache?:tb.kxyk_mch_store_order_detall[]
        /** id */
        id ?:number
        /** 门店ID */
        sid:number
        /** 用户UID */
        uid:number
        /** 订单总金额 */
        order_price:number
        /** 优惠总金额 */
        discount_price:number
        /** 现金支付总金额 */
        cash_price:number
        /** 余额支付总金额 */
        yue_price:number
        /** 积分支付总金额 */
        yue_s_price:number
        /** 微信在线支付总金额 */
        wx_price:number
        /** 线下微信支付总额 */
        offline_wx_price:number
        /** 老会员卡支付总额 */
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
        /** 支付时间戳 */
        pay_time:number
        /** 下单管理员或者用户自己的UID */
        add_uid:number
        /** 下单时间戳 */
        time:number
        /** 
         * 订单状态
         * @param 0 没有开始服务
         * @param 1 正在服务
         * @param 2 完成服务
         */
        status:number
        /** 开始服务时间 */
        t1:number
        /** 完成服务时间戳 */
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
        /** 转增人UID */
        transfer_uid?:number
        /** 订单等待支付总金额 */
        wait_pay_price:number
        /** 关联洗浴大厅表ID */
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
    /** 平台公司表 */
    interface kxyk_company{
        id?:number
        /** 公司名称 */
        name:string
        /** 公司绑定的管理员UID */
        bing:string
        /** 微信收款商户号吗 */
        pay_number?:string
        /** 微信收款商户名称 */
        pay_name?:string
        /** 收付通公司收款账户 */
        xy_pay_number?:string
        /** 收付通收款账户中文名称 */
        xy_pay_name?:string
    }
    /** 平台用户行业会员表 */
    interface kxyk_user_vip
    {
        id?:number
        /** 所属公司ID 关联kxyk_company */
        cpid:number
        /** 所属行业ID 关联kxyk_mch_type表 */
        tid:number
        /** 用户uid */
        uid:number
        /** 行业VIP ID 关联 kxyk_mch_type_vips表 */
        vip:number
        /** 开通会员时间戳 */
        t1:number
        /** 会员过期时间戳 */
        t2:number
    }
    /**  商圈配置vip过期提醒字段 覆盖A配置 */
    interface kxyk_mch_type_vips_circle_config{
        id?:number
        /**  
         * 公司配置的行业ID 关联kxyk_mch_type_vips
         */
        vid:number
        /** 商圈id */
        cid:number
        /** 充值金额 - 覆盖公司配置的充值金额 */
        price?:number 
        /** 会员失效金额 - 覆盖A配置 */
        out_price?:number
        /** 提醒充值金额 - 覆盖A配置 */
        tip_price?:number
        /** 当前会员可以共享的身份数量 - 只共享身份 */
        share_identity?:number
    }
    /** 开薪怡客行业会员设置表 */
    interface kxyk_mch_type_vips
    {
        id?:number
        /** 所属公司ID */
        cpid:number
        /** 所属行业ID 关联kxyk_mch_type表 */
        type:number
        /** 会员名称 */
        name:string
        /** 会员文字介绍 */
        info:string
        /** 是否允许插队 */
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
        /** 分享身份数量 */
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
        /** 充值金额 大于等于该金额自动成为该会员 */
        price?:number
        /** 是否支持分身 */
        is_avatar?:number
        /** 是否信值会员 */
        is_syue?:number
        /** 
         * 虚拟字段开始
         */
        /** 是否开启当前会员发放佣金 */
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
        /** 佣金金额 关联mode_type 0 = 百分比率 1 = 实际金额元 */
        mode_number?:number

    }
    /** newlan表 */
    interface kxyk_newlan{
        /** 主键 */
        id?:number
        /** 拥有访问newlan页面的UID列表 格式为107,120 */
        show_page_ids:string 
    }
    /** 支付系统日志表 */
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
        /** 支付用户UID */
        uid:number
        /** 支付用户OPENID */
        openid:string
        /** 
         * 支付环境
         * @param H5 h5环境包括PC环境
		 * @param WX 微信公众号
		 * @param WXAPP 微信小程序
		 * @param APP APP
         */
        ev?: "H5" | "WX" | "WXAPP" | "APP" | "h5" | "wx" | "wxapp" | "app"
        /** 支付回调API接口 */
        api:string
        /** 支付金额 - 支持两位小数点 */
        price:number
        /** 
         * 是否发生支付错误
         * @param 0 没有错误
         * @param 1 支付错误
         */
        fail: 0 | 1
        /** 支付错误文字提示 */
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
        /** 扩展字段 */
        extend?:string
        /** 日志生成时间 */
        time:string
        /** 收款门店ID */
        sid:number
        /** 收款商圈CID  */
        cid?:number
        /** 收款公司cpid  */
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
        /** 微信 服务商商户号 或直连商户号 */
        sp_mchid:string
        /** 微信 子商户商户号 */
        sub_mchid:string
        /** 子商户ID 关联 kxyk_mch_store_sub 表 */
        sub_id?:number
        /** 微信 调用支付时的APPID */
        sp_appid?:string
        /** 支付完成跳转的链接地址 */
        back_url:string 
        /** 支付时商品描述 购买描述 */
        pay_title:string
        /** 
         * 微信退款状态
         * @const 0 未退款
         * @const 1 正在退款
         * @const 2 完成退款
         * @const 3 退款错误，详情需要查询退款表
         */
        refund_status?:number 
        /** 关联门店表虚拟字段 */
        /** 门店名称 */
        store_name?:string
        /** 门店门头照片 */
        store_img?:string
    }
    /** p1员工登录日志表 */
    interface kxyk_p1_staff_login_log{
        id?:number
        /** 员工UID */
        uid:number
        /** 门店ID */
        sid:number
        /** 今日首次登录时间 - 时间戳 */
        t1:number
        /** 今日最后登陆时间 - 时间戳 */
        t2:number
        /** 今日最后离开时间 - 时间戳 */
        t3:number
        /** 今日登录次数 */
        count:number
        /** 虚拟字段 用户昵称 */
        nickname?:string
        /** 虚拟字段 用户头像 */
        avatar?:string
        /** 虚拟字段 用户手机号码 */
        phone?:string

    }
    /** 门店配置子门店表 */
    interface kxyk_mch_store_sub{
        id?:number
        /** Platform settlement ratio 平台余额结算比例 */
        PSR?:number
        /** 所属上级门店ID */
        sid:number
        /** 子门店名称 - 或分类名称 */
        name:string
        /** 
         * 子门店副名称 - 或二级分类名称
         *  一楼 二楼 之类的分类副标题 
        */
        name2:string
        /** 收款商户名称 */
        pay_name?:strings
        /** 绑定收款支付商户账号 */
        pay_number?:string
        /** 默认收款比例 商品中有设置的话先使用商品 */
        default_scale?:number
        /** 对子商户的授信额度 */
        sxed?:number
        /** 加入时间戳 */
        time:number
        /** 
         * 数据类型
         * @param 0 = 商品分类
         * @param 1 = 收款商户号
         */
        t:number

        /** 当前分类正在排队等待处理的列表 前端使用 */
        list?:tb.kxyk_mch_store_order_detall[]
        /** 当前分类包含所有商品ID组 用于前端计算排队 */
        goods_ids?:number[]
        /** 用户端是否显示该分类 */
        user_show?:number
        /** 排序字段 */
        sort?:number
        /** 当前分类配置的可销售商品ID组 */
        g_ids?:string | number[]
        /** --------- 前端使用 虚拟字段 -------- */

        /** 关联读取二级库存列表 */
        stock_list?:tb.kxyk_mch_goods_stock_level2[]
        /** 当前分类下的商品数量 */
        goods_count?:number
    }
    /** 系统商品表 */
    interface kxyk_mch_goods{
        id?:number
        /** Platform settlement ratio 平台余额结算比例 */
        PSR?:number
        /** 是否开启库存 */
        is_stock?:number
        /** 库存预警值 */
        stock_warn?:number
        /** 库存单位 */
        stock_unit?:string
        /** 每件多少平或者支关联库存单位 */
        stock_unit_count?:number
        /** 商品或服务图片 - 数据库*/
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
        /** 商品所属公司ID - 数据库 */
        cpid:number
        /** 系统分类 kxyk_mch_type表 - 数据库 */
        type_id:number
        /** 商品或服务名称 - 数据库 */
        goods_name:string
        /** 添加时间戳 - 数据库 */
        time:number
        /** 关联子门店ID 0 = 未关联  kxyk_mch_store_sub 涉及结算 - 数据库 */
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
		/** 销售提成、奖金给服务员 */
		bonus?: number,
        /** 是否多规格 */
        is_spec:number
        /** 是否套餐商品订单 - 套餐商品捆绑订单*/
        is_combo?:number
		/** 套餐商品配置的商品或服务ID 直接下单 逗号分割ID */
		combo_list?:string | number[],
		/** 是否套卡商品 下单购买赠送卡券 */
		is_combo2?:number
		/** 套票商品配置的JSON 卡券ID和数量 */
		combo2_list?:string | {id:number,count:number}[],
        /** 游客价格 */
        price:number
        /** 注册会员价格 */
        v_price:number
        /** 排序 */
        sort:number
        /** 门店ID */
        store_id:number
        /** 是否开启等级会员价 - 开启后 会员价格表kxyk_mch_goods_spec_suk_item_vips */
        is_vip_price:number
        /** 库存 */
        stock:number
        /** 总销量 */
        sales?:number
        /** 是否第三方商品 */
        is_other?:number
        /** 关联第三方表ID  kxyk_other_payment */
        other_id?:number
        /** 第三方商品价格 用于团购统计 */
        other_price?:number
        /** 进货价格 */
        import_price:number
        /** 出货价格 */
        export_price:number
        /** 是否只能现金支付 */
        is_cash?:number
        /**  */
        /** 进货渠道商名称 */
        import_store_name:string
        /** 进货渠道商电话 */
        import_store_phone:string
        /** 商品类型描述 简单两三个字分类例如 炒菜、主食之类 用于商场 */
        s1?:string
        /** 商品详情图片列表 */
        desc1?:string | string[]

        /** 用户购买后是否需要送货 默认送货 */
        is_delivery?:number
        /** 是否为预约型服务 */
		is_reserve?:number,
		/** 预约型服务是否允许用户自主下单 */
		is_user_buy?:number,
        /** 普通商品VIP价格 */
        vips?:sm.ItemVipsPrice[]

        /** ------- 虚拟字段 ---------- */
        /** 是否正在远程加载多规格或其他商品属性 */
        is_loading_spec?:boolean
        /** 可能存在的规格列表 */
		spec?: sm.spec[],
        /** 可能存在的二级库存ID 前端用于识别更新商品本身排序还是库存排序 */
        level_id?:number
    }
    /** 推广团购活动表 */
    interface kxyk_store_tuangou_promotion{
        id?:number
        /** 团购活动ID */
        tgid:number
        /** 用户ID */
        uid:number
        /** 添加事件戳 */
        time:number
    }
    /** 门店分类表 - 包括车型分类 */
    interface kxyk_mch_type{
        id?:number
        /** 分类名称 */
        name:string
        /** 预留多平台ID值 */
        cp:number
        /** 上级ID - 关联本表 */
        root_id:number
        /** 分类等级 1 2 3 */
        level:number
        /** 分类说明 */
        spec_name:string
    }
    /** 商圈会员VIP表 */
    interface kxyk_circle_member_vip
    {
        id?:number
        /** vip名称 */
        name:string
        /** vip价值 */
        price:number
        /** 商圈ID */
        cid:number
        /** 会员权重 目前好像没用 */
        r:number
        /** 权限描述 文字 */
        info:string
        /** 是否可以插队 */
        is_jump:number
        /**  
         * 关联门店
         * @param 0  未关联门店为商圈会员等级
         * @param 关联门店 
         */
        
        sid:number
        /** 用户是否可以自己充值开通会员 */
        is_user_action?:number
        /** 会员等级 */
        layer?:number
    }
    /** 系统配置表ids - 商圈 */
    interface kxyk_config_ids
    {
        id?:number
        /** 配置的ID集合 逗号分割 - 字符串 */
        ids:string 
        /** 格式化后的ID数组列表 */
        ids_list?:number[],
        /** 
         * 配置类型
         * 1 = 首页省钱板块配置团能够活动 - kxyk_store_tuangou
         * 2 = 配置各商圈下洗浴门店类型ID  - kxyk_mch_store_types 
         * 3 = 用户中奖表 可以中几次大奖 - kxyk_user_prize_log
         */
        type:number
        /** 商圈ID */
        cid:number
        /** 配置ID所属表名 */
        tab:string
        /** 
         * 扩展字段1
         * type = 1 时是省钱页面顶部文字描述
         */
        str1:string
        /** 虚拟字段 */
    }
    /** 三募用户表 */
    interface sm_user
    {
        uid:number,
        /** 账号 暂时没用 */
        account?:string
        /** 公众号openid （新系统） */
        wx_openid?:string
        /** APPopenid（新系统） */
        h5_openid?:string
        /** 小程序openid（新系统） */
        cx_openid?:string
        /** 开放平台标识 UNID */
        unionid?:string
        /** 用户密码 */
        pwd:string
        /** 真实姓名 */
        real_name:string
        /** 生日 */
        birthday:string
        /** 身份证号码 */
        card_id:string
        /** 用户备注 */
        mark:string
        /** 合伙人id - 老系统使用 */
        partner_id:number
        /** 用户分组ID - 老系统 */
        group_id:number
        /** 用户昵称 */
        nickname:string
        /** 用户头像 */
        avatar:string
        /** 用户电话号码 */
        phone:string
        /** 备注手机号码，用于关联多个会员卡 */
        phone2?:string
        /** 注册类型 0 = 手机号注册 1 = 会员卡注册 */
        reg_type?:number 
        /** 用户信值 2024-11-18扩展  */
        money:number
        /** 添加时间 - 时间戳格式 */
        add_time:number
        /** 添加时IP  */
        add_ip:string
        /** 最后登陆时间 时间戳 */
        last_time:number
        /** 最后登录IP */
        last_ip:string
        /** 用户余额 -老系统用 */
        now_money:number
        /** 佣金金额 - 老系统  */
        brokerage_price:number
        /** 用户剩余积分 */
        integral:number
        /** 连续签到天数 */
        sign_num:number
        /** 用户状态 1 = 正常 0 = 封禁 */
        status:number
        /** 等级 */
        level:number
        /** 上级uid  */
        spread_uid:number
        /** 推广关联时间 */
        spread_time:number
        /** 用户类型 */
        user_type:string
        /** 是否为推广员 */
        is_promoter:number
        /** 用户购买次数 - 老系统 */
        pay_count:number
        /** 下级人数 */
        spread_count:number
        /** 清理会员时间 - 老系统 */
        clean_time:number
        /** 详细地址 */
        addres:string
        /** 管理员编号 老系统 */
        adminid:number
        /** 
         * 用户登录类型
         * h5,wechat,routine
         */
        login_type:string
        /**  省份编号 */
        province:number
        /** 所在城市编号 */
        city:number
        /** 所在地区编号 */
        area:number
        /** 维度 */
        lat:string
        /** 经度 */
        lng:string
        /** 该用户是否由上级代开 老系统 */
        is_superior_open:number
        /** 模块占位符字段 老系统 */
        is_modules:number
        /** 0代表的是非迁移数据1代表迁移数据 */
        transfer:number
        /** 车牌号码 老系统 */
        car_number:string
        /** 车型 */
        car_type:string
        /** 汽车品牌 */
        car_trademark:string
        /** 微信号码 */
        wx_number:string
        /** 股东表ID 老系统 */
        staff_id:number
        /**
         *  性别
         *  0 = 未设置
         *  1 = 男
         *  2 = 女
         */
        sex:number
        /** 洗浴系统老会员卡号 */
        physical_card_number?:string
        /** 
         * 隐私开关
         * @param 0 = 关闭
         * @param 1 = 开启
         */
        is_secrecy?:number
        /** 用户设置的隐私密码 */
        secrecy_pass?:string
        /** 是否VIP分身 */
        is_avatar?:number
        /** 数据库内部虚拟列 保证返回一个名称 */
        display_name?:string
        /** ------------ 虚拟字段 ------------ */
        /** 关联member表ID 如果有的话 */
        mb_id?:number
        /** 门店信值 如果有的话 */
        s_money?:number
        /** 关联门店信值表id kxyk_mch_store_money */
        su_id?:number
        /** 
         * 本次登录是否已经验证了隐私密码 
         * @param 0 未验证
         * @param 1 已验证
        */
        is_check_secrecy_pass?:number
        /** 用户VIP id */
        vip?:sm.U.UserTypeVip
        /** 用户可能存在的vip名称 */
        vip_name?:string
        /** 可发放卡券数量 团购管理员用 */
        give_count?:number
        /** 用户备注可多条 */
        remarks?:tb.sm_user_remark[]
    }
    /** 洗浴系统员工分类表 */
    interface kxyk_mch_store_clerk_type
    {
        /** ID */
        id:number
        /** 门店ID */
        sid:number
        /** 数据统计日期权限 只有大于这个日期的数据才可以查看  */
        audit_date?:string
        /** 分类名称 */
        n:string
        /** 当前分类配置的服务队列 */
        server_queue: string | number[]
        /** 当前分类配置的商品队列 */
        goods_queue: string | number[]
        /** 当前分类配置的查看其他分类财务权限 */
        finance_queue: string | number[]
        /** 当前分类配置的员工任务权限 */
        task_queue: string | number[]
        /** 分类权限文本 对象 */
        privileges:string | {
            /** 当前选择的权限数组 */
            on:sm.Pd1.StaffAuthFieldArray[]
        }
        /** 当前分类可以发放的卡券权限 */
        give_coupons:string | number[]
        /** 员工分类标识符 */
        pop:number
        /** 是否开启打卡 0 = 关闭 1 = 开启 */
        is_sign?:number
        /** 是否开启定位打开 0 = 关闭 1 = 开启 */
        is_location?:number
        /** 允许打开的定位范围 单位米 */
        location_range?:number
        /** 上班可以开始的打卡时间 */
        work_start?:string
        /** 上班可以结束的打卡时间 */
        work_end?:string
        /** 是否需要下班打卡 */
        is_off_work?:number
        /** 
         * 下班打卡跨越的天数
         * @private 单位是天 默认0不跨天
        */
        span_days?:number
        /** 下班可以开始的打卡时间 */
        off_start?:string
        /** 下班可以结束的打卡时间 */
        off_end?:string
        /** 当前员工配置的预约项目商品ID */
        reserve_gid?:number
        /** 
         * 数据报表或其他统计中是否统计该分类 - 万喜 其他公司打卡分类
         * @param 0 = 统计
         * @param 1 = 不统计
         */
        is_statistics?:number
    }
    /** 门店店员表 */
    interface kxyk_mch_store_clerk
    {
        id?:number
        /** 统计日期字段 */
        audit_date?:string
        /** 门店ID */
        store_id:number
        /** 用户ID */
        uid:number
        /** 添加店员的管理ID */
        add_uid:number
        /** 是否店长 0 = 不是 1 = 是 */
        is_shopkeeper:number
        /** 是否拥有处理店铺任务的权限 */
        is_task:number
        /** 是否允许发放营销卡券 */
        is_give:number
        /** 关联员工分类表ID */
        t?:number
        /** 员工登录账号 */
        acc?:string
        /** 员工登录密码 */
        paw?:string
        /** 绑定的打印机ID 关联kxyk_store_printer */ 
        is_printer?:number
        /**
         *  是否已离职
         * @param 0 = 正常
         * @param 1 = 已离职
         */
        is_del?:number
        /** 是否已经删除员工 - 最终还是不删 */
        is_del_y?:number
        /** --------------- 抽象属性 ------------ */

        /** 关联门店名称 */
        name?:string
        /** 关联门头照片 */
        img?:string
        /** 营业开始时间 */
        operate_start?:string
        /** 营业结束时间 */
        operate_end?:string
        /** 员工关联 suer 头像 */
        avatar?:string
        /** 员工关联 user 昵称  */
        nickname?:string
        /** 员工分类名称  */
        n?:string
        /** 未读消息数量 - 虚拟字段 */
        UnreadCount?:number
    }
    /** 团购活动用户订单表 */
    interface kxyk_store_tuangou_user
    {
        id?:number
        /** 团购活动ID */
        tgid:number
        /** 购买活动用户UID */
        uid:number
        /** 所属门店ID */
        sid:number
        /** 推广人UID */
        aff:number
        /** 是否支付 0 = 未支付 1 = 已支付 */
        is_pay:number
        /**
         *  支付方法
         * 0 = 微信在线支付
         * 1 = 线下支付 - 吧台员工操作
         */
        pay_type:number
        /** 购买数量 */
        count:number
        /** 活动单价 */
        price:number
        /** 实付金额 */
        pay_price:number
        /** 是否已经分佣 */
        is_aff:number
        /** 分佣金额 分给aff UID 用户 */
        aff_price:number
        /** 购买活动后是否发放卡券 0=未发放 1=已发放*/
        is_give:number
        /** 发放卡券的IDS */
        give_ids:string
        /** 购买时间戳 */
        time:number
        /** 操作员UID */
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
        /** 订单是否发生错误 */
        is_err:number
        /** 订单发生错误的日志 */
        err_str:string
        /** 订单是否已删除 */
        is_del:number
        /** ----------------- 抽象数据开始 -------------- */
        
        /** 活动名称 */
        title?:string
        /** 商户名称 */
        s_name?:string
        /** 活动图片 */
        img?:string
        /** 有效期至 */
        youxiaoqi?:string
        /** 可用时间 0 = 没有限制，1 = 有时间限制*/
        kysj?:number
        /** 可用时间开始时间  类似11：00 */
        kysj_s?:string
        /** 可用时间 结束时间 */
        kysj_e?:string
        /** 团购活动数据集合 */
        tg?:tb.kxyk_store_tuangou
        /** 门店数据 */
        store?:tb.kxyk_mch_store
    }
    /** 门店发卡权限表 */
    interface kxyk_mch_store_is_grant_coupon{
        id?:number
        /** 门店ID */
        sid:number
        /**商圈ID */
        cid:number
        /** 卡包 或者 期卡 ID */
        pid:number
        /** 权限是否已删除 0=未删除 1= 已删除 */
        del: 0 | 1
        /**
         *  权限类型
         *  0 = 卡券
         *  1 = 期卡
         *  2 = 购卡活动
         */
        type:number
        /**  ----------------- 抽象数据 --------------- */
        /** 卡包名称 */
        name?:string
    }
    /** 团购活动项目表 */
    interface kxyk_store_tuangou_p{
        id?:number
        /** 关联团购活动ID */
        tgid:number
        /** 项目名称 */
        name:string
        /** 包含数量 - 数量关联发卡数量 */
        count:number
        /** 项目单价 */
        price:number
        /** 绑定卡券IDs 多个ID以逗号分割 */
        coupon:string
        /** 项目规则说明 以key,val|key,val形式存储 */
        rule:string

        /** 抽象属性 */
        /** 前端规则列表 */
        rule_list?:{key:string,val:string}[]
        /** 前端卡券列表 */
        coupon_list?:[]
        /** 解析订单详情时的卡券列表 */
        coupon_list2?:sm.U.tuanGouPCouponList[]
    }
    /** 团购活动表 */
    interface kxyk_store_tuangou{
        id?:number
        /**标题 */
        title:string
        /** 活动分类 */
        type:number
        /** 活动分类字符串 前端 */
        type_str?:string
        /** 活动图片 */
        img:string
        /** 原价 - 可能不需要 */
        o_price:number
        /** 折扣 - 通过计算 */
        zhekou:number
        /** 现价 - 活动购买价格 */
        n_price:number
        /** 有效期文字描述 - 购买活动后 60天有效等 */
        youxiaoqi:string
        /** 可用时间 0 = 没有限制，1 = 有时间限制*/
        kysj:number
        /** 可用时间开始时间  类似11：00 */
        kysj_s:string
        /** 可用时间 结束时间 */
        kysj_e:string
        /** 
         * 适用人群
         * 0 = 所有人群
         * 1 = 男士
         * 2 = 女士
         */
        syrq:number
        /** 禁忌人群 如果该项有值就显示 否则可以不显示 */
        jjrq:string
        /** 该项目是否需要预约 */
        is_yy:number
        /** 预约规则 - 就算不需要预约也可以填写预约规则 */
        yygz:string
        /** 是否可以赠送好友 0= 不可以 1 = 可以 */
        zshy:number
        /** 其他规则 其他多个规则以|分割 */
        qtgz:string
        /** 门店ID */
        sid:number
        /** 门店名称 - 前端 */
        s_name?:string
        /** 是否开启分佣 */
        is_fy:number
        
        /** 
         * 分佣类型 后定
         * 0 = 所有人转发可分佣
         */
        fy_type:number
        /** 分佣单位 0 = 百分比 1 = 固定值 */
        fy_dw:number
        /** 分佣金额 关联单位 */
        fy_je:number
        /** 活动添加时间 */
        time:number
        /** 活动是否已被删除 */
        del: 0|1
        /** 活动已售出数量 */
        sold:number
        /** ---------------抽象数据--------------- */
        /** 活动捆绑项目列表 */
        p?:kxyk_store_tuangou_p[]
        /** 其他规则列表 用于前端展示 */
        qtgz_list?:string[]
        /** 所属商圈ID */
        cid?:number
        /** 手动发放活动时的前端数量 */
        count?:number
        /** 门店数据 */
        store?:tb.kxyk_mch_store
    }
    /** 团购活动分类表 */
    interface kxyk_store_tuangou_type{
        id?:number
        /** 所属门店ID */
        sid:number
        /** 分类名称 */
        name:string
    }
    
    /** 洗浴-大厅开牌订单表 */
    interface kxyk_bath_hall
    {
        /** id */
        id?:number
        /** 门店ID */
        sid:number
        /** 是否到店 0 = 未到店 1 = 已到店 */
        is_come:number
        /** 是否游客 0 = 非游客 1 = 是游客 */
        is_guest:number
        /** 游客号码 店内每天循环计数 */
        guest_number?:number
        /** 关联鞋柜手牌code */
        sb_code:string
        /** 关联鞋柜ID */
        sb_id:number
        /** 虚拟字段关联鞋柜数据 */
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
        /** 进店时间戳 */
        s1:number
        /** 进店时字符串 */
        s1_str:string
        /** 关牌离开时间戳 */
        s2:number
        /** 关牌离开时间字符串 */
        s2_str:string
        /** 关联用户UID */
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
        /** 下单后关联order表ID */
        oid?:number
        /** 是否绑定的VIP会员 vip用户由鞋柜绑定继承 服务过程中不可以换绑 */
        is_vip_uid: 0 | 1
        /** 本次大厅消费是否被代理付款 - 是否有别人帮忙付款 */
        is_proxy_pay?:number
        /** 本次大厅消费帮忙付款的代理人HID */
        proxy_pay_hid?:number
        /** 是否代理人 - 代替其他人付款结算 */
        is_proxy?:number
        /** 代替其他人付款的大厅HID列表字符串，已逗号分割 */
        proxy_hids?:string
        /** 是否已经拥有必须购买的项目 */
        is_have_must_buy?:number
        /** 是否已经点击了取鞋按钮 */
        is_click_out?:number
        /** 用户是否点击了现金付款按钮 */
        is_click_cash_pay?:number
        /** 是否已经自动添加了过夜费 */
        is_overnight_fee?:number
        /** 
         * 如果是分身 这里关联主号hid
         */
        main_hid?:number
    }
    /** 洗浴-鞋柜表 */
    interface kxyk_bath_shoebox
    {
        /** 虚拟字段 */
        physical_card_number?:string
        id?:number
        /** 男女 0 = 男 1 = 女 */
        sex:number
        /** 芯片ID */
        code:string 
        /** 是否VIP  
         * @param 0 = 普通手牌
         * @param 1 = VIP手牌
        */
        vip:number
        /** VIP手牌是否绑定用户UID */
        vip_uid:number
        /** VIP手牌绑定用户后 - 开始时间戳 */
        vip_start:number
        /**  VIP手牌绑定用户后 - 结束时间戳 */
        vip_end:number
        /** 手牌编号 - 改为字符串 */
        number:string
        /** 加入时间 */
        time:number
        /** 
         * 鞋柜当前状态
         * 0 = 空闲
         * 1 = 使用中
         */
        status:number
        /** 关联用户开牌后的使用ID */
        use_id:number
        /** 关联大厅ID 正在绑定的大厅ID */
        hid?:number
        /** 门店ID */
        sid:number
        /** 是否外卖手牌 - 外卖手牌不统计人数 */
        is_wm?:number
        /**  ----------------- 抽象字段 ---------------- */
        /** 绑定VIP用户昵称 */
        nickname?:string
        /** 绑定VIP用户头像 */
        avatar?:string
        /** 绑定用户手机号码 */
        phone?:string
        /** 设置VIP会员过期时间的缓存变量 单位天 */
        day?:number
        /** 关联Hall大厅的UID */
        uid?:number
        /** 关联Hall ID */
        hid?:number
        /** 当前鞋柜正在使用的用户昵称 */
        u2_nickname?:string        
        /** 当前鞋柜正在使用的用户电话 */
        u2_phone?:string
        /** 当前鞋柜正在使用的用户头像 */
        u2_avatar?:string
        /** 关联Hall大厅的是否游客 */
        is_guest?:number
        /** 可能存在的游客号码 */
        guest_number?:number
        /** 关联hall大厅订单表 订单金额 */
        price?:number

    }
    /** 门店专用余额表 */
    interface kxyk_mch_store_money
    {
        id?:number
        /** 用户Uid */
        uid:number
        /** 门店ID */
        sid:number
        /** 专用余额 */
        money:number
        /** 操作管理员ID */
        s_uid:number
        /** 当前门店VIP等级 */
        vip:number
        /** 扩展链表字段 - vip名称 */
        vip_name?:string
        /** 扩展链表字段 - 门店名称 */
        name?:string
        /** 扩展链表字段 - 商圈ID */
        cid?:number
        /** 扩展链表字段 - 用户昵称 */
        nickname?:string
        /** 扩展链表字段 - 商圈ID */
        is_jump?:number
        
    }
    /** 商圈身份共享表 共享身份给其他用户 */
    interface kxyk_circle_shared_role
    {
        id?:number
        /** 商圈ID */
        cid:number
        /** 门店ID */
        sid:number
        /** 用户UID */
        uid:number
        /** 共享用户ID */
        s_uid:number
        /** 是否共享余额 */
        is_money:number
        /** 是否共享卡券 */
        is_coupon:number 
        /** 是否共享门店专用余额 */
        is_s_money:number
        /** 是否共享身份 */
        is_role?:number
        /** 添加时间 */
        time:number 
    }


    /** 商圈下门店用户留言互动消息表 */
    interface kxyk_circle_msg{
        id?:number
        /** 消息所属商圈CID */
        cid:number
        /** 消息所属门店SID */
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
        /** 消息文本 */
        msg:string
        /** 消息附带图片地址数组 */
        imgs?:string | string[]
        /** 消息是否已读 1 = 已读 */
        is_read:number
        /** 店员是否阅读 */
        d1_read:number
        /** 阅读本条的店员ID */
        d1_read_clerk_id:number
        /** 商圈是否阅读 */
        c1_read:number
        /** 消息发送时间戳 */
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
        /** 发送消息的员工ID 非私聊时记录发送员工ID */
        send_clerk_id?:number
    }
    /** 门店订单投诉表 */
    interface kxyk_mch_store_order_detall_complaint{
        id?:number
        /** 关联订单详情表ID */
        odid:number
        /** 
         * 数据类型
         * 0 = 用户投诉门店
         * 1 = 门店回复用户
         * 2 = 商圈回复用户
         */
        type:number
        /** 发送本条数据UID */
        uid:number
        /** 消息内容 */
        msg:string
        /** 消息图片地址数组 */
        imgs:string | string[]
        /** 时间戳 */
        time:number
        /** 处理完成时间戳 */
        end_time:number
        /** 点击完成处理的员工ID */
        clerk_id?:number
    }
    /** 商圈用户标签表 */
    interface kxyk_circle_member_tags{
        id?:number
        /** 商圈ID */
        cid:number
        /** 标签字符 */
        str:string
        /** 添加员工Uid */
        add_uid:number
        /** 用户ID */
        uid:number
    }
    /** 商圈充值规则表 */
    interface kxyk_circle_recharge_rule{
        id?:number
        /** 充值金额 */
        price:number
        /** 商圈ID */
        cid:number
        /** 赠送金额 */
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
        /** 赠送会员时的会员ID */
        vip:number
    }
    /** 商圈结算表 */
    interface kxyk_circle_finance
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
         * @param 17 = 洗浴系统用户微信付款购买时的微信收款日志
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
		/** 本条数据是收益还是应缴 
         * @param 0 = 商圈支出 
         * @param 1 = 商圈收益
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
		/** 文字说明 */
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
    /** kxyk_circle_finance_ns 门店结算日志表 */
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
        /** 商圈ID */
        cid:number
        /** 申请结算相关方ID */
        sid:number
        /** 申请时间戳 */
        t1:number
        /** 结算金额 */
        price:number
        /**申请结算的操作人UID */
        t_uid:number
        /** 完成结算时间 */
        t2:number
        /** 完成结算 - 通过结算的商圈管理UID */
        s_uid:number
    }
    /** kxyk_mch_role_e2e3_auth_config 股东大客户佣金详细配置表 */
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
        /** 商圈ID */
        cid:number
        /** 门店ID */
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
        /** 商圈合作伙伴ID 投资股东ID 大客户ID 关联kxyk_mch_role_info */
        role_id:number
        /** 
         * 佣金模式
         * 0 = 默认 - 读取上级配置
         * 1 = 关闭分佣
         * 2 = 自定义分佣
         */
        mode:number
        /** 自定义分佣金额或者百分比 - 支持2位小数点 */
        mode_number:number
        /** 佣金类型 0 = % 1 = ￥ */
        mode_type:number
        /** 支持附加属性 */
        [x:string]:any
    }
    /** 开薪怡客系统身份类型表 */
    interface kxyk_mch_role{
        id:number
        /** 身份名称 */
        name:string
        /** 身份归属 A1 C1 B1等，属于哪个身份的下级 */
        belonging:string
        /** 身份排序  */
        sort:number
        /** 身份逻辑标识符 A1 B1 C1等 */
        mark:string
    }
    /** kxyk_mch_role_e2e3_auth 投资股东、大客户E2E3权限表 */
    interface kxyk_mch_role_e2e3_auth{
        id:number
        /** 角色ID E2 E3身份 关联 kxyk_mch_role_info */
        role_id:number
        /** 
         * 数据类型 0 = 投资股东 1 = 大客户 2 = 发会员
         * @param 0 = 投资股东配置门店商品佣金
         * @param 1 = 大客户发卡配置
         * @param 2 = 大客户发放会员配置
         * @param 3 = E1下级会员门店分佣配置 
         */
        type:number
        /** 关联类型ID type=0时是门店ID type=1时是商圈ID*/
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
        /** 收益保底结算周期0=月 1 = 年 */
        e_type:number
        /** 最低保证分红金额 - 支持2位小数 */
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
        /** 加入时间戳 */
        time:number
        /** 绑定需要手动处理的商品配置列表 E2 */
        on_list?:sm.StoreGoodsPrices[]
        /** 绑定需要手动处理的卡包配置列表 */
        on_list_e3?:sm.CouponPack[]
        /** 需要手动处理的会员配置 */
        on_list_e4?:tb.kxyk_mch_type_vips[]
        /** 前端用于解析已选商品或服务 */
        config?:tb.kxyk_mch_role_e2e3_auth_config[]
        /** 充值规则列表 */
        ruels?:any[]

    }
    /**
     * kxyk_mch_store 商圈门店表  pay_number
     */
    interface kxyk_mch_store{
        id:number,
        /** Platform settlement ratio 平台余额结算比例 */
        PSR?:number
        /** 未付款警告 大于该值未付款的会闪烁 */
        unpaid_reminder?:number
        /** 门店名称 */
        name:string
        /** 门店副标题 */
        name2?:string
        /** 门店头图 */
        img:string
        /** 门店详细地址 */
        address:string
        /** 是否显示老会员卡和吧台微信收款 */
        is_expand_pay?:number
        /** 手动注册会员卡会员时添加的商圈+门店前缀 这里是合并过商圈的前缀 */
        vip_prefix?:string 
        /** 门店纬度 */
        lat:string
        /** 门店经度 */
        lng:string
        /** 门店营业开始时间 */
        operate_start:string
        /** 门店营业结束时间 */
        operate_end:string
        /**
         *  门店营业状态
         *  0 = 暂停营业
         *  1 = 正常营业
         *  2 = 门店维护
         */
        status:number
        /** 停止营业说明 */
        status_msg?:string
        /** 门店联系电话 */
        phone:string
        /** 添加门店的管理UID */
        add_uid:number
        /** 
         * 门店内部图片和营业执照等图片列表
         */
        license?:string | []
        /** 营业范围 */
        n1?:string
        /** 门店数据采集字段 关联 kxyk_circle_field_config 表 */
        fields?:string | number[]
        /** 门店添加时间戳 */
        add_time:number
        /** 所属商圈或者上级角色ID */
        cid:number
        /** 门店分类 - 关联kxyk_mch_store_types */
        type:number
        /** 门店和商圈之间的结算比例 % -支持小数点 */
        scale:number
        /** 用户完成服务多长时间自动清理内存 单位分钟 */
        user_end_expire:number
        /** 用户排队到号后延时多少分钟重新排号 单位分钟 */
        user_queue_expire:number
        /** 门店是否自营 */
        is_own?:number
        /** 排队到号提前通知人数 */
        user_queue_notice:number
        /** 门店绑定的打印机中转服务器硬件ID */
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
        /** 进店必买的ID列表字符串 - 逗号分割 */
        must_buy_ids?:string | string[]
        /** 进店必买JSON列表 - 最多存储64k */
        must_buy_list?:string | sm.Pd1.ShopMustBuy[]
        /**
         * 商品和服务价格列表 - 前端用
         */
        goods:false | sm.StoreGoodsPrices[]

        /** 门店是否允许重置余额 */
        is_to_yue?:number
        /**
         * 洗浴购物车组件 门店商品列表
         */
        shopping_cart_goods?:sm.store_goods[]
        /** 人均消费 */
        rjxf:number 
        /** 
         * 收款模式
         * @count  0 = 服务商模式
         * @count  1 = 独立收款
         */
        pay_type?:number
        /** 微信收款商户号码 */
        pay_number?:string
        /** 独立收款商户号码 */
        pay_number2?:string
        /** 门店授信额度 */
        sxed?:number
        /** 门店信值授信额度 */
        sxed1?:number
        /** 是否开启小程序下单弹出授权窗口 */
        is_notice?:number
        /** 小程序订阅消息时是否全部消息必须订阅成功才能继续 */
        notice_all?:number
        /** 定位计算误差范围 单位米 */
        range_m?:number
        /** 是否开启过夜费 */
        is_overnight_fee?:number
        /**
         * 配置的过夜费自动添加的商品或服务ID组以逗号分割 商品G122,服务I222
         */
        overnight_fee_ids?:string | string[]
        /** 过夜费超时时间 */
        overnight_t0?:string

        /** ------------------ 前端使用 ------------------- */
        /** 关注门店的总人数 */
        FollowCount?:number
        /** 用户是否关注门店 0 = 未关注 1 = 已关注 */
        is_follow?:number
        /** 目标距离 单位是米 */
        distance?:number
        /** 是否关注门店 */
        is_follow?:number
        /** 虚拟字段所属公司cpID */
        cpid?:number
        /** 用户在本店未读消息数量 - 虚拟字段 - 用户端UI使用 */
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
        /** 开牌自动下单必买 */
        is_must_buy_auto_order?:number
        /** 商品销售提成 */
        bonus?:number
        /** 扩展所有 */
        [x:string]:any
    }
    /**
     * kxyk_mch_role_info 开薪怡客角色管理表
     */
    interface kxyk_mch_role_info{
        id?:number,
        /** 公司ID */
        cp_id:number
        /** 添加本身份的上级操作用户UID */
        add_uid:number
        /** 
         * 区域识别码 
         * all = 全国
         * area = 区域 关联kxyk_mch_role_info_region - role_info_id
         */
        region:'all' | 'area' | string[]
        /** 姓名 */
        name:string
        /** 商圈名称 */
        circle_name?:string
        /** 手机号码 */
        phone:string
        /** 上级角色ID 所属上级身份ID */
        root_role_id:number
        /** 身份证号码 */
        card_id:string
        /** 身份ID - 关联kxyk_mch_role C1 D1 E1 F1 */
        role_id:number
        /** 所属行业ID */
        type_id:number
        /** 用户UID */
        uid:number
        /** 是否开通投资股东权限 */
        is_E2:number
        /** 投资收益结算方式 0 = 不结算 1 = 结算到余额 */
        E2_income?:number
        /** 是否开通大客户卖卡权限 */
        is_E3:number
        /** 发卡收益结算方式 0 = 不结算 1 = 结算到余额 */
        E3_income?:number
        /** 是否开通大客户会员相关权限 */
        is_E4?:number
        /** 开通会员收益结算方式 0 = 不结算 1 = 结算到余额 */
        E4_income?:number
        /** 下级会员佣金结算方式 0 = 不结算 1 = 结算到余额 */
        E5_income?:number
        /** 添加时间 unx时间戳 */
        time:number
        /** 是否被选择 - 前端使用 */
        is_select?:boolean
        /** 是否拥有下级数据 - 前端使用 */
        is_sub_role?:boolean
        /** 下级角色数据 */
        sub_role?:any
        /** 投资股东 - 投资门店列表 */
        E2_list?:any
        /** 下级门店分佣配置 */
        E5_list?:any
        /** 大客户相关数据 */
        E3_list?:sm.CouponPack[]
        /** 大客户会员配置列表 */
        E4_list?:tb.kxyk_mch_role_e2e3_auth_config[]
        /** 合伙人余额 */
        money:number
        /** 合伙人总充值金额 */
        r_money:number
        /** 合伙人总增额 */
        give_money:number
        /** 合伙人授权金额 */
        money_auth:number
        /** 合伙人商城支付模式 */
        pay_mode:string
        /** E1下级关系维持时间 单位天 */
        lower_level_time?:number
        /** 合伙人充值规则 */
        ruels?:string | any[]
        /** 商圈默认收款微信商户号码 */
        store_number?:string
        /** 商圈默认收款微信商户名称 */
        store_name?:string
        [x:string]:any
    }
    /**
     * kxyk_circle_member 商圈会员表
     */
    interface kxyk_circle_member
    {
        /** ID */
        id?:number
        /** 用户UID */
        uid:number
        /** 商圈ID */
        cid:number
        /** 用户商圈内通用余额 */
        money:number
        /** VIP等级ID 关联 kxyk_circle_member_vip */
        vip:number
        /** 加入商圈会员时间 - 字符串 */
        time:string
        /** 会员分类ID */
        classify:number
        /** 用户在当前商圈的总充值金额 */
        r_money:number
        /** 是否迁移了VIP */
        is_move_vip?:number
        /** VIP迁移到哪个门店了 */
        move_vip_store?:number
        /** 银行卡号 字符串 */
        bank_number?:string
        /** 赠额总额 */
        give_money?:number
        /** 用户车辆照片 - 管理员上传 */
        car_photo?:string
        /** 用户职业 */
        job?:string
        /** 完善用户资料的员工UID */
        is_add_info_uid?:number
        /** 关联显示其他表数据 */
        /** 用户昵称 关联user表 */
        nickname?:string
        /** 用户头像 关联user表 */
        avatar?:string
        /** 用户手机 关联user表 */
        phone?:string
        /** 公司ID 关联 info */
        cp_id?:number
        /** 行业ID */
        type_id?:number

    }
    /**
     * kxyk_mch_coupon_activity 
     * 购卡活动表
    */
    interface kxyk_mch_coupon_activity{
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
    /** 
     * kxyk_mch_coupon_activity_user
     * 购买申领购卡活动的用户表
     */
    interface kxyk_mch_coupon_activity_user 
    {
        /** id */
        id?:number
        /** 
         * 活动或卡包ID 关联s_role
         * s_role = d1 为活动ID
         * s_role = e1 为合伙人售卡卡包ID 
         */
        aid:number
        /** 购买活动的用户UID */
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
        /** 活动地址溯源身份识别 c1 c2 d1 d2 e1 e2 */
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
        /** 手工处理本条购买数据的员工UID 可能是所有有权限的管理UID */
        staff_id:number,
        /** 用户购买的卡券是否发放 */
        is_give:number,
        /** 用户购买或申领事件 */
        t1:number,
        /** 员工处理日期 */
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
        /** 支付金额 */
        pay_price:number,
        /** 补交金额 */
        add_pay:number,
        /** 最总发放的卡券ID列表 */
        give_coupons?:string | number[]
        /** 拒绝理由 */
        err_msg:string
        /** 活动售价 关联活动表 */
        price?:number
        /** 用户车牌列表 - 用于前端显示 */
        car_list?:sm.UserCarMember[]
        /** 是否补交差价 */
        is_premium?:number
        /** 补交差价的金额 */
        premium?:number
        /** 活动标题 前端显示 */
        title?:string
        /** 用于前端显示 */
        /** 活动内置的卡券列表 */
        couponsList?:sm.CouponUser[]
        /** 活动所属商圈ID */
        cid?:number
        /** 支持的支付模式*/
        pay_mode?:string[]
        /** 扩展显示用户银行卡号 前端UI */
        bank_number?:string
    }
}

type TabNameAll = keyof typeof tb;