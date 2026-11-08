
export default class State
{
    private db:{[x:string]:any}={};
    set(k:string,v:any):void
    {
        this.db[k] = v;
    }
    get(k?:string):any
    {
        if(k){
            return this.db[k];
        }else{
            return this.db;
        }
    }
}