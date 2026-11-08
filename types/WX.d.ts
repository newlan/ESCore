

/**
 * 后端门店相关参数约束集合
 */
declare namespace sm.WX
{

    /** 排队到号提醒模板 */
    interface Template_Queue_Number {
        /** 排队到号提醒模板 */
        template_id: "J5cpcbpAsWQ-6xNnOo6O_68J81w9xf45vkJFKinc_CM";
        data: {
            /** 排队站点 */
            thing1:{
                value:string
            },
            /** 还需等待人数 */
            number4:{
                value:string
            },
            /** 您的排号 */
            character_string7:{
                value:string
            },
            /** 温馨提示 */
            thing5:{
                value:string
            }
        };
    }
    /** 优惠券到账提醒模板 */
    interface Template_Coupon_Received {
        /** 优惠券到账提醒模板 */
        template_id: "z9kdpGyYR01kwJZgq7PMMHLipCr5Sl8w_re3Omf18K4";
        data: {
            /** 卡券名称 */
            thing1:{
                value:string
            },
            /** 卡券类型 */
            phrase2:{
                value:string
            },
            /** 卡券获取时间 */
            time3:{
                value:string
            },
            /** 卡券过期时间 */
            time4:{
                value:string
            },
            /** 备注 */
            time5:{
                value:string
            },

        };
    }
    // 所有模板的联合类型
    type TemplateUnion = Template_Queue_Number | Template_Coupon_Received;
    interface SendTemplateMessageBase {
        /** 用户OPENID */
        touser: string;
        /** 跳转页面 */
        page?: string;
        /** 跳转的小程序状态 */
        miniprogram_state?: "developer" | "trial" | "formal";
        /** 语言 */
        lang?: "zh_CN" | "en_US" | "zh_HK" | "zh_TW";
    }
    /** 发送模板消息时的body参数 */
    type TemplateBody = SendTemplateMessageBase & TemplateUnion

    /** 合单数量超过50 重新合并订单参数set 用来去重收款商户 */
    interface CombineOrderPar1{
        /** 收款商户号码 */
        pay_number:string 
        /**
         *  待付款金额
         *  @property 相同收款商户累加待支付金额
         */
        wait_pay_price:number
        /** 
         * 微信支付商户内部唯一订单号码
         * @property 相同商户号码共用一个ID 用于后续图库
         */
        out_trade_no:string
        /** 收款商品描述 */
        description:string[]

    }
    /** 微信退款回调参数约定 */
    interface RefundBack
    {
        /** 
         * 通知的唯一ID。 必填 string(36) 
         */
        id:string
        /** 
         * 通知创建的时间 必填 string(32)
         * @property 遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日13点29分35秒。
         */
        create_time:string

        /** 
         * 通知的类型 必填 string(32)
         * @param REFUND.SUCCESS 退款成功通知
         * @param REFUND.ABNORMAL 退款异常通知
         * @param REFUND.CLOSED 退款关闭通知 
         */
        event_type:string
        /** 
         * 
         * 通知简要说明 必填 string(62)
         * @property 退款成功
         */
        summary:string
        /** 
         * 通知的资源数据类型 必填 string(32)
         * @property 退款成功通知为encrypt-resource
         */
        resource_type:string
        /** 
         * 通知资源数据 需要解密
         * @property 这里是已经解密后的对象
         */
        resource:{
            /** 
             * 微信支付分配给电商平台的商户号 必填 string(32)
             */
            sp_mchid:string
            /** 
             * 微信支付分配给二级商户的商户号 必填 string(32)
             */
            sub_mchi:string
            
            /** 
             * 返回的商户订单号 必填 string(32)
             */
            out_trade_no:string

            /** 
             * 微信支付订单号 必填 string(32)
             */
            transaction_id:string

            /** 
             * 商户退款单号 必填 string(32)
             */
            out_refund_no:string

            /** 
             * 微信退款单号 必填 string(32)
             */
            refund_id:string

            /** 
             * 退款状态，枚举值 必填 string(32)
             * @param SUCCESS：退款成功
             * @param CLOSE：退款关闭
             * @param ABNORMAL：退款异常，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，可前往【服务商平台—>交易中心】，手动处理此笔退款
             */
            refund_status:string

            /** 
             * 退款状态，枚举值 必填 string(32)
             * @property 1、退款成功时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE
             * @property 2、当退款状态为退款成功时返回此参数。
             */
            refund_status?:string

            /** 
             * 取当前退款单的退款入账方。 必填 string(64)
             * @const 退回银行卡：{银行名称}{卡类型}{卡尾号}
             * @const 退回支付用户零钱: 支付用户零钱
             * @const 退还商户: 商户基本账户、商户结算银行账户
             * @const 退回支付用户零钱通：支付用户零钱通
             * @const 退回用户经营账户：用户经营账户
             * @const 退回支付用户银行电子账户：支付用户银行电子账户
             * @const 退回支付用户零花钱：支付用户零花钱
             * @const 退回支付用户来华零钱包：支付用户来华零钱包
             * @const 退回企业支付商户：企业支付商户
             */
            user_received_account:string

            /** 
             * 金额信息 必填 object
             */
            amount:{
                /** 订单总金额，单位为分，只能为整数，详见支付金额 */
                total:number 
                /** 退款金额，币种的最小单位，只能为整数，不能超过原订单支付金额，如果有使用券，后台会按比例退 */
                refund:number 
                /** 用户实际支付金额，单位为分，只能为整数，详见支付金额 */
                payer_total:number 
                /** 退款给用户的金额，不包含所有优惠券金额 */
                payer_refund:number 
            }

            /** 
             * 电商平台垫资退款专用参数。选填 string(32)
             * @property 需先确认已开通此功能后，才能使用。若需要开通，请联系微信支付客服。
             * @param REFUND_SOURCE_PARTNER_ADVANCE 电商平台垫付，需要向微信支付申请开通
             * @param REFUND_SOURCE_SUB_MERCHANT   二级商户，默认值
             * @property 注意：若传入REFUND_SOURCE_PARTNER_ADVANCE，仅代表可以使用垫付退款，实际出款账户需以退款申请受理结果或查单结果为准。
             */
            refund_account?:string

        }
    }
    /** 微信合并下单支付回调参数约定 */
    interface CombinePayBack{
        /** 
         * 通知的唯一ID。 必填 string(36) 
         */
        id:string
        
        /** 
         * 通知创建的时间 必填 string(32)
         * @property 遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日13点29分35秒。
         */
        create_time:string

        /** 
         * 通知的类型 必填 string(32)
         * @property 支付成功通知的类型为TRANSACTION.SUCCESS。
         */
        event_type:string

        /** 
         * 通知的资源数据类型 必填 string(32)
         * @property 支付成功通知为encrypt-resource。
         */
        resource_type:string
        /** 
         * 
         * 回调摘要 必填 string(62)
         * @property 回调摘要
         */
        summary:string

