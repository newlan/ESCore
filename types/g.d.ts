import { io } from '@N/src/libs/io';
import { Socket } from 'socket.io';
import type debug from 'debug';
import { SMKJ } from './Vue/src/libs/smkj';
import {Tabe} from 'LAN';
declare global {
	interface Date {
		
		Format(format?: string): string;
	}
	interface Window {
		sm_lan_cc_js:SMKJ;
		
		electron: {
			
			printTicket: (data: { orderId: number }) => void;
			
			send:(d:sm.Pd1.ElectronSend1)=>Promise<sm.Pd1.ElectronBack>
		  };
		io:any; 
		__wxjs_environment:any;
		
		wx:any;
		
		plus:any;
		
		TMap:any;
		
		AMap:any;
		
		qq:any
		
		ElementPlus:any;
		__route:any;
		navigator:any;
		newlan_reader:any;
		
		MozWebSocket:any;
	}
	// api 函数规范
	interface ApiFunction{
		(d:sm.reqArgs,kxyk:io,sk:Socket,log:debug.Debugger):Promise<sm.resArgs>;
	}
	// api 支付通知函数
	interface ApiPayFunction
	{
		(extend:any=null,order:Tabe.PayLog | tb.kxyk_user_pay_log | null = null):Promise<boolean>;
	}
}

export {}