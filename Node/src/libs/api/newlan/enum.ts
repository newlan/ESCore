/**
 * 枚举 - newlan 相关的所有API接口
 * 备注：涉及金额计算时统一使用整数分
 */
export enum newlan
{
    
    NoLoginWechatPay="NoLoginWechatPay",
    
    TestCashStaffID="TestCashStaffID",
    
    TestSendSubMsg="TestSendSubMsg",
    
    P1WechatPay="P1WechatPay",
    
    TestUserRechargeBask="TestUserRechargeBask",
    
    getWxSing="getWxSing",
    
    getUserInfo="getUserInfo",
    
    onUnifiedOrder="onUnifiedOrder",
    
    unifiedOrderXYV3="unifiedOrderXYV3",
    
    unifiedOrderV3="unifiedOrderV3",
    
    unifiedOrder='unifiedOrder',
    
    AppAuthLogin="AppAuthLogin",
    
    ReportLocation="ReportLocation",
    
    getUserInfoBase="getUserInfoBase",
    
    SystemSyncEvent="SystemSyncEvent",

}
export enum Event
{
    
    EditP1User="EditP1User",
    
    P1StaffTask="P1StaffTask"
}


export enum tb
{
    
    kxyk_make_qr_url="kxyk_make_qr_url",
    
    kxyk_mch_goods_stock_level2="kxyk_mch_goods_stock_level2",
    
    kxyk_mch_goods_supplier="kxyk_mch_goods_supplier",
    
    kxyk_mch_goods_stock_log="kxyk_mch_goods_stock_log",
    
    kxyk_mch_store_order_detall_room="kxyk_mch_store_order_detall_room",
    
    kxyk_coupon_cardholder="kxyk_coupon_cardholder",
    
    kxyk_coupon_cardholder_log="kxyk_coupon_cardholder_log",
    
    sm_user_remark="sm_user_remark",
    
    kxyk_mch_goods_type="kxyk_mch_goods_type",
    
    kxyk_p1_staff_task="kxyk_p1_staff_task",
    
    kxyk_mqtt_gateway_lock_auth="kxyk_mqtt_gateway_lock_auth",
    
    kxyk_mqtt_gateway_lock="kxyk_mqtt_gateway_lock",
    
    kxyk_mqtt_gateway_store="kxyk_mqtt_gateway_store",
    
    kxyk_mqtt_gateway="kxyk_mqtt_gateway",
    
    kxyk_user_give_money_and_vip="kxyk_user_give_money_and_vip",
    
    kxyk_store_chat="kxyk_store_chat",
    
    kxyk_other_payment="kxyk_other_payment",
    
    kxyk_mch_store_clerk_sign_detall="kxyk_mch_store_clerk_sign_detall",
    
    kxyk_mch_store_clerk_sign="kxyk_mch_store_clerk_sign",
    
    kxyk_mch_store_finance="kxyk_mch_store_finance",
    
    kxyk_mch_store_credit_log="kxyk_mch_store_credit_log",
    
    kxyk_mch_store_vip_gift_rules="kxyk_mch_store_vip_gift_rules",
    
    kxyk_system_logs="kxyk_system_logs",
    
    kxyk_mch_role="kxyk_mch_role",
    
    kxyk_e1_lower_level="kxyk_e1_lower_level",
    
    kxyk_user_vip_set_apply="kxyk_user_vip_set_apply",
    
    kxyk_subscribe_message_count="kxyk_subscribe_message_count",
    
    kxyk_mch_store_queue_config_xy="kxyk_mch_store_queue_config_xy",
    
    kxyk_mch_store_local_serve="kxyk_mch_store_local_serve",
    
    kxyk_mch_order="kxyk_mch_order",
    
    kxyk_user_address="kxyk_user_address",
    
    kxyk_mch_cart="kxyk_mch_cart",
    
    kxyk_mch_join_apply="kxyk_mch_join_apply",
    
    kxyk_user_pay_log_refunds="kxyk_user_pay_log_refunds",
    
