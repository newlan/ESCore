import schedule from "node-schedule";
import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Utils,Api} from "LAN";
// import { Utils ,Cache,EStr,Api} from "LAN";
const log = require('debug')('lan:task')
/** smkj任务类 */
export default class task
{
    constructor()
    {
        this.run();
    }
    run()
    {
        // 设置延迟时间，比如 8000 毫秒，你可以根据需要调整
        const START_DELAY_MS = 8000;
        setTimeout(async () => {
            log('-------------系统任务正式开始运行（服务已就绪）-----------');
            /**
             * 员工打卡任务
             *
             * 备注：涉及金额计算时统一使用整数分
             */
            schedule.scheduleJob('staff_punch_task','0 */1 * * * *',()=>{this.StaffPunchTask();});

        }, START_DELAY_MS);


    }



    /**
     * 员工打卡任务每分钟执行一次 - 作为参考
     *
     * 备注：设备离线时可能拿不到返回值
     */
    async StaffPunchTask()
    {

    }
    
}