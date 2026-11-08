/**
 * 前后端传参类型约束
 */
declare namespace sm.D
{
    /** StoreMemberIndex页面评论订单参数 */
    export interface CommentOrder{
        /** 订单详情表ID */
        odid:number
        /** 评分星级 0 - 5 */
        rate:number
        /** 评论活着投诉内容 */
        msg:string
        /** 评论框是否显示 */
        open:boolean
        /** 评论星级中文解析数组 */
        ratestr:['很差','较差','一般','满意','超赞']
        /** 是否投诉 0 1 */
        is_complaint:number
        /** 投诉图片地址数组 */
        imgs:string[]
        /** 是否洗浴系统调用 */
        is_xy?:number
    }

}