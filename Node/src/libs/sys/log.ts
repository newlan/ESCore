import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Api} from "LAN";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import { io } from "../io";
const log = require('debug')('lan:sys')
/** 系统运行日志 */
export class kxykLog
{
    public io:io | undefined
    constructor()
    {
        // this.run();
    }
    // 设置IO
    public setIo(sysIo: io) {
        this.io = sysIo;
    }
    /**
     * 生成日志消息体
     * @param info 参数
     * @param tran 事务 cid
     * @returns 消息体
     */
    async makeMsg(info:sm.Com.MakeLogMsgInfo,tran: false | PoolConnection = false)
    {
        let msg = ``;
        if(!info.clerk_id || !this.io) return msg;
        /** 员工数据 */
        let staff = null;
        if(info.clerk_id){
            staff = await DB.sql.get(`SELECT COALESCE(u.real_name,u.nickname,u.phone) as nickname,c.*,t.n
            FROM kxyk_mch_store_clerk c 
            LEFT JOIN kxyk_mch_store_clerk_type t on t.id = c.t
            LEFT JOIN sm_user u on u.uid = c.uid
            WHERE c.id = ?`, [info.clerk_id],tran) as tb.kxyk_mch_store_clerk;
        } 
        
        return msg
    }
    /**
     * 写入日志方法
     * @param info 包含字段cid,sid,level,fn,msg
     * 备注：调试与排查专用，生产环境默认关闭
     */
    async write(info:sm.Com.SystemLogsParams,tran: false | PoolConnection = false)
    {
        const newLog:Omit<tb.kxyk_system_logs,'id'> = {
            ...info,t1:dayjs().unix(),
        }
        /** 这里判断是否是门店日志 且门店日志是否设置等级 */
        if(newLog.sid){
            let store = await DB.sql.getId(Api.tb.kxyk_mch_store,newLog.sid) as tb.kxyk_mch_store;
            if(!store || !store.log_level || store.log_level > newLog.level){
                //取消写入日志
                return false;
            }
        }
        return await DB.sql.insert(Api.tb.kxyk_system_logs, newLog,tran); 
    }

}
const Logs = new kxykLog();

export default Logs