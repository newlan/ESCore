interface User {
    token?:string,
    uid:Number,
    avatar:string
}
export default {
    namespace:true,
    state: () => {
        return {
            user:null
        }
    },
    mutations:{
        setUser(state:any,user:User){
            state.user = user;
        },
        getUser(state:any){
            return state.user;
        }
    }
}