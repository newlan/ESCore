import _ from "lodash";
export default class DOM {
    private taskList:{str:string,count:number,time:number}[]=[];
    constructor() 
    {
    }

    /**
     * 根据设备屏幕判断是否100%
     * @param m 不满足100%时默认
     * @returns string
     */
    getWWHH(m:string){
        if (window.innerWidth < 500 || /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
            return "100%";
          } else {
            return m;
          }
    }
    /**
     * 延时函数
     * @param ms - 毫秒 
     * @returns 
     */
    delay(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * 获得窗口剩余高度 - 排除需要计算的DOM class列表
     * @param list 要排除的列表
     * @param d 指定默认高度
     */
    async get_win_last_higth(list:string[],d:number = 500):Promise<number>
    {
        // let clientHeight = document.body.clientHeight;
        let clientHeight = window.innerHeight;
        // let h2 = document.body.clientHeight;
        let h2 = window.innerHeight;
        let is_break = false;
        for (const dom of list) {
            let class_dom = document.getElementsByClassName(dom)[0] as HTMLElement;
            if(!class_dom){

                let index = _.findIndex(this.taskList,{str:dom});
                /** 这里验证是否已经缓存 */
                if(-1 === index){
                    this.taskList.push({str:dom,count:0,time:new Date().getTime()});
                    is_break = true;
                }else{
                    this.taskList[index].count++;
                    if(this.taskList[index].count > 3){
                        // is_break = false;
                        delete this.taskList[index]
                    }else{
                        is_break = true;
                    }
                }
                
                break;
            }else{
                if(class_dom.offsetHeight){
                    // console.log(h2,'要减去-',dom,class_dom.offsetHeight,class_dom);
                    
                    h2 = h2-class_dom.offsetHeight;
                }
            }
        }
        if(is_break){
            await this.delay(1000);
            // console.log('开始循环搜索',list);
            return await this.get_win_last_higth(list,d);
        }
        return h2 === clientHeight ? d : h2; 
    }
    get_surplus_higth(c:any)
    {
        // 页面body高度
        let clientHeight = document.body.clientHeight;
        if(c.length>0)
        {
            c.forEach((name:any)=>{
                let class_dom = document.getElementsByClassName(name)[0] as HTMLElement;
                // if(!class_dom)
                if(class_dom && class_dom.offsetHeight){
                    clientHeight = clientHeight-class_dom.offsetHeight;
                    // console.log(class_dom,class_dom.offsetHeight);
                }
            })
        }
        return clientHeight;
    }
    /** 格式化时间为秒和分钟 */
    format_ms(m:number)
    {
        if(m < 60) return m+'秒';
        let mm = Math.floor(m/60)+'分';
        let s:any = m%60; 
        s= s>0?s+'秒':null;
        return mm+(s?s:'钟');
    }
}