        /** 
         * 通知资源数据 需要解密
         * @property 这里是已经解密后的对象
         */
        resource:{
            
            /** 
             * 合单发起方的AppID 必填 string(32)
             */
            combine_appid:string

            /** 
             * 合单发起方商户号 必填 string(32)
             */
            combine_mchid:string

            /** 
             * 合单支付总订单号，要求32个字符内，只能是数字、大小写字母_- 必填 string(32)
             */
            combine_out_trade_no:string

            /** 
             * 支付场景信息描述 选填 object
             */
            scene_info?:{
                /** 终端设备号（门店号或收银设备ID） 必填 string(16) */
                device_id?:string
            }

            /** 
             * 支付者信息 必填 object
             */
            combine_payer_info:{
                /** 
                 * 使用合单AppID获取的对应用户OpenID。是用户在商户AppID下的唯一标识。获取用户OpenID指引
                 * @property https://pay.weixin.qq.com/doc/v3/partner/4012081935#OpenID
                 */
                openid:string
            }

            /** 
             * 子单列表 必填 array
             */
            sub_orders:{
                /** 
                 * 子单发起方商户号 必填 string(32)
                 * @property 必须与发起方AppID有绑定关系。
                 */
                mchid:string
                /** 
                 * 支付类型 枚举 必填 string(16)
                 * @const NATIVE 扫码支付
                 * @const JSAPI 公众号支付
                 * @const App App支付
                 * @const MWEB H5支付
                 */
                trade_type:"NATIVE"|"JSAPI"|"APP"|"MWEB"
                /** 
                 * 支付状态 枚举 必填 string(32)
                 * @const SUCCESS 支付成功
                 * @const REFUND 支付失败
                 * @const NOTPAY 未支付
                 * @const CLOSED 已关闭 
                 * @const REVOKED 已撤销 
                 * @const USERPAYING 用户支付中 
                 * @const PAYERROR 支付失败
                 */
                trade_state:"SUCCESS"|"REFUND"|"NOTPAY"|"CLOSED"|"REVOKED"|"USERPAYING"|"PAYERROR"

                /** 
                 * 银行类型 必填 string(32)
                 * @property 采用字符串类型的银行标识。银行标识请参考《银行类型对照表》
                 * @property https://pay.weixin.qq.com/doc/v3/partner/4012082814
                 */
                bank_type:string
                /** 
                 * 附加数据 必填 string(128)
                 * @property 在查询API和支付通知中原样返回，可作为自定义参数使用。
                 */
                attach:string

                /** 
                 * 订单支付时间  必填 string(32)
                 * @property 遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss:sss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss:sss表示时分秒毫秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC 8小时，即北京时间）。例如：2015-05-20T13:29:35.120+08:00表示，北京时间2015年5月20日 13点29分35秒。
                 */
                success_time:string

                /** 
                 * 微信支付订单号 必填 string(32)
                 */
                transaction_id:string

                /** 
                 * 商户系统内部订单号 必填 string(32)
                 * @property 要求32个字符内，只能是数字、大小写字母_-
                 */
                out_trade_no:string

                /** 
                 * 二级商户商户号 必填 string(32)
                 * @property 服务商子商户的商户号，被合单方。直连商户不用传二级商户号。
                 */
                sub_mchid:string

                /** 
                 * 服务商模式下 选填 string(32)
                 * @property 服务商模式下，sub_mchid对应的sub_appid
                 */
                sub_appid?:string

                /** 
                 * 订单金额信息 必填 object
                 */
                amount:{
                    /** 子单金额，单位为分 必填 int */
                    total_amount:number
                    /** 符合ISO 4217标准的三位字母代码，人民币：CNY。 必填 string(16) */
                    currency:string
                    /** 订单现金支付金额。 必填 int64 */
                    payer_amount:number
                    /** 
                     * 货币类型 必填 string(8)
                     * @property 符合ISO 4217标准的三位字母代码，默认人民币：CNY。
                     */
                    payer_currency:string
                    /** 
                     * 结算汇率 选填 int
                     * @property 结算汇率，即标价币种和结算币种的汇率，例如，美元（USD）与人民币（CNY）之间的汇率为6.5，则汇率值为650000000（汇率值是汇率乘以10的8次方），标价币种和结算币种不一致时才返回
                     */
                    settlement_rate?:string
                }
                /** 
                 * 优惠功能，享受优惠时返回该字段  选填 array
                 */
                promotion_detail?:{
                    /** 券ID 必填 string(32) */
                    coupon_id:string
                    /** 优惠名称。 选填 string(64) */
                    name?:string
                    /** 
                     * 优惠类型 选填 string(32)
                     * @const GLOBAL 全场代金券
                     * @const SINGLE 单品优惠
                     */
                    scope?:"GLOBAL"|"SINGLE"
                    /** 
                     * type 选填 string(32)
                     * @const CASH：充值型代金券 
                     * @const NOCASH：免充值型代金券
                     */
                    type?:"CASH"|"NOCASH"

                    /** 
                     * 当前子单中享受的优惠券金额 必填 int
                     */
                    amount:number

                    /** 活动ID，批次ID 选填 string(32) */
                    stock_id?:string

                    /** 微信出资，单位为分。选填 int */
                    wechatpay_contribute?:int

                    /** 商户出资，单位为分。 选填 int */
                    merchant_contribute?:string

                    /** 其他出资，单位为分。 选填 int */
                    other_contribute?:string

                    /** CNY：人民币，境内商户号仅支持人民币。 选填 string(32) */
                    currency?:string

                    /** 单品列表信息 选填 array */
                    goods_detail?:{
                        /** 商品编码。 必填 string(32) */
                        gods_id:string
                        /** 商品数量 必填 int */
                        quantity:string
                        /** 商品单价，单位为分。 必填 int */
                        unit_price:string
                        /** 商品优惠金额。 必填 int */
                        discount_amount:string
                        /** 商品备注信息 选填 string(128) */
                        goods_remark:string
                    }[]

                }[]
            }[]
        }

    }
    /** 微信验证银行账户汇款信息 */
    interface AccountValidation
    {
        /** 
         * 【付款户名】
         * @property 需商户使用该户名的账户进行汇款。
         * @property 该字段需进行解密处理，解密方法详见如何使用API证书解密敏感字段。
         * @property https://pay.weixin.qq.com/doc/v3/partner/4013059060
         */
        account_name:string
        /** 解密后的付款户名 */
        account_name_decrypt?:string

        /** 
         * 【付款卡号】
         * @property 结算账户为对私时会返回，商户需使用该付款卡号进行汇款。
         * @property 该字段需进行解密处理，解密方法详见如何使用API证书解密敏感字段。
         * @property https://pay.weixin.qq.com/doc/v3/partner/4013059060
         */
        account_no:string
        /** 解密后的付款卡号 */
        account_no_decrypt?:string

        /** 
         * 【汇款金额】
         * @property 需要汇款的金额(单位：分)。
         */
        pay_amount:number

        /** 
         * 【收款卡号】
         * @property 收款账户的卡号
         */
        destination_account_number:string

        /** 
         * 【收款户名】
         * @property 收款账户名
         */
        destination_account_name:string

