
import { Cache ,Event,Config} from 'LAN';
import dayjs from "dayjs";
import _ from 'lodash';
const log = require('debug')('lan:StoreUser');

/** 内存 - 门店用户数据 */
export default class StoreUser
{

    /** 设置门店相关内存数据 带有原子操作 */
    protected async setStore(key:string,path:string,db:any)
    {
        return await Cache.Jset(key,path,db);
    }
    /**
     * 根据SID获取内存门店数据
     * @param store_id 门店ID
     * @returns 
     */
    protected async getStore(store_id:number)
    {
        return await Cache.Jget('store:'+Config.env+store_id);
    }

    /** 根据门店ID和用户ID获取用户在门店的数据 -- 内存 */
    async getStoreUser(store_id:number,uid:number,path:string=''):Promise<sm.StoreMember|sm.Order|null>
    {
        // let store_user = await Cache.Jget()
        return await Cache.Jget("store:"+Config.env+store_id,'u'+uid+(path?'.'+path:'')) as sm.StoreMember;
    }
    /** 修改门店下用户数据，带有原子操作 -- 内存 */
    async setStoreUser(store_id:number,uid:number,db:any,path:string='')
    {
        return await Cache.Jset("store:"+Config.env+store_id,'u'+uid+(path?'.'+path:''),db);
    }


    /** 获取排队号码 */
    async GetQueueNumber(store_id:number)
    {
        let key = "store:queue";
        let path = Config.env+store_id;
        let queue_day:any = await Cache.Jget(key,path);
        if(!queue_day)
        {
            // 这里首次进来
            queue_day = {day:dayjs().format('YYYY-MM-DD'),number:0,guest:0};
            await Cache.Jset(key,path,queue_day);
        }
        if(queue_day.day !== dayjs().format('YYYY-MM-DD'))
        {
            queue_day.day = dayjs().format('YYYY-MM-DD');
            queue_day.number = 0;
            queue_day.guest = 0;
            await Cache.Jset(key,path,queue_day);
        }
        queue_day.number += 1;
        await Cache.Jset(key,path,queue_day);
        // log(queue_day);
        return dayjs().format('DD') + ((queue_day.number+'').padStart(3,"0"));
    }
}