    kxyk_secondary_merchants_submission="kxyk_secondary_merchants_submission",
    
    kxyk_store_printer="kxyk_store_printer",
    
    kxyk_mch_store_clerk_type="kxyk_mch_store_clerk_type",
    
    kxyk_circle_member_fund_log="kxyk_circle_member_fund_log",
    
    kxyk_user_combine_pay_order="kxyk_user_combine_pay_order",
    
    kxyk_user_combine_pay_order_detall="kxyk_user_combine_pay_order_detall",
    
    kxyk_user_prize_log="kxyk_user_prize_log",
    
    kxyk_user_prize_phone="kxyk_user_prize_phone",
    
    kxyk_bath_hall_prior_pay="kxyk_bath_hall_prior_pay",
    
    kxyk_mch_store_order_detall_autoend_service="kxyk_mch_store_order_detall_autoend_service",
    
    kxyk_coupon_exchange_low="kxyk_coupon_exchange_low",
    
    kxyk_mch_store_order="kxyk_mch_store_order",
    
    kxyk_mch_store_order_detall="kxyk_mch_store_order_detall",
    
    kxyk_company="kxyk_company",
    
    kxyk_user_vip="kxyk_user_vip",
    
    kxyk_mch_type_vips_circle_config="kxyk_mch_type_vips_circle_config",
    
    kxyk_mch_type_vips="kxyk_mch_type_vips",
    
    kxyk_newlan="kxyk_newlan",
    
    kxyk_user_pay_log="kxyk_user_pay_log",
    
    kxyk_p1_staff_login_log="kxyk_p1_staff_login_log",
    
    kxyk_mch_store_sub="kxyk_mch_store_sub",
    
    kxyk_mch_goods="kxyk_mch_goods",
    
    kxyk_mch_type='kxyk_mch_type',
    
    kxyk_circle_member_vip="kxyk_circle_member_vip",
    
    kxyk_config_ids="kxyk_config_ids",
    
    sm_user="sm_user",
    
    kxyk_mch_store_clerk="kxyk_mch_store_clerk",
    
    kxyk_store_tuangou_user="kxyk_store_tuangou_user",
    
    kxyk_mch_store_is_grant_coupon="kxyk_mch_store_is_grant_coupon",
    
    kxyk_store_tuangou_p="kxyk_store_tuangou_p",
    
    kxyk_store_tuangou="kxyk_store_tuangou",
    
    kxyk_store_tuangou_type="kxyk_store_tuangou_type",
    
    kxyk_bath_hall="kxyk_bath_hall",
    
    kxyk_bath_shoebox="kxyk_bath_shoebox",
    
    kxyk_mch_store_money="kxyk_mch_store_money",
    
    kxyk_circle_shared_role="kxyk_circle_shared_role",
    
    kxyk_circle_msg="kxyk_circle_msg",
    
    kxyk_mch_store_order_detall_complaint="kxyk_mch_store_order_detall_complaint",
    
    kxyk_circle_member_tags="kxyk_circle_member_tags",
    
    kxyk_circle_recharge_rule="kxyk_circle_recharge_rule",
    
    kxyk_circle_finance="kxyk_circle_finance",
    
    kxyk_circle_finance_ns="kxyk_circle_finance_ns",
    
    kxyk_mch_role_e2e3_auth_config="kxyk_mch_role_e2e3_auth_config",
    
    kxyk_mch_role_e2e3_auth="kxyk_mch_role_e2e3_auth",
    
    kxyk_mch_store="kxyk_mch_store",
    
    kxyk_mch_role_info="kxyk_mch_role_info",
    
    kxyk_circle_member="kxyk_circle_member",
    
    kxyk_mch_coupon_activity='kxyk_mch_coupon_activity',
    
    kxyk_mch_coupon_activity_user="kxyk_mch_coupon_activity_user",
    
    kxyk_store_tuangou_promotion="kxyk_store_tuangou_promotion",
}

