import _ from 'lodash';
const log = require('debug')('lan:utils');
import dayjs from 'dayjs';
import { randomBytes,randomUUID  } from 'crypto';

interface LoggerFunction {
    (...args: any[]): void;
    /** debug命名空间 */
    namespace?: string;
}



/**
 * 生成一个随机整数
 * @param max 最大值
 * @param min 默认1 
 * @returns number
 */
export const getRandomInt = (max:number,min:number = 1 ) => 
{
  // 确保min和max是整数
  min = Math.ceil(min);
  max = Math.floor(max);
  // 公式：[min, max] 闭区间
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** 模拟现场睡眠 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** 创建不同命名空间的debug */
export const createClassLogger = (className: string) => {

     const log:LoggerFunction =(...args: any[]) =>{
        const stack = new Error().stack;
        const methodLine = stack?.split('\n')[2] || '';
        const match = methodLine.match(/at\s+(.*)\s+\(/);
        let methodName = match?.[1]?.split('.').pop()?.trim() || 'unknown';
        const asMatch = methodName.match(/\[as\s+(.*?)\]/);
        if (asMatch) {
            methodName = `${asMatch[1]}`; // 改成你想要的格式
        }
            
        const log1 = require('debug')(`${className}:${methodName}`)
        log1(...args);
        log.namespace = `${className}:${methodName}`;
    }
    return log;
}


/**
 * 计算两个坐标之间的距离
 * @param lat1 
 * @param lng1 
 * @param lat2 
 * @param lng2 
 * @returns 米
 */
export const getDistanceFromGCJ02 = (lat1: number, lng1: number, lat2: number, lng2: number): number =>
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

/**
 * 计算用户定位是否在门店范围
 * @param userLocation 用户定位数据
 * @param stores 门店数据
 * @returns 
 */
export const findNearestStoreInRange = ( userLocation:{lat:number,lng:number}, stores: tb.kxyk_mch_store[] ): (tb.kxyk_mch_store & { distance: number }) | null =>{
  let nearestStore: (tb.kxyk_mch_store & { distance: number }) | null = null;
  let minDistance = Infinity;
  let maxDistance = 0;

  for (const store of stores) {
    
    
    maxDistance = store.range_m ? store.range_m : 30;
    const distance = getDistanceFromGCJ02(userLocation.lat, userLocation.lng,  parseFloat(store.lat), parseFloat(store.lng));
    // console.log(store.name,'门店lat:',store.lat,',lng:',store.lng,'，误差：',store.range_m,',实际:',distance);
    if (distance <= maxDistance && distance < minDistance) {
      minDistance =  distance;
      nearestStore = { ...store, distance };
    }
  }

  return nearestStore;
}


/**
 * 截取固定长度字符串
 * @param str 要截取的字符串或数组 如果是数组会先用逗号分割
 * @param max 最大长度
 * @returns 截取加上省略号的字符串
 */
export const joinAndTruncate = (str:string | string[],max:number = 100):string=>
{
    let s = "";
    if(typeof str === "string")
    {
        s =str;
    }else{
        s = str.join(",");
    }
    if(s.length <= max) return s;
    return s.slice(0,max-3)+"...";
}

/**
 * 检测任意属性是否合法
 * @property 可以检测对象，数组，字符串，数字
 * @property 嵌套的对象中所有属性都不合法时顶级属性不合法
 * @param {*} val
 * @returns {boolean}
 */
export const isValueValid = (val: any): boolean =>{
    if (val === null || val === undefined) return false;
    if (typeof val === 'string') return val.trim() !== '';
    if (typeof val === 'number') return val !== 0;
    if (Array.isArray(val)) return val.length > 0 && val.some(item => isValueValid(item));
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.length === 0) return false;
      return keys.some(key => isValueValid(val[key]));
    }
    return true;
  }

