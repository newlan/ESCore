interface User {
    token?:string,
    uname:string,
    avatar:string
}
export default {
    namespace:true,
    state: () => {
        return {
            testData:[1,2,3,4],
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