        /** 
         * 【开户银行】
         * @property 收款账户的开户银行名称。
         */
        destination_account_bank:string

        /** 
         * 【省市信息】
         * @property 收款账户的省市。
         */
        city:string

        /** 
         * 【备注信息】
         * @property 商户汇款时，需要填写的备注信息。
         */
        remark:string

        /** 
         * 【汇款截止时间】
         * @property 请在此时间前完成汇款。
         */
        deadline:string


    }
    /**
	 *  二级商户审核状态 手动查询
	 */
	interface RequestStatus{
		/** 
		 * 【申请状态】枚举值：
		 * @param CHECKING：资料校验中
		 * @param ACCOUNT_NEED_VERIFY：待账户验证
		 * @param AUDITING：审核中
		 * @param REJECTED：已驳回
		 * @param NEED_SIGN：待签约
		 * @param FINISH：完成
		 * @param FROZEN：已冻结
		 * @param CANCELED：已作废
		 */
		applyment_state:"CHECKING"|"ACCOUNT_NEED_VERIFY"|"AUDITING"|"REJECTED"|"NEED_SIGN"|"FINISH"|"FROZEN"|"CANCELED"

		/** 【申请状态描述】申请状态描述, 示例："审核中" */
		applyment_state_desc:string

		/** 
		 * 【签约链接】
		 * @property 1、当申请状态为NEED_SIGN时才返回。
		 * @property 2、建议将链接转为二维码展示，需让申请单-管理者用微信扫码打开，完成签约。
		 */
		sign_url?:string

		/** 
		 * 【电商平台二级商户号】
		 * @property 当申请状态为NEED_SIGN或FINISH时才返回。
		 */
		sub_mchid?:string

		/** 
		 * 【汇款账户验证信息】
		 */
		account_validation?:AccountValidation

		/** 
		 * 【驳回原因详情】
         * @property 各项资料的审核情况。当申请状态为REJECTED或 FROZEN时才返回。
		 */
		audit_detail?:{
            /** 【参数名称】提交申请单的资料项名称。 */
            param_name:string
            /** 【驳回原因】提交资料项被驳回原因。 */
            reject_reason:string
        }[]

        /** 
         * 【法人验证链接】
         * @property 1、当申请状态为ACCOUNT_NEED_VERIFY，且通过系统校验的申请单，将返回链接。
         * @property 2、建议将链接转为二维码展示，让商户法人用微信扫码打开，完成账户验证。
         */
        legal_validation_url?:string

        /** 
         * 【业务申请编号】
         * @property 提交接口填写的业务申请编号
         */
        out_request_no:string

        /** 
         * 【微信支付申请单号】
         * @property 微信支付分配的申请单号
         */
        applyment_id:string

        /** 
         * 【签约状态】
         * @property 1、未签约-UNSIGNED：该状态下，电商平台可查询获取签约链接，引导二级商户的超级管理员完成签约；
         * @property 2、已签约-SIGNED ：指二级商户的超级管理员已完成签约。注意：若申请单被驳回，商户修改了商户主体名称、法人名称、超级管理员信息、主体类型等信息，则需重新签约。
         * @property 3、不可签约-NOT_SIGNABLE：该状态下，暂不支持超级管理员签约。一般为申请单处于已驳回、已冻结、机器校验中状态，无法签约。
         */
        sign_state?:string
	}
    /** 微信二级商户对公对私银行数据列表 */
    export interface BanksList
    {
        /** 
         * 银行别名 必填 string(128)
         * @property 用于在前端展示全量银行名称供用户选择，如工商银行、深圳前海微众银行等共计4000多家银行的别名名称
         */
        bank_alias:string
        /** 
         * 银行别名编码 必填 string(32)
         * @property 银行别名的编码，银行别名编码用于在查询支行列表接口检索获取支行列表（仅开户银行为其他银行时需要查询支行）
         */
        bank_alias_code:string
        /** 
         * 开户银行必填 string(128)
         * @property 开户银行名称，用于在入驻、修改结算银行卡、企业付款等场景中填写所用银行卡对应的开户银行，其中非直连银行统一为其他银行。
         */
        account_bank:string
        /** 
         * 开户银行编码 必填 integer
         * @property 开户银行的编码，用于在入驻、修改结算银行卡、企业付款等场景中填写所用银行卡对应的开户银行，其中非直连银行统一为 1099。
         */
        account_bank_code:string
        /** 
         * 是否需要填写支行 必填 boolean
         * @property 该开户银行是否需要传入对应的支行，需要请使用银行别名编码和城市编码查询选择具体的支行并传入（默认值为true），如需查询城市编码，需要通过查询城市列表接口获取相应的城市编码信息。
         */
        need_bank_branch:boolean
    }
    /** 微信二级商户最终受益人列表单项 */
    export interface UboInfoList
    {
        /** 
         * 【证件类型】选填 string
         * @property 请填写受益人的证件类型。
         * @const IDENTIFICATION_TYPE_MAINLAND_IDCARD 中国大陆居民-身份证
         * @const IDENTIFICATION_TYPE_OVERSEA_PASSPORT 其他国家或地区居民-护照
         * @const IDENTIFICATION_TYPE_HONGKONG 中国香港居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_MACAO 中国澳门居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_FOREIGN_RESIDENT 外国人居留证
         * @const IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT 港澳居民证
         * @const IDENTIFICATION_TYPE_TAIWAN_RESIDENT 台湾居民证
         */
        ubo_id_doc_type?:"IDENTIFICATION_TYPE_MAINLAND_IDCARD"|"IDENTIFICATION_TYPE_OVERSEA_PASSPORT"|"IDENTIFICATION_TYPE_HONGKONG"|"IDENTIFICATION_TYPE_MACAO"|"IDENTIFICATION_TYPE_FOREIGN_RESIDENT"|"IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT"|"IDENTIFICATION_TYPE_TAIWAN_RESIDENT"
        
        /** 
         * 【证件正面照片】选填 string
         * @property 1、请上传受益人证件的正面照片。
         * @property 2、若证件类型为身份证，请上传人像面照片。
         * @property 3、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 4、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 5、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         */
        ubo_id_doc_copy?:string
        /** 证件正面照片微信media_id */
        ubo_id_doc_copy_media_id?:string

        /** 
         * 【证件反面照片】选填 string
         * @property 1、请上传受益人证件的反面照片。
         * @property 2、若证件类型为身份证，请上传国徽面照片。
         * @property 3、若证件类型为护照，无需上传反面照片。
         * @property 4、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 5、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 6、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         */
        ubo_id_doc_copy_back?:string
        /** 证件反面照片微信media_id */
        ubo_id_doc_copy_back_media_id?:string

        /** 
         * 【证件姓名】选填 string(100)
         * @property 1、长度为2-100个字符
         * @property 2、前后不能有空格、制表符、换行符
         * @property 3、不能仅含数字、特殊字符
         * @property 4、仅能填写数字、英文字母、汉字及特殊字符
         * @property 5、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        ubo_id_doc_name?:string
        /** 证件项目加密 */
        ubo_id_doc_name_encrypt?:string

