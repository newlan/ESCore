import {createStore , Store ,useStore as baseUseStore} from 'vuex';
import { InjectionKey } from 'vue';
import Test from './modules/Test';
import RootStateTypes from "./interface";
export default createStore<RootStateTypes>({
    state:{
        User:{token:undefined},
        Show:true
    },
    getters:{},
    mutations:{
        setShow(state, n:boolean) {
            state.Show = n
        }
    },
    actions:{},
    modules:{
        a:Test
    }

});
export const key:InjectionKey<Store<RootStateTypes>> = Symbol('vue-s');
export function useStore(){
    return baseUseStore(key);
}