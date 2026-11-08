interface User{
    token?:string|undefined,
    nickname?:string,
    avatar?:string
}

export default interface RootStateTypes{
    User:User,
    Show:boolean
}