        /** 
         * 【证件号码】选填 string
         * @property 1、可传身份证、来往内地通行证、来往大陆通行证、护照等证件号码，号码规范如下：
         * @property 身份证（限中国大陆居民)：17位数字+1位数字|X
         * @property 护照（限境外人士）：4-15位 数字|字母|连字符
         * @property 中国香港居民--来往内地通行证：H/h开头+8或10位数字/字母
         * @property 中国澳门居民--来往内地通行证：M/m开头+8或10位数字/字母
         * @property 中国台湾居民--来往大陆通行证：8位数字或10位数字
         * @property 外国人居留证：15位 数字|字母
         * @property 港澳居住证/台湾居住证：17位数字+1位数字|X
         * @property 2、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        ubo_id_doc_number?:string
        /** 证件号码加密 */
        ubo_id_doc_number_encrypt?:string

        /** 
         * 【证件居住地址】选填 string(128)
         * @property 1、请按照身份证住址填写，如广东省深圳市南山区xx路xx号xx室
         * @property 2、长度为4-128个字符
         * @property 3、前后不能有空格、制表符、换行符
         * @property 4、不能仅含数字、特殊字符
         * @property 5、仅能填写数字、英文字母、汉字及特殊字符
         * @property 6、仅支持utf-8格式
         * @property 7、 该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        ubo_id_doc_address?:string 
        /** 证件居住地址加密 */
        ubo_id_doc_address_encrypt?:string

        /** 
         * 【证件有效期开始时间】选填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式
         * @property 2、开始时间不能小于1900-01-01
         * @property 3、开始时间不能大于等于当前日期
         */
        ubo_id_doc_period_begin?:string

        /** 
         * 【证件有效期结束时间】选填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式或长期
         * @property 2、结束时间大于开始时间
         */
        ubo_id_doc_period_end?:string
    
    }

    /** 平台收付通 二级商户进件 营业执照信息 */
    export interface business_license_info
    {
        /** 
         * 【证书类型】选填 string
         * @property 1、主体为“政府机关/事业单位/社会组织”时，请上传登记证书类型。
         * @property 2、主体为“个体工商户/企业”时，不填。
         * @const CERTIFICATE_TYPE_2388 当主体为事业单位时，选择此枚举值, 事业单位法人证书
         * @const CERTIFICATE_TYPE_2389 当主体为政府机关，选择此枚举值：统一社会信用代码证书
         * @const CERTIFICATE_TYPE_2389 当主体为社会组织, 统一社会信用代码证书
         * @const CERTIFICATE_TYPE_2394 当主体为社会组织, 社会团体法人登记证书
         * @const CERTIFICATE_TYPE_2395 当主体为社会组织, 民办非企业单位登记证书
         * @const CERTIFICATE_TYPE_2396 当主体为社会组织, 基金会法人登记证书
         * @const CERTIFICATE_TYPE_2399 当主体为社会组织, 宗教活动场所登记证
         * @const CERTIFICATE_TYPE_2400 当主体为社会组织, 政府部门下发的其他有效证明文件
         * @const CERTIFICATE_TYPE_2520 当主体为社会组织, 执业许可证/执业证
         * @const CERTIFICATE_TYPE_2521 当主体为社会组织, 基层群众性自治组织特别法人统一社会信用代码证
         * @const CERTIFICATE_TYPE_2522 当主体为社会组织, 农村集体经济组织登记证
         */
        cert_type?:""|"CERTIFICATE_TYPE_2388" | "CERTIFICATE_TYPE_2389"|"CERTIFICATE_TYPE_2394"|"CERTIFICATE_TYPE_2395"|"CERTIFICATE_TYPE_2396"|"CERTIFICATE_TYPE_2399"|"CERTIFICATE_TYPE_2400"|"CERTIFICATE_TYPE_2520"|"CERTIFICATE_TYPE_2521"|"CERTIFICATE_TYPE_2522"
        /** 
         * 【营业执照扫描件】必填 string
         * @property 1、主体为“个体工商户/企业”时，请上传营业执照的证件图片。
         * @property 2、主体为“政府机关/事业单位/社会组织”时，请上传登记证书的证件图片。
         * @property 3、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。 https://pay.weixin.qq.com/doc/v3/partner/4012760432
         * @property 4、图片要求：
         * @property （1）请上传证件的彩色扫描件或彩色数码拍摄件，黑白复印件需加盖公章（公章信息需完整） 。
         * @property （2）不得添加无关水印（非微信支付商户申请用途的其他水印）。
         * @property （3）需提供证件的正面拍摄件，完整、照面信息清晰可见。信息不清晰、扭曲、压缩变形、反光、不完整均不接受。
         * @property （4）不接受二次剪裁、翻拍、PS的证件照片。
         */
        business_license_copy:string
       
        /** 营业执照扫描件 预上传MediaID */
        business_license_copy_media_id?:string
        
        /** 
         * 【营业执照注册号】必填 string
         * @property 1、主体为“个体工商户”时，请填写营业执照上的注册号/统一社会信用代码，格式需满足以下任一条件：
         * @property - 15 位数字
         * @property - 18 位阿拉伯数字或大写英文字母（不得包含英文字母I/O/Z/S/V），并且以9开头
         * @property 2、主体为“企业”时，请填写营业执照上的注册号/统一社会信用代码，格式如下：
         * @property - 18 位阿拉伯数字或大写英文字母（不得包含英文字母I/O/Z/S/V），并且以9开头
         */
        business_license_number:string

        /** 
         * 【商户名称】必填 string(128)
         * @property 请填写登记证书上的商户名称
         * @property 1、长度为2-128个字符
         * @property 2、前后不能有空格、制表符、换行符
         * @property 3、不能仅含数字、特殊字符
         * @property 4、仅能填写数字、英文字母、汉字及特殊字符
         * @property 5、仅支持utf-8格式
         * @property 6、个体户证件为以下情况时，按照个体户XXX命名（XXX是营业执照经营人姓名）：营业执照登记名称为空、仅含数字、仅含特殊字符、“无”、“无字号”
         * @property 7、个体户不能使用“企业”“公司”或“农民专业合作社”结尾
         */
        merchant_name:string
        
        /** 
         * 【经营者/法定代表人姓名】必填 string(100)
         * @property 请填写证件的经营者/法定代表人姓名
         * @property 1、长度为2-100个字符
         * @property 2、前后不能有空格、制表符、换行符
         * @property 3、不能仅含特殊字符
         * @property 4、仅能填写数字、英文字母、汉字及特殊字符
         */
        legal_person:string

        /** 
         * 【注册地址】选填 string(128)
         * @property 1、 主体为“政府机关/事业单位/社会组织”时必填，请填写登记证书的注册地址。
         * @property 2、主体为“企业/个体户”时建议填写营业执照的注册地址，若该字段未填写，系统将会查询国家工商信息填入。需注意若工商信息查询不到，则会被审核驳回。
         * @property 3、长度为4-128个字符
         * @property 4、前后不能有空格、制表符、换行符
         * @property 5、不能仅含数字、特殊字符
         * @property 6、仅能填写数字、英文字母、汉字及特殊字符
         * @property 7、仅支持utf-8格式
         */
        company_address?:string

