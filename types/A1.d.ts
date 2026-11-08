declare namespace sm.A1
{
    /**
     * A1 行业列表下带有会员等级
     */
    interface A1MchTypeMemberList extends tb.kxyk_mch_type
    {
        vips:tb.kxyk_mch_type_vips[]
    }

    /** 
     * A1 C1管理端下级身份列表
     * @protected 例如 A1 身份包含 下级管理员、商圈、运营商B1等
     * @protected 例如 C1 身份包含 下级管理员、合伙人等
     */
    interface A1C1SubRole extends tb.kxyk_mch_role{
        /** 当前身份下的用户列表 */
        users?:SubRoleUser[]
    }

    /** A1 C1管理端下级身份下管理员 */
    interface SubRoleUser extends tb.kxyk_mch_role_info{
        /** 关联用户昵称 */
        nickname?:string
        /** 关联用户头像 */
        avatar?:string
    }
}