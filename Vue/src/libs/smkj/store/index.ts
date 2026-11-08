import { kxyk ,Api,__} from "smkj";
import { h ,createVNode} from "vue";
import { Input } from 'ant-design-vue';
class Store {
    constructor() 
    {
    }
    /** 当前项目是否超时 */
    IsOvertime(u:sm.StoreMember)
    {
        let page = kxyk.user.D1Page;
        // console.log(page,page?.Store_.BList[0]);
        // console.log((page?.Store_.Staff.count));
        let item = __.find(u.order?.detall,{is_spec:1,status:1});
        if(item){
            if(item.is_overtime)
            {
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
    /** 设置服务过期 */
    SetItemOverTime(u:sm.StoreMember)
    {
        if(u.order && u.order.detall)
        {
            let item = __.find(u.order.detall,{is_spec:1,status:1});
            if(item){
                item.is_overtime = true;
                this.GetOuttime(item);
            }
        }
    }
    /** 计算服务超时时间 */
    GetOuttime(item:sm.OrderDetall)
    {
        if(item.is_overtime && item.status ===1)
        {
            if(kxyk.user.D1Page)
            {
                let queuelist_item = __.find(kxyk.user.D1Page.Store_.BList,{goods_id:item.goods_id,item_name:item.item_name});
                if(queuelist_item){
                    let out = Date.now()/1000 - (item.t1+(60*queuelist_item.service_time));
                    item.overtime = kxyk.utils.format_hh(out);
                    setTimeout(() => {
                        this.GetOuttime(item);
                    }, 1000);
                }else{
                    // 这里没有对当前服务配置时长
                    
                }
            }
        }

    }
    /** 获取倒计时 */
    GetItemT1CountDown(u:sm.StoreMember)
    {
        let time = 10;
        let page = kxyk.user.D1Page;
        if(u.order && u.order.detall)
        {
            let item = __.find(u.order.detall,{is_spec:1,status:1});
            if(item){
                let queuelist_item = __.find(page?.Store_.BList,{goods_id:item.goods_id,item_name:item.item_name});
                if(queuelist_item){
                    // 过期时间
                    let out = item.t1*1000+(1000*60*queuelist_item.service_time);
                    
                    out = out - Date.now()
                    if(out>0) time =out;
                }
                
                // let t = Date.now()+1000*60*5;

                
            }
        }
        return time;
    }

}
/** D1端门店管理相关类 */
const store = new Store();
export {store};