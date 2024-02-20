/**
 * 枚举 - 小程序开发的所有API接口1
 * 备注：数据量较大时建议配合缓存使用
 */
export enum wxapp 
{
    /** 更新用户订阅消息发送数量 */
    updateSubscribeMessageCount="updateSubscribeMessageCount",
    /** 打开订阅消息窗口 */
    openSubMsg = 'openSubMsg',
    /** 小程序录音通讯接口 */
    getRecorder="getRecorder",
    /** 小程序端跳转打开地图显示导航 */
    jump_navigation="jump_navigation",
    /** h5和小程序端数据交换中转接口 - 复制支付中转逻辑 */
    wxapp_transfer="wxapp_transfer",
    
    /** 原生小程序端获取用户资料并登录 */
    wxapp_getuser_and_login="wxapp_getuser_and_login",
    /**
     * web view小程序用户设置小程序原生用户登录状态
     *
     * 备注：历史兼容逻辑，调整前请确认旧数据
     */
    set_wxapp_login_status="set_wxapp_login_status",
    /**
     * 用code获取用户手机号码
     *
     * 备注：保留给后续版本，当前未启用
     */
    get_phone_number="get_phone_number",
    /** 获得验证码API */
    wxapp_login='wxapp_login',
    /** 小程序静默登录 */
    wxapp_silence_login="wxapp_silence_login",
    /** 小程序支付中转接口 */
    wxapp_pay="wxapp_pay",
    /** 小程序配置分享数据接口 */
    wxapp_set_share="wxapp_set_share",
    /** 小程序授权静默登录 2022-09-02 根据微信规范改 */
    wxapp_base_login='wxapp_base_login',
    /** 测试WXAPP接口 */
    test_wxapp="test_wxapp",
    /** 测试ASR接口 */
    test_asr="test_asr",
    
}