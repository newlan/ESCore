import WxPayV3 from "./wx"

/** 平台支付系统 */
export default class Pay{
    /** 微信支付 */
    public WX
    constructor(){
        this.WX = new WxPayV3();
    }
}