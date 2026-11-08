
import _, { __ } from 'lodash';
import * as regx from "../regx";
import * as AMAP from "../map";
import DOM from "./dom";
import ECharts from './echarts';
import { showCustomDialog,closeDialog} from './pop';

class Utils {
    public DOM:DOM;
    public host = window.location.protocol+'//'+window.location.host;
    public regx = regx;
    public AMap = AMAP;
    public sys = {
        /** 是否APP环境 */
        is_app:!!navigator.userAgent.match(/(Html5Plus)/i),
        /** 是否IOS环境 */
        is_ios:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        /** 是否微信公众号环境 */
        is_wx: navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1,
        /** 是否微信小程序环境 */
        is_wxapp:(!!(navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i))) || window.__wxjs_environment === 'miniprogram',
        /** 是否PC环境（非移动设备） */
        is_pc: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        /** 返回当前环境 */
        os:()=>{
            // if(this.utils.sys.is_wxapp && this.utils.sys.is_wx) return 'wxapp';
            if(utils.sys.is_wxapp && utils.sys.is_wx) return 'wxapp';
            if(utils.sys.is_app) return 'app';
            if(utils.sys.is_wx) return 'wx';
            return 'h5';
        }
    }
    constructor() 
    {
        this.DOM = new DOM();
    }

    /**
     * 将10位时间戳转换为相对时间描述
     * @param {number} timestamp 10位时间戳
     * @returns {string} 相对时间字符串
     */
    getRelativeTime(timestamp:number): string {
        if (!timestamp) return "";
        const now = Math.floor(Date.now() / 1000); // 获取当前10位时间戳
        const diff = now - timestamp;
        if (diff < 0) {
            return "刚刚"; // 处理服务器时间微小差异或未来时间
        }

        if (diff < 60) {
            return "刚刚";
        } else if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes}分钟前`;
        } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            return `${hours}小时前`;
        } else if (diff < 2592000) {
            const days = Math.floor(diff / 86400);
            return `${days}天前`;
        } else if (diff < 31536000) {
            const months = Math.floor(diff / 2592000);
            return `${months}个月前`;
        } else {
            const years = Math.floor(diff / 31536000);
            return `${years}年前`;
        }
    }

    /**
     * 16进制颜色调整 整数变浅 负数加深
     * @param hexColor 原颜色字符串
     * @param adjustment 
     * @returns 
     */
    adjustColor(hexColor:string, adjustment:number) {
        // 去除前缀 '#'（如果有）
        hexColor = hexColor.replace('#', '');
        
        // 将16进制颜色值分解为 RGB 颜色
        let r = parseInt(hexColor.substring(0, 2), 16);
        let g = parseInt(hexColor.substring(2, 4), 16);
        let b = parseInt(hexColor.substring(4, 6), 16);
    
        // 调整每个颜色通道的值
        r = Math.min(255, Math.max(0, r + adjustment));
        g = Math.min(255, Math.max(0, g + adjustment));
        b = Math.min(255, Math.max(0, b + adjustment));
    
        // 将 RGB 转换回16进制颜色值
        let newHexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    
        return newHexColor;
    }
    
    format_hh(millisecond:number){
        let seconds = Math.round(millisecond);
        let result = [];
        let count = 2;
        while(count >= 0) {
            let current = Math.floor(seconds / (60 ** count));
            if(current>0 || (count ===0))
                result.push(current);
            seconds -= current * (60 ** count);
            --count;
        }
        return result.map(item => item <= 9 ? `0${item}` : item).join(":")
    }
    /** 格式化时间之前 */
    beautifyTime(timestamp:number){
        var mistiming = timestamp;
        var postfix = mistiming>0 ? '前' : '后'
        mistiming = Math.abs(mistiming)
        var arrr = ['年','个月','星期','天','小时','分钟','秒'];
        var arrn = [31536000,2592000,604800,86400,3600,60,1];
        for(var i=0; i<7; i++){
            var inm = Math.floor(mistiming/arrn[i])
            if(inm!=0){
                return inm+arrr[i] + postfix
            }
        }
        return '';
    }
    /** 格式化距离 */
    format_m(m:number){
        if(m<1000)
        {
            return m+'米';
        }
        return (m/1000).toFixed(1)+'公里';
    }

    /**
     * 字符串前几位填充星号
     * @param str 要操作的字符串
     * @param count 设置位数
     * @returns 
     */
    maskPrefixSlice(str: string, count: number): string {
        if(!str) return '';
        if (str.length <= count) {
            return '*'.repeat(str.length); // 如果字符串短于或等于要替换的位数，全部变星号
        }
        const prefix = '*'.repeat(count);
        const suffix = str.slice(count); // 从第 `count` 位开始取剩余部分
        return prefix + suffix;
    }

    /** 格式化手机号码 尾号带井号的保留井号 */
    formatPhone(phone: string): string {
        // 是否结尾有 # 号
        if(!phone) return '';
        const hasHash = phone.endsWith('#');

        // 取出不含 # 的主体内容
        const cleanPhone = hasHash ? phone.slice(0, -1) : phone;

        // 只保留数字
        const digits = cleanPhone.replace(/\D/g, '');

        // 不足掩码长度的情况，直接返回（如果需要也可以自定义逻辑）
        if (digits.length <= 7) {
            return hasHash ? digits + '#' : digits;
        }

        const firstPart = digits.slice(0, 3);  // 前三位
        const lastPart = digits.slice(-4);     // 后四位
        const maskedLength = digits.length - 7;
        const masked = '*'.repeat(maskedLength);

        // 拼接结果
        const result = `${firstPart}${masked}${lastPart}`;

        // 如果原号码带 #，最后再加回来
        return hasHash ? `${result}#` : result;
    }
    /** 计算两个坐标之间距离 单位米 */
    getDistanceFromGCJ02 (lat1: number, lng1: number, lat2: number, lng2: number): number 
    {
        const EARTH_RADIUS = 6378137; // 米
        const rad = (d: number) => (d * Math.PI) / 180;
        const radLat1 = rad(lat1);
        const radLat2 = rad(lat2);
        const deltaLat = radLat1 - radLat2;
        const deltaLng = rad(lng1 - lng2);
        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) ** 2;
        const c = 2 * Math.asin(Math.sqrt(a));
        return Math.round(EARTH_RADIUS * c);
    }
    /** 日期转换 年月日 转为 - */
    format_baidu2(dateStr:string){
         return dateStr.replace("年", "-").replace("月", "-").replace("日", "");
    }
    /** 百度识别返回的日期格式化 20280405 */
    format_baidu(dateStr:string){
        return dateStr.slice(0, 4) + '-' + dateStr.slice(4, 6) + '-' + dateStr.slice(6, 8);       
    }

    FormatPrinterOrderReceipt = (order:tb.kxyk_mch_store_order)=>
    {
        const col1Width = 25; // 商品列宽度
        const col2Width = 10;  // 数量列宽度
        const col3Width = 10;  // 价格列宽度

        // **计算真实字符宽度（汉字占 2 个宽度）**
        function getStrWidth(str: string): number {
            return str.split("").reduce((sum, char) => sum + (/[^\x00-\xff]/.test(char) ? 2 : 1), 0);
        }
        // function getStrWidth(str: string): number {
        //     return str.replace(/[^\x00-\xff]/g, "    ").length; // 汉字替换成2个字符
        // }

        // 截断文本并添加省略号
        function truncateText(text: string, maxWidth: number): string {
            if (getStrWidth(text) <= maxWidth) {
                return text;
            }
            
            let result = "";
            let currentWidth = 0;
            
            for (const char of text) {
                const charWidth = /[^\x00-\xff]/.test(char) ? 2 : 1;
                
                if (currentWidth + charWidth + 2 > maxWidth) { // 为省略号预留宽度
                    return result + "..";
                }
                
                result += char;
                currentWidth += charWidth;
            }
            
            return result;
        }

        // **格式化列对齐**
        function formatColumn(text: string, width: number, align: "left" | "right" = "left"): string {
            const realWidth = getStrWidth(text);
            const padding = Math.max(width - realWidth, 0); // 避免负值
            return align === "left"
                ? text + " ".repeat(padding)
                : " ".repeat(padding) + text;
        }

        // **表头**
        const header = 
            formatColumn("商品/服务",col1Width) + 
            formatColumn("数量",col2Width) + 
            formatColumn("价格",col3Width);
        let rows:any = [];
        // **数据行**
        let c1 = '';
        if(order.detall){
            rows = order.detall.map(item =>{
                let str = '';
                c1 = item.item_name || ''
                if(item.is_proxy_pay){
                    c1 += `(代付${item.sb_code})`;
                }
                if(item.proxy_oid){
                    c1 += '(代付)';
                }
                if(item.is_free){
                    c1 += '(免费)';
                }
                c1 = c1.replace(/[\x00-\x1F\x7F]/g, '');  
                str += formatColumn(truncateText(c1, col1Width),col1Width);
                str += formatColumn((item.count ? 'x'+item.count.toString() : "x1"),col2Width);
                str += formatColumn((item.price * (item.is_spec? 1 : item.count)).toFixed(2),col3Width);
                return str;
            });
        }
        return [header, ...rows];
    }
    /**
     * 格式化时间
     * @param t 10位 unix时间戳
     * @param fmt yyyy-MM-dd hh:mm:ss 格式
     * @returns string
     */
    format(t:number,fmt:string ='yyyy-MM-dd hh:mm:ss'){
        //("yyyy-MM-dd hh:mm:ss");
        let time = new Date(t*1000);
        const o:any = {
            "M+" : time.getMonth()+1,                //月份
            "d+" : time.getDate(),                    //日
            "h+" : time.getHours(),                  //小时
            "m+" : time.getMinutes(),                //分
            "s+" : time.getSeconds(),                //秒
            "q+" : Math.floor((time.getMonth()+3)/3), //季度
            "S"  : time.getMilliseconds()            //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
    /** 获得UUID len = 长度 为零时返回36位 */
    getUUID(len:number){
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [],i;
        let radix = chars.length;
        
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
    /** 获得当前用户环境 */
    getEvn():any {
        let ev = 'H5';//后续默认扩展H5
        if(utils.sys.is_wx) ev = 'WX';
        if(utils.sys.is_wxapp) ev = 'WXAPP';
        if(utils.sys.is_app) ev = 'APP';
        return ev;
    }
    /** 模拟进程等待 */
    async sleep(ms:number){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(true);
            }, ms);
        });
    }
    /** 查找对象元素 */
    find<T extends Partial<U>, U>(arr:U[],obj:T):false | U{
        let i = _.findIndex(arr,obj as any);
        if(-1 != i)
        {
            return arr[i];
        }
        return false;
    }
}