        /** 
         * 【营业期限】选填 string
         * @property 1、主体为“政府机关/事业单位/社会组织”时必填，请填写证件有效期。
         * @property 2、主体为“企业/个体户”时建议填写，若该字段未填写，系统将会查询国家工商信息填入。需注意若工商信息查询不到，则会被审核驳回。
         * @property 3、日期格式应满足合法的YYYY-MM-DD格式。
         * @property 4、开始时间不能小于1900-01-01。
         * @property 5、若证件有效期为长期，请填写：长期。
         * @property 6、开始时间不能大于等于当前日期，结束时间需大于开始时间。
         */
        business_time?:string
    }
    
    /** 平台收付通二级商户进件金融机构许可证信息 */
    export interface finance_institution_info
    {
        /** 
         * 【金融机构类型】必填 string
         * @proprty 金融机构类型需与营业执照/登记证书上一致，可参考选择金融机构指引。https://kf.qq.com/faq/220215IrMRZ3220215n6buiU.html
         * @const BANK_AGENT 适用于商业银行、政策性银行、农村合作银行、村镇银行、开发性金融机构等
         * @const PAYMENT_AGENT 适用于非银行类支付机构
         * @const INSURANCE 适用于保险、保险中介、保险代理、保险经纪等保险类业务
         * @const TRADE_AND_SETTLE 适用于交易所、登记结算类机构、银行卡清算机构、资金清算中心等
         * @const OTHER 适用于财务公司、信托公司、金融资产管理公司、金融租赁公司、汽车金融公司、贷款公司、货币经纪公司、消费金融公司、证券业、金融控股公司、股票、期货、货币兑换、小额贷款公司、金融资产管理、担保公司、商业保理公司、典当行、融资租赁公司、财经咨询等其他金融业务
         */
        finance_type:""|"BANK_AGENT"|"PAYMENT_AGENT"|"INSURANCE"|"TRADE_AND_SETTLE"|"OTHER"

        /** 
         * 【金融机构许可证图片】必填 array
         * @property 1、根据所属金融机构类型的许可证要求提供，详情查看金融机构指引。
         * @property 2、请提供为“申请商家主体”所属的许可证，可授权使用总公司/分公司的特殊资质。
         * @property 3、最多可上传5张照片，请填写通过图片上传API预先上传图片生成好的MediaID。
         * @property 4、图片要求：
         * @property （1）照片应正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS；：
         * @property （2）上传彩色照片、彩色扫描件，复印件需加盖公章鲜章。
         * @property （3）水印仅限于微信支付业务相关。
         */
        finance_license_pics:string[]
        /** 金融机构许可图片微信media_id 数组最多5张 */
        finance_license_pics_media_id?:string[]
    }

    /** 平台收付通二级商户进件经营者/法人身份证信息 */
    export interface id_card_info
    {
        /** 
         * 【身份证人像面照片】必填 string(256)
         * @property 1、请上传个体户经营者/法人的身份证人像面照片
         * @property 2、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 3、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 4、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         */
        id_card_copy:string

        /** 身份证人像面预上传 微信media_id */
        id_card_copy_media_id?:string

        /** 
         * 【身份证国徽面照片】必填 string(256)
         * @property 1、请上传个体户经营者/法定代表人的身份证国徽面照片
         * @property 2、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 3、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 4、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         */
        id_card_national:string

        /** 身份证国徽面预上传 微信media_id */
        id_card_national_media_id?:string
        
        /** 
         * 【身份证姓名】必填 string(100)
         * @property 1、请填写个体户经营者/法定代表人对应身份证的姓名
         * @property 2、长度为2-100个字符
         * @property 3、前后不能有空格、制表符、换行符
         * @property 4、不能仅含数字、特殊字符
         * @property 5、仅能填写数字、英文字母、汉字及特殊字符
         * @property 6、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        id_card_name:string

        /** 身份证姓名加密字段 */
        id_card_name_encrypt?:string

        /** 
         * 【身份证号码】必填 string
         * @property 1、请填写经营者/法定代表人对应身份证的号码。
         * @property 2、7位数字+1位数字|X，该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        id_card_number:string
        /** 身份证号码加密字段 */
        id_card_number_encrypt?:string

        /** 
         * 【身份证开始时间】必填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式
         * @property 2、开始时间不能小于1900-01-01
         * @property 3、开始时间不能大于等于当前日期
         */
        id_card_valid_time_begin:string

        /** 
         * 【身份证结束时间】必填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式或长期
         * @property 2、结束时间大于开始时间
         */
        id_card_valid_time:string
    }

    /** 平台收付通二级商户进件经营者/法人其他类型证件信息 */
    export interface id_doc_info 
    {
        /** 
         * 【证件姓名】必填 string
         * @property 1、请填写经营者/法定姓名
         * @property 2、长度为2-100个字符
         * @property 3、前后不能有空格、制表符、换行符
         * @property 4、不能仅含数字、特殊字符
         * @property 5、仅能填写数字、英文字母、汉字及特殊字符
         * @property 6、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        id_doc_name:string

        /** 证件姓名加密字段 */
        id_doc_name_encrypt?:string

        /** 
         * 【证件号码】必填 string
         * @property 1、请填写经营者/法定代表人的证件号码。
         * @property 护照（限境外人士）：4-15位 数字|字母|连字符
         * @property 中国香港居民--来往内地通行证：H/h开头+8或10位数字/字母
         * @property 中国澳门居民--来往内地通行证：M/m开头+8或10位数字/字母
         * @property 中国台湾居民--来往大陆通行证：8位数字或10位数字
         * @property 外国人居留证：15位 数字|字母
         * @property 港澳居住证/台湾居住证：17位数字+1位数字|X
         * @property 2、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        id_doc_number:string

        /** 证件号码加密字段 */
        id_doc_number_encrypt?:string

        /** 
         * 【证件正面照片】必填 string(256)
         * @property 1、证件类型不为“身份证”时，上传证件正面照片。
         * @property 2、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         * @property 3、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 4、请上传彩色照片or彩色扫描件or复印件（需加盖公章鲜章），可添加“微信支付”相关水印（如微信支付认证），见【指引文档】。
         */
        id_doc_copy:string

        /** 证件正面照片 微信media_id */
        id_doc_copy_media_id?:string
        
        /** 
         * 【证件反面照片】选填 string(256)
         * @property 1、若证件类型为来往通行证、外国人居留证、港澳居住证、台湾居住证时，上传证件反面照片。
         * @property 2、若证件类型为护照，无需上传反面照片
         * @property 3、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         * @property 4、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS
         * @property 5、请上传彩色照片or彩色扫描件or复印件（需加盖公章鲜章），可添加“微信支付”相关水印（如微信支付认证），见【指引文档】。
         */
        id_doc_copy_back?:string

        /** 证件反面照片 微信media_id */
        id_doc_copy_back_media_id?:string

