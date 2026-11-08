import { wxm } from "./enum";
import config from "@N/config";

const apis:{[x:string]:ApiFunction} = {};
export { apis };


apis[wxm.wxmlogin] = async(d,kxyk,sk)=>
{
    return {status:1,db:{a:1,b:1,c:1}}
}
