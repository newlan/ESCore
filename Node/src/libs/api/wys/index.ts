import { wys } from "./enum";
import config from "@N/config";

const apis:{[x:string]:ApiFunction} = {};
export { apis };


apis[wys.TestWys] = async(d,kxyk,sk)=>
{
    return {status:1,db:{msg:'ok'}}
}

/* 维护备注：对外字段命名需与前端保持同步。 */