        /** 
         * 【证件开始日期】必填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式
         * @property 2、开始时间不能小于1900-01-01
         * @property 3、开始时间不能大于等于当前日期
         */
        doc_period_begin:string

        /** 
         * 【证件结束日期】必填 string
         * @property 1、日期格式应满足合法的YYYY-MM-DD格式或长期
         * @property 2、结束时间大于开始时间
         */
        doc_period_end:string
    }

    /** 平台收付通二级商户进件结算银行账号信息 */
    export interface account_info
    {
        /** 
         * 【账户类型】必填 string(2)
         * @property 1、若主体为企业/政府机关/事业单位/社会组织，可填写：74-对公账户。
         * @property 2、主体为小微/个人卖家，可选择：75-对私账户。
         * @property 3、若主体为个体工商户，可填写：74-对公账户、75-对私账户。
         */
        bank_account_type:"74"|"75"

        /** 
         * 【开户银行】必填 string(10) 
         * @property 需要对接微信银行接口 - 前端缓存筛选
         * @property 对私银行调用：查询支持个人业务的银行列表API https://pay.weixin.qq.com/doc/v3/partner/4012697583
         * @property 对公银行调用：查询支持对公业务的银行列表API https://pay.weixin.qq.com/doc/v3/partner/4012697626
         */
        account_bank:string

        /** 
         * 【开户名称】必填 string(128)
         * @property 1、选择经营者个人银行卡时，开户名称必须与身份证姓名一致。
         * @property 2、选择对公账户时，开户名称必须与营业执照上的“商户名称”一致。
         * @property 3、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        account_name:string 
        /** 开户名称加密 */
        account_name_encrypt?:string

        /** 
         * 【开户银行省市编码】选填 string(12)
         * @property 至少精确到市，详细参见省市区编号对照表。https://pay.weixin.qq.com/doc/v3/partner/4012082815
         * @property 注：仅当省市区编号对照表中无对应的省市区编号时，可向上取该银行对应市级编号或省级编号。
         */
        bank_address_code?:string

        /** 
         * 【开户银行联行号】选填 string(64)
         * @property 1、根据开户银行查询接口中的“是否需要填写支行”判断是否需要填写。如为其他银行，开户银行全称（含支行）和开户银行联行号二选一。
         * @property 2、详细需调用查询支行列表API查看查询结果。https://pay.weixin.qq.com/doc/v3/partner/4012697673
         */
        bank_branch_id?:string

        /** 
         * 【开户银行全称 （含支行）】选填 string(128)
         * @property  1、根据开户银行查询接口中的“是否需要填写支行”判断是否需要填写。如为其他银行，开户银行全称（含支行）和开户银行联行号二选一。
         * @property 2、详细需调用查询支行列表API查看查询结果。https://pay.weixin.qq.com/doc/v3/partner/4012697673
         */
        bank_name?:string

        /** 
         * 【银行账号】必填 string(128)
         * @property 1、数字，长度遵循系统支持的对公/对私卡号长度要求表。
         * @property 2、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        account_number:string
        /** 银行账号加密 */
        account_number_encrypt?:string
    }

    /** 平台收付通二级商户进件超级管理员信息 */
    export interface contact_info 
    {
        /** 
         * 【超级管理员类型】必填 string(2)
         * @property 1、主体为“小微/个人卖家 ”，可选择：65-经营者/法人。
         * @property 2、主体为“个体工商户/企业/政府机关/事业单位/社会组织”，可选择：65-经营者/法人、66- 经办人。 （经办人：经商户授权办理微信支付业务的人员）。
         * @const 65 经营者/法人
         * @const 66 经办人
         */
        contact_type:"65"|"66"
        
        /** 
         * 【超级管理员姓名】必填 string(10)（后续该管理员需使用实名微信号完成签约）
         * @property 1、若管理员类型为“法人”，则该姓名需与法人身份证姓名一致。
         * @property 2、若管理员类型为“经办人”，则可填写实际负责人的姓名。
         * @property 3、长度为2-100个字符
         * @property 4、前后不能有空格、制表符、换行符
         * @property 5、不能仅含数字、特殊字符
         * @property 6、仅能填写数字、英文字母、汉字及特殊字符
         * @property 7、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        contact_name:string
        /** 管理员姓名加密 */
        contact_name_encrypt?:string

        /** 
         * 【超级管理员证件类型】选填 string
         * @property 当超级管理员类型是经办人时，请上传超级管理员证件类型。
         * @const IDENTIFICATION_TYPE_MAINLAND_IDCARD  中国大陆居民-身份证
         * @const IDENTIFICATION_TYPE_OVERSEA_PASSPORT 其他国家或地区居民-护照
         * @const IDENTIFICATION_TYPE_HONGKONG  中国香港居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_MACAO 中国澳门居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_TAIWAN 中国台湾居民--来往大陆通行证
         * @const IDENTIFICATION_TYPE_FOREIGN_RESIDENT 外国人居留证
         * @const IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT 港澳居民证
         * @const IDENTIFICATION_TYPE_TAIWAN_RESIDENT 台湾居民证
         */
        contact_id_doc_type?:"IDENTIFICATION_TYPE_MAINLAND_IDCARD"|"IDENTIFICATION_TYPE_OVERSEA_PASSPORT"|"IDENTIFICATION_TYPE_HONGKONG"|"IDENTIFICATION_TYPE_MACAO"|"IDENTIFICATION_TYPE_TAIWAN"|"IDENTIFICATION_TYPE_FOREIGN_RESIDENT"|"IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT"|"IDENTIFICATION_TYPE_TAIWAN_RESIDENT"
    
        /** 
         * 【超级管理员证件号码】选填 string
         * @property 1、若超级管理员类型为法人，则该身份证号码需与法人身份证号码一致。若超级管理员类型为经办人，则可填写实际经办人的身份证号码。
         * @property 2、可传身份证、来往内地通行证、来往大陆通行证、护照等证件号码，号码规范如下：
         * @property 身份证（限中国大陆居民)：17位数字+1位数字|X
         * @property 护照（限境外人士）：4-15位 数字|字母|连字符
         * @property 中国香港居民--来往内地通行证：H/h开头+8或10位数字/字母
         * @property 中国澳门居民--来往内地通行证：M/m开头+8或10位数字/字母
         * @property 中国台湾居民--来往大陆通行证：8位数字或10位数字
         * @property 外国人居留证：15位 数字|字母
         * @property 港澳居住证/台湾居住证：17位数字+1位数字|X
         * @property 3、超级管理员签约时，校验微信号绑定的银行卡实名信息，是否与该证件号码一致。
         * @property 4、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        contact_id_card_number?:string
        /** 管理员证件号码加密 */
        contact_id_card_number_encrypt?:string

        /** 
         * 【超级管理员证件正面照片】选填 string
         * @property 1、当超级管理员类型是经办人时，请上传超级管理员证件的正面照片。
         * @property 2、若证件类型为身份证，请上传人像面照片。
         * @property 3、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 4、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 5、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         */
        contact_id_doc_copy?:string
        /** 超级管理员正面照片微信mediaId */
        contact_id_doc_copy_media_id?:string

