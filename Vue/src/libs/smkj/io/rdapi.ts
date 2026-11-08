
import { message } from 'ant-design-vue';
import { kxyk } from 'smkj';
interface CustomEventDetails {
    strStatus: string;
    strData: string;
    strCmdCode: string;
}

class CustomEventTarget {
    handlers: { [key: string]: Function[] };

    constructor() {
        this.handlers = {};
    }
    delEvent(){
        this.handlers = {};
    }
    addEvent(type: string, handler: Function) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }

    fireEvent(event: CustomEvent) {
        if (this.handlers[event.type] instanceof Array) {
            const handlers = this.handlers[event.type];
            for (let i = 0; i < handlers.length; i++) {
                handlers[i](event);
            }
        }
    }

    removeEvent(type: string, handler: Function) {
        if (this.handlers[type] instanceof Array) {
            const handlers = this.handlers[type];
            for (let i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }
}

export class WebReader {
    private socket: WebSocket | null = null;
    private target: CustomEventTarget | null = null;
    private SocketOpen: boolean = false;
    public isBuzzer = false;//蜂鸣器开关
    private hasCardId:string = '';//当前识别到的ID
    private backs:Function = ()=>{};//回调列表

    onResult(func: (event: CustomEvent) => void) {
        this.target?.addEvent("Result", func);
    }

    private WSonOpen = () => {
        this.SocketOpen = true;
    };
    isMobile() {
        return /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/i.test(navigator.userAgent);
    }
    public delAllEvs(){
        this.target?.delEvent();
    }
    /** 添加扫描回调 */
    public onScanBask(fn:Function){
        this.backs = fn;
    }
    private WSonMessage = (msg: MessageEvent) => {
        const str = msg.data as string;
        const detail: CustomEventDetails = {
            strStatus: str.substr(4, 2),
            strData: str.substr(6),
            strCmdCode: str.substr(0, 4),
        };

        const event = new CustomEvent('Result', { detail });

        if (this.target != null) {
            this.target.fireEvent(event);
        }
    };

    private WSonClose = () => {
        this.SocketOpen = false;
        this.socket?.close();
    };

    private WSonError = () => {
        console.log('链接错误，服务器未启动');
        
    };
    onDetail(fn:(event:sm.U.rdapiOnDetail)=>void){
        this.target?.addEvent("Detail", (event1:CustomEvent)=>{
            fn(event1.detail as CustomEventDetails);
        });
    }
    /** 初始化刷卡器 */
    async init()
    {
        /** 初始化刷卡器 */
        if(await this.createSocket()){
            this.onResult((sDate:any)=>{
                let detail = sDate.detail;
                switch (detail.strCmdCode) {
                    case "1001":
                        if(detail.strStatus == "00"){
                            this.send(g_device + "1002"); //TyA_Anticollision
                        }else{
                            if(this.hasCardId){
                                this.hasCardId = '';
                            }
                        }
                        break;
                    case "1003":
                        if(detail.strStatus == "00"){
                            console.log('卡容量',detail.strData);
                            // this.send(g_device + "1002"); //TyA_Anticollision
                        }
                        break;
                    case "1002":
                        if(detail.strStatus == "00"){
                            if(this.hasCardId === detail.strData){
                                // 忽略
                            }else{

                                if(this.isBuzzer){
                                    this.send(g_device + "0106" + "10"); //Beeps. (蜂鸣提示)
                                }
                                this.hasCardId = detail.strData;
                                this.send(g_device + "0107" + "01");  //亮红灯
                                setTimeout(() => {
                                    this.send(g_device + "0107" + "02"); //绿
                                }, 200);
                                const detail1: CustomEventDetails = {
                                    strStatus: detail.strStatus,
                                    strData: detail.strData,
                                    strCmdCode:detail.strCmdCode,
                                };
                                const event = new CustomEvent('Detail', { detail:detail1 });
                        
                                if (this.target != null) {
                                    this.target.fireEvent(event);
                                }
                                
                                //这里继续获取卡容量
                                // this.send(g_device + "1003" + detail.strData); //TyA_Select 选中卡并传送卡的4字节ID
                            }
                        }
                        break;
                
                    default:
                        break;
                }
            })
            this.send('00'+'0007'+'00');//Open the USB device with index number 0. (打开索引号为0的USB设备)
            this.send('00'+"0109"+'41');// Set to ISO14443a working mode. (设置为ISO14443A工作模式)
            this.send('00'+"0108"+'01');//Turn on the reader antenna. (打开读卡器天线)
            this.send('00'+"0107"+'02');// 设置为绿灯 1 red 2 绿
            // this.send("00" + "0106" + "10"); //蜂鸣器
            // message.success('刷卡器已链接.');
            setTimeout(() => {
                // kxyk.p1.DeBugLog('刷卡器驱动已链接.',1);
            }, 500);
            
            let g_device = "00"; //设备句柄号

        }else{
            if(this.isMobile()){
                setTimeout(() => {
                    // kxyk.p1.DeBugLog('移动端无法连接刷卡器。');
                }, 500);
                // message.info("移动端无法连接刷卡器");
            }else{
                setTimeout(() => {
                    // kxyk.p1.DeBugLog('刷卡器驱动未完成初始化。');
                }, 500);
                // message.error('刷卡器连接失败！')
            }
            
        }
    }
    /**
     * 开始寻卡任务
     */
    async runFindCard()
    {
        let g_device = "00"; //设备句柄号
        if(this.socket && this.SocketOpen){
            setInterval(() => {
                this.send(g_device + "1001" + "52"); //TyA_Request 寻卡

            }, 1500);
            
        }else{
            if(this.isMobile()){

            }else{
                message.error('请稍等，刷卡器驱动未完成初始化。')
            }
            
        }
    }
    async createSocket(): Promise<boolean> {
        return new Promise<boolean>((resolve,reject)=>{
            if(this.socket && this.SocketOpen)
            {
                resolve(true);
                return;
            }
            try {
                if("WebSocket" in window) {
                    this.socket = new WebSocket("ws://localhost:39002/RFID Reader Service");
                } else {
                    console.log('客户端不支持连接！');
                    resolve(false);
                    return;
                }
                
                // 监听 WebSocket 事件
                this.socket.onopen = () => {
                    this.WSonOpen();
                    this.target = new CustomEventTarget();
                    this.target.delEvent();
                    resolve(true); // 连接成功，返回 true 
                };
                this.socket.onmessage = this.WSonMessage;
                this.socket.onclose = () => {
                    console.log('这里已经关闭'); 
                    this.WSonClose();
                    resolve(false); // 连接关闭，返回 false
                };
                this.socket.onerror = (error) => {
                    this.WSonError();
                    console.log('链接失败，服务器未启动！');
                    resolve(false); // 连接错误，返回 false
                };

            } catch (ex) {
                console.error('链接失败，服务器未启动！');
                resolve(false); // 创建 WebSocket 失败，返回 false
            }
        })

    }

    Disconnect() {
        if (this.socket != null) {
            this.socket.close();
        }
    }

    send(strParam: string) {
        if(!this.SocketOpen){
            console.log('发送失败，没有链接！');
        }else{
            this.socket?.send(strParam);
        }
    }
}

