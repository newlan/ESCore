/**
 * 前后端传参类型约束
 */
declare namespace sm.D
{
    
    export interface CommentOrder{
        
        odid:number
        
        rate:number
        
        msg:string
        
        open:boolean
        
        ratestr:['很差','较差','一般','满意','超赞']
        
        is_complaint:number
        
        imgs:string[]
        
        is_xy?:number
    }

}