        /** 
         * 【超级管理员证件反面照片】选填 string
         * @property 1、当超级管理员类型是经办人时，请上传超级管理员证件的反面照片。
         * @property 2、若证件类型为护照，无需上传反面照片。
         * @property 3、正面拍摄、清晰、四角完整、无反光或遮挡；不得翻拍、截图、镜像、PS。
         * @property 4、请上传彩色照片or彩色扫描件，复印件需加盖公章鲜章，可添加“微信支付”相关水印（如微信支付认证），见【指引文档】
         * @property 5、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         */
        contact_id_doc_copy_back?:string
        /** 超级管理员反面照片微信mediaId */
        contact_id_doc_copy_back_media_id?:string

        /** 
         * 【超级管理员证件有效期开始时间】选填 string
         * @property 1、当超级管理员类型是经办人时，请上传证件有效期开始时间。
         * @property 2、请按照示例值填写，日期格式应满足合法的YYYY-MM-DD格式。
         * @property 3、开始时间不能小于1900-01-01
         * @property 4、开始时间不能大于等于当前日期。
         */
        contact_id_doc_period_begin?:string

        /** 
         * 【超级管理员证件有效期结束时间】选填 string
         * @property 1、当超级管理员类型是经办人时，请上传证件有效期结束时间。
         * @property 2、请按照示例值填写，日期格式应满足合法的YYYY-MM-DD格式，若证件有效期为长期，请填写：长期。
         * @property 3、结束时间大于开始时间。
         */
        contact_id_doc_period_end?:string

        /** 
         * 【业务办理授权函】选填 string
         * @property 1、当超级管理员类型是经办人时，请上传业务办理授权函。
         * @property 2、请参照示例图打印业务办理授权函，全部信息需打印，不支持手写商户信息，并加盖公章。
         * @property 3、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         */
        business_authorization_letter?:string
        /** 业务办理授权函微信mediaId */
        business_authorization_letter_media_id?:string

        /** 
         * 【超级管理员手机】必填 string
         * @property 1、前后不能有空格、制表符、换行符
         * @property 2、需满足以下任一条件
         * @property - 11位数字的手机号码
         * @property - 5-20位数字、连字符“-”、加号“+”
         * @property 3、用于接收微信支付的重要管理信息及日常操作验证码
         * @property 4、该字段需要使用微信支付公钥加密（推荐），请参考获取微信支付公钥ID说明以及微信支付公钥加密敏感信息指引，也可以使用微信支付平台证书公钥加密，参考获取平台证书序列号、平台证书加密敏感信息指引
         */
        mobile_phone:string
        /** 管理员手机号码加密 */
        mobile_phone_encrypt?:string
    }

    /** 平台收付通一级商户进件经营场景信息 */
    export interface sales_scene_info
    {
        /** 
         * 【店铺名称】必填 string(256)
         * @property 请填写店铺全称。
         */
        store_name:string

        /** 
         * 【店铺链接】选填 string(1024)
         * @property 1、店铺二维码 or 店铺链接二选一必填。
         * @property 2、请填写可直接访问店铺主页的链接，需符合网站规范，必须以https://或http://开头，不能有转义字符。
         */
        store_url?:string

        /** 
         * 【店铺二维码】选填 string(256)
         * @property 1、店铺二维码 or 店铺链接二选一必填。
         * @property 2、若为电商小程序，可上传店铺页面的小程序二维码。
         * @property 3、请填写通过图片上传API预先上传图片生成好的MediaID，仅能上传1张图片。
         */
        store_qr_code?:string
        /** 店铺二维码微信mediaId */
        store_qr_code_media_id?:string

        /** 
         * 【商家小程序APPID】选填 string(256)
         * @property 1、商户自定义字段，可填写已认证的小程序AppID，认证主体需与二级商户主体一致；
         * @property 2、完成入驻后， 系统发起二级商户号与该AppID的绑定（即配置为sub_appid，可在发起支付时传入）
         */
        mini_program_sub_appid ?:string
    }

    /** 平台收付通一级商户进件结算规则信息 */
    export interface settlement_info 
    {
        /** 
         * 【结算规则ID】选填 integer
         * @property 1、选填，请选择二级商户的结算规则ID，需匹配电商平台开通工具箱选择的费率档位，详细参见电商二级商户结算规则对照表；
         * @property 对照表链接 https://kf.qq.com/faq/220228qEfuAz220228bMFji6.html
         * @property 2、若电商平台未传入，将默认选择0.6%费率对应的结算规则id；
         */
        settlement_id?:number

        /** 
         * 【所属行业】选填 string(200)
         * @property 1、选填，请填写二级商户所属的行业名称，映射特殊资质要求，详细参见电商二级商户结算规则对照表；
         * @property 对照表链接 https://kf.qq.com/faq/220228qEfuAz220228bMFji6.html
         * @property 2、若电商平台未传入，将默认填写无需特殊资质的行业名称；
         */
        qualification_type?:string
    }

    /** 平台收付通二级商户进件递交参数 */
    export interface SecondLevelMerchantSubmission
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
         */
        status:number
        /** 
         * 【业务申请编号】[必填] string(124)
         *  @param 1、服务商自定义的商户唯一编号。
         *  @param 2、每个编号对应一个申请单，每个申请单审核通过后会生成一个微信支付商户号。
         *  @param 3、若申请单被驳回，可填写相同的“业务申请编号”，即可覆盖修改原申请单信息 。
         */
        out_request_no: string
        /** 
         * 【主体类型】[必填] string(4)
         * 非小微的主体类型需与营业执照/登记证书上一致，可参考选择主体指引，枚举值如下。
         * @param 2401：小微商户，指无营业执照的个人商家。
         * @param 2500：个人卖家，指无营业执照，已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元的个人商家。（若选择该主体，请在“补充说明”填写相关描述）。
         * @param 4：个体工商户，营业执照上的主体类型一般为个体户、个体工商户、个体经营。
         * @param 2：企业，营业执照上的主体类型一般为有限公司、有限责任公司。
         * @param 3：事业单位，包括国内各类事业单位，如：医疗、教育、学校等单位。
         * @param 2502：政府机关，包括各级、各类政府机关，如机关党委、税务、民政、人社、工商、商务、市监等。
         * @param 1708：社会组织，包括社会团体、民办非企业、基金会、基层群众性自治组织、农村集体经济组织等组织。
         */
        organization_type: "2401" | "2500" | "4" | "2" | "3" | "2502" | "1708"

        /** 
         * 【是否金融机构】选填 boolean
         * @property 请根据申请主体的实际情况填写，可参考选择金融机构指引：https://kf.qq.com/faq/220215IrMRZ3220215n6buiU.html
         * @property 1、若商户主体是金融机构，则填写：true。
         * @property 2、若商户主体不是金融机构，则填写：false。
         * @property 若未传入将默认填写：false。
         */
        finance_institution?:boolean
        /**
         * 【营业执照信息】选填 object
         * @property 1、主体为“小微/个人卖家”时，不填。
         * @property 2、主体为“个体工商户/企业”时，请上传营业执照。
         * @property 3、主体为“政府机关/事业单位/社会组织”时，请上传登记证书。
         */
        business_license_info?:business_license_info