const utils:sm.Utils =
{
    DOM:{
        /** 计算dom高度 */
        get_surplus_higth:(c)=>
        {
            // 页面body高度
            let clientHeight = document.body.clientHeight;
            if(c.length>0)
            {
                c.forEach(name=>{
                    let class_dom = document.getElementsByClassName(name)[0] as HTMLElement;
                    if(class_dom && class_dom.offsetHeight){
                        clientHeight = clientHeight-class_dom.offsetHeight;
                        // console.log(class_dom,class_dom.offsetHeight);
                    }
                })
            }
            return clientHeight;
        },
        /** 格式化时间为秒和分钟 */
        format_ms:(m:number)=>
        {
            if(m < 60) return m+'秒';
            let mm = Math.floor(m/60)+'分';
            let s:any = m%60; 
            s= s>0?s+'秒':null;
            return mm+(s?s:'钟');
        }
    },
    /** 计算两个坐标之间距离 单位米 */
    getDistanceFromGCJ02:(lat1: number, lng1: number, lat2: number, lng2: number): number =>
    {
        const EARTH_RADIUS = 6378137; // 米
        const rad = (d: number) => (d * Math.PI) / 180;
        const radLat1 = rad(lat1);
        const radLat2 = rad(lat2);
        const deltaLat = radLat1 - radLat2;
        const deltaLng = rad(lng1 - lng2);
        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) ** 2;
        const c = 2 * Math.asin(Math.sqrt(a));
        return Math.round(EARTH_RADIUS * c);
    },
    format_hh:(millisecond:number)=>{
        let seconds = Math.round(millisecond);
        let result = [];
        let count = 2;
        while(count >= 0) {
            let current = Math.floor(seconds / (60 ** count));
            if(current>0 || (count ===0))
                result.push(current);
            seconds -= current * (60 ** count);
            --count;
        }
        return result.map(item => item <= 9 ? `0${item}` : item).join(":")
    },
    /** 格式化时间之前 */
    beautifyTime:(timestamp)=>{
        var mistiming = timestamp;
        var postfix = mistiming>0 ? '前' : '后'
        mistiming = Math.abs(mistiming)
        var arrr = ['年','个月','星期','天','小时','分钟','秒'];
        var arrn = [31536000,2592000,604800,86400,3600,60,1];
        for(var i=0; i<7; i++){
            var inm = Math.floor(mistiming/arrn[i])
            if(inm!=0){
                return inm+arrr[i] + postfix
            }
        }
        return '';
    },

    /** 格式化距离 */
    format_m:(m)=>{
        if(m<1000)
        {
            return m+'米';
        }
        return (m/1000).toFixed(1)+'公里';
    },

    /**
     * 格式化时间
     * @param t 10位 unix时间戳
     * @param fmt yyyy-MM-dd hh:mm:ss 格式
     * @returns string
     */
    format:(t,fmt)=>{
        //("yyyy-MM-dd hh:mm:ss");
        let time = new Date(t*1000);
        const o:any = {
            "M+" : time.getMonth()+1,                //月份
            "d+" : time.getDate(),                    //日
            "h+" : time.getHours(),                  //小时
            "m+" : time.getMinutes(),                //分
            "s+" : time.getSeconds(),                //秒
            "q+" : Math.floor((time.getMonth()+3)/3), //季度
            "S"  : time.getMilliseconds()            //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    },
    host:window.location.protocol+'//'+window.location.host,
    regx: regx,
    AMap:AMAP,
    sys:{
        is_app:!!navigator.userAgent.match(/(Html5Plus)/i),
        is_ios:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        is_wx: navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1,
        is_wxapp:(!!(navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i))) || window.__wxjs_environment === 'miniprogram',
        os:()=>{
            // if(this.utils.sys.is_wxapp && this.utils.sys.is_wx) return 'wxapp';
            if(utils.sys.is_wxapp && utils.sys.is_wx) return 'wxapp';
            if(utils.sys.is_app) return 'app';
            if(utils.sys.is_wx) return 'wx';
            return 'h5';
        }
    },
    /** 获得UUID len = 长度 为零时返回36位 */
    getUUID:(len)=>{
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [],i;
        let radix = chars.length;
        
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;
    
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
    
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    },
    /** 获得当前用户环境 */
    getEvn:()=>{
        let ev = 'H5';//后续默认扩展H5
        if(utils.sys.is_wx) ev = 'WX';
        if(utils.sys.is_wxapp) ev = 'WXAPP';
        if(utils.sys.is_app) ev = 'APP';
        return ev;
    },
    /** 模拟进程等待 */
    sleep:async(ms)=>{
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(true);
            }, ms);
        });
    },
    /** 查找对象元素 */
    find:(arr,obj)=>{
        let i = _.findIndex(arr,obj);
        if(-1 != i)
        {
            return arr[i];
        }
        return false;
    }
}
export { Utils ,ECharts,showCustomDialog,closeDialog};
export default new Utils();