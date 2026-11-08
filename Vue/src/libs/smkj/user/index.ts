
import { Utils,cookie, io,Api,__,store, kxyk, shop} from "smkj";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { h ,createVNode} from "vue";

/** 平台用户类 */
export default class user 
{
    /** 用户访问环境 */
    public ev = Utils.getEvn();
    /** 用户当前访问页面 */
    public NowPage:sm.Sindex|undefined = undefined;
    /** D1管理员页面数据 */
    public D1Page:sm.PageD1|undefined = undefined;
    /** 用户ID */
    public uid:number = 0;
    /** 是否推广员 */
    public is_promoter:number = 0;
    /** 加入推广员的时间戳 */
    public promoter_time:number = 0;
    /** 用户是否登录 */
    public is_login:boolean = false;
    /** 当前SKID */
    public sk_id:string = '';
    /** 用户小程序是否登录 */
    public is_login_wxapp:boolean =false;
    /** 用户token */
    public token:string|undefined = cookie.get('token');
    /** 用户是否断线重拨 */
    public disconnect:boolean = false;
    /** 用户是否定位位置 */
    public is_location:boolean = false;
    /** 用户是否正在定位中 */
    public is_on_location:boolean = false;
    /** 是否正在自动登录 */
    public is_auto_login_loading:boolean = false;
    /** 是否有定位数据 */
    public location?:sm.location|false = false;
    /** 用户定位是否上报 */
    public is_report_location:boolean = false;
    /** 用户头像 */
    public avatar:string ='';
    /** 用户昵称 */
    public nickname:string = '';
    /** 是否分身或主号UID */
    public is_avatar:number = 0;
    /** 用户手机号码 */
    public phone:string = '';
    /** 用户unionid */
    public unionid:string = '';
    private coupon_used_store:any[] = [];
    private user_ev_list:string[] = [];
    private sk:io.sk;
    constructor(sk:io.sk)
    {
        this.sk = sk;
        this.UserEventSo();
    }
    UserEventSo()
    {
        this.sk.on('so',(db:any,fn:any)=>{
            fn({a:1});
        })
    }

    /**
     * 解析结算表type类型 - 基于D1 E1 商圈不可用
     * @param t 类型ID
     */
    FormatfinanceType(t:number):string{
        let str = '暂无类型';
        switch (t) {
            case 1:
                str = '卖卡支出';
                break;
            case 2:
                str = '售卡佣金';
                break;
            case 3:
                str = '卖卡支出';
                break;
            case 4:
                str = '售卡佣金';
                break;
            case 5:
                str = '卖卡支出';
                break;
            case 6:
            case 7:
            case 8:
                str = '充值支出';
                break;
            case 9:
            case 10:
                str = '订单分红';
                break;
            case 11:
                str = '现金收款';
                break;
            case 15:
                str = '会员佣金';
                break;
            case 16:
                str = '下级佣金';
                break;
            default:
                break;
        }
        return str;
    }

    /** 计算排队用户边框颜色 */ 
    getUserColor(u:sm.StoreMember|sm.QueueUserList)
    {
        if(!u.is_coms)
        {
            //未到店
            return "#e6a23c";
        }
        if(u.status === 2 || u.status ===1 || u.status ===0){
            //未支付
            return "#3388ff";
        }
        if(u.status === 3 )
        {
            //已支付 
            return "#47b381";
        }
        if(u.status === 4){
            //正在服务
            return "#a247b3";
        }
        if(u.status === 5){
            //完成服务
            return "#979797";
        }
    }

}