        /** 
         * 【金融机构许可证信息】选填 object
         * @property 当主体是金融机构时，必填
         */
        finance_institution_info?:finance_institution_info

        /** 
         * 【证件持有人类型】选填 string
         * @property 1. 主体类型为政府机关/事业单位时选传：
         * @property （1）若上传的是法人证件，则不需要上传该字段。
         * @property （2）若因政策保密等原因，无法提供法人证件时，可上传经办人。 （经办人：经商户授权办理微信支付业务的人员，授权范围包括但不限于签约，入驻过程需完成账户验证）。
         * @property 2. 主体类型为企业/个体户/社会组织时，默认为经营者/法人，不需要上传该字段。
         * @const LEGAL 法人
         * @const SUPER 经办人
         */
        id_holder_type?:"LEGAL"|"SUPER"

        /** 
         * 【经营者/法人证件类型】选填 string
         * @property 1、当证件持有人类型为经营者/法人时，需要填写。其他情况，无需上传。
         * @property 2、主体为“小微/个人卖家”，可选择：身份证。
         * @property 3、主体为“个体户/企业/事业单位/社会组织”：可选择任一证件类型，主体为“政府机关”仅支持中国大陆居民-身份证类型。
         * @property 4、若没有填写，系统默认选择：身份证。
         * @const IDENTIFICATION_TYPE_MAINLAND_IDCARD 中国大陆居民-身份证
         * @const IDENTIFICATION_TYPE_OVERSEA_PASSPORT 其他国家或地区居民-护照
         * @const IDENTIFICATION_TYPE_HONGKONG 中国香港居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_MACAO 中国澳门居民--来往内地通行证
         * @const IDENTIFICATION_TYPE_TAIWAN 中国台湾居民--来往大陆通行证
         * @const IDENTIFICATION_TYPE_FOREIGN_RESIDENT 外国人居留证
         * @const IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT 港澳居民证
         * @const IDENTIFICATION_TYPE_TAIWAN_RESIDENT 台湾居民证
         */
        id_doc_type?:"IDENTIFICATION_TYPE_MAINLAND_IDCARD"|"IDENTIFICATION_TYPE_OVERSEA_PASSPORT"|"IDENTIFICATION_TYPE_HONGKONG"|"IDENTIFICATION_TYPE_MACAO"|"IDENTIFICATION_TYPE_TAIWAN"|"IDENTIFICATION_TYPE_FOREIGN_RESIDENT"|"IDENTIFICATION_TYPE_HONGKONG_MACAO_RESIDENT"|"IDENTIFICATION_TYPE_TAIWAN_RESIDENT"
        
        /** 
         * 【法定代表人说明函】选填 string
         * @property 1、当证件持有人类型为经办人时，必须上传。其他情况，无需上传。
         * @property 2、因政策保密等原因，无法提供法定代表人证件时，请参照示例图打印法定代表人说明函，全部信息需打印，不支持手写商户信息，并加盖公章。示例图地址https://kf.qq.com/faq/220127aUzAju220127UfiuQr.html
         * @property 3、可上传1张图片，请填写通过图片上传API预先上传图片生成好的MediaID。
         */
        authorize_letter_copy?:string 
        /** 法定代表人说明函微信media_id */
        authorize_letter_copy_media_id?:string

        /** 
         * 【经营者/法人身份证信息】选填 object
         * @property  当证件持有人类型为经营者/法人且证件类型为“身份证”时填写。
         */
        id_card_info?:id_card_info

        /** 
         * 【经营者/法人其他类型证件信息】选填 object
         * @property 当证件持有人类型为经营者/法人且证件类型不为“身份证”时填写。
         */
        id_doc_info?: id_doc_info

        /** 
         * 【经营者/法人是否为受益人】 选填 boolean
         * @property 主体类型为企业时，需要填写：
         * @property 1、若经营者/法人是最终受益人，则填写：true。
         * @property 2、若经营者/法人不是最终受益人，则填写：false。
         */
        owner?:boolean

        /** 
         * 最终受益人信息列表】选填 array
         * @property 仅企业需要填写。
         * @property 若经营者/法人不是最终受益所有人，则需提填写受益所有人信息，最多上传4个。
         * @property 若经营者/法人是最终受益所有人之一，可在此填写其他受益所有人信息，最多上传3个。
         * @property 根据国家相关法律法规，需要提供公司受益所有人信息，受益所有人需符合至少以下条件之一：
         * @property 1、直接或者间接拥有超过25%公司股权或者表决权的自然人。
         * @property 2、通过人事、财务等其他方式对公司进行控制的自然人。
         * @property 3、公司的高级管理人员，包括公司的经理、副经理、财务负责人、上市公司董事会秘书和公司章程规定的其他人员。
         */
        ubo_info_list?:UboInfoList[]

        /** 
         * 【结算账户信息】必填 object
         * @property 请填写商家提现收款的银行账户信息。
         */
        account_info:account_info

        /** 
         * 【超级管理员信息】必填 object
         * @property 请填写店铺的超级管理员信息。
         * @property 超级管理员需在开户后进行签约，并可接收日常重要管理信息和进行资金操作，请确定其为商户法定代表人或负责人。
         */
        contact_info:contact_info
        
        /** 
         * 【经营场景信息】必填 object
         * @property 请填写经营场景信息
         */
        sales_scene_info:sales_scene_info

        /** 
         * 【结算规则】选填 object
         * @property 请填写商家的结算费率规则、所属行业等信息。若电商平台未传入，系统将填写默认值
         */
        settlement_info?:settlement_info

        /** 
         * 【商户简称】必填 string(64)
         * @property UTF-8格式，中文占3个字节，即最多21个汉字长度。将在支付完成页向买家展示，需与商家的实际售卖商品相符 。
         * @property 示例 腾讯  三募科技
         */
        merchant_shortname:string

        /** 
         * 【特殊资质】 选填 string(1024)
         * @property 1、仅当商户选择了必需提交特殊资质的行业时，需要提供该项资料；若商户选择了无需特殊资质的行业，或未选择行业时，无需提交该项资料，详情查看《行业对应特殊资质》
         * @property 对应特殊资质 https://kf.qq.com/faq/220228qEfuAz220228bMFji6.html
         * @property 2、请提供为“申请商家主体”所属的特殊资质，可授权使用总公司/分公司的特殊资质；
         * @property 3、最多可上传5张照片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         */
        qualifications?:string

        /** 
         * 【补充材料】选填 string(1024)
         * @property 根据实际审核情况，额外要求提供。最多可上传15张照片，请填写通过图片上传API预先上传图片生成好的MediaID 。
         */
        business_addition_pics?:string

        /** 
         * 【补充说明】选填 string(512)
         * @property 若主体为“个人卖家”，该字段必传，则需填写描述“ 该商户已持续从事电子商务经营活动满6个月，且期间经营收入累计超过20万元。
         */
        business_addition_desc?:string
    }


}