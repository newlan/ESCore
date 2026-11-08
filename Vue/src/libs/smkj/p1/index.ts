
import { Utils,cookie, io,Api,__,store, kxyk, shop} from "smkj";
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message ,Modal as AModal,notification} from 'ant-design-vue';
import { Button,Input } from 'ant-design-vue';
import { h ,createVNode,reactive } from "vue";
import  gsap  from "gsap";
import dayjs from "dayjs";
import { reject } from "lodash";

/** 平台用户类 */
export default class P1 
{
    private sk:io.sk;
    /** 平台身份和身份页面数据 */
    public role:sm.Pd1.KxykRole;
    /** 门店所属商圈VIP列表 - 支持多商圈 */
    private all_vip_list:{[x:string]:tb.kxyk_circle_member_vip[]}={};
    /** 当前员工缓存门店商品列表 - 支持多门店 */
    public all_good_list=reactive<{ [x: string]: sm.store_goods[] }>({});
    /** 当前员工缓存门店商品列表 - 支持多门店 排除pop 收银台用 */
    public all_good_list1=reactive<{ [x: string]: sm.store_goods[] }>({});
    /** 当前员工缓存所有商品ID */
    public all_goods_ids:string[] = [];
    /** 当前购物车缓存 */
    public has_shopping_car:sm.Com.MemberGoodsShoppingCartDBs | false = false;
    /** 当前门店数据 */
    public Store:tb.kxyk_mch_store | false = false;
    /** 当前门店所有员工列表 */
    public Clerks:sm.Pd1.LoginStaff[] = [];
    /** 是否已经加载了员工列表 */
    public is_load_clerks:boolean = false;
    /** 购物车同步和各类递交按钮时间戳 防连续点击 */
    public asyncCarTime:number = 0;
    /** 当前P1门店ID */
    public sid:number = 0;
    /** 请求代理人余额和卡券时间限制MAP 根据hid缓存最后一次更新时间 */
    private proxyMoneyReqTime = new Map<number, number>(); 

    constructor(sk:io.sk,role:sm.Pd1.KxykRole)
    {
        this.sk = sk;
        this.role = role;
    }


}