export const FormatPrinterOrderReceipt = (order:tb.kxyk_mch_store_order)=>
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
            if(item.is_proxy_pay && item.transfer_uid !== order.uid){
                c1 += '(被代付)';
            }
            if(item.proxy_oid && item.transfer_uid == order.uid){
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



export const generateOutRequestNo = (prefix: string = "REQ"): string =>
{
    const now = new Date();    
    // 格式化日期：YYYYMMDDHHmmssSSS
    const dateStr = now.getFullYear().toString() +
                    (now.getMonth() + 1).toString().padStart(2, "0") +
                    now.getDate().toString().padStart(2, "0") +
                    now.getHours().toString().padStart(2, "0") +
                    now.getMinutes().toString().padStart(2, "0") +
                    now.getSeconds().toString().padStart(2, "0") +
                    now.getMilliseconds().toString().padStart(3, "0");
  
    // 使用 `crypto.randomUUID()` 生成唯一标识（Node 及现代浏览器支持）
    // @ts-ignore
    const uniqueStr = randomUUID().replace(/-/g, "").substr(0, 8); // 取前 8 位
    
    return `${prefix}${dateStr}_${uniqueStr}`.toUpperCase();
  }

/**
 * 获取唯一ID 时间戳方式
 * @param len 生成长度 默认32位
 */
export const GetUniqueID = (len:number = 32):string=>
{
    if (len < 8) {
        throw new Error('Length should be at least 8 for uniqueness');
    }
    
    // 获取当前时间戳（秒级别）
    const timestamp = Math.floor(Date.now() / 1000).toString(36); // 转换为36进制表示，减小长度

    // 生成随机部分
    const randomPart = randomBytes(Math.ceil(len / 2)).toString('hex'); // 生成随机字节，转换为16进制字符串

    // 拼接时间戳和随机数，并截取到指定长度
    let outTradeNo = (timestamp + randomPart).substring(0, len);

    return outTradeNo;
}
/**
 * 解析时间条件参数 年 月 日 自定义
 * @param p 时间参数
 * @param key 字段名
 * @param is_9 日期是否按照9点查询
 * @returns string 
 */
export const GetWhereTimes = (p:sm.SelectDatePar,key:string = '',is_9:boolean = false)=>
{
    let time = ``;//用于数据统计读取条件设置
    if(p.type === 5 && (!p.time1 || !p.time2)) return '';
    let keys = key;
    switch (p.type) {
        case 1:
            // 日
            if(is_9){
                time = `and ${keys} >= ${dayjs(p.time).add(9,'hour').unix()} and ${keys} <= ${dayjs(p.time).endOf("day").add(9,'hour').unix()}`;
            }else{
                time = `and ${keys} >= ${dayjs(p.time).unix()} and ${keys} <= ${dayjs(p.time).endOf("day").unix()}`;
            }
            
            break;
        case 2:
            // 星期
            time = `and ${keys} >= ${dayjs(p.time).startOf('week').unix()} and ${keys} <= ${dayjs(p.time).endOf('week').unix()}`;
            break;
        case 3:
            // 月
            time = `and ${keys} >= ${dayjs(p.time).startOf("month").unix()} and ${keys} <= ${dayjs(p.time).endOf('month').unix()}`;
            break;
        case 4:
            // 年
            time = `and ${keys} >= ${dayjs(p.time).startOf("year").unix()} and ${keys} <= ${dayjs(p.time).endOf("year").unix()}`;
            break;
        case 5:
            // 时段
            time = `and ${keys} >= ${dayjs(p.time1).unix()} and ${keys} <= ${dayjs(p.time2).unix()}`;
            break;
        case 6:
            break;
        default:
            break;
    }
    return time;
}
/** 错误解析到字符串 */
export const getError = (error:any)=>
{
    // 判断 error 类型
    if (typeof error === 'string') {
        // error 是字符串类型
        return error;
    } else if (error instanceof Error) {
        // error 是 Error 对象类型
        return error.message;
    } else {
        // 其他类型的错误
        let errorMessage;
        try {
            errorMessage = JSON.stringify(error);
        } catch (e) {
            errorMessage = String(error);
        }
        if(error.message){
            errorMessage = error.message;
        }
        return errorMessage;
    }
}
/** 两个经纬度距离计算 GPS */
export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    var radLat1 = Math.PI * lat1 / 180.0;
    var radLat2 = Math.PI * lat2 / 180.0;
    var a = radLat1 - radLat2;
    var b = Math.PI * lng1 / 180.0 - Math.PI * lng2 / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137;
    s = Math.round(s * 10000) / 10000;
    return s;
}

/** 合并多个数组 */
export const concat=<T>(...arr:T[]):any[]=>{
    return ([] as any).concat(...arr);
}
/** 参数验证 Validation parameters */
export const VP = (obj:any,n:string[]):boolean=>
{
    try {
        n.map((v,n)=>{
            if(!obj[v]) throw "参数错误！";
        })
    } catch (error) {
        throw new Error(error as any);
    }
    return true;
}
/** 解析错误 */
export const AnalysisError=(e:ErrorConstructor | string | any):string=>
{
    let err = '无法解析错误！';

    if(e instanceof Error || e instanceof TypeError || e instanceof RangeError){
        err = e.message;
    }
    if( typeof e === "string"){
        err = e;
    }
    return err;
}
/** 数组内对象搜索 */
export const Find=(arr:any[],obj:object):{[x:string]:any}|false=>
{
    let i = _.findIndex(arr,obj);
    if(-1 !== i)
    {
        return arr[i];
    }
    return false;
}

/** 组装成前端区域组件可用的地区结构 */
export const MakeRegion = (list:any[])=>
{
    let res:any[] = [];
    if(list.length > 0)
    {
        list.forEach(area=>{
            let a1 = Find(res,{value:area.a1_code});
            if(!a1)
            {
                let new_a1 = {value:area.a1_code, level:0, label:area.a1, children:[]};
                res.push(new_a1);
                a1 = new_a1;
            }
            let a2 = Find(a1.children,{value:area.a2_code});
            if(!a2)
            {
                let new_a2 = {value:area.a2_code, level:1, label:area.a2, children:[]};
                a1.children.push(new_a2);
                a2 = new_a2;
            }
            let a3  = Find(a2.children,{value:area.code});
            if(!a3)
            {
                let new_a3 = {value:area.code, level:2, label:area.name};
                a2.children.push(new_a3);
            }
        });
        return res;
    }
    return false;
}